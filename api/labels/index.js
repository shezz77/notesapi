const router = require('express').Router();
const {all, store} = require('./labels.controller');

const {isAuthenticated} = require('./../../middlewares/auth');

router.get('/', all);
router.post('/', [isAuthenticated], store);

module.exports = router;
