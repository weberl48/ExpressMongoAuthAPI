// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
//---Middlewares, incoming requests will be passed into
app.use(morgan('combined')); //logging requests to console, debugging
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));  // parse incoming requests into JSON
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app); //create an http server that recieves requests and forwards to express app

server.listen(port) // tell http server to listen on a specific port
console.log('Server listending on: ', port);
