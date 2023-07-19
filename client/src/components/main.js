import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import validator from "validator";
import { Link } from "react-router-dom";
const Main=()=>{
    const[name,setname]=useState("");
    const[mail,setmail]=useState("");
    const[password,setpassword]=useState("");
    const[category,setcat]=useState("");
    const validate=()=>{
        if(!validator.isStrongPassword(password,{
            minLength:8,minLowercase:1,minNumbers:1,minUppercase:1,minSymbols:1
        }))
        {
            alert("password is weak");
        }
        console.log(category);
        axios.get("http://localhost:3001/api/insert",{
            params:{
                name:name,
                mail:mail,
                password:password,
                category:category,
            }
        }).then((response)=>{
            alert(response.data);
        })
    }
    return(
        <>
           <h1>registration form</h1>
           <h1>enter the name:</h1>
           <input type="text" name="name" onChange={(e)=>setname(e.target.value)}/>
           <br></br>
           <h1>enter the mail:</h1>
           <input type="text" name="mail" onChange={(e)=>setmail(e.target.value)}/>
           <br></br>
           <h1>enter the password:</h1>
           <input type="text" name="password" onChange={(e)=>setpassword(e.target.value)}/>
           <br></br>
           <select onChange={(e)=>setcat(e.target.value)}>
            <option value="teacher">teacher</option>
            <option value="admin" selected>admin</option>
            <option value="student">student</option>
            </select>
           <input type="submit" value="submit" onClick={validate}/>
           <Link to="/login">login</Link>
        </>
    )
}

export default Main;