import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Jobs() {
 
     // STATES TO DISPLAY THE JOBS TO THE STUDENTS
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    //STATE FOR VIEW JOB POPUP
    const [selectedJob, setSelectedJob] = useState(null);
    const [showJobDetails, setShowJobDetails] = useState(false);

    //NAVIGATION
    const navigate = useNavigate();


     //FUNCTION TO FETCH THE POSTED JOB TO DISPLAY FOR STUDENTS TO APPLY
    useEffect(() => {
    
        const fetchJobs = async () => {
    
            try {
                //API TO FETCH ALL JOBS TO DISPLAY
                const resp = await fetch("https://hirebridge-ai.onrender.com/api/posted/allJobs");

                console.log("JOB STATUS:",resp.status);
                console.log("JOB OK:",resp.ok);
    
                // CHECK HTTP ERROR FIRST
                if (!resp.ok) {
                    const errorText = await resp.text();
                    console.error("JOB API ERROR:",errorText);
                    throw new Error(`Job API failed with status ${resp.status}`);
                }
    
                // CONVERT RESPONSE TO JSON
                const data = await resp.json();
                console.log("JOB RESPONSE:", data);
    
                // CHECK BACKEND RESPONSE
                if (data.success === true && Array.isArray(data.data)){

                    console.log("TOTAL JOBS:",data.data.length);
                    console.log("ALL JOBS:",data.data);
                    setJobs(data.data);
    
                } else {
    
                    console.log("NO JOB DATA FOUND");
                    setJobs([]);
                }
    
    
            } catch (error) {
    
                console.error("JOB FETCH ERROR:",error);
                setJobs([]);
            } finally {
                setLoadingJobs(false);
            }
    
        };
    
        fetchJobs();
    
    }, []);
       

    // FUNCTION TO APPLY FOR JOBS ONLY IF USER LOGGEDIN
    const applyJob=async(job)=>{

        //CHECK IF STUDENT LOGGEDIN OR NOT
        const user_id = localStorage.getItem("user_id");

        console.log("APPLY JOB");
        console.log("USER ID:", user_id);
        console.log("JOB ID:", job.job_id);

        //USER NOT LOGGED IN
        if (!user_id) {
            alert("please login to apply");
            navigate("/login");
            return;
        }

        //IF USER IS LOGGEDIN
        try {
            const resp = await fetch( `https://hirebridge-ai.onrender.com/api/application/apply/${user_id}/${job.job_id}`,{ // THIS API WILL SEND ONLY JOBID AND USER_ID TO BACKEND AND AS PER THAT THE STUDENT NAME OR PROFILE AND THE JOB DETAIL WILL BE STORED IN APPLIED_JOB TABLE AND SHOWN ON SCREEN ALSO TO TEH RECRUITER
            method:'POST'
            })

            const data = await resp.json();

            if (resp.ok && data.success === true) {
                alert("job applied successfully");
                return;
            }else{
                console.log("APPLY RESPONSE:", data);
                alert(data.message || "Unable to apply");
            }

        }catch (error) {
            console.error("APPLY JOB ERROR:", error);
            alert("Something went wrong while applying for the job.");
        }
    }

    return(<>
    
    <div className="jobs_page_container">
        <header>
            <div>
                <h1>Find Your Next Opportunity</h1>
            </div>

            <div>
                <h3>Explore jobs that match your skills and career goals</h3>
            </div>

        </header>


        {/*SEARCH CONTAINER*/}
        <div className="search_container">
            <input type="search" name="" placeholder="Search Jobs , Skills , Location ...." />

            <label htmlFor="">
                <select name="">
                    <option value="All">All Location</option> {/* run loop for display states of company from database*/}
                </select>
            </label>
        </div>


        {/*DISPLAY POSTED JOBS UPTO 10 RECENTLY POSTED */}
        <div className="posted_job_container">
            <h2>Jobs will be visible here in form of card and also button for apply and view details</h2>

            {loadingJobs ?(
                    <h4>Loading jobs....</h4>
                ):jobs.length === 0 ? (
                    <h4>No Job Available</h4>
                ):(
                    <div className="recentJob_container">
                        {jobs. reverse().map( (job)=>{
                            const recruiter = job?.recruiter_id;
                            
                            return(
                            <div className="job_cards" key={job.job_id}>
                                <div>
                                    <img src={recruiter?.comp_Logo ? `https://hirebridge-ai.onrender.com/api/recruiter_profile/company-logo/${recruiter.comp_Logo}` : "/default-company-logo.png"} alt="" />
                                    <h4>{recruiter?.company_name}</h4>
                                </div>
                                <h3>{job.job_title}</h3>
                                <h4>{job.skills}</h4>

                                <div style={{display:'flex', gap:'1rem'}}>
                                    <h4> Experience {job.min_experience} - {job.max_experience} Years</h4>
                                    <h4>{job.min_package} - {job.max_package}</h4>
                                 </div>

                                <div>
                                    <h4><strong>Location : </strong> {job.job_location}</h4>
                                    <h4><strong>Visite : </strong> <a href={recruiter?.website} target="blank"  rel="noopener noreferrer">{recruiter?.website}</a></h4>
                                   
                                </div>

                                <div>
                                    <h4>Recruiter / Hiring Contact</h4>
                                    <div>
                                        <h4><strong>Name : </strong> {recruiter ?. full_name}</h4>
                                        <h4><strong>Designation : </strong>{recruiter?.designation}</h4>
                                        <h4><strong>Email : </strong> {recruiter?.email}</h4>
                                    </div>
                                </div>

                                <div style={{display:'flex' ,gap:'1rem'}}>
                                    <button onClick={()=>{setSelectedJob(job) ; setShowJobDetails(true)}}>View Job</button>
                                    <button onClick={()=>{applyJob(job)}}>Apply</button>
                                </div>
                            </div>
                        )
                            })}
                    </div>
                )}
        </div>





        {/* FULL JOB DETAILS POPUP */}

        {showJobDetails && selectedJob && (
            <div className="job_details_overlay">
                <div className="job_details_popup">
                    {/* POPUP HEADER */}
                    <div className="job_details_header">
                        <div>
                            <h2>{selectedJob.job_title}</h2>
                            <h4>{selectedJob.company_name}</h4>
                        </div>

                        {/* CLOSE BUTTON */}
                        <button className="job_close_button" onClick={() => {setShowJobDetails(false);setSelectedJob(null);}}>×</button>
                    </div>


                    {/* JOB INFORMATION */}

                    <div className="job_details_information">

                        {/* COMPANY */}
                        <div className="job_detail_item">
                            <strong>Company</strong>
                            <p>{selectedJob.company_name || "Not available"}</p>
                        </div>

                        {/* LOCATION */}
                        <div className="job_detail_item">
                            <strong>Location</strong>
                            <p>{selectedJob.job_location || "Not available"}</p>
                        </div>

                        {/* WORK MODE */}
                        <div className="job_detail_item">
                            <strong>Work Mode</strong>
                            <p>{selectedJob.work_mode || "Not specified"}</p>
                        </div>

                        {/* EXPERIENCE */}
                        <div className="job_detail_item">
                            <strong>Experience</strong>
                            <p>{selectedJob.min_experience} -{" "}{selectedJob.max_experience} Years</p>
                        </div>

                        {/* PACKAGE */}
                        <div className="job_detail_item">
                            <strong>Salary / Package</strong>
                            <p>₹ {selectedJob.min_package} -{" "}{selectedJob.max_package}</p>
                            <small>LPA</small>
                        </div>


                        {/* SKILLS */}
                        <div className="job_detail_item">
                            <strong>Required Skills</strong>
                            <p>{selectedJob.skills || "Not specified"}</p>
                        </div>

                        {/* WEBSITE */}
                        <div className="job_detail_item">
                            <strong>Company Website</strong>
                            <p>{selectedJob.comp_website || "Not available"}</p>
                        </div>
                    </div>


                    {/* FULL JOB DESCRIPTION */}

                    <div className="job_full_description">
                        <h3>Job Description</h3>
                        <p>{selectedJob.job_description ||"No job description available."}</p>
                    </div>

                    {/* POPUP FOOTER */}
                    <div className="job_details_footer">
                        <button onClick={() => {setShowJobDetails(false);setSelectedJob(null);}}>Close</button>
                    </div>
                </div>
            </div>
        )}
    </div>
    </>)
}
export default Jobs;