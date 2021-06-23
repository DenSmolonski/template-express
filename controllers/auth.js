const User = require('./../models/users');
const passport = require('passport');
const crypto = require('crypto');

module.exports.register = async function (req, res) {
  const user = await User.findOne({ username: req.body.username });
  try {
    if (user) {
      res.status(409).json({
        message: 'USER ALREDY REGISTRED, TRY REGISTER WITH ANOTHER USERNAME',
      });
      return;
    }
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      10000,
      32,
      'sha256',
      async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }

        await new User({
          username: req.body.username,
          password: hashedPassword,
          salt,
        }).save();
        res.status(201).send();
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error,
    });
  }
};

module.exports.login = async function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.status(404).json({
        message: 'User don not exist',
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).send();
    });
  })(req, res, next);
};

module.exports.logout = async function (req, res, next) {
  req.logout();
  res.status(200).send();
};

module.exports.user = async function (req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error,
    });
  }
};
