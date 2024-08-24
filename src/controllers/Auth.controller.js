const httpStatus = require("http-status")
const AuthService = require("../services/auth.service")
const CatchAsync = require("../utils/CatchAsync")

class AuthController{

        static registerUser = CatchAsync(async(req,res)=>{
            const res_obj = await AuthService.registerUser(req.body)
            res.status(httpStatus.CREATED).send(res_obj)
        })

         static loginUser = CatchAsync(async(req,res)=>{
            const res_obj = await AuthService.loginUser(req.body)
            res.status(httpStatus.OK).send(res_obj)
        })
           static userProfile = CatchAsync(async(req,res)=>{
            const res_obj = await AuthService.userProfile(req)
            res.status(httpStatus.OK).send(res_obj)
        })


        

}

module.exports  = AuthController