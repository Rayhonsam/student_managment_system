import logo from './logo.svg';
import './App.css';
import User from './components/user';
import Main from './components/main';
import Login from './components/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student from './components/student';
import Attendance from './components/attendance';
import Admin from './components/admin';
import Update from './components/update';
import Attendancepercent from './components/attenprecentage';
import MyWebcamComponent from './components/webcam';
function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/student' element={<Student/>}/>
      <Route path='/teacher' element={<Attendance/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/user' element={<Update/>}/>
      <Route path='/percent' element={<Attendancepercent/>}/>
      <Route path='/web' element={<MyWebcamComponent/>}/>
    </Routes>
  </Router>
  );
}

export default App;
