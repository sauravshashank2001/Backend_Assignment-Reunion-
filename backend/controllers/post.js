const Post = require("../models/Post")
const User = require('../models/User')
exports.createPost = async(req,res) => {
    try{
        const newPostData = {
            title: req.body.title,
            description: req.body.description,
            owner: req.user._id
        }
        const post = await Post.create(newPostData);
        const user = await User.findById(req.user._id);
        user.posts.push(post._id);
        await user.save();
        res.status(200).json({
            success: true,
            post

        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



exports.deletePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(400).json({
                success: false,
                message: " post no found"
            })
        }
        if(post.owner.toString()!==req.user._id.toString()){
            return res.status(400).json({
                success: false,
                message: "unauthorised req."
            })
        }

        await post.remove();
        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index,1);
        await user.save();
        res.status(200).json({
            success: true,
            message:"post deleted successfully "
        })
       


    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.getAllPost= async (req, res) => {
    try {
    const posts = await Post.find({});
  
      res.status(200).json({
        success: true,
        posts: posts.reverse(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };



  exports.getSinglePost= async (req, res) => {
    try {
    const posts = await Post.findById(req.params.id);
  
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };







exports.likePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      if (post.likes.includes(req.user._id)) {
        
        return res.status(200).json({
          success: true,
          message: "Post is already liked",
        });
      } else {
        post.likes.push(req.user._id);
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Liked",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  exports.UnlikePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      if (post.likes.includes(req.user._id)) {
        const index = post.likes.indexOf(req.user._id);
  
        post.likes.splice(index, 1);
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Unliked",
        });
      } else {
       
        return res.status(200).json({
          success: true,
          message: "Post is not Liked",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  exports.commentOnPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      let commentIndex = -1;
  
      // Checking if comment already exists
  
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          commentIndex = index;
        }
      });
  
      if (commentIndex !== -1) {
        post.comments[commentIndex].comment = req.body.comment;
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Comment Updated",
        });
      } else {
        post.comments.push({
          user: req.user._id,
          comment: req.body.comment,
        });
  
        await post.save();
        return res.status(200).json({
          success: true,
          message: "Comment added",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  



