
const express = require("express");
const router = express.Router();
const authController = require("../controller/authController")
const userController = require("../controller/userController")


router.post("/SignUp", authController.signup, (request, response, next) => {

  response.json({
    status: "success",
    method: request.method,

  })
});
router.post("/login", authController.login, (request, response, next) => {

  response.json({
    status: "success",
    method: request.method,

  })
});
router.post("/forgotPassword", authController.forgotPassword, (request, response, next) => {

  response.json({
    status: "success",
    method: request.method,

  })
});
router.patch("/resetPassword/:token", authController.resetPassword, (request, response, next) => {

  response.json({
    status: "success",
    method: request.method,

  })
});



router.patch("/updateMe", authController.protect, userController.updateMe, (request,response)=>{

  response.json({
    status:"success",
    method: request.method
  })
})

router.delete("/deleteMe", authController.protect, userController.deleteMe, (request,response)=>{

  response.json({
    status:"success",
    method: request.method
  })
})
router.patch("/updateMyPassword", authController.protect, authController.updatePassword, (request,response)=>{

  response.json({
    status:"success",
    method: request.method
  })
})
router.get("/users", authController.protect, userController.getAllUsers, (request, response, next) => {

  response.json({
    status: "success",
    method: request.method,

  })
});

router.delete("/delete/:userId",authController.protect,  authController.restrictTo("admin"), userController.deleteUser, (request, response)=>{
  response.json({
    status:"success",
    method: request.method
  })
})

module.exports = router;