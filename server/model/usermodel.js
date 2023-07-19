const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
    }
})

const user=mongoose.model("userinfo",userschema);

module.exports=user;