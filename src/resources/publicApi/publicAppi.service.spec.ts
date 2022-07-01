import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorType } from 'src/error/errorType.enum';
import { ErrorResponse } from 'src/http/dto';
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
            try{
                await service.getWaterLevelAndRainfall("gangnaaaam");
              } catch(e) {
                expect(e).toBeInstanceOf(ErrorResponse); 
                expect(e.statusCode).toEqual(400); 
              }
        }); 

        it("요청 시 입력값이 없음", async() => {
            try{
                await service.getWaterLevelAndRainfall("");
              } catch(e) {
                expect(e).toBeInstanceOf(ErrorResponse); 
                expect(e.statusCode).toEqual(400); 
              }
        }); 
    }); 
})