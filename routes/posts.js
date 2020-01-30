const express = require('express');
const postController = require('../controller/posts');
const {userById} = require('../controller/users');
const validator = require('../validators');
const {requireSignin} = require('../controller/auth');


const router = express.Router();

router.get('/posts', postController.getPosts);
router.get('/posts/by/:userId', requireSignin, postController.postsByUser);
router.delete('/posts/:postId', requireSignin, postController.isPoster, postController.deletePost);
router.put('/posts/:postId', requireSignin, postController.isPoster, postController.updatePost);
router.post('/posts/create/:userId', requireSignin, postController.createPost, validator.createPostValidaor);

router.param("userId", userById)
router.param("postId", postController.postById)

module.exports = router;
