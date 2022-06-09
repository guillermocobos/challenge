import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private BASE_PATH = this.configService.get<string>('EndPointURL');
  constructor(private configService: ConfigService) {
  }
  getHello(): string {
    return `Escuchando en URL ${this.BASE_PATH}`;
  }
}