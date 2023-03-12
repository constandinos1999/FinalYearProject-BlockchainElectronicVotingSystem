const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const User = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email is required"],
        unique: [true, "Already existing Email"],
    },
    walletAddress: {
        type: String,
        lowercase: true,
        required: [true, "Wallet is required"],
        unique: [true, "Already existing wallet"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    verifyCode: String
}, { timestamps: true });

User.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// User.pre("findOne", function(next) {
//     if (this._conditions.password) {
//         this._conditions.password = bcrypt.hashSync(this._conditions.password, 10);
//     }
//     console.log(this._conditions);
//     next();
// });


module.exports = model("User", User);