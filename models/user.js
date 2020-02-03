const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv1(),
    },
    role: {
        type: String,
        default: 'user'
    },
    data: Object,
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
})

userSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = uuidv1();

    this.hashed_password = this.encryptPassword(this.password);
})
.get(function () {
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex')
        } catch (err) {
            return ""
        }
    }
}


module.exports = mongoose.model("User", userSchema);