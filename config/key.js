if(process.env.NODE_ENV==='production'){//process.env.NODE_ENV는 시스템 환경변수 배포판이라면 'prodection' 개발 버전이라면 'devlop'으로 나타남 상황에 맞게 비밀키를 불러오기위한 설정
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
}