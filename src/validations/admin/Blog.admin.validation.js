const { body ,param,query} = require("express-validator")

class AdminBlogValidation{


    static blogId = [
        param("id").notEmpty().withMessage("Id is Required").isMongoId().withMessage("id must be valid mongodb id")
    ]

    static filterPart = [
        query("search").optional(),
        query("page").isNumeric().withMessage("page is a  number").optional(),
    ]

    static createBlog = [
        body("title").notEmpty().withMessage("title is Required").trim(),
        body("desc").notEmpty().withMessage("desc is Required").trim(),
        body("content").notEmpty().withMessage("content is Required").trim(),
        body("tags").notEmpty().withMessage("tags is Required").trim(),

    ]

    static updateBlog =[
         param("id").notEmpty().withMessage("Id is Required").isMongoId().withMessage("id must be valid mongodb id"),
          body("title").optional().trim(),
        body("desc").optional().trim(),
        body("content").optional().trim(),
        body("tags").optional().trim(),
    ]

}


module.exports = AdminBlogValidation