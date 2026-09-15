import { useState } from "react";

function College() {

    const [pages , setPages] = useState("Dashboard"); // this will shaow pages of all sidebar


    return(<>


    <div className="college_container">

        <div className="Colldashboard_container">
        
        {/*SIDE BAR*/}
        <div className="sidebar_container">
            <div>
                <h4>Welcome Admin</h4>
            </div>

            <nav>
                <a href="#" onClick={(e)=>{e.preventDefault() ; setPages('Dashboard')}}>Dashboard</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('Student')}}>Students</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('company')}}>Companies</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('JobDrives')}}>Job Drives</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("Application")}}>Applications</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("ShortlistedStudent")}}>Shortlisted</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('Interview')}}>Interviews</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('PlacementAnalysis')}}>Placement Analytics</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('Notification')}}>Notifications</a>
                <a href="#">Logout</a>
            </nav>
        </div>

        {/*DISPLAY CONTAINER*/}
        <div className="display_container">

            {/*DASHBOARD PAGE*/}
            {pages === "Dashboard" && (<>

            <div className="collegedashboard_container">

            
            <header>
                <div>
                    <h1>Welcome College admin</h1>
                </div>
                <p>Manage student , recruitment drives and placement activities </p>
            </header>

            {/*CARDS*/}

            <div className="card_Container">

                <div className="cards">
                    <h4>Total Student</h4>
                    <h5>250</h5>
                </div>

                <div className="cards">
                    <h4>Companies</h4>
                    <h5>250</h5>
                </div>

                <div className="cards">
                    <h4>Job Drives</h4>
                    <h5>250</h5>
                </div>

                <div className="cards">
                    <h4>Student Placed</h4>
                    <h5>250</h5>
                </div>
            </div>



            {/*COMPANY REQUESTS FOR DRIVE*/}
            <div className="companyDrive_container">
                <h2>Drive company will be shown here</h2>
            </div>
             
            </div>
            
            </>)}



            {/*STUDENT NAV PAGE*/}
            {pages === "Student" && (<>
            
            <div className="college_studentNav_container">
                <header>
                    <div>
                        <h1>Students</h1>
                        <h2>THIS PAGE WILL DISPLAY REGISTERED STUDENT OF COLLEGE</h2>
                    </div>

                    <div>
                        <input type="search" name="" placeholder="Search student by name enrollment no .." />

                        <div>
                            <label htmlFor="">Department 
                                <select name="">
                                    <option value="All">All Department</option>
                                </select>
                            </label>

                            <label htmlFor="">Year
                                <select name="">
                                    <option value="All">All Year</option>
                                    <option value="1">1st</option>
                                    <option value="2">2nd</option>
                                    <option value="3">3rd</option>
                                    <option value="4">4th</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </header>

                 {/*SHOW REGISTERED STUDENTSS*/}
                 <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <td>Roll No</td>
                                <td>Student Name</td>
                                <td>Department</td>
                                <td>Course</td>
                                <td>Year</td>
                                <td>CGPA</td>
                                <td>Resume On</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1950</th>
                                <th>John</th>
                                <th>Computer Science</th>
                                <th>BCA</th>
                                <th>1 YEAR</th>
                                <th>8.85</th>
                                <th>resume.pdf</th>
                                <th><button>View Profile</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </>)}



            {/*COMPANY PAGE OF NAVBAR*/}
            {pages==="company" && (<>
            
            <div className="company_page_navbar_Container">

                <header>
                    <div>
                        <h1>Companies</h1>
                    </div>

                    <div>
                        <input type="Search" name="" placeholder="Search College .." />
                    </div>
                </header>



                {/*REGISTERED COMPANIES DISPLAY HERE*/}
                <div className="registerd_company_container">
                    <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <td>Company Name</td>
                                <td>Industry</td>
                                <td>Location</td>
                                <td>Countary</td>
                                <td>State</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>TCS</th>
                                <th>IT</th>
                                <th>GURUGRAM</th>
                                <th>INDIA</th>
                                <th>Haryana</th>
                                <th><button>View Profile</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                </div>
            
            </>)}



            {/*JOB DRIVE PAGE*/}
            {pages === "JobDrives" && (<>

            <div className="jobDrive_page_container">

                <header>
                    <div>
                        <h1>Job Drive</h1>
                    </div>
                    <div style={{display:'flex', flexWrap:'wrap', gap:'2rem'}}>
                        <input type="search" name=""  placeholder="Search company .." />
                        <label htmlFor="">
                            Filter:  <select name=""  style={{padding:'0.5rem'}}>
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="Upcomming">Upcomming</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </label>
                    </div>
                    
                </header>


                {/*DISPLAY DRIVED JOB*/}
                <div className="display_drivedjobs">
                    <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <td>Drive ID</td>
                                <td>Company</td>
                                <td>Job Title</td>
                                <td>Location</td>
                                <td>Drive Date</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>TCS</th>
                                <th>Java Developer</th>
                                <th>GURUGRAM</th>
                                <th>15-AUG-26</th>
                                <th>Active</th> {/*UPCOMMING CANCELLED*/}
                                <th><button>View Profile</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            
            </>)}



            {/*APPLICATION PAGE*/}
            {pages === "Application" && (<>
            
            <div className="application_page_container">
                <header>
                    <div>
                        <h1>Applications</h1>
                    </div>

                    <div style={{display:'flex', flexWrap:'wrap', gap:'1rem'}}>
                        <input type="search" name="" placeholder="Search"  />
                        <label htmlFor="">Status 
                            <select name="" style={{padding:'0.4rem'}}>
                                <option value="All">All Status</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Applied">Applied</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </label>
                    </div>
                </header>


                {/*DISPLAY APPLIED STUDENTS*/}
                <div className="display_applied_students">
                    <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <td>Application ID</td>
                                <td>Student</td>
                                <td>Company</td>
                                <td>Job / Positoin</td>
                                <td>Applied Date</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>Rohan</th>
                                <th>TCS</th>
                                <th>Java Delveper</th>
                                <th>15-AUG-26</th>
                                <th>Active</th> {/*UPCOMMING CANCELLED*/}
                                <th><button>View Profile</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            </>)}




            {/*SHORTLISTED STUDENT PAGE*/}
            {pages === "ShortlistedStudent" && (<>
            
            <div className="shortlisted_page_container">
                <header>
                    <div>
                        <h1>Shortlisted Students</h1>
                    </div>

                    <div>
                        <input type="search" name="" placeholder="Search Student , company status ..." />
                    </div>
                </header>


                {/*DISPLAY SHORTLISTED STUDENTS*/}
                <div className="display_shortlisted_student">
                    <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <td>Student Name</td>
                                <td>Company</td>
                                <td>Job</td>
                                <td>Round</td>
                                <td>Interview Date</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>Rohan</th>
                                <th>TCS</th>
                                <th>Java Delveper</th>
                                <th>15-AUG-26</th>
                                <th>Active</th> {/*UPCOMMING CANCELLED*/}
                                <th><button>View Profile</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            </>)}



            {/*INTERVIEW PAGE*/}
            {pages === 'Interview' && (<>
            
            <div className="interview_page_container">

                <header>
                    <div>
                        <h1>Interviews</h1>
                    </div>

                    <div style={{display:'flex', flexWrap:'wrap', gap:'2rem'}}>
                        <input type="Search" name="" placeholder="Search student , company .." />
                        <label htmlFor="">Fliter : <select name="" style={{padding:'0.4rem'}}>
                            <option value="All">All</option>
                            <option value="Upcomming">Upcomming</option>
                            <option value="Active">Active</option>
                        </select></label>
                    </div>
                </header>

                {/*DISPLAY SCHEDULED INTERVIEWS*/}
                <div className="display_interview">
                    <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <td>Date & Time</td>
                                <td>Student Name</td>
                                <td>Company</td>
                                <td>Job</td>
                                <td>Round</td>
                                <td>Mode</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1 Sep 226</th>
                                <th>Rohan</th>
                                <th>TCS</th>
                                <th>Java Delveper</th>
                                <th>Technical</th>
                                <th>Online</th>
                                <th>Scheduled</th>
                                 
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            </>)}




            {/*PLACEMENT ANALYSIS PAGE*/}
            {pages === "PlacementAnalysis" && (<>
            
            <div className="placementAnalysis_page_conainer">

                <header>
                    <div>
                        <h1>Placement Analysis</h1>
                    </div>
                </header>

                {/*CARD CONTAINER FOR PLACEMENT DETAILS*/}
                <div className="card_container">

                    <div className="cards">
                        <h3>Total Students</h3>
                        <h4>1250</h4>
                    </div>

                    <div className="cards">
                        <h3>Company Visited</h3>
                        <h4>1250</h4>
                    </div>

                    <div className="cards">
                        <h3> Student Placed</h3>
                        <h4>1250</h4>
                    </div>

                    <div className="cards">
                        <h3>Average Package</h3>
                        <h4>1250</h4>
                    </div>

                    <div className="cards">
                        <h3>Highest Package</h3>
                        <h4>1250</h4>
                    </div>

                    
                </div>


                {/*DISPLAY CHARTS*/}
                <div className="display_chart">

                    {/*GRAPH*/}
                    <div className="placementTrend_chart">
                        <h3>Placement Trend Yearly</h3>
                    </div>

                    {/*DONUT CHART*/}
                    <div className="placementByDepartment">
                        <h2>Placement By Department</h2>
                    </div>

                    {/*TOP RECRUITING COMPANIES PROGRESS GRAPH*/}
                    <div className="topRecruitingCompay">
                        <h2>Top Recruiting Companies</h2>
                    </div>
                </div>
            </div>
            </>)}         



            {/*NOTIFICATION PAGE*/}
            {pages === "Notification" && (<>
            <div className="notification_page_container">
                <header>
                    <div>
                        <h1>Notifications</h1>
                        <button>Create Notification</button>
                    </div>
                </header>

                {/*NOTIFICATION CONTAINER*/}
                <div className="notification_container">
                    <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <td>Posted On</td>
                                <td>Title</td>
                                <td>Message</td>
                                <td>Target Audience</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1 Sep 226</th>
                                <th>Wipro Placement Drive</th>
                                <th>Wipro is comming for campus drive</th>
                                <th>Eligible Students</th>
                                <th>edit / delete</th>
                                 
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            </>)}    
           
        </div>
        
        </div>
    </div>
    
    </>)
}
export default College;