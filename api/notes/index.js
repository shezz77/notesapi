const router = require('express').Router();
const {all, store} = require('./notes.controller');

const {isAuthenticated} = require('./../../middlewares/auth');

router.get('/', all);
router.post('/', store);

module.exports = router;
