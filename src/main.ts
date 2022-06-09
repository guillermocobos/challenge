import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ skipMissingProperties: true, whitelist: true }),
  );

  const PORT = process.env.PORT;
  await app.listen(PORT);
  
  Logger.log(`Listening services on: ${PORT}`);
}
bootstrap();
