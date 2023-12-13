const Post = require('../models/postModels');
const Like = require('../models/likeModels');

exports.likePost = async(req, res) => {
    try{
        const {post, user} = req.body;
        const like = new Like({
            post, user
        });
        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {like: savedLike._id}}, {new: true});
        
        res.json({
            post: updatedPost,
        });
    }
    catch(err){
        return res.status(400).json({
            err: "Error while liking",
        })
    }
}

exports.unlikePost = async(req, res) => {
    try{
        const {post, like} = req.body;

        const deletedLike = await Like.findOneAndDelete({post: post, _id: like});

        const updatedPost = await Post.findByIdAndRemove(post, {$pull: {like: deletedLike._id}}, {new: true});
        
        res.json({
            post: updatedPost,
        });
    }
    catch(err){
        return res.status(400).json({
            err: "Error while unliking",
        })
    }
}