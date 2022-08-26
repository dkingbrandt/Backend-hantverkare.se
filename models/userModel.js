const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Please tell us ur name!"],
    },

    email:{
        type: String,
        required: [true, "Please provide ur email"],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, "please provide a valid email" ]

    },

    password:{
        type: String,
        required:[true, "Please provide a password" ],
        minlength:8,   
    },

    passwordConfirm:{
        type: String,
        required: [true, "Please confirm ur password"]
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;