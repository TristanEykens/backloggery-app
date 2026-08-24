import AsyncStorage from '@react-native-async-storage/async-storage';

const GAMES_STORAGE_KEY = 'backloggery_games';

export async function saveGames<T>(games: T[]): Promise<void> {
    try {
        await AsyncStorage.setItem(
            GAMES_STORAGE_KEY,
            JSON.stringify(games)
        );
    } catch (error) {
        console.error('Failed to save games:', error);
        throw new Error('Could not save games locally.');
    }
}

export async function getStoredGames<T>(): Promise<T[]> {
    try {
        const storedGames =
            await AsyncStorage.getItem(GAMES_STORAGE_KEY);

        if (!storedGames) {
            return [];
        }

        return JSON.parse(storedGames);
    } catch (error) {
        console.error('Failed to load stored games:', error);
        return [];
    }
}

export async function clearStoredGames(): Promise<void> {
    try {
        await AsyncStorage.removeItem(GAMES_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear stored games:', error);
    }
}