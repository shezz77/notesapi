const router = require('express').Router();
const {all, store, update, destroy} = require('./notes.controller');

const {isAuthenticated} = require('./../../middlewares/auth');

router.post('/', store);
router.post('/:id', destroy);
router.put('/:id', update);
router.get('/', all);

module.exports = router;
