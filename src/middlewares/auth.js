const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'];

    if (!token)
        return res.status(401).send({message: 'No token provided'});

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err)
            return res.status(401).send({message: 'Failed to authenticate token'});

        
    })
}
