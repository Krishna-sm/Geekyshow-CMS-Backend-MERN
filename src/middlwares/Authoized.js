const httpStatus = require("http-status")
const { ApiError } = require("../utils/ApiError")

const Authorized = (...roles)=>{

    return (req,res,next)=>{ 
                
                    try {
                         if(!roles.includes(req.role)){
                                throw new ApiError(httpStatus.UNAUTHORIZED,"Can Not Access This Route Without permission")
                }
                            next()

                    } catch (error) {
                            next(new ApiError(httpStatus.UNAUTHORIZED,error.message))       
                    }

    }
}

module.exports = Authorized