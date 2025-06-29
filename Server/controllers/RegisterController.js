const RegisterUserModel = require("../models/RegisterUserModel");

const loginUser = async(req, res) => {
    try{
        const {name, password} = req.body;

        const user = await RegisterUserModel.findOne({name});

        if(!user) return res.status(404).json({msg : 'User not found'});    

        if(user.password !== password) return res.status(404).json({msg : "Password incorrect"});
        
        res.status(200).json({
            msg: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    }catch(e){
        console.log(e.message);
    }
}

const registerUser = async(req, res) => {
    try{

        const {name, age, email, phoneNumber, password} = req.body;

        const newUser = new RegisterUserModel({name, age, email, phoneNumber, password});
        await newUser.save();

        res.send(201).json({ message : "User registered successfully" });

    }catch(e){
        res.send(400).json({message:e.message});
    }
    return res.status(201).json({ message: "User registered successfully!" });
}

module.exports = {registerUser, loginUser} ;