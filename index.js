const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long it can exist before it expires (30 days) 30 days, 24 hours, 60 min, 60 seconds, 1000 milliseconds
    keys: [keys.cookieKey] // encrypt our cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());
// routes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
