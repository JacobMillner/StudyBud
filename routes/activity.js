const express = require('express');
const router = express.Router();

const Activity = require('../models/activity');
// create
router.post('/create', (req, res, next) => {

  let newActivity = new Activity({
    name: req.body.name,
    user: req.body.user,
  });

  Activity.CreateActivity(newActivity, (err, activity) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to create activity.' });
    } else {
      res.json({ success: true, msg: 'Activity created.' });
    }
    console.log(res.json.body);
  });
});