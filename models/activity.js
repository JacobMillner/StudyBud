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

module.exports.CreateActivity = function (newActivity, callback) {
    newActivity.save(callback);
}

module.exports.GetActivityByName = function (activityName, user, callback) {
    const query = { name: activityName, user: user };
    Activity.findOne(query, callback);
}
module.exports.IsNotDuplicateActivity = function (name, user, callback) {
    const query = { name: name, user: user };
    console.log(query);
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

module.exports.UpdateActivity = function () {

}

module.exports.DeleteActivity = function (activity, callback) {
    Activity.remove(activity, callback);
}