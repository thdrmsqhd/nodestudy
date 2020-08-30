const {User} = require('../models/User')

let auth = (req, res, next) =>{
    //인증처리
    //클라이언트 쿠키에서 토큰을 가져온다.
    
    let token = req.cookies.x_auth;//클라이언트의 쿠키에서 토큰을 찾는다.
    console.log(token + '  클라이언트 측 토큰')
    //토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token,(err,user)=>{//토큰을 기준으로 db에서 검색한다.
        if(err) return err;
        if(!user) return res.json({isAuth:false, err:true})
        console.log(user + "파인드 바이 토큰함수 실행결과")
        req.token = token
        // console.log(req.token + ' 리퀘스트 토큰')
        req.user = user;
        next();
    })
    //유저가 있으면 인증 성공
    //유저가 없으면 인증 실패
}

module.exports = {auth};