const express = require('express');
const router = express.Router();

const Activity = require('../models/activity');
const User = require('../models/user');

// create
router.post('/create', (req, res, next) => {

  User.GetUserByUsername(req.body.user, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found.' });
    }

    let newActivity = new Activity({
      name: req.body.name,
      user: user
    });

    Activity.IsNotDuplicateActivity(newActivity.name, newActivity.user, (isNotDupe) => {
      if (isNotDupe) {
        Activity.CreateActivity(newActivity, (err, activity) => {
          if (err) {
            res.json({ success: false, msg: 'Failed to create activity.' });
          } else {
            res.json({ success: true, msg: 'Activity created.' });
          }
          console.log(res.json.body);
        });
      } else {
        res.json({ success: false, msg: 'An Activity with that name already exists for this user.' });
      }
    });
  });
});

module.exports = router;