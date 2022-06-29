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

  async b() {
    return '태영';
  }
}
