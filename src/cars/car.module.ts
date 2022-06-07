import { Module } from '@nestjs/common';
import { CarService } from './services/car.service';
import { ResponseManagerService } from './services/response-manager.service';
import { CarsController } from './controllers/car.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [CarsController],
  providers: [CarService, ResponseManagerService]
})
export class CarsModule {}