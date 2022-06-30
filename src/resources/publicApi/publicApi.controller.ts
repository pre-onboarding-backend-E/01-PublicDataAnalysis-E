import { Controller, Get, Param } from '@nestjs/common';
import { GubnType } from 'src/config/gubnType';
import { ResponseDto } from './dto/publicApiResponse';
import { PublicApiService } from './publicApi.service';

@Controller()
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Get('/:id')
  getWaterLevelByRainfall(@Param('id') id: string): Promise<ResponseDto> {
    return this.publicApiService.getWaterLevelAndRainfall(id);
  }

  @Get('rainfall/:region')
  getRainfallData(@Param('region') region: string) {
    return this.publicApiService.getRainfallData(region);
  }

  @Get('watarlevel/:id')
  getWaterLevelData(@Param('id') id: string) {
    const code = GubnType[id]['code'];
    console.log(code);
    return this.publicApiService.getWaterLevelData({ code });
  }
}
