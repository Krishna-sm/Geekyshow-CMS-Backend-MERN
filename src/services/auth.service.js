const httpStatus = require("http-status")
const { ApiError } = require("../utils/ApiError")
const {ProfileModel,UserModel} = require("../models");
const JWTService = require("../utils/jwt");
class AuthService{
      static  async registerUser(body){
            // return body 

            const chk_user = await UserModel.findOne({email:body.email.toLowerCase()});
                     
            if(chk_user){   
                throw new ApiError(httpStatus.BAD_REQUEST,"User Already Exist");
            }

            const user = await UserModel.create(body)
                await ProfileModel.create({
                    user:user._id
                })


                // Todo: hand to hand login

                const token = JWTService.generateToken({userId:user._id,role:user.role});

                

                return {
                    msg:"User Register Successfully",
                       authToken:token
                }



        }

         static  async loginUser(body){
            // return body 

              const chk_user = await UserModel.findOne({email:body.email.toLowerCase()});

            if(!chk_user){
                throw new ApiError(httpStatus.BAD_REQUEST,"Account Not Found");
            }

                        // password verify

                    const isMatch = await chk_user.ComparePassword(body.password)

 if(!isMatch){
                throw new ApiError(httpStatus.BAD_REQUEST,"Invalid Credentials");
            }
                // Todo: hand to hand login

                const token = JWTService.generateToken({userId:chk_user._id,role:chk_user.role});

                

                return {
                    msg:"User Login Successfully",
                    authToken:token
                }



        }

        static async userProfile(req){
                    const {user,role} = req
            const chk_user = await UserModel.findById(user);

                     
            if(!chk_user){   
                throw new ApiError(httpStatus.BAD_REQUEST,"User Not Found");
            }
const profile = await ProfileModel.findOne({user:user})
.select("image.image_uri -_id")

                return {
                    msg:"Profile Fetched",
                    user:{
                        name:chk_user.name,
                        email:chk_user.email,
                        role:chk_user.role,
                        ...profile.toObject()
                    }
                }

        }
}

module.exports = AuthService