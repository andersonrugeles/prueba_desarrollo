const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const movies = new Schema({
    movie: String,
    director:String,
    category: { type: String, ref: "categories" } 
  
});

module.exports=mongoose.model('movies',movies);



