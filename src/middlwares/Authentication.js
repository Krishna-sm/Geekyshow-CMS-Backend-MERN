const httpStatus = require("http-status")
const { ApiError } = require("../utils/ApiError");
const JWTService = require("../utils/jwt");

exports.Authentication = async(req,res,next)=>{

    try {

                let authHeader = req.headers['authorization'] || ''

                if(!authHeader || !authHeader.startsWith("Bearer ")){
                // next(new ApiError(,error.message))
                throw new ApiError(httpStatus.UNAUTHORIZED,"Please Login First");
                }

            authHeader  =   authHeader.split(" ")[1]
if(!authHeader){
                // next(new ApiError(,error.message))
                throw new ApiError(httpStatus.UNAUTHORIZED,"Please Provide valid Token");
                }

                const payload = JWTService.verifyToken(authHeader)


                // res.send(payload)

                req.user = payload.userId;
                req.role = payload.role;
                        next()



    } catch (error) {
                next(new ApiError(httpStatus.UNAUTHORIZED,error.message))
    }
}