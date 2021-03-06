const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name:{type:String},
    parent:{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}
    //type不可以是id，而是绑定数据可里面的id，ref是模型，也就是他本身Category
});
module.exports = mongoose.model('Category',schema);
