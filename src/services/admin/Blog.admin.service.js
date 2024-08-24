const httpStatus = require("http-status")
const { ApiError } = require("../../utils/ApiError")
const { BlogModel } = require("../../models")
const { slugifyFn } = require("../../constant")
const CloudinaryService = require("../../utils/Cloudinary")

class AdminBlogService{

  static  async  CreateBlog(body,file){
   
            if(!file.path){
                throw new ApiError(httpStatus.BAD_REQUEST,"Please Upload Blog Image")
                return
            }
                const {title,desc,content,tags} = body


                const result = await CloudinaryService.uploadImage(file.path)

                
 if(!result.secure_url){
                throw new ApiError(httpStatus.BAD_REQUEST,"Image upload failed")
                return
            }
       
                const blog = await BlogModel.create({
title,desc,content,tags,
slug:slugifyFn(title),
image:{
    image_uri:result.secure_url,
    publicId:result.public_id
}
                })

                return {
                    msg:"Blog Added",
                    blog
                }

    }


    static async DeleteBlog(id){
        const blog  = await BlogModel.findById(id);
        if(!blog){
                throw new ApiError(httpStatus.BAD_REQUEST,"Blog Not Found")
                return
        }

        if(blog.image.publicId){
       const result =   await  CloudinaryService.deleteImage(blog.image.publicId)

       console.log(result);
       
        }

        await BlogModel.findByIdAndDelete(id);

        return {
            msg:"Blog Deleted Successfully"
        }


    }

    static async getAllBlogs(page=1,search=''){
        const limit = 2

        const skip = Number(page-1)*limit

        const query = {
            $or:[
                {
                        title:new RegExp(search,'i')
                },
                {
                        desc:new RegExp(search,'i')
                },
                {
                        slug:new RegExp(search,'i')
                }
            ]
        }

        const results = await BlogModel.find(query).skip(skip).limit(limit)
        .select("title desc image.image_uri isPublished")

        const documents = await BlogModel.countDocuments(query)

        const isMore = documents>skip+limit

        return {
            results,
            isMore,
            total:results.length
        }

    }

    static async getBlogById(id){
        const blog  = await BlogModel.findById(id)
        .select("-image.publicId -image._id")
        ;
        if(!blog){
                throw new ApiError(httpStatus.BAD_REQUEST,"Blog Not Found")
                return
        }

        
        
        return {
            ...blog.toObject()
        }


    }

    static async updateBlogById(id,body,file){

              const blog  = await BlogModel.findById(id)
        ;
        if(!blog){
                throw new ApiError(httpStatus.BAD_REQUEST,"Blog Not Found")
                return
        }    

        const obj ={}
        if(file){
            

          const data=     await  CloudinaryService.deleteImage(blog.image.publicId)
                    console.log(data);
                    

                const result = await CloudinaryService.uploadImage(file.path)

                obj['image']={
                     image_uri:result.secure_url,
    publicId:result.public_id
                }

        }

                if(body.title && blog.title !==body.title){
                    obj['title'] = body.title
                    obj['slug'] = slugifyFn(body.title)
                }
                 if(body.desc){
                    obj['desc'] = body.desc
                }
                 if(body.content){
                    obj['content'] = body.content
                }
                  if(body.tags){
                    obj['tags'] = body.tags
                }

                await BlogModel.findByIdAndUpdate(id,obj);
                return {
                    msg:"Blog Update success"
                }

    }
    

    static async toggleBlogPublished(id){
              const blog  = await BlogModel.findById(id)
        ;
        if(!blog){
                throw new ApiError(httpStatus.BAD_REQUEST,"Blog Not Found")
                return
        }    

            const obj ={}
        if(blog.isPublished){
            await BlogModel.findByIdAndUpdate(id,{
                isPublished:false
            })
            obj['msg']="Blog UnPublished"
        }else{
             await BlogModel.findByIdAndUpdate(id,{
                isPublished:true
            })
            obj['msg']="Blog Published"
        }

        return obj
    } 

}

module.exports = AdminBlogService