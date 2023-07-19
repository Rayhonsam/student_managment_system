
const mongoose=require("mongoose");

const personscema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
})

const persons=mongoose.model("usermodel",personscema);
module.exports=persons;