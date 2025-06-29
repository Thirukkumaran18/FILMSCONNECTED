const express = require("express");
const router = express.Router()

const { addFavourite, getFavourites, deleteFavourite } = require("../controllers/FavouritesController");

router.post("/add", addFavourite);
router.get("/:userId", getFavourites);
router.delete("/delete", deleteFavourite);

module.exports = router;