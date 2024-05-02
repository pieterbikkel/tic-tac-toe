import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:5173'],
    },
  });
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT') || '3000');
  const clientPort = parseInt(configService.get('CLIENT_PORT') || '5173');

  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      new RegExp('http://localhost:\\d+$'),
      'ws://localhost:5173',
    ],
  });

  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();
