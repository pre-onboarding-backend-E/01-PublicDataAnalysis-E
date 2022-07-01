import { Controller, Get, Query } from '@nestjs/common';
import { DefaultResponse } from 'src/http/dto';
import { PublicApiService } from './publicApi.service';

@Controller()
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Get('/info')
  async getWaterLevelByRainfall(@Query('region') region: string): Promise<DefaultResponse> {
    const result = await this.publicApiService.getWaterLevelAndRainfall(region);
    return DefaultResponse.ok(result)
  }
}
