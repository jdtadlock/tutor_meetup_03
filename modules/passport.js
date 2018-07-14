const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// #1
passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  (email, password, done) => {
    // console.log(email, password);
    User.findOne({ email: email }).then(user => {
      
      if (!user) {
        return done(null, false);
      }

      // if (!user.validPassword(password)) {
      //   return done(null, false);
      // }

      return done(null, user);
    }).catch(err => done(null, false));
  }
));

// #2
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Before any route is fired, this is called
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

module.exports = passport;