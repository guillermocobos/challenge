import {
    Controller,
    Get,
    Query,
    HttpCode,
    HttpStatus,
    HttpException,
    Param,
  } from '@nestjs/common';
  import { ApiResponse } from '@nestjs/swagger';
  import { ResponseManagerService } from '../services/response-manager.service';
  import { CarService } from '../services/car.service';
  //import { GetCoverageDto } from '../dto/get-coverage.dto';
  
  @Controller('cars')
  export class CarsController {
    constructor(
      private readonly carService: CarService,
      private responseManagerSvc: ResponseManagerService,
    ) {
      this.responseManagerSvc.mainContext = 'coverageController';
    }
  
    @ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'something when wrong in the server',
    })
    @ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Error from SERVER',
    })
    @ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'No Data Found',
    })
    @Get()
    async findAll(): Promise<any> {
      try {
        const items: any = await this.carService.findAll;
        if (items) {
          return this.responseManagerSvc.send({ items });
        } else {
          throw new HttpException('No Data Found', HttpStatus.NO_CONTENT);
        }
      } catch (error) {
        throw this.responseManagerSvc.checkError(error);
      }
    }
  }