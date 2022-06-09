import { Injectable, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import got from 'got';
import { GetSiteDto } from '../dto/get-site.dto';
import { Cars } from '../entities/car.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CarService {
  private EndPointURL = this.configService.get<string>('EndPointURL');
  constructor(
    private configService: ConfigService,
    private httpSvc: HttpService,
  ) {}

  async findAll(site: string): Promise<any> {
    try {
      const result = await got
        .get(`${this.EndPointURL}?site=${site}`, {})
        .json();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
