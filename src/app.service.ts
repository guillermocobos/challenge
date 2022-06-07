import { Injectable, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import got from 'got';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Karvi!';
  }


}
