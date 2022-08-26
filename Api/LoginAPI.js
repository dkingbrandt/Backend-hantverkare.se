const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController")


router.get("/Login",  (request, response) => {

  response.json({
    status: "success",
    method: request.method,
    
  })
});