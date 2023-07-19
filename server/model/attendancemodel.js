
const mongoose=require("mongoose");

const attendanceschema=new mongoose.Schema({
    mail:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    attendance:{
        type:String,
        required:true,
    }
});

const attendancemodel=new mongoose.model("attendance",attendanceschema);
module.exports=attendancemodel;