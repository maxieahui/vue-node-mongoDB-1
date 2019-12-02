//中间件：判断是否存在token
module.exports = option => {
    const jwt = require('jsonwebtoken');
    const AdminUser= require('../model/AdminUser');
    const assert = require('http-assert');
    return async (req,res,next)=>{
        //1.获取前端的请求头token值
        const token =  String(req.headers.authorization||'').split(' ').pop();
        assert(token,401,'请先登录');

        //2.校验是哪个用户，会返回id等值
        const {id} =  jwt.verify(token , req.app.get('secret'));
        assert(id,401,'请先登录');

        //3.通过id去查找用户，并赋值到req中
        req.user = await AdminUser.findById(id);
        assert(req.user,401,'请先登录');
        next()
    };
}
