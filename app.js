const createError = require('http-errors');
const express = require('express');
const path = require('path');

const app = express();

require("./src/routes/routes")(app);
