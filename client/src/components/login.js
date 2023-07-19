import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";

const Login = () => {
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    axios
      .get("http://localhost:3001/login", {
        params: {
          name: name,
          mail: mail,
          password: password,
        },
      })
      .then((response) => {
        alert(response.data);
        if(response.data==="admin successful login")
        {
            navigate("/admin")
        }
        else if(response.data==="teacher successful login")
        {
            navigate("/teacher")
        }
        else if(response.data==="student successful login")
        {
          navigate('/student', { state: { value1:name, value2:mail } });

        }
      });
  };

  return (
    <>
      <h1>Login page</h1>
      <h1>Enter the name:</h1>
      <input type="text" name="name" onChange={(e) => setname(e.target.value)} />
      <br />
      <h1>Enter the mail:</h1>
      <input type="text" name="mail" onChange={(e) => setmail(e.target.value)} />
      <br />
      <h1>Enter the password:</h1>
      <input type="text" name="password" onChange={(e) => setpassword(e.target.value)} />
      <input type="submit" value="Submit" onClick={validate} />
    </>
  );
};

export default Login;
