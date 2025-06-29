const mongoose = require("mongoose");

const favouritesSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId, 
        required : true, 
        ref : "registerUserSchema"
    }, 
    title : {
        type : String, 
        required : true
    },
    posterPath : {
        type : String, 
        required : true
    }, 
    fav : {
        type : Boolean, 
    }
})

module.exports = mongoose.model("favouriteMovie", favouritesSchema);