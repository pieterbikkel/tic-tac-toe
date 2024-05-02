import { Length, IsUUID, IsString, IsBoolean } from 'class-validator';

export class CreateGameDto {
    @IsString()
    @Length(3, 50)
    name: string;

    @IsBoolean()
    hostIsNaughts: boolean;
}

export class JoinGameDto {
    @IsUUID()
    gameId: string;

    @IsString()
    @Length(3, 50)
    name: string;
}