export type GameStatus =
    | 'Backlog'
    | 'Playing'
    | 'Completed'
    | 'Dropped';

export type Game = {
    id: string;
    title: string;
    image: string;
    description: string;
    genre: string;
    platform: string;
    releaseYear: number;
    status: GameStatus;
};