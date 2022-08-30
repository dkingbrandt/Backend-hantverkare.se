const jwt = require("jsonwebtoken");
const User = require('./../models/userModel');
const catchAsync = require('./../utility/catchAsync');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    const token = signToken(newUser._id);




    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: " ERROR, email or password missing",
        })
    }
    // check if user excists && password is correct
    const user = await User.findOne({ email }).select("+password") //use select to get back password to input



    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            success: false,
            error: "incorrect email or password"
        })

    }
    console.log(user);
    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        token
    })


})

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];

    }
    console.log(token);

    if (!token) {
        return res.status(401).json({ success: false, error: "you are not logged in" })
    }


    next()
});