const express = require("express")
const Authorized = require("../../middlwares/Authoized")
const { Roles } = require("../../constant")
const AdminBlogController = require("../../controllers/admin/Blog.admin.controller")
const AdminBlogValidation = require("../../validations/admin/Blog.admin.validation")
const ErrorValidation = require("../../middlwares/ErrorValidation")
const uploader = require("../../utils/multer")
const { Authentication } = require("../../middlwares/Authentication")

const router = express()

router.use(Authentication,Authorized(Roles.admin))

router.route("/create")
.post(uploader.single("image"),AdminBlogValidation.createBlog,ErrorValidation,AdminBlogController.CreateBlog)


router.route("/get-all")
.get(AdminBlogValidation.filterPart,ErrorValidation,AdminBlogController.getAllBlogs)



router.route("/get/:id")
.get(AdminBlogValidation.blogId,ErrorValidation,AdminBlogController.getBlogById)

router.route("/delete/:id")
.delete( AdminBlogValidation.blogId,ErrorValidation,AdminBlogController.DeleteBlog)




router.route("/update/:id")
.put(uploader.single("image"), AdminBlogValidation.updateBlog,ErrorValidation,AdminBlogController.updateBlogById)



router.route("/toggle/:id")
.put(AdminBlogValidation.blogId,ErrorValidation,AdminBlogController.toggleBlogPublished)
module.exports = router