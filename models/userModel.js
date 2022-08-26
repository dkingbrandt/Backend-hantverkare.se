const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


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
        required: [true, "Please confirm ur password"],
        validate:{
             // only works on create and save
            validator: function(element){    
                return element === this.password;
            },
            message:"Passwords are not the same"
        }
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();
   
    this.password = await bcrypt.hash(this.password,12);

    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;