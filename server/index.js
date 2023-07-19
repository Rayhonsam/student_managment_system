const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userschema = require("./model/usermodel");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

const dbURL ="mongodb+srv://rayhon:samo@cluster0.dunl99r.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.connect(dbURL);
} catch (err) {
  console.log(err);
}

app.get("/api/insert", async (req, res) => {
  const name = req.query.name;
  const mail = req.query.mail;
  const user = new userschema({ name: name, mail: mail });
  try {
    console.log("log");
    await user.save();
    res.send("successfully inserted");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  try {
    const result = await userschema.find({});
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

app.get("/update",async(req,res)=>{
    try
    {
      var newname=req.query.newname;
      var id=req.query.id;
      console.log("id:",id,"newname:",newname);
      const updatedoc=await userschema.findById(id).exec();
      updatedoc.name=newname;
      await updatedoc.save();
      res.send("updated");
    }
    catch(err)
    {
      console.log(err);
    }
})

app.get("/api/delete/:id",async(req,res)=>{
  try
  {
     var id=req.params.id;
     await userschema.findByIdAndDelete(id).exec();
     res.send("deleted");
  }
  catch(err)
  {
    console.log(err);
  }
})

app.get("/updates",async(req,res)=>{
    var name=req.query.name;
    var mail=req.query.mail;
    var query={name:name,mail:mail};
    try
    {
        const result=await userschema.find(query);
        console.log("res:",result);
        res.send(result);
    }
    catch(err)
    {
       res.send(err);
    }
})

app.get("/deletes",async(req,res)=>{
  var name=req.query.name;
  var mail=req.query.mail;
  var query={name:name,mail:mail};
  try
  {
     const result=await userschema.deleteMany(query);
     res.send(`${result.deletedCount}`);
  }
  catch(err)
  {
    console.log(err);
  }
})
app.listen(3001, () => {
  console.log("listen on 3001");
});
