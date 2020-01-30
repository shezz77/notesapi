const express = require('express');
const {allUsers, userById, getUser, updateUser, deleteUser} = require('../controller/users');
const {requireSignin} = require('../controller/auth');


const router = express.Router();

// router.get('/posts', authController.getPosts);
router.get('/', allUsers);
router.get('/:userId', requireSignin, getUser);
router.put('/:userId', requireSignin, updateUser);
router.delete('/:userId', requireSignin, deleteUser);

router.param("userId", userById)

module.exports = router;