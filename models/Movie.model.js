const { Schema, model } = require("mongoose");

const movieSchema = new Schema({

    title:String,
    genre:String,
    plot:String,
    //this says that my field is a type of objectID
    //ref: needs to match the model name in the celebrities js file
    cast:[{type: Schema.Types.ObjectId,ref:"celebrities"}]
})

module.exports = model('movies',movieSchema)