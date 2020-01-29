const mongoose = require('mongoose');
let crypto = require("crypto");
// let bcrypt = require("bcryptjs");
const uuidv1 = require('uuid/v1');


const UserSchema = new mongoose.Schema({
    name: {
        typ: String,
        required: true,
        trim: true
    },
    email: {
        typ: String,
        lowercase: true,
        required: true
    },
    salt: String,
    hashedPassword: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

UserSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();

        this.hashed_password = this.encryptPassword(this.password);
    })
    .get(function () {
        return this._password
    });


UserSchema.methods ={
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
};
