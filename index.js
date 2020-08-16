const express = require('express') //express 임포트
const app = express() // 상수 app에 담아준다.
const port = 5000 // 포트를 설정해준다.
const mongoose = require('mongoose') // 몽구스 임포트
const {User} = require("./models/User") // User 객체 임포트
const bodyParser = require('body-parser') // bodyparser 임포트
const config = require('./config/key')
const cookieParser = require('cookie-parser')//쿠키파서 임포트
const {auth} = require('./middleware/auth')
// 바디 파서 사용시 아래 두가지(urlencoded, json) 설정이 필요함
//application/x-www-form-urlencoded 타입을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true})); // 서버에서 분석해서 가져올 수 있게

//application/json 타입을 분석해서 가져 올 수 있게
app.use(bodyParser.json())
//쿠키파서를 사용할 수 있게 설정
app.use(cookieParser());
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=>console.log('mongoDB connect!'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world 변경이 적용되는가? ffff')) // '/', 에 res를 반환해준다.


app.post('/api/user/register',(req, res) => { //post방식으로 endpoint => /register로 요청시 콜백 함수를 실행한다.
    //회원 가입시 필요한 정보들을 클라이언트에서 가져오면
    //db에 저장해 준다.

    const user =  new User(req.body) //바디 안에 있는 내용으로 user인스턴스 생성
    user.save((err,userInfo)=>{ //save()함수를 실행하는 것만으로 db에 저장이 됨 , 저장후에 콜백 함수를 넣어줌으로 에러 정보와 성공 여부(userInfo)를 전달
        if(err) return res.json({success:false,err}) //실패시 err와 success:false를 json형식으로 클라이언트에 전달한다.
        return res.status(200).json({ //성공시(status(200)) success:true를 json형식으로 클라이언트에 전달한다.
            success:true,
            userInfo
        })
    })
})


app.post('/api/user/login', (req, res) => {
    //req body email 과 일치하는 객체를 찾은후 req body password 와 데이터 베이스 password를 비교한다.
     //요청된 이메일을 데이터베이스에서 찾는다.
    User.findOne({"email":req.body.email},(err,user)=>{
        if(!user){//user값이 없다면
            res.json({//json형태로 반환한다.
                loginSuccess: false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        // user값이 있다면 비밀번호를 비교한다.
        // 요청된 이메일과 비밀번호를 맞는 비밀번호인지 확인
        // req.body.password는 유저가 입력한 값
         user.comparePassword(req.body.password, (err,isMatch)=>{//유저가 입력한 값을 가지고 comparePassword함수를 실행한다.
            if(!isMatch)//여기 이상함 isMatch값은 boolean이와야하는데 왜 널이 아닌지를 비교하는지 이상
                return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다."})
    
            user.generateToken((err,user) =>{
                if(err) return res.status(400).send(err);

                //토큰을 저장한다. 쿠키 또는 로컬 스토리지에
                res.cookie("x_auth",user.token).status(200).json(//x_auth라는 이름으로 user token저장
                    {loginSuccess:true,userId: user._id})
                
            })    
        })
        
    })
})

app.get('/api/user/', auth,(req,res)=>{//엔드포인트로 요청하면 auth미들웨어를 거쳐 req,res를 처리한다.
    //함수에 진입했다면 auth미들웨어 인증을 통과 함을 의미함
    res.status(200).json({//성공적으로 미들웨어를 통과했다면 json타입으로 전달하고 싶은 정보를 실어준다
        _id: req.user._id,
        isAdmin: req.user.role === 0? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})
   

app.listen(port, () => console.log(`Example app listening on port${port}!` ))