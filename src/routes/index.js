const { Router } = require('express');
const HTTPStatus = require('http-status');
const APIError from "../services/error";

const routes = new Router();

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const api_routes = require('./api.routes');

routes.use('/api', api_routes);

if (isDev || isTest) {

}

routes.all('*', (req, res, next) => {
    next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true));
});


export default routes;
