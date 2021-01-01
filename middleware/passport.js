const LocalStrategy = require('passport-local').Strategy;
const DBuser = require('../models/user');
const bcrypt = require('bcrypt');

const init = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Login
      // Check if email exists
      const user = await DBuser.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Email no exists' });
      }
      console.log(user);
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            return done(null, user, { message: 'Logged' });
          }
          return done(null, false, { message: 'Wrong password' });
        })
        .catch((err) => {
          return done(null, false, { message: 'Something wrong' });
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    DBuser.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

const userLogged = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};
module.exports = { init, userLogged };
