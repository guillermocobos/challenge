import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private VT_BASE_PATH = this.configService.get<string>('baseURLVT');
  constructor(private configService: ConfigService) {
  }
  getHello(): string {
    return `Escuchando en URL ${this.VT_BASE_PATH}`;
  }
}