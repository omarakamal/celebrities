const mongoose = require('mongoose')



const celeberitySchema = new mongoose.Schema({
    name:String,
    occupation:String,
    catchPhrase:String,
    imageURL:String,
    movies:[{type: mongoose.Schema.Types.ObjectId,ref:"movies"}]
})

module.exports = mongoose.model('celebrities',celeberitySchema)