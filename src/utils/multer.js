const multer = require("multer")
const path = require("path")
const { ImageMimeType } = require("../constant")
const { ApiError } = require("./ApiError")
const httpStatus = require("http-status")

const storage = multer.diskStorage({
        filename:(req,file,cb)=>{
         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname) 
    },
   
    }) 

const uploader = multer({

    storage,
     fileFilter:(req,file,cb)=>{ 
        
            const ext = path.extname(file.originalname); 
            
                if(!ImageMimeType.includes(ext)){ 
                    
                    cb(new ApiError(httpStatus.BAD_REQUEST,"upload Valid Image with valid type"),null)
                    return 
                }
                cb(null,true)
    }
    
    
})


module.exports = uploader