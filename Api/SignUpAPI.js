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
router.get("/users", authController.protect, userController.getAllUsers, (request, response, next) => {

  response.json({
    status: "success",
    method: request.method,

  })
});

module.exports = router;