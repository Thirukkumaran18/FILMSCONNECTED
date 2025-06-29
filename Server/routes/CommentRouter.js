const express = require('express');
const router = express.Router();

const {getAllComments, addComment} = require('../controllers/CommentsController');

router.get("/:movieName", getAllComments);
router.post("/:movieName", addComment);

module.exports = router ;