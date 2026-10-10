import { useNavigate } from "react-router-dom";
import homeimg from "../assets/homeImg_UI.png";


function Home() {

    //NAVIGATE FUNCTION
   const navigate = useNavigate();

    return(<>

    <div className="home_container">

        {/* CONTAINER FOR HEADING + IMAGE */}
        <div className="homeHeadingContainer">
            {/* HEADING PART CONTAINER */}

            <div className="HeadingPart">
                <h1>AI-Powered <span style={{color:"#8d4ded"}}>Campus</span> Recruitment & Interview Management Plateform</h1>
                <div className="para">
                    <p>Connecting Students, Colleges and Recruiters through Intelligent Hiring.</p>
                </div>
                <div>
                    <button style={{padding:'0.8rem', borderRadius:'0.5rem', backgroundColor:'#344969', color:'#fff', fontSize:'1rem'}}  onClick={()=>navigate("/register")}>Create Your Account</button>
                </div>
            </div>


            {/* IMAGE PART CONTAINER */}

            <div className="ImagePart">
                <img src={homeimg} alt="" />
            </div>
        </div>


        

        {/*TRUSTED COMPANIES */}
        <div className="trusted_companies_container">
            <header>
                <h3>Trusted by Leading Companies</h3>
            </header>

            <div className="comp_images">
                <img src="https://i.pinimg.com/736x/aa/a2/45/aaa245759726ab04e968b9bff4981a52.jpg" alt="" />
                <img src="https://1000logos.net/wp-content/uploads/2020/05/Wipro-logo.jpg" alt="" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrV5nDXGtvMN4ERG99bUP3Ss3Vc-eEGpuVvG6XlVnJqN-DsnLSoRpCbLLD&s=10" alt="" />
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-deloitte-logo-icon-svg-download-png-1581242.png" alt="" />
                <img src="https://download.logo.wine/logo/Dabur/Dabur-Logo.wine.png" alt="" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ4BffJmkIN_HU7XolJbyk54vyu-vQBsjTv9qVZqdLtA&s=10" alt="" />
            </div>
        </div>



        {/* CONTAINER FOR CARDS FOR STUDENTS RECRUITER COLLEGES */}
        <div className="card_container">
            <header>
                <h3>Why Choose HireBridge-Ai</h3>
            </header>

            <div className="cards">

                {/* STUDENT CARD */}
                <div className="studentCard">
                    {/* screen*/}
                    <div className="screen">
                        <h2>🎓</h2>
                        <h3>For Students :</h3>
                        <h3>Land Your Dream Job</h3>
                    </div>
                    {/* INFO */}
                    <div className="info">
                        <h4>Find relevent job , Improve your skills and manage your career profile in one place</h4>
                    </div>
                </div>


                {/* RECRUITER CARD*/}
                <div className="recruiterCard">
                    {/* screen*/}
                    <div className="screen">
                        <h2>👤</h2>
                        <h3>For Recruiter :</h3>
                        <h3>Source Top Talent Fast</h3>
                    </div>
                    {/* INFO */}
                    <div className="info">
                        <h4>Find Right Candidate Faster Using AI-Powered Matching and Advance Filter</h4>
                    </div>
                </div>


                {/* COLLEGE CARD*/}
                <div className="collegeCard">
                    {/* screen*/}
                    <div className="screen">
                        <h2>🏛️</h2>
                        <h3>For Colleges :</h3>
                        <h3>Drive Placement Success</h3>
                    </div>
                    {/* INFO */}
                    <div className="info">
                        <h4>Manage Placement Drives , Track Student Progress and Analyse Placement Statistics .</h4>
                    </div>
                </div>

            </div>
        </div>


        

        {/* FOOTER */}
        <div className="footer_container">

            {/*TOP */}
            <div className="top_container">
                <h2>HireBridge AI</h2>
                <h3>Connecting Students, Recruiters, Colleges and Companies</h3>
                <h3>through intelligent AI-powered recruitment.</h3>
            </div>

            {/*DETAILS*/}
            <div className="detail_container">

                {/*CARDS*/}
                <div className="cards">
                    <div className="heading">
                        <h3>Quick Links</h3>
                    </div>

                    <div className="body">
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Features</a>
                        <a href="#">Contact</a>
                    </div>
                </div>

                {/*PLATEFORM*/}
                <div className="cards">
                    <div className="heading">
                        <h3>Plateform</h3>
                    </div>

                    <div className="body">
                        <a href="#">Student</a>
                        <a href="#">Recruiters</a>
                        <a href="#">Colleges</a>
                        <a href="#">Companies</a>
                    </div>
                </div>

                {/*RESOURCES */}
                <div className="cards">
                    <div className="heading">
                        <h3>Resources</h3>
                    </div>

                    <div className="body">
                        <a href="#">About Us</a>
                        <a href="#">FAQs</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Term & Conditions</a>
                    </div>
                </div>

                {/* CONTACTS*/}

                <div className="cards">
                    <div className="heading">
                        <h3>Contacts</h3>
                    </div>

                    <div className="body">
                        <a href="#">📧 support@gmail.com</a>
                        <a href="#">📞 +91 XXXXX XXXXX</a>
                        <a href="#">📍 India</a>
                    </div>
                </div>

            </div>
        </div>

    </div>
    
    </>)
}
export default Home;