import express from 'express';

const router = express.Router();

import auth_routes from './../api/auth';

router.use('/auth', auth_routes);

export default router;
