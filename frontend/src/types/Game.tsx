export type Game = {
    _id: string;
    name: string;
    hostIsNaughts: boolean;
    host: string;
}

export type CreateGame = {
    name: string;
    hostIsNaughts: boolean;
}

export type GameState = {
    board: [number[], number[], number[]];
    currentPlayer: string;
    winner: string;
    players: number;
    game: Game | undefined;
}

export type Move = {
    board: [number[], number[], number[]];
    winner: string;
    turn: string;
}

export type Play = {
    board: [number[], number[], number[]];
    turn: string;
}