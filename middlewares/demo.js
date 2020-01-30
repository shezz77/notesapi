
const SAMiddleware = (req, res, next) => {
    console.log("Middleware applied!!!!");
    next();
};

module.exports = SAMiddleware;
