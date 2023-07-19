import React, { Component } from "react";
import axios from "axios";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      list: [],
      newname:"",
      updatename:"",
      updatemail:"",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/read").then((response) => {
      this.setState({ list: response.data });
    });
    console.log("list:", this.state.list);
  }

  submit = async () => {
    try {
      console.log("submit");
      const response = await axios.get("http://localhost:3001/api/insert", {
        params: {
          name: this.state.name,
          mail: this.state.mail,
        },
      });
      alert(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  update=(id)=>{
      console.log("update")
      axios.get("http://localhost:3001/update",{
        params:{
            id:id,
            newname:this.state.newname,
        }
      }).then((response)=>{
        console.log(response.data);
        alert(response.data)
      })
  }
  updated=()=>{
    axios.get("http://localhost:3001/updates",{
      params:{
        name:this.state.updatename,
        mail:this.state.updatemail,
      }
    }).then((response)=>{
      alert(response.data);
    })
  }
  deletes=()=>{
    axios.get("http://localhost:3001/deletes",{
      params:{
        name:this.state.updatename,
        mail:this.state.updatemail,
      }
    }).then((response)=>{
      alert(response.data);
    })
  }
  delete=(id)=>{
     axios.get(`http://localhost:3001/api/delete/${id}`).then((response)=>{
        alert(response.data);
     })
  }
  render() {
    return (
      <>
        <h1>Enter the name</h1>
        <input
          type="text"
          name="name"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <h1>Enter the mail</h1>
        <input
          type="text"
          name="name"
          onChange={(e) => this.setState({ mail: e.target.value })}
        />
        <br></br>
        <input type="submit" value="Submit" onClick={this.submit} />
        <h1>stud list</h1>
        <table>
            <tr>
                <td>id</td>
                <td>name</td>
                <td>mail</td>
                <td>update</td>
            </tr>
            {
                this.state.list.map((li,index)=>(
                    <tr key={index}>
                       <td>{li._id}</td>
                       <td>{li.name}</td>
                       <td>{li.mail}</td>
                       <td>
                        <div>
                            <input type="text" onChange={(e)=>this.setState({newname:e.target.value})} placeholder="enter the newname"/>
                            <button type="button" onClick={()=>this.update(li._id)}>update</button>
                        </div>
                       </td>
                       <td>
                        <div>
                          <button type="button" onClick={()=>this.delete(li._id)}>delete</button>
                        </div>
                       </td>
                    </tr>
                ))
            }
        </table>
        <div>
          <h1>enter the name to find the doc and update</h1>
          <input type="text" name="name" onChange={(e)=>this.setState({updatename:e.target.value})}/>
          <h1>enter the mail to be updated</h1>
          <input type="text" name="mail" onChange={(e)=>this.setState({updatemail:e.target.value})}/>
          <input type="submit" onClick={this.updated}/>
        </div>
        <div>
          <h1>enter the name to find and delete the doc</h1>
          <input type="text" name="name" onChange={(e)=>this.setState({updatename:e.target.value})}/>
          <h1>enter the mail to be updated</h1>
          <input type="text" name="mail" onChange={(e)=>this.setState({updatemail:e.target.value})}/>
          <input type="submit" onClick={this.deletes}/>
        </div>
      </>
    );
  }
}

export default User;
