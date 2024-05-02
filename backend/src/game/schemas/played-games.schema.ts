import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<PlayedGame>;

@Schema()
export class PlayedGame {
    @Prop()
    board: [number[], number[], number[]];

    @Prop()
    winner: string;
}

export const PlayedGameSchema = SchemaFactory.createForClass(PlayedGame);