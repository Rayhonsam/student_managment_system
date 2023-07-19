import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Attendance from "./attendance";
const Student = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { value1,value2} = location.state;
  const enroll=(sub,slot)=>{
    console.log(value1,value2)
    axios.get("http://localhost:3001/enroll",{
      params:{
        name:value1,
        mail:value2,
        sub:sub,
        slot:slot,
      }
    }).then((response)=>{
      alert(response.data);
    })
  }
  const attendance=()=>{
      navigate("/percent",{state:{name:value1,mail:value2}})
  }
  const logout=()=>{
    navigate("/login");
  }
  return (
    <>
    <nav>
      <button type="button" onClick={attendance}>Attendance precent</button>
    </nav>
     <table>
        <tr>
            <td>subject</td>
            <td>slot a</td>
            <td>slot b</td>
        </tr>
        <tr>
          <td>info_sec</td>
          <td><button type="button" onClick={()=>enroll("info_sec","slota")}>enroll</button></td>
          <td><button type="button" onClick={()=>enroll("info_sec","slotb")}>enroll</button></td>
        </tr>
        <tr>
          <td>web_tech</td>
          <td><button type="button" onClick={()=>enroll("web_tech","slota")}>enroll</button></td>
          <td><button type="button" onClick={()=>enroll("web_tech","slotb")}>enroll</button></td>
        </tr>
        <tr>
          <button type="button" onClick={logout}>logout</button>
        </tr>
     </table>
    </>
  );
};

export default Student;
