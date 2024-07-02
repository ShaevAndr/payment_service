import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  getHello(@Body() data: any): any {
    console.log(data)

    return this.appService.getHello()
  }
}
