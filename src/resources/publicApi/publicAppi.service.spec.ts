import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ResponseDto } from './dto/publicApiResponse';
import { PublicApiService } from './publicApi.service';

describe('PublicApiService', () => {
    let service: PublicApiService; 

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PublicApiService],
        }).compile(); 

        service = module.get<PublicApiService>(PublicApiService); 
    }); 

    it('should be defined', () => {
        expect(service).toBeDefined();
      });

    describe("강우량과 하수관로 수위 현황 결합 데이터 요청", () => {
        it("데이터 요청 성공", async () => {
            const result = await service.getWaterLevelAndRainfall("gangnam"); 
            expect(result).toHaveProperty("date"); 
            expect(result).toHaveProperty("gubnCode"); 
            expect(result).toHaveProperty("gubnName"); 
            expect(result).toHaveProperty("waterLevel"); 
            expect(result).toHaveProperty("rainfall");  
        }); 

        it("요청 시 입력값이 유효하지 않음", async() => {
            // 400 Bad Request 
            // try{
            //     const result = await service.getWaterLevelAndRainfall("gangnaaaam");
            //     console.log(result); 
            //   } catch(e) {
            //     // 예외 처리 어떻게 할지 보고 정리 
            //     console.log(e); 
            //     // expect(e).toBeInstanceOf(NotFoundException);  // ! nest js 내장된 예외 처리 
            //   }
        }); 
    }); 

})