const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, "./public/assets/posts");
    },
    filename: function (req,file,cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage: storage});

// create a post
router.post("/", upload.single("postImg"), async (req, res) => {
    console.log(req.file);
    const newPost = new Post({
        desc: req.body.desc,
        userId: req.body.userId,
        img: req.file.path.substring(7)
    });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a post 
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can only update your own posts!");
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can only delete your own posts!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// like / dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: {likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: {likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
});

// get timeline posts

// TODO: session user id
router.get("/timeline/all", async (req, res) => {
    try {
    
      const currentUser = await User.findById("61e55762c46d838aca51aa5a");
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followers.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;