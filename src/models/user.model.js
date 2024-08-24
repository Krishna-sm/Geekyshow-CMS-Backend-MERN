const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { Roles } = require("../constant");


const Schema = new mongoose.Schema({
        
    name:{
        type:String,
        require:true,
        trim:true,
        lower:true
    },
    email:{
type:String,
        require:true,
        trim:true,
        lower:true,
        unique:true
    },
    password:{
        type:String,
        trim:true
    },
    isActive:{
         type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:Roles['user'],
        enum:Object.values(Roles)
        
    }

},{
    timestamps:true
})

Schema.pre("save",async function(next){
    const user =this;

    if(user.isModified("password")){
        this.password = await bcrypt.hash(user.password,10);
    }
    next()
})


Schema.methods.ComparePassword = async function(string_pass){
     const user =this;

    const isMatch = await  bcrypt.compare(string_pass,user.password);

    return isMatch

}




const model = mongoose.model("user",Schema)

module.exports= model