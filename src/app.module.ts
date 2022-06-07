import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CarsModule } from './cars/car.module';

@Module({
  imports: [CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
