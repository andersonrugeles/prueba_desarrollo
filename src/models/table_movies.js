const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const movies = new Schema({
    movie: String,
    director:String,
    category: [{ type: Schema.ObjectId, ref: "categories" } ]
  
});

module.exports=mongoose.model('movies',movies);



