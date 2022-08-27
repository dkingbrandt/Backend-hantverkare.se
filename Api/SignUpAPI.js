const express = require("express");
const router = express.Router();
const authController = require("../controller/authController")


router.post("/SignUp", authController.signup,(request, response, next) => {

  response.json({
    status: "success",
    method: request.method,
    
  })
});

module.exports = router;