const express = require("express")
const AuthController = require("../controllers/Auth.controller")
const AuthValidation = require("../validations/Auth.validation")
const ErrorValidation = require("../middlwares/ErrorValidation")
const { Authentication } = require("../middlwares/Authentication")
const Authorized = require("../middlwares/Authoized")
const { Roles } = require("../constant")
const router = express.Router()



router.route("/register")
.post(AuthValidation.registerUser,ErrorValidation,AuthController.registerUser)

router.route("/login")
.post(AuthValidation.loginUser,ErrorValidation,AuthController.loginUser)


router.route("/profile")
.get(Authentication, Authorized(Roles.user,Roles.admin) ,AuthController.userProfile)

module.exports = router