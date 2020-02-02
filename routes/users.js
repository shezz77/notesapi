const express = require('express');
const isAuthenticated = require("../middlewares/auth").isAuthenticated;
const {allUsers, userById, getUser, updateUser, deleteUser, profile} = require('../controller/users');
const {requireSignin} = require('../controller/auth');


const router = express.Router();

// router.get('/posts', authController.getPosts);
router.get('/', allUsers);
router.get('/:userId', requireSignin, getUser);
router.put('/:userId', requireSignin, updateUser);
router.delete('/:userId', requireSignin, deleteUser);
router.delete('/profile', [isAuthenticated], profile);

router.param("userId", userById);

module.exports = router;