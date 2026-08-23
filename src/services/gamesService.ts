import { Game } from '../types/Game';

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