const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//activity entry schema
const ActivityCategorySchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    activityType: {
        type: String,
        required: true
    },
    activity: {
        type: Schema.Types.ObjectId, ref: 'Activity',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, { timestamps: true });

const Subject = module.exports = mongoose.model('ActivityCategory', ActivityCategorySchema);