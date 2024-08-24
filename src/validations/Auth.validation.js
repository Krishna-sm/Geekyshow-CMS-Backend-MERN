const { body } = require("express-validator")

class AuthValidation{

            static registerUser= [
                body("name").notEmpty().withMessage("Name is Required"),
                body("email").isEmail().withMessage("Email must be valid").notEmpty().withMessage("Email is Required"),
                body("password").notEmpty().withMessage("password is Required"),
            ]

              static loginUser= [ 
                body("email").isEmail().withMessage("Email must be valid").notEmpty().withMessage("Email is Required"),
                body("password").notEmpty().withMessage("password is Required"),
            ]

}

module.exports =AuthValidation