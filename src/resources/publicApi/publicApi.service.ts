import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

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
    const serviceKey = process.env.PIPE_API_ACCESS_KEY;
    const start = 1;
    const end = 30;
    const now = moment().format('YYYYMMDDHH') - 1;

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
