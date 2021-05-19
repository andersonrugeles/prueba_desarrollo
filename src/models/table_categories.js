const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const categories = new Schema({
    category: String,
  
});

module.exports=mongoose.model('categories',categories);
