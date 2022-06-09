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
import { GetSiteDto } from '../dto/get-site.dto';
import { GetIdsDto } from '../dto/get-ids.dto';
@Controller('/cars')
export class CarsController {
  constructor(
    private readonly carService: CarService,
    private responseManagerSvc: ResponseManagerService,
  ) {
    this.responseManagerSvc.mainContext = 'carController';
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
  @Get('EndPointOne')
  async findAll(@Query() dto: GetIdsDto): Promise<any> {
    if (!dto.site) {
      throw new HttpException(
        'Parameter site is required',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!dto.ids) {
      try {
        const items: any = await this.carService.findAll(dto.site);
        const groupes = this.groupBy(items, 'brand');
        if (items) {
          return this.responseManagerSvc.send({ items, groupes });
        } else {
          throw new HttpException('No Data Found', HttpStatus.NO_CONTENT);
        }
      } catch (error) {
        throw this.responseManagerSvc.checkError(error);
      }
    } else {
      throw new HttpException('Too many parameters', HttpStatus.NOT_FOUND);
    }
  }

  @Get('EndPointTwo')
  async findAllFilters(@Query() dto: GetIdsDto): Promise<any> {
    if (!dto.site) {
      throw new HttpException(
        'Parameter site is required',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!dto.ids) {
      try {
        const items: any = await this.carService.findAll(dto.site);
        const groupes = this.groupBy(items, 'brand');
        if (items) {
          return this.responseManagerSvc.send({ items, groupes });
        } else {
          throw new HttpException('No Data Found', HttpStatus.NO_CONTENT);
        }
      } catch (error) {
        throw this.responseManagerSvc.checkError(error);
      }
    } else {
      const { site, ids } = dto;
      try {
        const cars: any[] = await this.carService.findAll(dto.site);
        if (cars) {
          const items = cars.filter((item) => ids.includes(String(item.id)));
          return this.responseManagerSvc.send({ items });
        } else {
          throw new HttpException('No Data Found', HttpStatus.NO_CONTENT);
        }
      } catch (error) {
        throw this.responseManagerSvc.checkError(error);
      }
    }
  }

  private groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      acc[currentValue[criteria]].push(currentValue);
      return acc;
    }, {});
    return newObj;
  }
}
