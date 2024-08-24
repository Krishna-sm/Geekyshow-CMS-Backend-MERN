const {v2} = require("cloudinary")


v2.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SCREATE,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})

class CloudinaryService {


    static uploadImage =async(file,folder_name='')=>{
     const result =    await v2.uploader.upload(file,{
            folder:folder_name
        })

        return result
    }

    
    static deleteImage =async(publicId)=>{
     const result =    await v2.uploader.destroy(publicId )

        return result
    }



}

module.exports = CloudinaryService