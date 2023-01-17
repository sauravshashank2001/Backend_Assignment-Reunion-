const User = require("../models/User");

exports.register = async(req,res)=>{
    try{
       const {name,email,password} = req.body;
       let user = await User.findOne({email});
       if(user){
        return res.status(400).json({
            success:false,
            message:"Usee already exists"
        })}

        user = await User.create({
            name,
            email,
            password,

        });
        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate(
        "posts followers following"
      );
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        name: user.name,
        no_of_following: user.following.length,
        no_of_followers: user.followers.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };



exports.followUser = async (req, res) => {
    try {
      const userToFollow = await User.findById(req.params.id);
      const loggedInUser = await User.findById(req.user._id);
  
      if (!userToFollow) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      if (loggedInUser.following.includes(userToFollow._id)) {
        res.status(200).json({
          success: true,
          message: "User is already followed",
        });
      } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
  
        await loggedInUser.save();
        await userToFollow.save();
  
        res.status(200).json({
          success: true,
          message: "User followed",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.UnfollowUser = async (req, res) => {
    try {
      const userToUnFollow = await User.findById(req.params.id);
      const loggedInUser = await User.findById(req.user._id);
  
      if (!userToUnFollow) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      if (loggedInUser.following.includes(userToUnFollow._id)) {
        const indexfollowing = loggedInUser.following.indexOf(userToUnFollow._id);
        const indexfollowers = userToUnFollow.followers.indexOf(loggedInUser._id);
  
        loggedInUser.following.splice(indexfollowing, 1);
        userToUnFollow.followers.splice(indexfollowers, 1);
  
        await loggedInUser.save();
        await userToUnFollow.save();
  
        res.status(200).json({
          success: true,
          message: "User Unfollowed",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User is not followed",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };



  exports.logout = async (req, res) => {
    try {
      res
        .status(200)
        .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
        .json({
          success: true,
          message: "Logged out",
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  