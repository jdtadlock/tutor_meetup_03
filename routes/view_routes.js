const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('index', {user: req.user && req.user.email || null});
});

// localhost:5000/auth/login
router.get('/login', (req, res, next) => {
  if ( req.user ) 
    res.redirect('/');
  else next();
}, (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;


// module.exports = (app, data) => {
//   app.get('/login', )
// }