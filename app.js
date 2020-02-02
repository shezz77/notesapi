const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const {unAuthorized} = require('./middlewares/auth');

dotenv.config();

//database
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error ${err.message}`);
});

// bring in routes
const apiRoutes = require('./routes/api');

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/api",  apiRoutes);
app.use(unAuthorized);

const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`A Node JS API is listening on port: ${port}`)});
