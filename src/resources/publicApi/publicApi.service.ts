import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ResponseDto } from './dto/publicApiResponse';

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

@Injectable()
export class PublicApiService {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }

  async getWaterLevelByRainfall(id: number, region: string) {
    const waterLevel = await this.getWaterLevelData({ id });
    const rainfall = await this.getRainfallData(region);

    const responseDto: ResponseDto = new ResponseDto();
    //responseDto.gubnCode
    //responseDto.gubnName
    responseDto.waterLevel = Number(waterLevel);
    responseDto.rainfall = rainfall;
    responseDto.date = moment();
    
    return responseDto;
  }

  async getRainfallData(region: string) {
    const key = process.env.RAINFALL_API_ACCESS_KEY;
    const start = 1;
    const end = 282;

    try {
      const response = await axios({
        url: `http://openAPI.seoul.go.kr:8088/${key}/json/ListRainfallService/${start}/${end}/` + encodeURI(region),
        method: 'GET',
      });

      let totalRainfall = 0, count = 0;
      const now = moment(response.data.ListRainfallService.row[0].RECEIVE_TIME);
      
      response.data.ListRainfallService.row.map(r => {
        const receive = moment(r.RECEIVE_TIME);
        
        if (moment.duration(now.diff(receive)).asMinutes() < 60) {
          totalRainfall += Number(r.RAINFALL10);
          count += 1;
        }
      });
      
      return totalRainfall / count;
    } catch (error) {
      console.error(error);
    }
  }

  async getWaterLevelData({ id }) {
    const serviceKey = process.env.PIPE_API_ACCESS_KEY;
    const start = 1;
    const end = 30;
    const now = moment().format('YYYYMMDDHH') - 1;
    console.log(now);
    try {
      const result = await axios(
        `http://openapi.seoul.go.kr:8088/${serviceKey}/json/DrainpipeMonitoringInfo/${start}/${end}/${id}/${now}/${now}`,
      );
      const rowLength = result.data.DrainpipeMonitoringInfo.row.length;

      const waterLevel = (
        result.data.DrainpipeMonitoringInfo.row.reduce((acc, cur) => {
          acc += Number(cur.MEA_WAL);
          return acc;
        }, 0) / rowLength
      ).toFixed(5);
      console.log(waterLevel);
      return waterLevel;
    } catch (e) {}
  }
}
