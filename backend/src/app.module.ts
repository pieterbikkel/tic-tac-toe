import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './game/game.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot(), GameModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [],
  providers: [],
})
export class AppModule {}
