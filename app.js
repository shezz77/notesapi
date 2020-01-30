const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error ${err.message}`);
})

// bring in routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const SAMiddleware = (req, res, next) => {
    console.log("Middleware applied!!!!");
    next();
}

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(SAMiddleware)

app.use("/",  postRoutes);
app.use("/",  authRoutes);
app.use("/users",  userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({error: 'Unauthorized!'});
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`A Node JS API is listening on port: ${port}`)});