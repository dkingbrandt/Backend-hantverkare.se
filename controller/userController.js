const User = require("./../models/userModel")
const catchAsync = require("./../utility/catchAsync")

exports.getAllUsers = catchAsync(async (req,res, next)=>{
     const users = await User.find()

    //SEND RES
    res.status(200).json({
        status:"Success",
        results:users.length,

        data:{
            users
        }
    })
 })
 exports.getUser =(req,res)=>{
    res.status(500).json({
        status:"error",
        message: "This route is not yet defined!"
    })
 }
 exports.createUser =(req,res)=>{
    res.status(500).json({
        status:"error",
        message: "This route is not yet defined!"
    })
 }
 exports.updateUser =(req,res)=>{
    res.status(500).json({
        status:"error",
        message: "This route is not yet defined!"
    })
 }
 exports.deleteUser = async(req,res)=>{
    await User.findByIdAndDelete({id:req.params.userId}, (err, user)=>{
        if(err){
            return res.status(400).json({ success: false, error: err});
        }

        if(!user){
            return res.status(404).json({ success: false, error: "User not found"});
        }

        return res.status(200).json({success: true, data: user});
    })
    .clone()
    .catch((err)=> console.log(err));
 }