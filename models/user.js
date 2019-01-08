const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//user schema
const UserScema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required : true
    }
});

const User = module.exports = mongoose.model('User', UserScema);

// model funcitons
module.exports.GetUserById = function(id, callback) {
    User.findById(id, callback);  
}

module.exports.GetUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);  
}

module.exports.AddUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.ComparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}