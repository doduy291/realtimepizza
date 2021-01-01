const DBuser = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.getLogin = (req, res) => {
  return res.render('auth/login');
};
exports.userLogin = async (req, res, next) => {
  // (err,user,message) from return done in middleware passport.js
  passport.authenticate('local', (err, user, message) => {
    if (err) {
      req.flash('message', message.message);
      return next(err);
    }
    if (!user) {
      req.flash('message', message.message);
      return res.redirect('/auth/login');
    }
    // req.logIn just Passport
    req.logIn(user, (err) => {
      if (err) {
        req.flash('message', message.message);
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};
exports.getRegister = (req, res) => {
  return res.render('auth/register');
};
exports.userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request
  if (!username || !email || !password) {
    req.flash('message', 'No blank');
    req.flash('username', username);
    req.flash('email', email);
    return res.redirect('/auth/register');
  }

  // Check exist email or username
  const condition = {};
  if (username) {
    condition.username = username;
  }
  if (email) {
    condition.email = email;
  }
  const chkEmailExist = await DBuser.findOne(condition);
  if (chkEmailExist) {
    req.flash('message', 'Email Existed!');
    req.flash('username', username);
    req.flash('email', email);
    return res.redirect('/auth/register');
  }
  const chkUserExist = await DBuser.findOne(condition);
  if (chkUserExist) {
    req.flash('message', 'Username Existed!');
    req.flash('username', username);
    req.flash('email', email);
    return res.redirect('/auth/register');
  }

  // Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);
  //Register User
  await DBuser.create({
    username: username,
    email: email,
    password: hashedPassword,
  }).then(() => {
    res.redirect('/auth/login');
  });
};

exports.getLogout = (req, res) => {
  // req.logout() just Passport
  req.logout();
  return res.redirect('/');
};
