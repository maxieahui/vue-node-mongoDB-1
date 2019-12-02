module.exports = app =>{
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/vue-node-mongoDB',
        { useNewUrlParser:true }
        ).then(()=>{
            console.log("connected to mongoDB")},(err)=>{
            console.log(err);
        }
    )
};
