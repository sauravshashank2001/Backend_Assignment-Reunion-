const { createPost, likePost, deletePost, getSinglePost, commentOnPost, getAllPost, UnlikePost } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/all_posts",getAllPost);
router.delete("/posts/:id",isAuthenticated,deletePost)
router.post("/posts",isAuthenticated,createPost);
router.get("/like/:id",isAuthenticated,likePost);
router.get("/unlike/:id",isAuthenticated,UnlikePost)

router.get("/posts/:id",isAuthenticated,getSinglePost);
router.post("/comment/:id",isAuthenticated,commentOnPost)

module.exports = router;