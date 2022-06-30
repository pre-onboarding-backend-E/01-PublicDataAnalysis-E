import { Controller, Get, Param } from '@nestjs/common';
import { Gubntype } from 'src/config/gubnType';
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
    const code = Gubntype[id]['code'];
    console.log(code);
    return this.publicApiService.b({ code });
  }
}
