const config = require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local');
var crypto = require('crypto');
const User = require('./models/users');

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

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(expressSession);

server.use(passport.initialize());
server.use(passport.session());

passport.use(
  new Strategy(function (username, password, cb) {
    User.findOne({ username }, (err, row) => {
      console.log(row);
      if (err) {
        return cb(err);
      }
      if (!row) {
        return cb(null, false);
      }

      crypto.pbkdf2(
        password,
        row.salt,
        10000,
        32,
        'sha256',
        function (err, hashedPassword) {
          if (err) {
            return cb(err);
          }
          if (!crypto.timingSafeEqual(row.password, hashedPassword)) {
            return cb(null, false);
          }
          return cb(null, row);
        }
      );
    });
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const authRoutes = require('./routes/auth');
server.use('/v1/auth', authRoutes);

server.listen(config.port, () => console.log(`api started at ${config.port}`));
