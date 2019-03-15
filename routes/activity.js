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
            res.json({ success: false, msg: 'Failed to create activity: ' + err });
          } else {
            res.json({ success: true, msg: 'Activity created.' });
          }
        });
      } else {
        res.json({ success: false, msg: 'An Activity with that name already exists for this user.' });
      }
    });
  });
});

// update
//req: username, activityName, newActivityValues
router.post('/update', (req, res, next) => {
  User.GetUserByUsername(req.body.username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found.' });
    }
    Activity.GetActivityByName(req.body.name, user, (err, activity) => {
      if (err) throw err;
      if (!activity) {
        return res.json({ success: false, msg: 'Activity not found.' });
      }
      Activity.UpdateActivity(activity, req.body.newActivityValues, (err) => {
        if (err) {
          return res.json({ success: false, msg: err });
        } else {
          return res.json({ success: true, msg: 'Activity updated.' });
        }
      });
    });
  });
});

// delete
// req: username, activityName
router.post('/delete', (req, res, next) => {
  User.GetUserByUsername(req.body.username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found.' });
    }
    Activity.GetActivityByName(req.body.activityName, user, (err, activity) => {
      if (err) throw err;
      if (!activity) {
        return res.json({ success: false, msg: 'Activity not found.' });
      }
      Activity.DeleteActivity(activity, (err) => {
        if (err) {
          return res.json({ success: false, msg: err });
        } else {
          return res.json({ success: true, msg: 'Activity Deleted.' });
        }
      });
    });
  });
});

module.exports = router;