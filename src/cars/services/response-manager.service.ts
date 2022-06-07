import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    Logger,
  } from '@nestjs/common';
  import { IApiResponse } from '../interfaces/app-response.interface';
  
  @Injectable()
  export class ResponseManagerService {
    private logger = new Logger('ResponseManagerService');
  
    private $mainContext = 'ResponseManagerService';
  
    set mainContext(value: string) {
      this.$mainContext = value;
    }
  
    sendData<T>(info: Record<string, T>): IApiResponse<T> {
      return {
        data: { ...info },
      };
    }

    send(info: any) {
      return info ;
    }
  
    checkError<T>(
      error: T,
      context?: string,
    ): InstanceType<typeof HttpException> {
      this.logger.error(error, '', `${this.$mainContext}:${context}`);
  
      if (error instanceof HttpException) {
        return error;
      }
  
      return new InternalServerErrorException((error as any)?.message);
    }
  }
  