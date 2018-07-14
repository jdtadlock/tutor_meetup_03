const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./modules/passport');
const path = require('path');
const config = require('./config');
const view_routes = require('./routes/view_routes');
const auth_routes = require('./routes/auth_routes');
const port = process.env.PORT || 5000;


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meetup_03', { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();

app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/main' });

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: true
  // cookie: { maxAge: 6000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(auth_routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
// app.use(view_routes);

app.listen(port, () => console.log(`Listening on port ${port}`));