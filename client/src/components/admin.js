import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Admin=()=>{
    const[list,setlist]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3001/get").then((response)=>{
            setlist([...list,response.data]);
            console.log(response.data);
        })
        console.log("list:",list);
    },[])
    const update=(name,mail,id)=>{
        navigate("/user",{state:{name:name,mail:mail,id:id}})
    }
    const deletes=(mail)=>{
         axios.get("http://localhost:3001/deleteuser",{
            params:{
                mail:mail,
            }
         }).then((response)=>{
            alert(response.data);
         })
    }
    const logout=()=>{
        navigate("/login");
    }
    return(
        <>
        <h1>admin page</h1>
        <table>
            <tr>
                <td>name</td>
                <td>mail</td>
                <td>category</td>
                <td>update</td>
            </tr>
            {
                list.map((li,index)=>(
                    li.map((lis,index1)=>(
                        <tr>
                            <td>{lis.name}</td>
                            <td>{lis.mail}</td>
                            <td>{lis.category}</td>
                            <td>
                               <button type="button" onClick={()=>update(lis.name,lis.mail,lis._id)}>update</button>
                            </td>
                            <td>
                                <button type="button" onClick={()=>deletes(lis.mail)}>delete</button>
                            </td>
                        </tr>
                    ))
                ))
            }
            <tr>
                <button type="button" onClick={logout}>logout</button>
            </tr>
        </table>
        </>
    )
}

export default Admin;