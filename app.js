require("dotenv").config();
const express = require('express')
const app = express()
const mongoose = require("mongoose");
require("./conn")
const users = require("./model"); // user schema fatching 

const cors = require("cors");
const router = require("./routers/router") // api call for delete add update save emp data
const port = 8000;

app.use(cors()); // for connecting client and server port
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`server is connected port Number : ${port}`);

});


