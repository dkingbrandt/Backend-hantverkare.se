const express = require("express");
const bodyParser = require("body-parser");
const routerServices = require("./Api/serviceAPI")
const routerSignUp = require("./Api/SignUpAPI")
const cors = require("cors")
const db = require("./database/db")


const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use(cors({
    orgin: "http://127.0.0.1:3000",
    credentials: true
}))


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(routerSignUp);
app.use(routerServices);

app.listen(8080, () => {
    console.log(`listening on port ${port}`);
})
