const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({path : "backend/config/config.env"});


//importing routes
const post= require("./routes/post")
const user= require("./routes/user")
app.use(cookieParser());
//using middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//using routes
app.use("/api/v1",post)
app.use("/api/v1",user)



module.exports = app;