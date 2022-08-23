const express = require("express");
const bodyParser = require("body-parser");
const routerServices = require("./Api/serviceAPI")
const cors = require("cors")


const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use(cors({
    orgin: "http://127.0.0.1:3000",
    credentials: true
}))


app.use(routerServices);
app.listen(8080, () => {
    console.log(`listenig on port ${port}`);
})
