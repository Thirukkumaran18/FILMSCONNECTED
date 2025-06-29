const commentModel  = require('../models/CommentsModel');

const getAllComments = async(req, res) => {
    try{

        const {movieName} = req.params ; 
        const allComments = await commentModel.find({movieName}).populate('userId', 'name'); ;

        console.log("from db : ", allComments);
        res.status(201).json(allComments);

    }catch(e){
        console.log("comment controler -> getallcomment -> ", e.message);
    }
}

const addComment = async(req, res) => {
    
    const { movieName, userId, comment } = req.body;

    if(!movieName || !userId || !comment){
        return res.status(400).json({message : 'Required field missing'});
    }
    
    try{
        const newComment = new commentModel({ movieName, userId, comment });
        await newComment.save();

        res.status(201).json({message : 'Comment added'});
    }catch(e){
        console.log('add comment error : ', e.message);
    }
    
}

module.exports = {getAllComments, addComment};