const mongoose = require("mongoose");

require("dotenv").config();

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected");
    }catch(e){
        console.log(e.message);
        process.exit(1);
    }
}

module.exports = connectDb ;