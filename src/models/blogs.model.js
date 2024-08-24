const mongoose = require("mongoose")


const Schema = new mongoose.Schema({
            slug:{
                type:String,
                lower:true,
                trim:true,
                required:true
            },
            title:{
                type:String,
                trim:true,
                required:true
            },
              desc:{
                type:String,
                trim:true,
                required:true
            },
              content:{
                type:String,
                trim:true,
                required:true
            },
            tags:{
                 type:String,
                trim:true,
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
                required:true
            },
            isPublished:{
                type:Boolean,
                default:true
            }

},{
    timestamps:true
})


const model = mongoose.model("blog",Schema)

module.exports= model