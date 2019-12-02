module.exports = app =>{
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const AdminUser= require('../../model/AdminUser');
    const assert = require('http-assert');
    const router = express.Router({
        mergeParams:true
    });
    // const Category = require('../../model/Category');//实例化模型导入
    const auth = require('../../middleWare/auth')



    //分类列表categories接口创建post,新增接口
    router.post('/',async (req,res)=>{
       const model = await req.Model.create(req.body);
        res.send(model)
    });
    //分类列表为更改接口
    router.put('/:id',async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body);
        res.send(model)
    });
    //分类列表删除接口
    router.delete('/:id',async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body);
        res.send({
            success:true
        })
    });
    //分类列表查询接口
    router.get('/',async (req,res)=>{
        const queryOptions ={};
        if (req.Model.modelName ==='Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items)
    });
    //分类列表id详情查询
    router.get('/:id',async (req,res)=>{
        const model = await req.Model.findById(req.params.id);
        res.send(model)
    });

    //总路由
    app.use('/admin/api/rest/:resource',
        auth(),
        async (req,res,next)=>{
        //inflection是一个大小写转换工具
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../model/${modelName}`)
        next()
    },router);

    //图片保存接口
    const  multer = require('multer');
    //这个是图片接受模块，node没有接收功能
    const upload = multer({dest:__dirname + '/../../uploads'});
    app.post('/admin/api/upload',auth(),upload.single('file'),async (req,res)=>{
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file)
    });


    //登录请求接口
    app.post('/admin/api/login',async (req,res)=>{
        const { username , password } = req.body;
        //1.找用户

        const User = await AdminUser.findOne({
            username:username
        }).select('+password');
        assert(User,422,'用户不存在');
        //assert等同于下面的if判断
     /*   if (!User){
            return res.status(422).send({message:"用户不存在!"})
        }*/

        //2.校验密码
        const isValue = require('bcryptjs').compareSync(password,User.password);
        assert(isValue,422,'密码错误');
       /* if (!isValue){
            return res.status(422).send({message: '密码错误'})
        }*/

        //3.返回token
        const token = jwt.sign({id:User._id},app.get('secret'));
        res.send({token})
    });


    //错误处理函数
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode||500).send({
            message: err.message
        })
    })


};
