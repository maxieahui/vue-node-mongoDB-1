const express = require('express')

const app = express();

app.use(require('cors')());
app.use(express.json());
require('./plugins/db')(app);
require('./routes/admin')(app);
app.set('secret','dsadasda45451212')
app.use('/uploads',express.static(__dirname + '/uploads'));
//此方法是用/uploads的路径让所有请求uploads的都可以访问

app.listen(3000,()=>{
    console.log("http://localhost:3000")
});
