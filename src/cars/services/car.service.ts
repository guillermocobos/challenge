import { Injectable, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import got from 'got';
//import { GetCoverageDto } from '../dto/get-coverage.dto';
const moment = require('moment');

@Injectable()
export class CarService {
  private VT_BASE_PATH = this.configService.get<string>('baseURLVT');
  constructor(private configService: ConfigService) {}

  // async findAll(@Query() data: GetCoverageDto): Promise<any> {
  //   let now = moment().format('yyyy-MM-DD');
  //   const coverageModule = data.id_plan;
  //   const urlService: string = !isNaN(coverageModule)
  //     ? `${this.VT_BASE_PATH}/Backoffice/ProductManager.svc/REST/CoverageByProductLkp?lineOfBusiness=${data.id_ramo}&productCode=${data.id_producto}&coverageModule=${data.id_plan}&atDate=${now}`
  //     : `${this.VT_BASE_PATH}/Backoffice/ProductManager.svc/REST/CoverageByProductLkp?lineOfBusiness=${data.id_ramo}&productCode=${data.id_producto}&atDate=${now}`;
  //   try {
  //     const result = await got.get(urlService, {}).json();
  //     return await this.transformationData(result);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async findAll(): Promise<any> {
    try {
      const result = await got
        .get(
          `${this.VT_BASE_PATH}/Extended/ExtendedService.svc/REST/CategoryLkp?RiskType=3&DefinitionType=3`,
          {},
        )
        .json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async transformationData(result: any): Promise<any> {
    const newData = result.map((result) => ({
      codigoCobertura: result.Code,
      descripcionCobertura: result.Description,
      codigoPlan: result.Module,
    }));
    return newData;
  }

  async validationProducts(lineOfBusiness: Number, productcode: Number): Promise<any> {
    try {
      const result = await got
        .get(
          `${this.VT_BASE_PATH}/Backoffice/ProductManager.svc/REST/ProductByLineOfBusinessLkp?lineOfBusiness=${lineOfBusiness}&productcode=${productcode}`,
          {},
        )
        .json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async validationPlanProductsBranch(lineOfBusiness: Number, productcode: Number, id_Plan: Number): Promise<any> {
    try {
      const result: any = await got
        .get(
          `${this.VT_BASE_PATH}/Backoffice/ProductManager.svc/REST/ModuleByProduct?lineOfBusiness=${lineOfBusiness}&productcode=${productcode}`,
          {},
        )
        .json();
        const exists = result.find((data) => data.Code === id_Plan.toString());
      return exists;
    } catch (error) {
      throw error;
    }
  }

}