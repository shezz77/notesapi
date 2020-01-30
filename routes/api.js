const express = require('express');

const router = express.Router();

const postRoutes = require('./posts');
const authRoutes = require('./auth');
const userRoutes = require('./users');

router.use('/', authRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
