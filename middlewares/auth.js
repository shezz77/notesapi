const jwt = require('jsonwebtoken');
const User = require('./../models/user');

function isAuthenticated(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send({ message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(401).send({ message: "Failed to authenticate token." });
        }
        User.findOne({ _id: decoded._id }, (err, user) => {
            if (err) {
                return res.status(500).send("Problem retrieving User from Database!");
            }
            if (!user) {
                return res.status(404).send("User Not Found");
            } else {
                req.user = user;
                next();
            }
        })
    });
}

function unAuthorized (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({error: 'Unauthorized!'});
    }
    next();
}

module.exports = {
    isAuthenticated,
    unAuthorized
};
