const express = require('express');

const router = express.Router();

const postRoutes = require('./posts');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const noteRoutes = require('./../api/notes');
const labelRoutes = require('./../api/labels');

router.use('/', authRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/labels', labelRoutes);

module.exports = router;
