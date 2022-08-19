const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.get("/", (req,res)=>{
 res.status(200).send("HELLO from the server side")
})
app.listen(8080, ()=>{
    console.log(`listenig on port ${port}`);
})