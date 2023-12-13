const Post = require("../models/postModels");

exports.createPost = async(req, res) => {
    try{
        const {title, body} = req.body;
        const post = new Post({
            title, body
        });
        const savedPost = await post.save();

        res.json({
            post: savedPost,
        })
    }
    catch(error){
        return res.status(400).json({
            err: "Error while creating post",
        })
    }
}

exports.savedAllPost = async(req, res) => {
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec();

        res.json({
            posts,
        })
    }
    catch(error){
        return res.status(400).json({
            err: "Error while fetching post",
        })
    }
}