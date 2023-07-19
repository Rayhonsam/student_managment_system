const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require('cors');
const usermodel=require("./model/loginmodel");
const mongoose=require("mongoose");
const enrollmodel=require("./model/studmodel");
const attendancemodel=require("./model/attendancemodel");
const fs=require("fs");
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());


const dbURL ="mongodb+srv://rayhon:samo@cluster0.dunl99r.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.connect(dbURL);
} catch (err) {
  console.log(err);
}

app.get("/get", async (req, res) => {
  try {
    const result = await usermodel.find({ category: { $in: ["student", "teacher"] } }).exec();
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving users");
  }
});
app.get("/admin/update",async(req,res)=>{
  try
  {
     const id=req.query.id;
     const name=req.query.name;
     const mail=req.query.mail;
     const n=req.query.n;
     const m=req.query.m;
     const query={name:n,mail:m};
     const q={mail:mail};
     const result=await usermodel.find(q);
     if(result.length===0 || mail===m)
     {
      var updatedDocument = await usermodel.findOneAndUpdate(query, { name:name,mail:mail });
      res.send("Updated info");
     }
     else
     {
      res.send("already in use")
     }
  }
  catch(err)
  {
    console.log(err);
  }
})
app.get("/api/insert",async(req,res)=>{
    const name=req.query.name;
    const mail=req.query.mail;
    const password=req.query.password;
    const category=req.query.category;
    const query={mail:mail};
    try
    {
        const result=await usermodel.find(query);
        if(result.length>0)
        {
            res.send("already exists");
        }
        else
        {
            const user=new usermodel({name:name,mail:mail,password:password,category:category});
            await user.save();
            res.send("successfully inserted");
        }
    }
    catch(err)
    {
        console.log(err);
    }
})

app.get("/login",async(req,res)=>{
    const name=req.query.name;
    const mail=req.query.mail;
    const password=req.query.password;
    const query={name:name,mail:mail,password:password};
    try
    {
        const result=await usermodel.find(query);
        console.log(result);
        if(result.length===0)
        {
            res.send("invalid login");
        }
        else if(result[0].category==="admin")
        {
            res.send("admin successful login");
        }
        else if(result[0].category==="student")
        {
            res.send("student successful login")
        }
        else if(result[0].category==="teacher")
        {
            res.send("teacher successful login")
        }
    }
    catch(err)
    {
        console.log(err);
    }
})



async function enrollUser(name, mail, sub, slot) {
  try {
    var query = { mail: mail, sub: sub };
    const result = await enrollmodel.find(query);
    if (result.length !== 0) {
      return "already enrolled";
    } else {
      if (sub == "info_sec") {
        var query1 = { mail: mail, sub: "web_tech" };
        const result1 = await enrollmodel.find(query1).lean().exec();
        console.log("res:", result1);
        if (result1.length === 0) {
          console.log("web_tech");
          var user = new enrollmodel({ name: name, mail: mail, sub: sub, slot: slot });
          await user.save();
          return "successfully enrolled1";
        } else {
          console.log("re:", result1);
          if (result1[0].slot !== slot) {
            return "time conflicting";
          } else {
            var user = new enrollmodel({ name: name, mail: mail, sub: sub, slot: slot });
            await user.save();
            return "successfully enrolled2";
          }
        }
      }
      if (sub == "web_tech") {
        var query1 = { mail: mail, sub: "info_sec" };
        const result1 = await enrollmodel.find(query1);
        console.log("res:", result1);
        if (result1.length === 0) {
          var user = new enrollmodel({ name: name, mail: mail, sub: sub, slot: slot });
          await user.save();
          return "successfully enrolled3";
        } else {
          if (result1[0].slot !== slot) {
            return "time conflicting";
          } else {
            var user = new enrollmodel({ name: name, mail: mail, sub: sub, slot: slot });
            await user.save();
            return "successfully enrolled4";
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    throw err; // re-throw the error to be handled outside of the function if needed
  }
}
app.get("/enroll", async (req, res) => {
  try {
    if (req.query.sub == "info_sec" || req.query.sub == "web_tech") {
      var name = req.query.name;
      var mail = req.query.mail;
      var sub = req.query.sub;
      var slot = req.query.slot;
      console.log("slot:", slot);
      const enrollmentResult = await enrollUser(name, mail, sub, slot);
      res.send(enrollmentResult);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/attendance",async(req,res)=>{
  try
  {
     const result=await enrollmodel.find({});
     console.log("ed:",result);
     res.send(result); 
  }
  catch(err)
  {
     console.log(err);
  }
})

app.post('/api/save-image', (req, res) => {
  const { image } = req.body;

  // Generate a unique filename or use a timestamp-based name
  const fileName = `image-${Date.now()}.png`;

  // Save the image to a specific folder
  fs.writeFile(`C:/Users/rayhon samo/Desktop/mongodb/server/${fileName}`, image, 'base64', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to save the image.' });
    } else {
      res.json({ message: 'Image saved successfully.' });
    }
  });
});

app.get("/update",async(req,res)=>{
  try
  {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      var data=req.query.data;
      for(var i=0;i<data.length;i++)
      {
        var doc=data[i];
        console.log("doc:",doc);
        if(doc.attendance==='true')
        {
          console.log("docs:",doc);
           var mail=doc.mail;
           var newdoc=new attendancemodel({mail:mail,date:formattedDate,attendance:"present"});
           var query={mail:mail,date:formattedDate};
           console.log("query:",query);
           var result=await attendancemodel.find(query);
           if(result.length===0)
           {
               await newdoc.save();
           }
           else
           {
            var updatedDocument = await attendancemodel.findOneAndUpdate(query, { attendance: "present" });
           }
        }
        else
        {
          var mail=doc.mail;
          console.log("doc:",doc);
          var newdoc=new attendancemodel({mail:mail,date:formattedDate,attendance:"absent"});
          var query={mail:mail,date:formattedDate};
          var result=await attendancemodel.find(query);
          console.log("re:",result);
          if(result.length===0)
          {
              await newdoc.save();
          }
          else
          {
            var updatedDocument = await attendancemodel.findOneAndUpdate(query, { attendance: "absent" });
          }
        }
      }
      res.send("Updated attendance2");
  }
  catch(err)
  {

  }
})
app.get("/percent", async (req, res) => {
  try {
    const name = req.query.name;
    const mail = req.query.mail;
    
    const count = await attendancemodel.countDocuments({ mail: mail,attendance:"present" });
    res.send(count.toString());
  } catch (err) {
    console.log(err);
  }
});

app.get("/getper",async(req,res)=>{
  try
  {
    const name = req.query.name;
    const mail = req.query.mail;
    const result=await attendancemodel.find({mail:mail});
    res.send(result);
  }
  catch (err) {
    console.log(err);
  }
})

app.get("/deleteuser",async(req,res)=>{
  var mail=req.query.mail;
  try
  { 
     var query={mail:mail};
     const result=await usermodel.findOneAndDelete(query);
     res.send(`deleted succesfully ${mail}`)
  }
  catch(err)
  {
    console.log(err);
  }
})
app.listen(3001,()=>{
    console.log("listen on 3001");
})