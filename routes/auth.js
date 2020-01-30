const express = require('express');
const {userById} = require('../controller/users');
const authController = require('../controller/auth');
const {userSignupValidaor} = require('../validators');


const router = express.Router();

// router.get('/posts', authController.getPosts);
router.post('/signup', userSignupValidaor, authController.signup);
router.post('/signin', authController.signin);
router.get('/signout', authController.signout);

router.param("userId", userById)

module.exports = router;