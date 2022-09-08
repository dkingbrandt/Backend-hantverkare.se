const User = require("./../models/userModel")
const catchAsync = require("./../utility/catchAsync")

const filterObj = (obj, ...allowedFields)=>{
    const newObj ={}
    Object.keys(obj).forEach(el =>{
        if(allowedFields.includes(el)) newObj[el]= obj[el];
    })
    return newObj;
}

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

exports.updateMe = catchAsync(async(req,res,next)=>{
    // 1 create error if user POST password data
    if(req.body.password || req.body.passwordConfirm){
        return res.status(400).json({success: false ,message: "This route is not for password upades, please use /updateMyPassword"})
    }

   // 2 filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email"); //we only want the user being able to change the name and email
      // 3 user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, 
        {new:true,
         runValidators:true}, );
 
    res.status(200).json({
        status: "success",
        data:{
            user: updatedUser
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
    try{await User.findByIdAndDelete({_id:req.params.userId}, (err, user)=>{
        

        return res.status(200).json({success: true, data: user});
        
    }
   ) .clone()}
    catch(err){
     return res.status(404).json({ success: false, error: [err, "user not found"]})
    }
    
   
 }