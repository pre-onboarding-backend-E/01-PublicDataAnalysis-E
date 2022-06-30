import { Controller, Get, Param } from '@nestjs/common';
import { PublicApiService } from './publicApi.service';
PublicApiService;

@Controller()
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Get('rainfall/:region')
  getRainfallData(@Param('region') region: string) {
    return this.publicApiService.getRainfallData(region);
  }

  @Get('publicData2/:id')
  getPublicData2(@Param('id') id: string) {
    return this.publicApiService.b({ id });
  }
}
