import { Controller, Get, Param } from '@nestjs/common';
import { PublicApiService } from './publicApi.service';
PublicApiService;

@Controller()
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Get('publicData1')
  getPublicData1() {
    return '용민';
  }

  @Get('publicData2/:id')
  getPublicData2(@Param('id') id: string) {
    return this.publicApiService.b({ id });
  }
}
