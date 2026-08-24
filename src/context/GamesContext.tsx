import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

import { Game, GameStatus } from '../types/Game';

import {
    createGame,
    deleteGame,
    getGames,
    updateGameStatus,
} from '../services/gamesService';

import {
    getStoredGames,
    saveGames,
} from '../services/storageService';

type NewGame = Omit<Game, 'id'>;

type GamesContextType = {
    games: Game[];
    loading: boolean;
    error: string | null;
    isOffline: boolean;
    refreshGames: () => Promise<void>;
    changeGameStatus: (
        id: string,
        status: GameStatus
    ) => Promise<void>;
    addGame: (game: NewGame) => Promise<void>;
    removeGame: (id: string) => Promise<void>;
};

const GamesContext = createContext<GamesContextType | undefined>(
    undefined
);

type GamesProviderProps = {
    children: ReactNode;
};

export function GamesProvider({
                                  children,
                              }: GamesProviderProps) {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        try {
            setLoading(true);
            setError(null);
            setIsOffline(false);

            const data = await getGames();

            setGames(data);
            await saveGames(data);
        } catch (error) {
            const cachedGames =
                await getStoredGames<Game>();

            if (cachedGames.length > 0) {
                setGames(cachedGames);
                setIsOffline(true);
                setError(
                    'You are offline. Showing your saved games.'
                );
            } else {
                setError(
                    'Could not load games. No offline data is available.'
                );
            }
        } finally {
            setLoading(false);
        }
    }

    async function refreshGames() {
        await loadGames();
    }

    async function changeGameStatus(
        id: string,
        status: GameStatus
    ) {
        try {
            const updatedGame =
                await updateGameStatus(id, status);

            const updatedGames = games.map((game) =>
                game.id === updatedGame.id
                    ? updatedGame
                    : game
            );

            setGames(updatedGames);
            await saveGames(updatedGames);
        } catch (error) {
            throw new Error(
                'Could not update the game status.'
            );
        }
    }

    async function addGame(game: NewGame) {
        try {
            const createdGame = await createGame(game);

            const updatedGames = [
                ...games,
                createdGame,
            ];

            setGames(updatedGames);
            await saveGames(updatedGames);
        } catch (error) {
            throw new Error(
                'Could not add the game.'
            );
        }
    }

    async function removeGame(id: string) {
        try {
            await deleteGame(id);

            const updatedGames = games.filter(
                (game) => game.id !== id
            );

            setGames(updatedGames);
            await saveGames(updatedGames);
        } catch (error) {
            throw new Error(
                'Could not delete the game.'
            );
        }
    }

    return (
        <GamesContext.Provider
            value={{
                games,
                loading,
                error,
                isOffline,
                refreshGames,
                changeGameStatus,
                addGame,
                removeGame,
            }}
        >
            {children}
        </GamesContext.Provider>
    );
}

export function useGames() {
    const context = useContext(GamesContext);

    if (!context) {
        throw new Error(
            'useGames must be used inside a GamesProvider'
        );
    }

    return context;
}