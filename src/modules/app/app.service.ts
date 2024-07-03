import { Injectable } from '@nestjs/common';
import { HttpService } from '@modules/http/http.service';

@Injectable()
export class AppService {
  constructor(
    private readonly http: HttpService
  ) { }
  async getHello() {


    return await this.http.get('https://jsonplaceholder.typicode.com/todos/1')
  }
}
