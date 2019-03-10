const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//subject schema
const ActivityEntrySchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    activity: {
        type: Schema.Types.ObjectId, ref: 'Activity',
        required: true
    },
    activityCategory: {
        type: Schema.Types.ObjectId, ref: 'ActivityCategory',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    dateTimeStarted: {
        type: String,
        required: true
    },
    dateTimeEnded: {
        type: String
    },
    totalTime: {
        type: Number
    }
});

const Subject = module.exports = mongoose.model('ActivityEntry', ActivityEntrySchema);