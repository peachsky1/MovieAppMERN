const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// https://www.npmjs.com/package/bcrypt
const saltRounds = 10;
var jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 50,
    },
    lastName: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        maxlength: 100,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

//mongoose method
userSchema.pre("save", function(next) {
    var user = this;
    console.log(user.email);
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                console.log(err);
                user.password = hash;
                // Store hash in your password DB.
                next();
            });
        });
        // encrypt using bcrypt
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken allows to create token
    var token = jwt.sign(user._id.toHexString(), "secretToken");
    // user._id + secretToken = token.
    // secretToken -> user._id
    user.token = token;
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // decode token
    jwt.verify(token, "secretToken", function(err, decoded) {
        // comparing token from db and client cookie
        user.findOne({ _id: decoded, token: token }, function(err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };