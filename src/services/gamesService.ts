import { Game, GameStatus } from '../types/Game';

const API_URL = 'http://10.0.2.2:3000';

export async function getGames(): Promise<Game[]> {
    const response = await fetch(`${API_URL}/games`);

    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }

    return response.json();
}

export async function getGameById(id: string): Promise<Game> {
    const response = await fetch(`${API_URL}/games/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch game');
    }

    return response.json();
}

export async function updateGameStatus(
    id: string,
    status: GameStatus
): Promise<Game> {
    const response = await fetch(`${API_URL}/games/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to update game status');
    }

    return response.json();
}

export async function createGame(
    game: Omit<Game, 'id'>
): Promise<Game> {
    const response = await fetch(`${API_URL}/games`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    });

    if (!response.ok) {
        throw new Error('Failed to create game');
    }

    return response.json();
}

export async function deleteGame(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/games/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete game');
    }
}