const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title:{type:String},
    //type不可以是id，而是绑定数据可里面的id，ref是模型，绑定的模型是Category
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String}
});
module.exports = mongoose.model('Article',schema);
