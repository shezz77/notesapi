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
    
} 

exports.signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});

    if(userExists) return res.status(403).json({
        error: 'Email is taken!'
    })

    const user = new User(req.body);
    await user.save();

    res.json({message: 'Signup successful! Please login.'});
}

exports.signin = (req, res) => {
    const {email, password} = req.body;
    const user = User.findOne({email}, (err, user) => {
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
        
        const {_id, name, email} = user;
        return res.json({token, user: {_id, email, name}});
    });
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    return res.json({message: 'signout successful'});
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
})