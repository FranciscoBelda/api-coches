import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'La API está en /api/v1/coches o /api/v1/aviones o /api/v1/barcos';
  }
}
