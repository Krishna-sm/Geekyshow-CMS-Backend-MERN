const mongoose = require("mongoose") 


const Schema = new mongoose.Schema({
        
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  image:{
    type:{
        image_uri:{
            type:String
        },
        publicId:{
            type:String
        }
    },
    default:{
        image_uri:'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg',
        publicId:null
    }
  }

},{
    timestamps:true
})

 



const model = mongoose.model("profile",Schema)

module.exports= model