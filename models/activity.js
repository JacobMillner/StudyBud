const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//activity schema
const ActivitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, { timestamps: true });

const Activity = module.exports = mongoose.model('Activity', ActivitySchema);

// crud operations
module.exports.CreateActivity = function (newActivity, callback) {
    newActivity.save(callback);
}

module.exports.UpdateActivity = function (activityToUpdate, newActivityValues, callback) {
    activityToUpdate.update(newActivityValues, callback);
}

module.exports.DeleteActivity = function (activity, callback) {
    Activity.deleteOne(activity, callback);
}

module.exports.GetActivityByName = function (activityName, user, callback) {
    const query = { name: activityName, user: user };
    Activity.findOne(query, callback);
}

// misc
module.exports.IsNotDuplicateActivity = function (name, user, callback) {
    const query = { name: name, user: user };
    Activity.countDocuments(query, (err, count) => {
        if (err) throw err;
        if (count > 0) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
}