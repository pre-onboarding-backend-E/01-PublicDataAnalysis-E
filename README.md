# 1주차 랩큐 - open api를 활용한 공공 데이터 분석 ✨
- 과제 수행 일자 : 2022 / 06 / 29 ~ 
- Framework : Nest js (v 8.2.3)
- Language : Node js (v17.9.1)
- volta 로 고정 세팅 (pin) 한 값 package.json에서 확인 가능합니다.

### 프로젝트 실행
    - git clone 'https://github.com/pre-onboarding-backend-E/01-PublicDataAnalysis-E.git'
    - cd 01-PublicDataAnalysis-E
    - yarn install
    - yarn start:dev
    ## docker 실행 시
    - docker compose build
    - docker compose up

### ENV
- localhost:8081/apiDoc (포트 번호는 env/development.env 의 SERVER_PORT) 에서 swagger 문서를 확인 가능합니다.  (api 명세화 목적)
- open api를 활용하기 위해서는 인증키가 필요하고, 이 정보는 env/.env로 관리하고 있습니다.

### 요구사항 분석 및 구현 과정 ✨
0. 서울시의 하수관로 수위 현황*(A) 과 강우량 정보 현황*(B)을 open api를 활용하여 가져오고 이를 각 구 별로 구분하여 볼 수 있도록  REST API를 설계합니다.
1. *A와 *B를 호출하는 api를 구현합니다.
2. *A와 *B의 공통 key 인 '구 이름' 을 구분코드로 처리 후 (type화) 이를 기준으로 데이터를 가져오도록 설계합니다.
3.  *A와 *B의 response 데이터를 구 별 / 구분 코드 별로 Join 하여 가져옵니다.
4. 테스트 케이스를 작성하여 테스트를 거칩니다.


### REQUEST
- open api 특성 상 한 번에 최대 1000개의 row를 호출할 수 있고 데이터의 무결성을 유지하기 위해 최대한 많은 데이터를 가져오는 방향을 고려하였습니다. 

### RESPONSE
- 하수간 수위 데이터 를 1시간 단위로 합치고, 이에 강수량 데이터 또한 1시간 단위로 합쳐서 각각의 평균값으로 값을 내려 보냅니다. 이는 raw 데이터를 최대한 보존하기 위함입니다.
- 현재 호출 시점 기준으로 가장 최신의 data 가 각 1000 row씩 호출되며 이는 약 1시간 (00분~59분) 까지의 평균 값을 의미합니다.
- 관측소가 많은 경우, 데이터 호출 가능 개수(1000 row)의 제한으로 인해 1시간의 평균치를 내기엔 어려운 경우도 필연적으로 발생합니다. 이를 고려하며 가장 최신의 데이터를, 최대한 많이 호출하여, 정확한 평균치를 낼 수 있도록 하였습니다.

### 배포
()

## ETC
1. status Code : 200 / 201 에 해당하는 경우, 해당 data와 status code만 response로 보여집니다. 
2. error의 경우 어떤 error에 해당하는지 message도 함께 response로 확인 가능합니다.
3. api 호출 시 필요한 값들의 경우 interface화 하였습니다.
4. 서울시 구 값들은 type으로 관리합니다. ex) GANGNAM : 1 

## commit convention
[Main]
- ADD / 기능 신규 개발 
- MODIFY / 기존 기능 수정
- REFACTOR / 기존 기능 개선
- FIX / 버그 픽스
- REMOVE / 불필요한 로직 제거
- COMMENT / 코드 리뷰 반영 결과
[Sub]
- git issue card - task를 기반으로 상세 커밋 내용을 한 줄 내외로 작성