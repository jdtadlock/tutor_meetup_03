// route.get('/is_authenticated', (req, res) => {
//   req.user = undefined
// });

const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');


// router.get('/test', (req, res) => {
//   res.send({message: 'Worked!'});
// });




router.post('/login',
  passport.authenticate('local', {
    // successRedirect: '/',
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.send({user: req.user});
  }
);

router.post('/register', (req, res) => {
  User.create(req.body).then(user => {
    req.login(user, err => {
      if (err) res.send({ message: 'Did not work....' });

      res.redirect('/');
    });
  });
});

router.get('/isauth', (req, res) => {
  res.send({ user: req.user ? req.user : 0 });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

module.exports = router;

