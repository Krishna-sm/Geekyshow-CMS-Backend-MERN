const { validationResult } = require("express-validator");
const { ApiError } = require("../utils/ApiError");
const httpStatus = require("http-status");

const ErrorValidation = (req,res,next)=>{

    const result = validationResult(req);

    if(!result.isEmpty()){
        const msg=  result.array()[0].msg

        throw new ApiError(httpStatus.BAD_REQUEST,msg);
    }

    next()

}


module.exports =ErrorValidation