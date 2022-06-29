import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PublicApiService {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }

  async a() {
    return '용민';
  }

  async b() {
    return '태영';
  }
}
