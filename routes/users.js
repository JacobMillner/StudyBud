const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
// register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.AddUser(newUser, (err, user) => {
    if(err){
      res.json({ succsess: false, msg: 'Failed to register user.'});
    } else {
      res.json({ succsess: true, msg: 'User registered.'});
    }
  });
});

// auth
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.GetUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ succsess: false, msg: 'User not found.'});
    }

    //check the request password vs the password stored in the db
    User.ComparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: 604800 //expires in 1 week
        });

        res.json({
          succsess: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ succsess: false, msg: 'Username and password do not match.'});
      }
    });
  });
});

// profile
router.get('/profile', passport.authenticate('jwt', {session: false}) , (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
