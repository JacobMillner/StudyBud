const express = require('express');
const router = express.Router();

const Activity = require('../models/activity');
const ActivityCategory = require('../models/activityCategory');
const User = require('../models/user');

// create
//req: 
router.post('/create', (req, res, next) => {

});

// update
//req: username, activityName, newActivityValues
router.post('/update', (req, res, next) => {

});

// delete
// req: username, activityName
router.post('/delete', (req, res, next) => {

});

module.exports = router;
