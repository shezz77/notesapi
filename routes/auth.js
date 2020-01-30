const express = require('express');
const {userById} = require('../controller/users');
const authController = require('../controller/auth');
const {userSignupValidator} = require('../validators');


const router = express.Router();

// router.get('/posts', authController.getPosts);
router.post('/signup', userSignupValidator, authController.signup);
router.post('/signin', authController.signin);
router.get('/signout', authController.signout);

router.param("userId", userById)

module.exports = router;
