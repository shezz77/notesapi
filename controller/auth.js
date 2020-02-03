const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();

exports.getPosts = (req, res) => {
    const posts = Post.find()
    .select("_id title body")
    .then((posts) => {
        res.json({
            posts
          })
    })
    .catch(err => {
        console.log(err)
    })

};

exports.signup = async (req, res) => {
    const {displayName, password, email} = req.body;

    const userExists = await User.find({'data.email' : email});

    if(userExists && userExists.length) return res.status(403).json({
        error: 'Email is taken!'
    });

    const user = new User({
        password: password,
            data    : {
                displayName: displayName,
                photoURL   : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTO3_FfByWWkscDadKyzMKbgpNZ-6Uh37hWdM7S0_Y-eoxoYHTu',
                email      : email,
                settings   : {},
                shortcuts  : []
            }
    });
    await user.save();

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    res.cookie('token', token, {expire: new Date() + 9999});


    const {_id, role, data} = user;
    res.json({access_token: token, user: {_id, role, data}});
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({'data.email': email}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist. Please Signup.'
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password doesn't match."
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        res.cookie('token', token, {expire: new Date() + 9999});


        const {_id, name, email, role, data} = user;
        return res.json({access_token: token, user: {_id, email, name, role, data}});
    });
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    return res.json({message: 'signout successful'});
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});
