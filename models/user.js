// app/models/user.js

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
        firstName: String,
        lastName: String,
        logins: {
            local: {
                email: String,
                password: String,
            },
            facebook: {
                id: String,
                token: String,
                email: String,
                name: String
            },
            google: {
                id: String,
                token: String,
                email: String,
                name: String
            }
        }
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
