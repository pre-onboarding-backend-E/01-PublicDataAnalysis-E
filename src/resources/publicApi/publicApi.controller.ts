import { Controller, Get, Param } from '@nestjs/common';
import { GubnType } from 'src/config/gubnType';
import { ResponseDto } from './dto/publicApiResponse';
import { PublicApiService } from './publicApi.service';

@Controller()
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Get('/:region')
  getWaterLevelByRainfall(@Param('region') region: string): Promise<ResponseDto> {
    return this.publicApiService.getWaterLevelAndRainfall(region);
  }
}
