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

const Subject = module.exports = mongoose.model('Activity', ActivitySchema);