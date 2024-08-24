const jwt = require("jsonwebtoken")

class JWTService{

         static key = process.env.JWT_AUTH || "@#$%^&*()#$%^&";

    static generateToken =(payload)=>{
                    const token =   jwt.sign(payload,JWTService.key,{
                        expiresIn:'30d'
                    });

                    return token

    } 


    static verifyToken = (token )=>{
        const verify = jwt.verify(token, JWTService.key);

        return verify
    }

}

module.exports = JWTService