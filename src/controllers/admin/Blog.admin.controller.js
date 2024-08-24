const httpStatus = require("http-status")
const AdminBlogService = require("../../services/admin/Blog.admin.service")
const CatchAsync = require("../../utils/CatchAsync")

class AdminBlogController{


        static CreateBlog = CatchAsync(async(req,res,next)=>{
            const res_obj = await AdminBlogService.CreateBlog(req.body,req.file)

            return res.status(httpStatus.CREATED).send(res_obj)
        })  


          static DeleteBlog = CatchAsync(async(req,res,next)=>{
            const res_obj = await AdminBlogService.DeleteBlog(req.params.id)

            return res.status(httpStatus.OK).send(res_obj)
        })  


        static getAllBlogs = CatchAsync(async(req,res,next)=>{
            const res_obj = await AdminBlogService.getAllBlogs(req.query?.page,req.query?.search)

            return res.status(httpStatus.OK).send(res_obj)
        })  

        static getBlogById =  CatchAsync(async(req,res,next)=>{
            const res_obj = await AdminBlogService.getBlogById(req.params.id)

            return res.status(httpStatus.OK).send(res_obj)
        })  

             static updateBlogById =  CatchAsync(async(req,res,next)=>{
            const res_obj = await AdminBlogService.updateBlogById(req.params.id,req.body,req.file)

            return res.status(httpStatus.OK).send(res_obj)
        }) 
        
               static toggleBlogPublished =  CatchAsync(async(req,res,next)=>{
            const res_obj = await AdminBlogService.toggleBlogPublished(req.params.id)

            return res.status(httpStatus.OK).send(res_obj)
        })  

        
        
}


module.exports =AdminBlogController