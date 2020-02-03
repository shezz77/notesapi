const router = require('express').Router();
const {all, store, update, destroy} = require('./notes.controller');

const {isAuthenticated} = require('./../../middlewares/auth');

router.post('/', [isAuthenticated], store);
router.post('/:id', destroy);
router.put('/:id', update);
router.get('/', [isAuthenticated], all);

module.exports = router;
