import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Attendancepercent=()=>{
    const location=useLocation();
    const {name,mail}=location.state;
    const[list,setlist]=useState([]);
    var list1=[]
    useEffect(()=>{
        console.log("io")
        axios.get("http://localhost:3001/percent",{
            params:{
                name:name,
                mail:mail,
            }
        }).then((response)=>{
            alert(response.data);
        });
        axios.get("http://localhost:3001/getper",{
            params:{
                name:name,
                mail:mail,
            }
        }).then((response)=>{
             setlist(response.data);
             list1=list;
        })
    },[])
    return(
        <>
        <h1>Attendance log</h1>
        <h1>{name}:{mail}</h1>
        {console.log(list)}
        <table>
            <tr>
                <td>mail</td>
                <td>date</td>
                <td>attendance</td>
            </tr>
           {
              list.map((li,index)=>(
                <tr>
                    <td>{li.mail}</td>
                    <td>{li.date}</td>
                    <td>{li.attendance}</td>
                </tr>
              ))
           }
        </table>
        </>
    )
}

export default Attendancepercent;