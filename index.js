const config = require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const server = express();

mongoose
  .connect(config.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`Server connected to mongoDB with params: ${config.mongoURI}`)
  )
  .catch((err) => console.log('Problem with mongoDB', err));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const authRoutes = require('./routes/auth');
server.use('/v1/auth', authRoutes);

server.listen(config.port, () => console.log(`api started at ${config.port}`));
