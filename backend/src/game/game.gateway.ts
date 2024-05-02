import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { GameService } from './game.service';
import { MoveFields, PlayGameFields } from './types';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: '/game',
  cors: true
})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly gameService: GameService) {}

  private readonly logger = new Logger(GameGateway.name);

  @WebSocketServer() io: Namespace;

  afterInit() {
    // throw new Error('Method not implemented.');
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    const sockets = this.io.sockets;

    this.logger.log(`Client connected with ID: ${client.id}`);
    this.logger.debug(`Total clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`Client disconnected with ID: ${client.id}`);
    this.logger.debug(`Total clients: ${sockets.size}`);
  }

  @SubscribeMessage('move')
  async handleGameMove(@MessageBody('move') move: MoveFields) {
      const game = await this.gameService.makeMove(move)
      this.io.emit('move', game)
  }

  @SubscribeMessage('play')
  async handleJoinGame(@MessageBody('data') data: PlayGameFields) {
      const result = await this.gameService.playGame(data)
      this.io.emit('play', result)
  }
}
