const mongoose = require("mongoose");

const commentModel = new mongoose.Schema({
    movieName : {
        type : String, 
        required : true ,
    }, 
    userId : {
        type : mongoose.Schema.ObjectId,
        ref: "RegisteredUsers",
        required : true, 
    }, 
    comment : {
        type : String, 
        required : true, 
    },
    createAt : {
        type : Date,
        default : Date.now(),
    }

})

module.exports = mongoose.model("comments", commentModel);