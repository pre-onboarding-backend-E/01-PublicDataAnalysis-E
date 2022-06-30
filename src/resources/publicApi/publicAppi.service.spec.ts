import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PublicApiService } from './publicApi.service';

describe('PublicApiService', () => {
    let service: PublicApiService; 

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PublicApiService],
        }).compile(); 

        service = module.get<PublicApiService>(PublicApiService); 
    }); 

    it('should be defined', () => {
        expect(service).toBeDefined();
      });

    describe("강우량 정보 요청", () => {
        it("강우량 데이터 요청 성공", () => {
            // const result = service.a(); 
            // expect(result).toEqual({}); 
        }); 

        it("요청 시 입력값이 유효하지 않음", () => {
        }); 

        it("요청 시 값의 타입이 유효하지 않음", () => {

        });

        it("요청 시작 위치와 종료 위치가 유효하지 않음", () => {

        });
    }); 

    describe("하수관로 수위 현황 정보 요청", () => {
        it("하수관로 데이터 요청 성공", () => {
            // const result = service.a(); 
            // expect(result).toEqual({}); 
        }); 

        it("요청 시 입력값이 유효하지 않음", () => {
        }); 

        it("요청 시 값의 타입이 유효하지 않음", () => {

        });

        it("요청 시작 위치와 종료 위치가 유효하지 않음", () => {

        });
    })
})