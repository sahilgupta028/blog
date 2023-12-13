const Post = require('../models/postModels');
const Comment = require('../models/commentModels');

exports.createComment = async(req, res) => {
    try{
        const {post, user, body} = req.body;
        const comment = new Comment({
            post, user, body
        });
        const savedComment = await comment.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true})
                            .populate("comments")
                            .exec();
        
        res.json({
            post: updatedPost,
        })
    }
    catch(err){
        return res.status(500).json({
            err: "Error while creating comment",
        })
    }
}