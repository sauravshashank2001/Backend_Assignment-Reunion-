const { getAllPost } = require("../controllers/post");
const { register, login, followUser, logout, UnfollowUser, getUserProfile } = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/register",register);
router.post("/authenticate",login);
router.get("/user",isAuthenticated,getUserProfile);
router.get("/follow/:id",isAuthenticated,followUser);
router.get("/unfollow/:id",isAuthenticated,UnfollowUser);

router.get("/logout",isAuthenticated,logout)
module.exports = router;