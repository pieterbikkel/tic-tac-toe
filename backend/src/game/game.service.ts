import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // Assuming you're using UUIDs for generating unique identifiers
import { CreateGameFields, JoinGameFields, MoveFields } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './schemas/game.schema';
import { PlayedGame } from './schemas/played-games.schema';
import { Model } from 'mongoose';
import { PlayGameFields } from './types';

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name) private gameModel: Model<Game>,
        @InjectModel(PlayedGame.name) private playedGameModel: Model<PlayedGame>
    ) {}

    async createGame(fields: CreateGameFields): Promise<Game> {
        
        const createdGame = new this.gameModel({
            name: fields.name,
            hostIsNaughts: fields.hostIsNaughts,
            board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            players: 0,
            turn: '',
        });
        return createdGame.save();
    }

    async getAllGames() {
        return this.gameModel.find().exec();
    }

    async getPlayedGames() {
        return this.playedGameModel.find().exec();
    }

    async deleteAllPlayedGames() {
        return this.playedGameModel.deleteMany({});
    }

    async deleteGame(id: string) {
        return this.gameModel.findByIdAndDelete(id);
    }

    async makeMove(move: MoveFields): Promise<Game> {
        // find game by id
        const game = await this.gameModel.findById(move.gameId);
        if (!game) {
            throw new Error('Game not found');
        }

        // check if game has winner
        if (game.winner) {
            throw new Error('Game has ended');
        }

        // check if it's the player's turn
        if (game.turn !== move.player) {
            throw new Error('Not your turn');
        }

        // update game with new board
        game.board = move.board;
        game.turn = move.player === 'cross' ? 'naughts' : 'cross';
        await game.save();

        // check if there is a winner
        const winner = this.checkWinner(game.board);

        if (winner) {
            game.winner = winner === 1 ? 'cross' : 'naughts';
            await game.save();

            const playedGame = new this.playedGameModel({
                board: game.board,
                winner: game.winner,
            });
            await playedGame.save();
        }

        // check if it's a draw
        if (!game.board.flat().includes(0)) {
            game.winner = 'draw';
            await game.save();

            const playedGame = new this.playedGameModel({
                board: game.board,
                winner: game.winner,
            });
            await playedGame.save();
        }

        return game;
    }

    private checkWinner(board: [number[], number[], number[]]) {
        // check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }
        }

        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            }
        }

        // check diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }

        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }

        return null;
    }

    async playGame(data: PlayGameFields): Promise<Game> {
        const game = await this.gameModel.findById(data.gameId);
        if (!game) {
            throw new Error('Game not found');
        }

        if (game.players === 0) {
            game.players = 1;
            game.turn = data.player;

            await game.save();
        } else if (game.players === 2){
            throw new Error('Game is full');
        }

        game.players += 1;

        return game;
    }
}
