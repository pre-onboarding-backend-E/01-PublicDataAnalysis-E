import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

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
        url:
          `http://openAPI.seoul.go.kr:8088/${key}/${type}/${service}/${start}/${end}/` +
          encodeURI(region),
        method: 'GET',
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async b({ id }) {
    const serviceKey = process.env.PIPE_API_ACCESS_KEY;

    const result = await axios(
      `http://openapi.seoul.go.kr:8088/${serviceKey}/json/DrainpipeMonitoringInfo/1/30/${id}/2022062912/2022062912`,
    );
    console.log(result.data);
    console.log(result.data.DrainpipeMonitoringInfo.row);
    return result.data.DrainpipeMonitoringInfo.row.sort((a, b) => {
      if (a.IDN > b.IDN) return 1;
      if (a.IDN < b.IDN) return -1;
      return 0;
    });
  }
}
