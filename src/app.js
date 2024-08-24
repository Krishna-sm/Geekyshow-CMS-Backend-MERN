const express = require("express");
const { ApiError } = require("./utils/ApiError");
const httpStatus = require("http-status");
const ErrorHandler = require("./middlwares/ErrorHandler");
const cors  = require("cors")

const app = express();


// middlwares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())



 app.get("/",(req,res)=>{
    res.send({msg:"hello world"})
 })


 app.use("/api/v1",require("./routes"))

 app.use("*",(req,res)=>{
    // res.send("something wrong")
    throw new ApiError(httpStatus.NOT_FOUND,"Page not Found")
 })


 app.use(ErrorHandler)

module.exports = app