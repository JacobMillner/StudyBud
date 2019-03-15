const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//activity entry schema
const ActivityCategorySchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    activityTypeName: {
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

// make sure the user doesn't have more than one activity type of this name
ActivityCategorySchema.index({ activityType: 1, activity: 1, user: 1 }, { unique: true });

const ActivityCategory = module.exports = mongoose.model('ActivityCategory', ActivityCategorySchema);

// crud operations
module.exports.CreateActivityCat = function (newActivityCat, callback) {
    newActivityCat.save(callback);
}

module.exports.UpdateActivityCat = function (activityCatToUpdate, newActivityCatValues, callback) {
    activityCatToUpdate.update(newActivityCatValues, callback);
}

module.exports.DeleteActivityCat = function (activityCat, callback) {
    ActivityCategory.deleteOne(activityCat, callback);
}

module.exports.GetActivityCatByActivityType = function (activityCatName, user, callback) {
    const query = { activityTypeName: activityCatName, user: user };
    ActivityCategory.findOne(query, callback);
}