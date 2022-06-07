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
  import { GetCoverageDto } from '../dto/get-coverage.dto';
  
  @Controller('cars')
  export class CoverageController {
    constructor(
      private readonly coverageService: CoverageService,
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
    async findAll(@Query() dto: GetCoverageDto): Promise<any> {
      try {
        // 1° Validacion.  Validar existencia de ramo/producto
        const validate: any = await this.coverageService.validationProducts(
          dto.id_ramo,
          dto.id_producto,
        );
        if (validate.length>0) {
          // 2° Validar relación plan-producto-ramo
          if (dto.id_plan) {
            const validationPlanProductsBranch: any =
              await this.coverageService.validationPlanProductsBranch(
                dto.id_ramo,
                dto.id_producto,
                dto.id_plan,
              );
            if (!validationPlanProductsBranch) {
              throw new HttpException(
                'El plan no existe o es inválido',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
          const coverage: any = await this.coverageService.findAll(dto);
          if (coverage) {
            return this.responseManagerSvc.send({ coverage });
          } else {
            throw new HttpException('No Data Found', HttpStatus.NO_CONTENT);
          }
        } else {
          throw new HttpException(
            'El ramo/producto no existe o es inválido',
            HttpStatus.BAD_REQUEST,
          );
        }
      } catch (error) {
        throw this.responseManagerSvc.checkError(error);
      }
    }
  }