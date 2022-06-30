import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ResponseDto } from './dto/publicApiResponse';

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

interface IReq {
  key: string;
  service: string;
  type: string;
  start: number;
  end: number;
  region: string;
  now?: string;
}

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
      const req: IReq = {
        key: process.env.PIPE_API_ACCESS_KEY,
        service: 'DrainpipeMonitoringInfo',
        type: 'json',
        start: 1,
        end: 1000,
        region: code,
        now: String(moment().format('YYYYMMDDHH') - 1),
      };

      const res = await axios({
        url: `http://openapi.seoul.go.kr:8088/${req.key}/${req.type}/${req.service}/${req.start}/${req.end}/${req.region}/${req.now}/${req.now}`,
        method: 'GET',
      });
      const rowLength = res.data.DrainpipeMonitoringInfo.row.length;
      const waterLevel = (
        res.data.DrainpipeMonitoringInfo.row.reduce((acc, cur) => {
          acc += Number(cur.MEA_WAL);
          return acc;
        }, 0) / rowLength
      ).toFixed(4);
      console.log(waterLevel);
      return waterLevel;
    } catch (error) {
      console.log(error);
    }
  }
}
