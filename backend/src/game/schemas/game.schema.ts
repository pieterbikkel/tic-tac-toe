import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
    @Prop()
    name: string;

    @Prop()
    hostIsNaughts: boolean;

    @Prop()
    hostId: UUID;

    @Prop()
    board: [number[], number[], number[]];

    @Prop()
    winner: string;

    @Prop()
    players: number;

    @Prop()
    turn: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);