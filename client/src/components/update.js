import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const Update=()=>{
    const[name1,setname]=useState("");
    const[mail1,setmail]=useState("");
    const location=useLocation();
    const {name,mail,id}=location.state;
    const update=()=>{
        axios.get("http://localhost:3001/admin/update",{
            params:{
                n:name,
                m:mail,
                name:name1,
                mail:mail1,
                id:id,
            }
        }).then((response)=>{
            alert(response.data);
        })
    }
    return(
        <>
        <h1>update admin page</h1>
        <h1>username:{name}</h1>
        <h1>mail:{mail}</h1>
        <input type="text" name="name" onChange={(e)=>setname(e.target.value)} placeholder={`${name}`}/>
        <input type="text" name="mail" onChange={(e)=>setmail(e.target.value)} placeholder={`${mail}`}/>
        <input type="submit" onClick={update} value="update"/>
        </>
    )
}

export default Update;