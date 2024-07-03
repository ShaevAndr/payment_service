import { Body, Controller, Get, Post, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpLoggingInterceptor } from '../httpLogger/intercetors/logger.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Post()
  @UseInterceptors(HttpLoggingInterceptor)
  @Get()
  async getHello() {

    return await this.appService.getHello()
  }
}
