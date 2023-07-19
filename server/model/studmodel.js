const mongoose=require("mongoose");

const studschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
    },
    sub:{
        type:String,
        required:true,
    },
    slot:{
        type:String,
        required:true,
    }
})

const studmodel=mongoose.model("enrollment",studschema);
module.exports=studmodel;