export type CreateGameFields = {
    name: string;
    hostIsNaughts: boolean;
}

export type JoinGameFields = {
    gameId: string;
    name: string;
}

export type MoveFields = {
    gameId: string;
    board: [number[], number[], number[]];
    player: string;
}

export type PlayGameFields = {
    gameId: string;
    player: string;
}