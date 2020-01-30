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
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error ${err.message}`);
});

// bring in routes
const apiRoutes = require('./routes/api');

const demo = require('./middlewares/demo');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(demo);

app.use("/api",  apiRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({error: 'Unauthorized!'});
    }
    next();
});

const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`A Node JS API is listening on port: ${port}`)});
