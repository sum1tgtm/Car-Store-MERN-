const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

//create a new post
router.post('/create', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const post = await newPost.save()
        res.status(200).json(post)
    } catch (err) {
        res.json(500).json(err)
    }
})

//update a post
router.put('/update/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await Post.updateOne({ $set: req.body })
            //$set update operator in MongoDB only modifies the fields specified in the expression and leaves the other fields unchanged
            res.status(200).json('Post Updated Successfully')
        } else {
            res.status(403).json('Not Authorized to Update')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//remove a post
router.delete('/delete/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await Post.deleteOne({ _id: req.params.id })
            res.status(200).json('Post Deleted Successfully')
        } else {
            res.status(403).json('Not Authorized to Delete')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


//get all posts
router.get('/all', async (req, res) => {
    try {
        const allPosts = await Post.find()
        res.status(200).json(allPosts)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get a single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get users all posts
router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all wishlisted posts
router.get('/user/wishlist/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    const postPromises = user.wishlist.map((postId) => {
      return Post.findById(postId).exec();
    });
    const posts = await Promise.all(postPromises);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//alternate method
// router.get('/user/wishlist/:id', async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const user = await User.findById(userId);
//         console.log(user.wishlist);
//         const posts = await Post.find({_id: {$in: user.wishlist}});
//         res.status(200).json(posts);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });




module.exports = router