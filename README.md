## 📌1차 개인과제

<br>

### 기능 목록

- 폼으로 URL을 입력받음
- URL 단축 후 결과 제공
- 단축 후 결과는 8자 이내로 생성
- 동일한 URL을 입력할 경우 항상 동일한 단축 결과 값이 나와야 함
- 브라우저에서 단축 URL을 입력하면 원래 URL로 리다이렉트
- 도메인은 localhost로 처리

<br>

### 구현 사항

- 사용자에게 폼으로 원본 URL을 입력받음
- 해당 데이터가 DB에 존재하는지 확인 후, 이미 저장된 URL이라면 DB에 있는 결과 값 제공
- 처음 입력된 URL이라면 DB에 원본 URL 저장
- AutoIncrement로 생성한 primary key 값을 가져와 Base62 인코딩으로 62진법으로 변환 후 결과 값 출력 및 DB 저장
- 해당 URL을 클릭 또는 브라우저에 입력하면, 단축 결과 키워드로 DB에 저장된 원본 URL을 찾아 리다이렉트

<br>

### DB 구성

<img src="/Users/jinee/Library/Application Support/typora-user-images/스크린샷 2020-12-14 오후 5.04.04.png" alt="스크린샷 2020-12-14 오후 5.04.04" style="zoom: 67%;" />

<br>

### 사용 도구

- Node.js - Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임
- Express.js - Node.ks 웹 어플리케이션 프레임워크
- ejs - Express에서 dynamic website를 만들기 위해 제공되는 템플릿 엔진
- MySQL - DataBase