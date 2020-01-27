import routes from './index';

module.exports = function (app) {
    app.use('/', routes)
};
