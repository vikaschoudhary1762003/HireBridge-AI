import aboutimg from "../assets/aboutimg.png";
import roleui from "../assets/aboutroleUI.png";
import aboutFooterUI from "../assets/aboutFooterUI.png";



function About() {
    return(<>
    
    <div className="about_container">

        <div className="container1">
        <header>
            <h1>About HireBridge-AI </h1>
            <div className="para">
                <h4>HireBridge-AI  is an AI-Powered campus recruitment and interview management plateform designed to connect students , colleges , and recruiters in a single ecosystem</h4>
            </div>
        </header>



        {/*SUB CONTAINER*/}
        <div className="subcontainer">


            {/*MISSION VISION CONTAINER*/}
            <div className="mission_vission_container">

                <div className="mission">
                    <div>
                        <h2>Our Mission</h2>
                    </div>
                    <p>To simplify campus recruitment by connecting the right student with the right opportunities using intellegent technology . </p>
                </div>

                <div className="vission">
                    <div>
                        <h2>Our Vission</h2>
                    </div>
                    <p>To create smarter ,faster and more transparent recruitment experience for student , recruiters , and educational institutions .</p>
                </div>
            </div>

            {/*IMAGE CONTAINER*/}
            <div className="about_img_container">
                <img src={aboutimg} alt="" />
            </div>
        </div>
        </div>



        {/*CONTAIER2 */}
        <div className="role_image_container">
            <img src={roleui} alt="" />
        </div>

        {/*FOOTER*/}
        <footer>
            <img src={aboutFooterUI} alt="" />
        </footer>

        
    </div>
    </>)
}
export default About;