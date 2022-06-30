import { Controller, Get, Param } from '@nestjs/common';
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
  getWaterLevelData(@Param('id') id: string) {
    return this.publicApiService.getWaterLevelData({ id });
  }
}
