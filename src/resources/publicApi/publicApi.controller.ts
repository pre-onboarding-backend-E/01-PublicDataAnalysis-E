import { Controller, Get, Param } from '@nestjs/common';

import { GubnType } from 'src/config/gubnType';

import { ResponseDto } from './dto/publicApiResponse';

import { PublicApiService } from './publicApi.service';

@Controller()
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Get('/')
  getWaterLevelByRainfall(
    @Param('id') id: number, 
    @Param('region') region: string): Promise<ResponseDto> {
    return this.publicApiService.getWaterLevelByRainfall(id, region);
  }

  @Get('rainfall/:region')
  getRainfallData(@Param('region') region: string) {
    return this.publicApiService.getRainfallData(region);
  }

  @Get('publicData2/:id')
  getPublicData2(@Param('id') id: string) {
    const code = GubnType[id]['code'];
    console.log(code);
    return this.publicApiService.b({ code });
  }
}
