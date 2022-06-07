import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ skipMissingProperties: true, whitelist: true }),
  );
  await app.listen(3000);
  const route = process.env.baseURLVT;
  Logger.log(`Listening services on: ${route}`);
}
bootstrap();
