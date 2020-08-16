node 설치 후

1. root dir 에서 npm init -> pakage name: 원하는 프로젝트 명 , author : 제작자명
 ==> pakage 시작됨

2. pakage.js 에 정보가 저장됨
 ==>dependencies: 의존성 관리됨

3. index.js 파일 생성
 ===>back end의 시작점


4. npm insall express.js 설치 => 터미널에서 실행

5. express 임포트, 루트 dir 설정 res설정, port설정 ,listen(port)

6. npm run start
 ==> pakage.js -> script 에 start를 index.js로 설정 


7. moongo db 가입 및 클러스터 생성
  =>cloud ->aws선택
  => region은 가장 가까운 싱가폴 설정
  => m0샌드박스 선택
  => cluster name ->원하는대로설정
==> 5~7분 정도 뒤에 생성

유저 생성
create user 
user name =>
user password ==>기억할것

choose connection method 는
application 선택

uri  copy


8. terminal => npm install mongoose --save
--> pakage.js 에 의존성 생성됨

(실행 run start -> mongodb에서 문제 ip문제 발생시)
****mongodb상에서 ip문제 발생시 network access-> edit 현재 아이피 추가 confirm

9. user 스키마 작성
-> 모델은 스키마를 감싸는 것
-> 스키마는 데이터를 정의하는것

=> 속성(컬럼) 타입 , 트림 , 유니크 설정

10.
postman이용 post -> body에 json객체로 전달.
success: true
false ==> 이미 email이 null인 데이터가 들어가서 안될때가 있음
안되면 mogodb들어가서 데이터 (doc)지우면 작동됨

11. npm install nodemon ==>서버 재시작을 하지 않아도 되도록 함
->pakage.json에 script "backend":"nodemon index.js"추가 

설치 이후 부터는 실행시 npm run backend로 실행

12. 