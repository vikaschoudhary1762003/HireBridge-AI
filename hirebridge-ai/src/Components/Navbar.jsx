import logo from "../assets/logo.png";
import { useNavigate} from 'react-router-dom';


function Navbar() {

    //NAVIGATE FUNCTION
    const navigate = useNavigate(); // now use navigate variable everywhere for landing to a particular page
    
    return ( <>
    

    <div className="navbar_container">
        <nav>
            <div className="logo">
                <img src={logo} alt="Logo" onClick={()=> navigate("/")}/>
            </div>

            <div>
                <a href="#" onClick={()=>navigate("/about")}><h3>About</h3></a>
            </div>

            <div>
                <a href="#" onClick={()=>navigate("/howitworks")}><h3>How it Works</h3></a>
            </div>

            <div>
                <a href="#" onClick={()=>navigate("/company")}><h3>Companies</h3></a>
            </div>

            <div>
                <a href="#" onClick={()=>navigate('/jobs')}><h3>Jobs</h3></a>
            </div>



            <div className="forstudent">
                <a href="#"  onClick={()=>navigate("/studentdashboard")}><h3>For Student</h3></a>
            </div>

            <div className="forrecruter">
                <a href="#" onClick={()=>navigate("/recruiterdashboard")}><h3>For Recruiter</h3></a>
            </div>

            <div className="forcollges">
                <a href="#" onClick={()=>navigate("/college")}><h3>Colleges</h3></a>
            </div>

            <div className="login">
                <a href="#"><h3 onClick={()=>navigate("login")}>Login</h3></a>
            </div>

            <div className="getstartedbtn">
                <button  onClick={() => navigate("/register")}>Register</button>
            </div>
        </nav>
    </div>
    
    </>)
}

export default Navbar;