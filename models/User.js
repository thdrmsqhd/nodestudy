const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // 암호화 모듈을 임포트
const saltRounds = 10 // 암호화 하기 위한 솔트 생성 (10자리인 솔트를 생성)
const jwt = require('jsonwebtoken') // 제이슨웹토큰 임포트

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim: true,
        maxlength:50,
        unique: 1
    },
    password:{
        type:String,
        maxlength:70
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image: String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})


userSchema.pre('save',function(next){ // save함수를 실행하기 전에 함수를 실행한다.
    user = this;//userSchema의 인스턴스 를 user에 대입한다.

    if(user.isModified('password')){ //비밀번호가 변경될 때만 아래의 코드를 작동시키다.
        
        //비밀 번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds,function(err, salt){ // 솔트라운드를 이용하여 솔트 생성한다.
            if(err) return next(err) //에러 함수로 바로 들어간다.
            bcrypt.hash(user.password,salt , function(err, hash){//hash는 변경된 비밀번호이다.
                if(err) return next(err)//에러가 발생하면 에러함수로 바로 들어간다.
                user.password = hash//암호회된 비밀번호로 기존 비밀번호를 대치한다.
                next()
            })
        })
    }else{
        next()
    }
   
})//usermodel을 저장하기 전에

//비밀번호 비교를 위한 함수를 제작한다. 
//유저 스키마 객체에 method 안에 comparePassword 라는 메소드를 생성한다.
//index에서 함수를호출하는 이름과 일치 시켜준다. 에러 발생 방지를 위하여 복사 권장
userSchema.methods.comparePassword= function(plainPassword, cb){//cb는 (err,isMatch)이다.
    //plainPassword 유저가 입력한 password
    //유저가 입력한password를 암호화 하여 암호화되어있는 비밀번호와 비교한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){//bcrypt의 compare함수를 이용하여 user가 입력한 password와 비교한 후 결과를 isMatch(boolean)에 담아준다.
        if(err) return cb(err); //err은 err정보를 담고있다
        cb(null,isMatch)//isMatch == 'true'or false
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    // jsonwebtoken을 이용하여 토큰을 생성
    console.log(user + ' 요청 객체의 정보')
    console.log(user._id + ' 요청 객체의 아이디값')
    var token = jwt.sign({_id:user._id}, 'secriteToken')//json웹토큰의 sign함수를 이용

    // user._id + 'secriteToken' = token
    user.token = token
    console.log('유저 토큰 정보 '+user.token)

    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}


userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰 생성시 user._id + secrtieToken
    //토큰을 디코드 한다.

    jwt.verify(token,'secriteToken',function(err,decoded){//verify함수를 이용(전달된 매개변수, 토큰생성할때 쓴 문자열 이용)하면 콜백함수로 디코드 된 값이 전달된다.
        //decoded == user._id
        //user._id를 이용하여 유저를 찾은 후
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 비교

        user.findOne({"_id":decoded,"token":token},function (err,user){
            if (err) return cb(err);
            cb(null,user)
        })
    })
}
const User = mongoose.model('User',userSchema)//user스키마를 User라는 이름의 모델로 감싸줌

module.exports = {User}//다른 파일에서도 사용가능하도록 export