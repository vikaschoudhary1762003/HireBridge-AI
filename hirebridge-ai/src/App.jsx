import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import StudentDashboard from './Pages/StudentDashboard';
import RecruiterDashboard from './Pages/RecruiterDashboard';
import About from './Pages/About';
import HowitWorks from './Pages/Howitworks';
import Companies from './Pages/Companies';
import Jobs from './Pages/Jobs';
import College from './Pages/College';


function App() {
  return (
    <div className="web_container">
      <Navbar />

      <main className="page_container">

        <Routes>

          {/* LANDING PAGE HOME AS DEFAULT PAGE "/" */}
          <Route path='/' element={<Home/>}/>

          {/*REGISTER FORM*/}
          <Route path='/register' element={<Register/>} />

          {/*LOGIN FORM*/}
          <Route path='/login' element={<Login/>} />

          {/*STUDENT DASHBOARD */}
          <Route path='/studentdashboard' element={<StudentDashboard/>} />

          {/*RECRUITER DASHBOARD*/}
          <Route path='/recruiterdashboard' element={<RecruiterDashboard/>} />

          {/*ABOUT PAGE*/}
          <Route path='/about' element={<About/>} />

          {/*HOW IT WORKS PAGE*/}
          <Route path='/howitworks' element={<HowitWorks/>} />

          {/*COMPANY PAGE*/}
          <Route path='/company' element={<Companies/>} />

          {/*JOB PAGE*/}
          <Route path='/jobs' element={<Jobs/>} />

          {/*COLLEGE PAGE*/}
          <Route path='/college' element={<College/>} />

        </Routes>

      </main>
    </div>
  );
}

export default App;