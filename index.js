const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const {User} = require('./models/User')
const bodypaser = require('body-parser')


app.use(bodypaser.urlencoded({extended: true}))

app.use(bodypaser.json());

mongoose.connect('mongodb+srv://song:song@boilerplate.smms3.mongodb.net/boilerplate?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log("moongoDB connect!"))
.catch(err=>console.log(err))


app.get('/',(req,res) => res.send('Hello world'))

app.post('/register',(req,res) => {

 //회원가입시 필요한 정보들을 클라이언트에서 가져오면 
 //그것들을 데이터 베이스에 삽입한다.

    const user = new User(req.body)

    user.save((err,userInfo)=>{//db에 저장된다.
        if(err) return res.json({success:false,err})
        

        return res.status(200).json({
            success:true
        })
    })
})



app.listen(port,()=>console.log(`Example app listening on port ${port}`))