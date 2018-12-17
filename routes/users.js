var express = require('express');
var router = express.Router();

// register
router.get('/register', (req, res, next) => {
  res.send('REGISTER');
});

// auth
router.get('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE');
});

// profile
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});

// validate
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE');
});



module.exports = router;
