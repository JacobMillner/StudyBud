const mongoose = require('mongoose');

//activity schema
const ActivitySchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
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
    checkDuplicateActivity(newActivity.name, newActivity.user, (isDuplicate) => {
        if(isDuplicate) {
            err = "An activity with that name already exists for this user.";
            callback(err, null);
        } else {
            newActivity.save(callback);
        }
    });
}

function checkDuplicateActivity (name, user, callback) {
    const query = { name: name, user: user };
    Activity.count(query, (err, count) => {
        if (err) throw err;

        if (count > 0) {
            callback(true);
        }
        else {
            callback(false);
        }
    });
}