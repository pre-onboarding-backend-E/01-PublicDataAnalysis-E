import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

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

  async getRainfallData(region: string) {
    const key = process.env.RAINFALL_API_ACCESS_KEY;
    const service = 'ListRainfallService';
    const type = 'json';
    const start = 1;
    const end = 1000;

    try {
      const res = await axios({
        url: `http://openAPI.seoul.go.kr:8088/${key}/${type}/${service}/${start}/${end}/` + encodeURI(region),
        method: 'GET',
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async b({ id }) {
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
