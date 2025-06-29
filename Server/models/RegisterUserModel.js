const mongoose = require("mongoose");

const registerUserSchema  = new mongoose.Schema({
        name:{
            type:String, required:true, trim:true
        }, 
        age : {
            type: Number, required:true, min:18
        }, 
        email:{
            type:String, required:true, unique: true, lowercase: true
        },
        phoneNumber:{
            type:String, required:true, unique: true,
        }, 
        password:{
            type:String, required:true, minlength: 6,
        }
    }, {timestamps:true}
);

module.exports = mongoose.model("RegisteredUsers", registerUserSchema);