const express = require("express");
const bodyParser = require("body-parser");
const routerServices = require("./Api/serviceAPI")


const app = express();
const port = 8080;

app.use(bodyParser.json());


app.use(routerServices);
app.listen(8080, ()=>{
    console.log(`listenig on port ${port}`);
})