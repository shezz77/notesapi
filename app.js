const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');


dotenv.config({path: '.env'});

const app = express();

console.log(process.env.MONGO_URI, '...');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error', (err) => {
    console.log(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});


app.set('host', process.env.IP || '0.0.0.0');
app.set('port', process.env.PORT || '8000');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require("./src/routes/routes")(app);

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
