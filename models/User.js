const mongoose = require('mongoose')

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
        maxlength:50
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

const User = mongoose.model('User',userSchema)//스키마를 모델로 감싸줌

module.exports = {User}//다른 파일에서도 사용가능하도록 export