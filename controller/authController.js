const { fail } = require("assert");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const User = require('./../models/userModel');
const catchAsync = require('./../utility/catchAsync');
const sendEmail = require("./../utility/email")
const crypto = require("crypto");


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statuscode,res)=>{
 const token = signToken(user._id);
    res.status(statuscode).json({
        status:"success", 
        token,
    data:{
        user
    }})
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role,
      
        
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
    

    if (!token) {
        return res.status(401).json({ success: false, error: "you are not logged in" })
    }
     //verification token
    try{const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        //check if user still exsists.
        const currentUser = await User.findById(decoded.id);
        req.user = currentUser;
    if(!currentUser){
        return res.status(401).json({
            success:false,
            message: "The user belonging to this token does no longer exsist"
        })
    }
                                       //iat =issued at
        //check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return res.status(401).json({ success:false, message: "User recently changed password! Please log in again!"})
    }


    }
    
    catch(error){
        res.status(401).json({
            success:false,
            error: error

        })
    }

    
    
    // GRANT ACCESS TO PROTECTED ROUTE
    
    next()
});

exports.restrictTo = (...roles) =>{
    return (req,res,next)=>{
        //roles ["admin","user"]. role="user"
        if(!roles.includes(req.user.role)){
            return res.status(403).json({ success: false, message: "you do not have permisson to perform this action"})
        }
        next();
    }
}

exports.forgotPassword = catchAsync(async (req,res,next)=>{
 //1) get user based on posted email

 const user = await User.findOne({email: req.body.email})
 //2 generate the random token
 if(!user){
    return res.status(404).json({ success:false, err: err})
 }
 
 const resetToken = user.createPasswordResetToken();

 await user.save({validateBeforeSave:false});
 //3 send it to user email
 const resetURL = `${req.protocol}://${req.get(
    "host"
    )}/resetPassword/${resetToken}`;

 const message = `forgot yourpassword? Submit a PATCH with your new password and passwordConfirm to : ${resetURL}.\nIf you didn't forget your password, please ignore this email!`
 
 
 
try{await sendEmail({
    email: user.email,
    subject: `Your password reset token (valid for 10 min)`,
    message

 })
 res.status(200).json({ status:"success", message: "token sent to email!"})
}


catch(err){
user.passwordResetToken = undefined
user.PasswordResetExpires = undefined
 await user.save({validateBeforeSave:false});
 return res.status(500).json({message:"There was an error sening the email!", err:err}) 
} 


})

exports.resetPassword = catchAsync(async(req,res,next)=>{

    // 1 get user based on token
    const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken, 
        PasswordResetExpires:{$gt:Date.now()}}) //$gt greater than

    //2 if token has not expired and there is a user, set the new password
  if(!user){
    return res.status(400).json({success:false, message:"token is invalid or has expired" })
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.PasswordResetExpires=undefined;
  await user.save();

     //3 update changedpassword property for the user
    //4 log the user in, send jwt
  const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        token
    })

})

exports.updatePassword = catchAsync(async(req,res,next)=>{
    //1 get user from collection

    const user = await User.findById(req.user.id).select("+password")
    //2 check if posted password is correct
    if(!(user.correctPassword(req.body.passwordCurrent, user.password))){
        res.status(401).json({success:false, message:"Your current password is wrong"})
    }
    //3 if so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    //4 log user in, send JWT
   createSendToken(user,200,res);
})