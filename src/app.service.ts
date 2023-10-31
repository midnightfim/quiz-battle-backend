import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    const client = new PrismaClient();
    console.log('im here !!!!!!!!!!!');
    return 'Hello World!';
  }
}
