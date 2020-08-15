const express = require('express') //express 임포트
const app = express() // 상수 app에 담아준다.
const port = 5000 // 포트를 설정해준다.
const mongoose = require('mongoose') // 몽구스 임포트
const {User} = require("./models/User") // User 객체 임포트
const bodyParser = require('body-parser') // bodyparser 임포트
const config = require('./config/key')

// 바디 파서 사용시 아래 두가지(urlencoded, json) 설정이 필요함
//application/x-www-form-urlencoded 타입을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true})); // 서버에서 분석해서 가져올 수 있게

//application/json 타입을 분석해서 가져 올 수 있게
app.use(bodyParser.json())

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=>console.log('mongoDB connect!'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world 변경이 적용되는가? ffff')) // '/', 에 res를 반환해준다.


app.post('/register',(req, res) => { //post방식으로 endpoint => /register로 요청시 콜백 함수를 실행한다.
    //회원 가입시 필요한 정보들을 클라이언트에서 가져오면
    //db에 저장해 준다.

    const user =  new User(req.body) //바디 안에 있는 내용으로 user인터페이스 생성
    user.save((err,userInfo)=>{ //save()함수를 실행하는 것만으로 db에 저장이 됨 , 저장후에 콜백 함수를 넣어줌으로 에러 정보와 성공 여부(userInfo)를 전달
        if(err) return res.json({success:false,err}) //실패시 err와 success:false를 json형식으로 클라이언트에 전달한다.
        return res.status(200).json({ //성공시(status(200)) success:true를 json형식으로 클라이언트에 전달한다.
            success:true,
            userInfo
        })
    })
})


app.listen(port, () => console.log(`Example app listening on port${port}!` ))