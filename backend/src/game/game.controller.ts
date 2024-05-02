import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { CreateGameDto, JoinGameDto } from './dto';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
    constructor(private gameService: GameService) {}
    @Post()
    async create(@Body() createGameDto: CreateGameDto) {
        const result = await this.gameService.createGame(createGameDto);
        return result;
    }

    @Get()
    async getAllGames() { 
        const games = await this.gameService.getAllGames(); 
        return games; 
    }

    @Delete("/played-games")
    async deleteAllPlayedGames() {
        const result = await this.gameService.deleteAllPlayedGames();
        return result;
    }

    @Delete(':id')
    async deleteGame(@Param() params: { id: string }) {
        const result = await this.gameService.deleteGame(params.id);
        return result;
    }

    @Get("/played-games")
    async getPlayedGames() {
        const playedGames = await this.gameService.getPlayedGames();
        return playedGames;
    }
}