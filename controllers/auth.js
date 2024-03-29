const User = require('./../models/users');
const Basket = require('./../models/basket');
const passport = require('passport');
const crypto = require('crypto');
const { v4: uuid4 } = require('uuid');

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

        const newUser = await new User({
          id: uuid4(),
          username: req.body.username,
          password: hashedPassword,
          salt,
        }).save();

        await new Basket({
          id: uuid4(),
          user: newUser,
          products: [],
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
    const user = await User.findOne({ username: req.user.username });
    res.status(200).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : error,
    });
  }
};
