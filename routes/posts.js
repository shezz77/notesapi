const express = require('express');
const postController = require('../controller/posts');
const {userById} = require('../controller/users');
const validator = require('../validators');
const {isAuthenticated} = require('./../middlewares/auth');


const router = express.Router();

router.get('/', postController.getPosts);
router.get('/by', [isAuthenticated], postController.postsByUser);
router.delete('/:postId', [isAuthenticated], postController.isPoster, postController.deletePost);
router.put('/:postId', [isAuthenticated], postController.isPoster, postController.updatePost);
router.post('/create/:userId', [isAuthenticated], postController.createPost, validator.createPostValidaor);

router.param("userId", userById);
router.param("postId", postController.postById);

module.exports = router;
