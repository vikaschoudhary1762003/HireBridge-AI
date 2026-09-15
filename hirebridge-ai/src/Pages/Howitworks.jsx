import forstudent from '../assets/forstudent.png';
import forrecruiter from '../assets/forrecuiter.png';
import forcollege from '../assets/forcollege.png';
import { useNavigate } from "react-router-dom";

function HowitWorks() {

    const navigate = useNavigate();


    return(<>
    
    <div className="howitworks_container">
        <header>
            <div>
                <h1>How HireBridge-AI Works</h1>
            </div>
            <h4>A simple and intelligent process for everyone</h4>
        </header>


        {/*FOR STUDENT CONTAINER*/}
        <div className="forstudent_img_container">
            <img src={forstudent} alt="" />
        </div>



        {/*FOR RECRUITERS IMG CONTAINER*/}
        <div className="forrecruiter_img_container">
            <img src={forrecruiter} alt="" />
        </div>


        {/*FOR COLLEGE IMG CONTAINER*/}
        <div className="forcollege_img_container">
            <img src={forcollege} alt="" />
        </div>



        {/*FOOTER*/}
        <footer>
            <div>
                <h1>Ready to Get Started ?</h1>
            </div>

            <div>
                <h4>Join thousand of students , recruiters and colleges already using HireBridge-AI</h4>
            </div>

            <button type='button' onClick={() => navigate("/register")}>Create Free Accoung</button>
        </footer>
    </div>
    
    </>)
}
export default HowitWorks;