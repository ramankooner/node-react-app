const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id
      }).then((existingUser) => {
        if (existingUser) {
          // already have a record w given ID
          done(null, existingUser);
        } else {
          // do not have a record w this ID. make new record
          new User({
            googleId: profile.id
          }).save().then(user => done(null, user));
        }
      });
    }
  )
);
