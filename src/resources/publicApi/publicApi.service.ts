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

  async a() {
    return '용민';
  }

  async b({ id }) {
    try {
      const serviceKey = process.env.PIPE_API_ACCESS_KEY;
      const start = 1;
      const end = 30;

      const now = moment().format('YYYYMMDDHH') - 1;
      console.log(now);
      const result = await axios(
        `http://openapi.seoul.go.kr:8088/${serviceKey}/json/DrainpipeMonitoringInfo/${start}/${end}/${id}/${now}/${now}`,
      );
      const rowLength = result.data.DrainpipeMonitoringInfo.row.length;

      const water = (
        result.data.DrainpipeMonitoringInfo.row.reduce((acc, cur) => {
          acc += Number(cur.MEA_WAL);
          return acc;
        }, 0) / rowLength
      ).toFixed(5);
      console.log(water);
    } catch (e) {}
  }
}
