import { Controller, Get } from '@nestjs/common';
import { PublicApiService } from './publicApi.service';
PublicApiService;

@Controller()
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Get('publicData1')
  getPublicData1() {
    return '용민';
  }

  @Get('publicData2')
  getPublicData2() {
    return '태영';
  }
}
