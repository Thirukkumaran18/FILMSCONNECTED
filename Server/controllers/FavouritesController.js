const Favourite = require("../models/FavouritesModel")

const addFavourite = async(req, res) => {
    
    try{
        const {userId, title, posterPath, fav} = req.body;

         const existing = await Favourite.findOne({ userId, title });

        if (existing) {
            return res.status(409).json({ message: "Movie already in favourites" });
        }

        const newFavouriteMovie = new Favourite({userId, title, posterPath, fav});
        await newFavouriteMovie.save();

        res.status(201).json({message: "Favourite movie added successfully"});
    }catch(e){
        console.log("fav cntlr ", e.message);
    }
    
}

const deleteFavourite = async(req, res) => {

    try{
        const {userId, title} = req.body;
        const deleted = await Favourite.findOneAndDelete({userId, title});

        if(!deleted){
            return res.status(404).json({message:"Movie not in favourites"})
        }
        return res.status(200).json({ message: "Movie removed from favourites" });
    }catch(e){
        console.log("delte at be error : ", e.message);
    }
    
}

const getFavourites = async(req, res) => {

    try{
        const {userId} = req.params
        const favMovies = await Favourite.find({userId});

        res.status(201).json(favMovies);
    }catch(e){
        console.log("fav contlr ", e.message);
        res.status(500).json({ message: "Server error while processing favourites" });
    }
}

module.exports = {addFavourite, getFavourites, deleteFavourite};