// game.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { ConfigModule } from '@nestjs/config';
import { GameController } from './game.controller';
import { Game, GameSchema } from './schemas/game.schema';
import { PlayedGame, PlayedGameSchema } from './schemas/played-games.schema';

@Module({
    imports : [ConfigModule, MongooseModule.forFeature([
        { name: Game.name, schema: GameSchema },
        { name: PlayedGame.name, schema: PlayedGameSchema }
    ])],
    controllers: [GameController],
    providers: [GameGateway, GameService],
})

export class GameModule {}
