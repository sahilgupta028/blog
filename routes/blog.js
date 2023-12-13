const express = require('express');
const router = express.Router();

const {createComment} = require("../controllers/Comment");
const { createPost, savedAllPost } = require('../controllers/Post');
const { likePost, unlikePost } = require('../controllers/Like');

router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", savedAllPost);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

module.exports = router;
