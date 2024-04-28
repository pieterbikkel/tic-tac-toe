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
