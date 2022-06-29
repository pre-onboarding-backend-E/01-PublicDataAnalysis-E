# 랩큐 ✨
- 과제 수행 일자 : 2022 / 06 / 29 ~ 
- Framework : Nest js (v 8.2.3)
- Language : Node js (v17.9.1)
- volta 로 고정 세팅 (pin) 한 값 package.json에서 확인 가능합니다.

### 프로젝트 실행
    - git clone 'https://github.com/pre-onboarding-backend-E/01-PublicDataAnalysis-E.git'
    - cd 01-PublicDataAnalysis-E
    - yarn install
    - yarn start:dev

### swagger 문서 (api 명세화)
- localhost:8081/apiDoc (포트 번호는 env/development.env 의 SERVER_PORT) 에서 확인 가능합니다.

### 요구사항 분석 및 구현 과정 ✨

0. 

## ETC
- Request 와 Response는 명확히 구분되도록 작성하였습니다.
1. status Code : 200 / 201 에 해당하는 경우, 그 결과 값만 response로 보여집니다. 삭제의 경우 status code만 보여집니다.
2. error의 경우 어떤 error에 해당하는지 message도 함께 response로 확인 가능합니다.
3. error-type 등은 enum 처리하였습니다.
모두 http > dto > XXXX.dto 파일 형식으로 모듈화했습니다.

## commit convention
- ADD : 기능 신규 개발
- MODIFY : 기존 기능 수정
- REFACTOR : 기존 기능 개선
- FIX : 버그 픽스
- REMOVE : 불필요한 로직 제거
- COMMENT : 코드 리뷰 반영 결과
