import React, { Component } from "react";
import axios from "axios";

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      data: [],
      mails: [],
    
    };
  }
  componentDidMount() {
    axios.get("http://localhost:3001/attendance").then((response) => {
      const { list, data, mails } = this.state;

      if (list.length !== response.data.length) {
        console.log("i");
        this.setState(
          {
            list: [...list, response.data],
          },
          () => {
            console.log("list:", this.state.list);
            for (var i = 0; i < response.data.length; i++) {
              var mail = response.data[i].mail;
              if (!mails.includes(mail)) {
                mails.push(mail);
                data.push({ mail, attendance: true });
              }
            }
            console.log("data:", data);
            this.setState({ data });
          }
        );
      }
    });
  }

  handleAttendance=(index)=> {
    console.log("index:",index);
     const updatedata=this.state.data;
     updatedata[index].attendance=!updatedata[index].attendance;
     this.setState({
        data:updatedata,
     })
  }
  handleupdateattendance=()=>{
      console.log("update:",this.state.data)
      axios.get("http://localhost:3001/update",{
        params:{
            data:this.state.data,
        }
      }).then((response)=>{
        alert(response.data);
      })
  }
  render() {
    const { data } = this.state;

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>mail</th>
              <th>attendance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((li, index) => (
              <tr key={index}>
                <td>{li.mail}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => this.handleAttendance(index)}
                  >
                    {li.attendance?"present":"absent"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={this.handleupdateattendance}>update</button>
      </>
    );
  }
}

export default Attendance;
