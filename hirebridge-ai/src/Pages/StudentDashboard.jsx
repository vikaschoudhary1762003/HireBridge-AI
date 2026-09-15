import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";


function StudentDashboard() {

    const [pages , setPages] = useState("Dashboard"); // this will show the dashboard pages like dashboard , my profile etc.
    const [profileForm , setProfileForm] =useState("PersonalInfo");
    const [studentProfileFields , setStudentProfileFields] = useState({profile_photo:null , first_name:"" , last_name:"" , email:"" , phone:"" ,dob:"" , gender:"",address:"" , nationality:"" ,profession:"",about_me:"" , linkedin_url:""  , github_url:"" ,portfolio_url:"" , language:"" ,             certificate_name:"" , issuing_organisation:"" , issue_date:"" , certificate_url:"" , upload_certificate:[]}); // this contains form input names 
    const [showStudentProfile , setShowStudentProfile] = useState(null);
    const [studentProfileId, setStudentProfileId] = useState(null);
    const [loading, setLoading] = useState(true);

    const[educationField , setEducationField] = useState({tenSchool_name:"" , ten_board:"" ,ten_percentage:"", ten_passing:"", twelve_schoolname:"" , twelve_board:"" , twelve_stream:"" , twelve_percentage:"", twelve_passing:"" , college_name:"" , course:"" , spacialization:"" , current_semester:"" , current_year:"" , college_cgpa:"" , graduation_year:"" })
    const [savedEducation, setSavedEducation] = useState(null);// this state will hold the saved education data fetched from database.

    const[experienceFields , setExperienceFields] = useState({experience_type:"" , company_name:"" , job_title:"" , working_experience:"" , experience_certificate:null})


    const [skillFields , setSkillFields] = useState({programming_skills:"" , technical_skills:"" , tools:"" , soft_skills:""});

    const [projectFields , setProjectFields] = useState({project_name:"" , project_description:"" , project_technology:"" , project_giturl:"" , project_livedemo:"" ,project_yourrole:""})
    
    // STATES TO DISPLAY THE JOBS TO THE STUDENTS
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);


    // STATE FOR VIEW JOB POPUP
    const [selectedJob, setSelectedJob] = useState(null);
    const [showJobDetails, setShowJobDetails] = useState(false);


    //STATE TO CONTAIN OR STORE APPLIED JOB DATA
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [appliedJobsLoading, setAppliedJobsLoading] = useState(true);

    //STATE FOR INTERVIEWS PAGE
    const [studentInterviews, setStudentInterviews] = useState([]);
    const [interviewsLoading, setInterviewsLoading] = useState(true);


    //NAVIGATE TTO LAND TO THE PARTICULAR PAGE
    const navigate = useNavigate();



    // FILE INPUT HANDLE CHANGER
    const handleFileInputs=(e)=>{
        const {name ,files , multiple} = e.target;

        setStudentProfileFields(prev=> ({...prev , [name]:multiple ? Array.from(files):files[0]}))
    }


    //HANDLE INPUT CHANGER
    const handleInputs=(e)=>{
        setStudentProfileFields({...studentProfileFields ,[e.target.name]:e.target.value})
    }

    //FILE RESUME HANDLE CHANGER
    const handleResumeChange=(e)=>{
        const file = e.target.files[0];
        /*setStudentResume(file);*/
    }

    //FILE HANDLE ARRAY INPUTS
    const handleArrayInputs = (e) => {
    const { name, value } = e.target;

    setStudentProfileFields(prev => ({
        ...prev,
        [name]: value
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "")
        }));
    };


//HANDLE EDUCATION FORM INPUTS
const handleEducationInputs = (e) => {
    const { name, value } = e.target;

    setEducationField(prev => ({
        ...prev,
        [name]: value
    }));
};



// HANDLE SKILL FIELDS
const handleSkillInputs = (e) => {
    const { name, value } = e.target;

    setSkillFields(prev => ({
        ...prev,
        [name]: value
    }));
};


// HANDLE EXPERIENCE FIELDS
const handleExperienceInputs = (e) => {

    const { name, value, files, type } = e.target;

    setExperienceFields(prev => ({
        ...prev,
        [name]: type === "file" ? files[0] : value
    }));
};




//HANDLE PROJECT INPUTS
// HANDLE PROJECT INPUTS
const handleProjectInputs = (e) => {
    setProjectFields((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
};


   //FUNCTION TO SAVE PERSONAL INFORMATION OF USER
   //FUNCTION TO SAVE PERSONAL INFORMATION OF USER
const savePersonalInfo = async(e)=>{
    e.preventDefault();

    try {
        const formData = new FormData();

        // FIXED: Get the logged-in user's ID from localStorage and send it to the backend
        const currentUserId = localStorage.getItem("user_id");
        if (!currentUserId) {
            alert("User session not found. Please log in again.");
            return;
        }
        formData.append("userId", currentUserId);

        // All your other form fields remain exactly the same
        formData.append("first_name" , studentProfileFields.first_name);
        formData.append("firstName" , studentProfileFields.first_name);
        formData.append("last_name" , studentProfileFields.last_name);
        formData.append("lastName" , studentProfileFields.last_name);
        formData.append("email" , studentProfileFields.email);
        formData.append("phone" , studentProfileFields.phone);
        formData.append("dob" , studentProfileFields.dob);
        formData.append("dateOfBirth" , studentProfileFields.dob);
        formData.append("gender" , studentProfileFields.gender);
        formData.append("address" , studentProfileFields.address);
        formData.append("nationality" , studentProfileFields.nationality);
        formData.append("profession" , studentProfileFields.profession );
        formData.append("about_me" , studentProfileFields.about_me);
        formData.append("aboutMe" , studentProfileFields.about_me);
        formData.append("linkedin_url" , studentProfileFields.linkedin_url);
        formData.append("linkedinUrl" , studentProfileFields.linkedin_url);
        formData.append("github_url" , studentProfileFields.github_url);
        formData.append("githubUrl" , studentProfileFields.github_url);
        formData.append("portfolio_url" , studentProfileFields.portfolio_url);
        formData.append("portfolioUrl" , studentProfileFields.portfolio_url);
        formData.append("language" , studentProfileFields.language);

        if (studentProfileFields.profile_photo) {
    formData.append("profilePhotoFile", studentProfileFields.profile_photo);
}

        const resp = await fetch("http://localhost:8080/api/student/save_Profile_info" ,{
            method:"POST",
            body:formData
        });

        const data = await resp.json();

        if(resp.ok){
            console.log("check " , data);
            alert(data.message);
        } else {
            alert(data.message || "Failed to save profile information");
        }
    } catch (error) {
        console.log("error" , error);
    }
}




   //GET  STUDENT PERSONAL PROFILE DATA
   useEffect( ()=>{
    const user_id = localStorage.getItem("user_id");

      console.log("USER ID FROM LOCAL STORAGE:", user_id);
      if (!user_id) {
        console.log("User ID is missing from localStorage");
        setLoading(false);
        return;
    }

    //FETCH STUDENT PERSONAL INFOR FROM BACKEND
    fetch(`http://localhost:8080/api/student/getProfile/${user_id}`)
    .then(response =>{
        console.log("HTTP STATUS:", response.status);
        if(!response.ok){
            throw new Error("No Profile");
        }
        
        return response.json();
    })
    .then(data => {

    console.log("PROFILE DATA:", data);

    console.log("STUDENT PROFILE ID:", data.student_profile_id);

    setStudentProfileId(data.student_profile_id);
    setShowStudentProfile(data);
    setLoading(false);
})
    .catch(error=>{
        console.log(error);
        setLoading(false);
        
    })

   },[]);




    //SAVE EDUCATION DATA INTO EDUCATION TABLE
    const saveEducationData = async (e) => {

    e.preventDefault();

    // CHECK STUDENT PROFILE ID
   
    if (!studentProfileId) {
        alert("Student Profile ID not found");
        return;
    }


    try {
        // API TO SEND DATA TO SAVE INTO DATABASE

        const resp = await fetch(`http://localhost:8080/api/student_education/education_data/${studentProfileId}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(educationField)
            }
        );

        console.log("HTTP STATUS:",resp.status );
        const data = await resp.json();
        console.log("BACKEND RESPONSE:",data);

        //ERRORA

        if (!resp.ok) {

            alert(
                data.message ||
                "Unable to save education data"
            );

            return;
        }


        // SUCCESS
        if (data.success) {
            alert(data.message);
            //EMPTY ALL FIELDS
            setEducationField({tenSchool_name:"" , ten_board:"" ,ten_percentage:"", ten_passing:"", twelve_schoolname:"" , twelve_board:"" , twelve_stream:"" , twelve_percentage:"", twelve_passing:"" , college_name:"" , course:"" , spacialization:"" , current_semester:"" , current_year:"" , college_cgpa:"" , graduation_year:"" });
        }

    } catch (error) {
        console.error("ERROR SAVING EDUCATION:",error);
        alert("Something went wrong while saving education");
    }
};
     


     // GET STUDENT EDUCATION DATA
useEffect(() => {

    if (!studentProfileId) {
        console.log("Education: Student Profile ID not available yet");
        return;
    }

    console.log(
        "FETCHING EDUCATION FOR STUDENT PROFILE ID:",
        studentProfileId
    );

    fetch(
        `http://localhost:8080/api/student_education/getEducation_Data/${studentProfileId}`
    )
        .then(response => {

            console.log("EDUCATION HTTP STATUS:", response.status);

            if (!response.ok) {
                throw new Error(
                    `Education API failed with status ${response.status}`
                );
            }

            return response.json();
        })
        .then(data => {

            console.log("========== EDUCATION DATA RECEIVED ==========");
            console.log("FULL EDUCATION RESPONSE:", data);

            if (data.success && data.data) {

                console.log("EDUCATION DATA:", data.data);

                // Store fetched education data
                setSavedEducation(data.data);

                // Put database data into form fields
                setEducationField({
                    tenSchool_name: data.data.tenSchool_name || "",
                    ten_board: data.data.ten_board || "",
                    ten_percentage: data.data.ten_percentage || "",
                    ten_passing: data.data.ten_passing || "",

                    twelve_schoolname: data.data.twelve_schoolname || "",
                    twelve_board: data.data.twelve_board || "",
                    twelve_stream: data.data.twelve_stream || "",
                    twelve_percentage: data.data.twelve_percentage || "",
                    twelve_passing: data.data.twelve_passing || "",

                    college_name: data.data.college_name || "",
                    course: data.data.course || "",
                    spacialization: data.data.spacialization || "",
                    current_semester: data.data.current_semester || "",
                    current_year: data.data.current_year || "",
                    college_cgpa: data.data.college_cgpa || "",
                    graduation_year: data.data.graduation_year || ""
                });

            } else {

                console.log(
                    "No education data found:",
                    data.message
                );
            }

        })
        .catch(error => {

            console.error(
                "ERROR FETCHING EDUCATION DATA:",
                error
            );

        });

}, [studentProfileId]);






    //FUNCTION TO SAVE SKILLS INTO DATABASE
    const saveSkills=async(e)=>{
        e.preventDefault();

        try {
            
            //REST API TO SEND FRONTEND DATA TO BACKEND 
            const resp = await fetch(`http://localhost:8080/api/student_skills/skillData/${studentProfileId}`, {
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(skillFields)
                }
            )


            //response data
            const data = await resp.json()
            console.log("skill data" , data);

            if (data.success === true) {
                alert(data.message);
                setSkillFields({programming_skills:[] , technical_skills:[] , tools:[] , soft_skills:[]});
                return;
            }
            else if(data.success === false){
                alert(data.message);
                return;
            }
            
        } catch (error) {
            console.log("skills error" , error);
            
        }
    }




      // GET STUDENT SKILLS DATA
useEffect(() => {

    if (!studentProfileId) {
        console.log("Skills: Student Profile ID not available yet");
        return;
    }

    console.log(
        "FETCHING SKILLS FOR STUDENT PROFILE ID:",
        studentProfileId
    );

    fetch(
        `http://localhost:8080/api/student_skills/getskilldata/${studentProfileId}`
    )
        .then(response => {

            console.log("SKILLS HTTP STATUS:", response.status);

            if (!response.ok) {
                throw new Error(
                    `Skills API failed with status ${response.status}`
                );
            }

            return response.json();
        })
        .then(data => {

            console.log("========== SKILLS DATA RECEIVED ==========");
            console.log("FULL SKILLS RESPONSE:", data);

            if (data.success && data.data) {

                console.log("SKILLS DATA:", data.data);

                setSkillFields({
                    programming_skills:
                        data.data.programming_skills || "",

                    technical_skills:
                        data.data.technical_skills || "",

                    tools:
                        data.data.tools || "",

                    soft_skills:
                        data.data.soft_skills || ""
                });

            } else {

                console.log(
                    "No skills data found:",
                    data.message
                );
            }

        })
        .catch(error => {

            console.error(
                "ERROR FETCHING SKILLS DATA:",
                error
            );

        });

}, [studentProfileId]);







   //FUNCTION TO SAVE EXPERIENCE DATA
   const saveExperience=async(e)=>{
    e.preventDefault();

    try {

        //FORMDATA
        const formData = new FormData();

        formData.append("company_name" , experienceFields.company_name);
        formData.append("experience_type" , experienceFields.experience_type);
        formData.append("job_title" , experienceFields.job_title);
        formData.append("working_experience" , experienceFields.working_experience);
        

        //UPLOAD IMG ,PDF ETC FILE TO DASHBOARD
        if (experienceFields.experience_certificate) {
            formData.append("experience_certificate" , experienceFields.experience_certificate);
        }

        //RESP API
        const resp = await fetch(`http://localhost:8080/api/student_experience/experienceData/${studentProfileId}`,{
            method:'POST',
            body:formData
        })


        const data = await resp.json();
        console.log("experiencdata : " , data);

        if (data.success === true) {
            alert(data.message);
            setExperienceFields({experience_type:"" , company_name:"" , profession:"" , working_experience:""  , experience_certificate:null});
            return ;
        }else if(data.success === false){
            alert(data.message);
            return;
        }
        
    } catch (error) {
        console.log("experince error" , error);
        
    }
   }


     // GET STUDENT EXPERIENCE DATA
useEffect(() => {

    if (!studentProfileId) {
        console.log("Experience: Student Profile ID not available yet");
        return;
    }

    console.log(
        "FETCHING EXPERIENCE FOR STUDENT PROFILE ID:",
        studentProfileId
    );

    fetch(
        `http://localhost:8080/api/student_experience/getExpData/${studentProfileId}`
    )
        .then(response => {

            console.log(
                "EXPERIENCE HTTP STATUS:",
                response.status
            );

            if (!response.ok) {
                throw new Error(
                    `Experience API failed with status ${response.status}`
                );
            }

            return response.json();
        })
        .then(data => {

            console.log(
                "========== EXPERIENCE DATA RECEIVED =========="
            );

            console.log(
                "FULL EXPERIENCE RESPONSE:",
                data
            );

            if (data.success && data.data) {

                console.log(
                    "EXPERIENCE DATA:",
                    data.data
                );

                // IMPORTANT:
                // Experience data goes into experienceFields
                // NOT skillFields

                setExperienceFields({
                    experience_type:
                        data.data.experience_type || "",

                    company_name:
                        data.data.company_name || "",

                    job_title:
                        data.data.job_title || "",

                    working_experience:
                        data.data.working_experience || "",

                    experience_certificate:
                        data.data.experience_certificate || null
                });

            } else {

                console.log(
                    "No experience data found:",
                    data.message
                );
            }

        })
        .catch(error => {

            console.error(
                "ERROR FETCHING EXPERIENCE DATA:",
                error
            );

        });

}, [studentProfileId]);






   //FUNCTION TO UPLOAD PROJECT
   const uploadProject=async(e)=>{
    e.preventDefault();

    try {
        
        //API
        const resp = await fetch(`http://localhost:8080/api/student_project/uploadProject/${studentProfileId}`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(projectFields)
        })

        //data
        const data = await resp.json()
        console.log("project data" , data);

        if(data.success === true){
            alert(data.message);
            setProjectFields({project_name:"" , project_description:"" , project_technology:"" , project_giturl:"" , project_livedemo:"" ,project_yourrole:""})
            return;
        }
        else if(data.success === false){
            alert(data.message);
            return;
        }

    } catch (error) {
        console.log("project error" , error);
        
    }
   }



   //FUNCTION TO FETCH THE POSTED JOB TO DISPLAY FOR STUDENTS TO APPLY
  // =========================================================
// FETCH ALL POSTED JOBS FOR STUDENTS
// =========================================================

useEffect(() => {

    const fetchJobs = async () => {

        try {

            console.log(
                "========== FETCHING ALL JOBS =========="
            );

            const resp = await fetch(
                "http://localhost:8080/api/posted/allJobs"
            );

            console.log(
                "JOB STATUS:",
                resp.status
            );

            console.log(
                "JOB OK:",
                resp.ok
            );


            // CHECK HTTP ERROR FIRST
            if (!resp.ok) {

                const errorText =
                    await resp.text();

                console.error(
                    "JOB API ERROR:",
                    errorText
                );

                throw new Error(
                    `Job API failed with status ${resp.status}`
                );
            }


            // CONVERT RESPONSE TO JSON
            const data =
                await resp.json();


            console.log(
                "JOB RESPONSE:",
                data
            );


            // CHECK BACKEND RESPONSE
            if (
                data.success === true &&
                Array.isArray(data.data)
            ) {

                console.log(
                    "TOTAL JOBS:",
                    data.data.length
                );

                console.log(
                    "ALL JOBS:",
                    data.data
                );

                setJobs(
                    data.data
                );

            } else {

                console.log(
                    "NO JOB DATA FOUND"
                );

                setJobs([]);
            }


        } catch (error) {

            console.error(
                "JOB FETCH ERROR:",
                error
            );

            setJobs([]);

        } finally {

            setLoadingJobs(false);
        }

    };


    fetchJobs();

}, []);
   


//FUNCTION TO APPLY JOB
const applyJob=async(job)=>{

    //CHECK IF STUDENT LOGGEDIN OR NOT
    const user_id = localStorage.getItem("user_id");
    console.log("APPLY JOB");
    console.log("USER ID:", user_id);
    console.log("JOB ID:", job.job_id);

    //USER NOT LOGGED IN
    if (!user_id) {
        alert("please login to apply");
        Nevigation("/login");
        return;
    }

    //IF USER IS LOGGEDIN
    try {
        const resp = await fetch( `http://localhost:8080/api/application/apply/${user_id}/${job.job_id}`,{ // THIS API WILL SEND ONLY JOBID AND USER_ID TO BACKEND AND AS PER THAT THE STUDENT NAME OR PROFILE AND THE JOB DETAIL WILL BE STORED IN APPLIED_JOB TABLE AND SHOWN ON SCREEN ALSO TO TEH RECRUITER
            method:'POST'
        })

        const data = await resp.json();

        if (resp.ok && data.success === true) {
            alert("job applied successfully");
            fetchAppliedJobs();
            return;
        }else{
            alert("unable to apply");
        }

    } catch (error) {
        console.error("APPLY JOB ERROR:", error);
        alert("Something went wrong while applying for the job.");

    }
}




//FUNCTIO TO FETCH APPLIED JOBS
const fetchAppliedJobs=async()=>{
    const user_id = localStorage.getItem("user_id");
    if(!user_id){
        setAppliedJobs([]);
        setAppliedJobsLoading(false);
        return;
    }

    //API TO FETCH APPLIED JOB DATA
    try {
        
        //API
        const resp = await fetch(`http://localhost:8080/api/application/student/${user_id}`);

        if(!resp.ok){
            throw new Error("fail to fetch applied job");
        }

        //data
        const data = await resp.json();
        console.log("applied job data " , data);
        setAppliedJobs(data);
        
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setAppliedJobs([]);

    }finally{
        setAppliedJobsLoading(false);
    }
}
//USESFFECT TO FETCH APPLIED_JOB DATA
useEffect( ()=>{
    fetchAppliedJobs();
},[])

    //FUNCTION TO LOGOUT FROM PLATEFORM
    const handleLogout = () => {
        const user_id = localStorage.removeItem("user_id");
        const user_role  =localStorage.removeItem("user_role");
        console.log("LOGOUT USER ID " , user_id);
        console.log("LOGOUT USERROLE" , user_role);
        alert("loggout successfully");
        navigate("/");

    };







    //FUNCTION TO GENERATE AI RESUME
    const generateAiResume =async()=>{

        try {
            //API TO GENERATE RESUME
            const resp = await fetch("http://localhost:8080/api/ai-resume/generate", {
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    //STUDENT PERSONAL PROFILE OR INFO
                    studentProfileFields,
                    //EDUCATION 
                    educationField,
                    //SKILLS
                    skillFields,
                    //EXPERIENCE FILEDS
                    experienceFields,
                    //PROJECTS
                    projectFields
                })
            })

            //status
            console.log("AI RESUME HTTP STATUS" , resp.status);
            
            //DATA
            const data = await resp.json();
            console.log("AI RESUME DATA" , data);
            
            if (resp.ok && data.success === true) {
                console.log("GENERATED RESUME", data.resume);
                alert("AI resume generated successfully");
            }else{
                alert(data.message || "Failed to generate resume")
            }


        } catch (error) {
            console.log("AI RESUME ERROR" , error);
            alert("something went wrong while generating ai resumer");
        }
    }
    


    //FUNTION TO GET DATA FOR INTEVIEWS PAGE LIKE COMPANY NAME RECRUITER ETC,
    const getCompInterviewDetail = async()=>{

        const user_id = localStorage.getItem("user_id");
        console.log("Student / User id" , user_id);
        
        //check if student loggedin or not
        if (!user_id) {
            alert("student id not found");
            setInterviewsLoading(false);
            return;
        }


        try {
            setInterviewsLoading(true);

            //API TO RECIEVE COMPANY AND INTERVIEW DETAILS
            const resp = await fetch(`http://localhost:8080/api/scheduled_interview/student/${user_id}`)
            console.log("RECRUITER PROFILE HTTP STATUS" , resp.status);

            if (!resp.ok) {
                throw new Error(`Interview API failed: ${resp.status}`);
            }
            //DATA
            const data = await resp.json();
            console.log("RECRUITER PROFIEL INTERIVE DATA" , data);

            //STORE DATA FOR INTERVIEWS PAGE INTO STATE TO DISPLAY ON UI
            setStudentInterviews(Array.isArray(data.data)? data.data:[]);


            
        } catch (error) {
            console.log("ERROR FETCHING RECRUTER PROFILE IN INTERVIEW", error);
            setStudentInterviews([]);   
        }finally{
            setInterviewsLoading(false);
        }
    }
    useEffect( ()=>{
        if (pages === "Interviews") {
            getCompInterviewDetail();
        }
    },[pages])
    
    return(<>


    <div className="studentDashboard_container">

        {/* SIDE BAR */}
        <div className="sidebar_container">
            <nav>
                <h3>Welcome </h3>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("Dashboard")}}>Dashboard</a>
                <a href="#" onClick={(e)=>{e.preventDefault() ; setPages('Myprofile')}}>My Profile</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("Project")}}>Project</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("Resume")}}>Resume</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("Jobs")}}>Jobs</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("Interviews")}}>Interviews</a>
                <a href="#">Setting</a>
                <a href="#" onClick={handleLogout}>Logout</a>
            </nav>
        </div>


        {/* STUDENT HOME DASHBOARD */}
        <div className="studentHomeDashboard_container">

            {/* DASHBOARD PAGE */}
            {pages === 'Dashboard' && (<>
            <div className="dashboard_container">

            <div className="progress_cards">

                <div className="cards">
                    <h3>Available Jobs</h3>
                    <h4>57</h4>
                </div>

                <div className="cards">
                    <h3>My Applications</h3>
                    <h4>57</h4>
                </div>

                <div className="cards">
                    <h3>Shortlisted</h3>
                    <h4>57</h4>
                </div>

            </div>

            {/* RECENT JOB AVAILABLES */}
            <div className="appliedJob_container">
                <h2>APPLIED JOBS </h2>
                {appliedJobs.length === 0 ?(
                    <h4>No applied job</h4>
                ):(
                    appliedJobs.map( (application)=>{
                        const job = application?.job;
                        const recruiter = job?.recruiter_id;

                        return(
                        <div className="appliedJob_cards" key={application.application_id}>
                            <div style={{display:'flex', gap:'2rem', justifyContent:'space-between'}}>
                                <div  style={{display:'flex', gap:'2rem'}}> 
                                    <img src={job?.comp_Logo ? `http://localhost:8080/api/recruiter_profile/company-logo/${job.comp_Logo}`: "/default-company-logo.png"} alt="" />
                                    <h4>{recruiter?.company_name}</h4>
                                </div>
                                <div>
                                    <h4>{application.application_status}</h4>
                                </div>
                            </div>

                            <h4>{job?.job_title}</h4>
                            <h4>{job?.skills}</h4>
                            <div style={{display:'flex', gap:'1rem'}}>
                                <h4>{job?.min_experience} - {job?. max_experience} Years</h4>
                                <h4>{job?.job_location}</h4>
                            </div>
                            <h4>{job?.min_package} - {job?.max_package}</h4>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <h4><strong>Visite : </strong> <a href={job.recruiter_id?.website} target="blank">{job.recruiter_id?.website}</a></h4>
                                <h4>Contact Person</h4>
                                <div>
                                <h4>{job.recruiter_id?.full_name}</h4>
                                <h4>{job.recruiter_id?.designation}</h4>
                                <h4>Email : <a href="{job.recruiter_id?.email}">{job.recruiter_id?.email}</a></h4>
                                </div>
                            </div>


                            <div>
                                <button>View Job</button>
                            </div>
                             
                            
                        </div>
                        )
                    }

                    )
                )}
            
            </div>

            </div>
            </>)}



            {/* MY PROFILE PAGE*/}
            {pages === 'Myprofile' && (<>
            
            <div className="myprofile_container">
                {/*HEADER CONTAINER*/}
                <div className="header">
                    <div className="heading">
                        <h3>My Profile</h3>
                        <h5>Manage your profile information and build your professional identity </h5>
                    </div>

                    <div className="profile_complition">
                        <h5>Profile Completion</h5>
                        <h5>90 %</h5>
                    </div>
                </div>

                {/*STUDENT PROFILE CARD*/}
                <div className="student_profile_card_container">
                    <div className="profile_card">
                        <div className="image_container">
                            <img src={`http://localhost:8080/api/student/profile-photo/${showStudentProfile?.profile_photo}`} alt="" />
                        </div>

                        <div className="profile_info">
                            <div>
                                <h2>{showStudentProfile?.first_name} {showStudentProfile?.last_name}</h2>
                                <h4>{showStudentProfile?.profession?.trim() || "--"}</h4>
                                <h4 style={{color:"black", fontWeight:'bold'}}>{skillFields?.programming_skills}</h4>
                            </div>
                            
                            <div style={{display:'flex', gap:'1rem'}}>
                                <h5>{showStudentProfile?.email}</h5>
                                <h5>+ {showStudentProfile?.phone}</h5>
                            </div>
                            <div style={{display:'flex', gap:'1rem'}}>
                                <h5> {showStudentProfile?.address}</h5>
                                <h5>DOB :{showStudentProfile?.dob}</h5>
                            </div>
                            <div style={{display:'flex',flexDirection:'column', gap:'0.3rem'}}>
                                <h5>{showStudentProfile?.gender}</h5>
                                <h5>About Me</h5>
                            <h5>{showStudentProfile?.about_me}</h5>
                            </div>

                        </div>

                    </div>
                    <div className="quick_summary">
                        <h3>Quick Summary</h3>

                        <div>
                            <h4><h3>College Name :</h3> {savedEducation?.college_name || "Not Added"}</h4>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between' , padding:'0rem 4rem 0rem 0rem'}}>
                            <div>
                                <h5>Degree</h5>
                                <h4>{savedEducation?.course || "Not Added"}</h4>
                            </div>
                            <div>
                                <h5>CGPA</h5>
                                <h4>{educationField.college_cgpa}</h4>
                            </div>
                            
                        </div>

                        <div style={{display:'flex', justifyContent:'space-between', padding:'0rem 3rem 0rem 0rem'}}>
                            <div>
                                <h5>Spacialization</h5>
                                <h4>{educationField.spacialization}</h4>
                            </div>
                            <div>
                                <h5>Graduation Year</h5>
                                <h4>{educationField.graduation_year}</h4>
                            </div>
                        </div>

                    
                        <div style={{display:'flex', justifyContent:'space-between', padding:'0rem 0rem 0rem 0rem'}}>
                            <div>
                                <h5>Companies Exp</h5>
                                <h4>{experienceFields.company_name}</h4>
                            </div>
                        </div>

                    </div>
                </div>



                {/* PROFILE NAV */}
                <div className="profile_Nav_container">
                    <nav>
                        <a href="#" onClick={(e)=>{e.preventDefault(); setProfileForm("PersonalInfo")}}>Personal Info</a>
                        <a href="#" onClick={(e)=>{e.preventDefault(); setProfileForm("Education")}}>Education</a>
                        <a href="#" onClick={(e)=>{e.preventDefault(); setProfileForm("Skills")}}>Skills</a>
                        <a href="#" onClick={(e)=>{e.preventDefault(); setProfileForm("Experience")}}>Experience</a>
                     </nav>
                </div>



                {/*PROFILE DATA FORMS */}
                {profileForm === "PersonalInfo" && (<>
                
                <div className="personalInfo_form_container">

                    <div style={{display:'flex', justifyContent:'space-between', padding:'1rem'}}>
                        <h3>Personal Information</h3>
                        <h3>Edit</h3>
                    </div>

                    <form>

                        <div>
                            <label htmlFor="">Profile Photo : <input type="file" name="profile_photo" accept="image/*" onChange={handleFileInputs}/></label>
                        </div>

                        <div>
                            <input type="text" name="first_name" placeholder="First Name"  value={studentProfileFields.first_name} onChange={handleInputs}/>
                            <input type="text" name="last_name" placeholder="Last Name" value={studentProfileFields.last_name} onChange={handleInputs}/>
                        </div>

                        <div>
                            <input type="email" name="email" placeholder="Email" value={studentProfileFields.email} onChange={handleInputs}/>
                            <input type="text" name="phone" placeholder="Phone" value={studentProfileFields.phone} onChange={handleInputs} />
                        </div>

                        <div>
                            DOB : <input type="date" name="dob" placeholder="DOB" value={studentProfileFields.dob} onChange={handleInputs}/>
                            <input type="text" name="gender" placeholder="Gender" value={studentProfileFields.gender} onChange={handleInputs}/>
                        </div>

                        <div>
                            <input type="text" name="address" placeholder="Address" value={studentProfileFields.address} onChange={handleInputs}/>
                            <input type="text" name="nationality" placeholder="Nationality"  value={studentProfileFields.nationality} onChange={handleInputs}/>
                            <input type="text" name="profession" placeholder="Profession"  value={studentProfileFields.profession} onChange={handleInputs}/>
                            <input type="text" name="about_me" placeholder="About Me" value={studentProfileFields.about_me} onChange={handleInputs}/>
                        </div>

                        <div>
                            <label htmlFor="">LinkedIn : <input type="text" name="linkedin_url" placeholder="URL" value={studentProfileFields.linkedin_url} onChange={handleInputs}/></label>
                            <label htmlFor="">GitHub : <input type="text" name="github_url" placeholder="URL" value={studentProfileFields.github_url} onChange={handleInputs}/></label>
                        </div>

                        <div>
                            <label htmlFor="">Porfolio : <input type="text" name="portfolio_url" placeholder="URL" value={studentProfileFields.portfolio_url} onChange={handleInputs}/></label>
                            <label htmlFor="">Language 
                                <select name="language" value={studentProfileFields.language} onChange={handleInputs}>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>
                            </label>
                        </div>
                    </form>
                    <div className="saveForm" style={{display:'flex' ,width:'100%', justifyContent:'center', padding:'1rem'}}>
                        <button type="button" style={{width:'15rem', padding:'0.5rem', borderRadius:'0.5rem'}} onClick={savePersonalInfo} >Save</button>
                    </div>
                </div>
                </>)}



                {/*EDUCTAION INFO */}
                {profileForm === "Education" && (<>
                
                <div className="education_form_container">
                    <div style={{display:'flex', justifyContent:'space-between', padding:'1rem'}}>
                        <h3>Education</h3>
                       <button type="button">  Edit </button>
                    </div>

                     <form>

                         <div className="cards">
                            <div>
                                <h3>10th Secondary Education</h3>
                            </div>

                            <div>
                                <input type="text" name="tenSchool_name" placeholder="School Name" value={educationField.tenSchool_name} onChange={handleEducationInputs}/>
                                <input type="text" name="ten_board" placeholder="Board" value={educationField.ten_board} onChange={handleEducationInputs}/>
                            </div>

                            <div>
                                <input type="text" name="ten_percentage"  placeholder="Percentae / CGPA"  value={educationField.ten_percentage} onChange={handleEducationInputs}/>
                                <label htmlFor="">Passing Year : <input type="text" name="ten_passing" id="" value={educationField.ten_passing} onChange={handleEducationInputs}/></label>
                            </div>
                         </div>


                         <div className="cards">
                            <div>
                                <h3>12th Higher Secondary</h3>
                            </div>

                            <div>
                                <input type="text" name="twelve_schoolname" placeholder="School Name" value={educationField.twelve_schoolname} onChange={handleEducationInputs}/>
                                <input type="text" name="twelve_board" placeholder="Board" value={educationField.twelve_board} onChange={handleEducationInputs}/>
                            </div>

                            <div>
                                <label htmlFor="">Stream : <select name="twelve_stream" value={educationField.twelve_stream} onChange={handleEducationInputs}>
                                    <option value="Science">Science</option>
                                    <option value="Arts">Arts</option>
                                    <option value="Commerce">Commerce</option>
                                </select></label>
                            </div>

                            <div>
                                <input type="text" name="twelve_percentage"  placeholder="Percentae / CGPA" value={educationField.twelve_percentage} onChange={handleEducationInputs}/>
                                <label htmlFor="">Passing Year : <input type="text" name="twelve_passing" placeholder="Passing Year" value={educationField.twelve_passing} onChange={handleEducationInputs}/></label>
                            </div>
                         </div>



                         <div className="cards">

                            <div style={{display:'flex', justifyContent:'space-between', padding:'1rem'}}>
                                <h3>Graduation</h3>
                                <h3>Edit</h3>
                            </div>

                            <div>
                                <input type="text" name="college_name" placeholder="College / University" value={educationField.college_name} onChange={handleEducationInputs} />
                                <input type="text" name="course" placeholder="Degree / Course" value={educationField.course} onChange={handleEducationInputs}  />
                            </div>

                            <div>
                                <input type="text" name="spacialization" placeholder="Spacialization" value={educationField.spacialization} onChange={handleEducationInputs} />
                                <label htmlFor="">Current Semester : <select name="current_semester" value={educationField.current_semester} onChange={handleEducationInputs} >
                                    <option value="1">1st</option>
                                    <option value="2">2nd</option>
                                    <option value="3">3rd</option>
                                    <option value="4">4th</option>
                                    <option value="5">5th</option>
                                    <option value="6">6th</option>
                                    <option value="7">7th</option>
                                    <option value="8">8th</option>
                                </select></label>

                                <label htmlFor="">Year : <input type="number" name="current_year" min="1900" max="2099" step="1" value={educationField.current_year} onChange={handleEducationInputs} /></label>
                            </div>

                            <div>
                                <input type="text" name="college_cgpa" placeholder="CGPA" value={educationField.college_cgpa} onChange={handleEducationInputs}  />
                                <label htmlFor="">Graduation Year : <input type="date" name="graduation_year"  value={educationField.graduation_year} onChange={handleEducationInputs}  /></label>
                            </div>
                            
                         </div>
                     </form>

                     <div style={{display:'flex', padding:'0.5rem', justifyContent:'center'}}>
                        <button type="button"style={{padding: '0.5rem',borderRadius: '0.5rem',width: '15rem'}}onClick={saveEducationData}> Save</button>
                     </div>
                </div>
                
                </>)}



                {/* SKILLS */}
                {profileForm === "Skills" && (<>
                
                <div className="skill_form_container">
                    <div style={{display:'flex', justifyContent:'space-between', padding:'1rem'}}>
                        <h3>Skills</h3>
                        <h3>Edit</h3>
                    </div>
                    
                    <form>
                        <label htmlFor="">Programming Skills : <input type="text" name="programming_skills" value={skillFields.programming_skills} onChange={handleSkillInputs}/></label>
                        <label htmlFor="">Technical Skills : <input type="text" name="technical_skills" value={skillFields.technical_skills} onChange={handleSkillInputs}/></label>
                        <label htmlFor="">Tools & Technologies : <input type="text" name="tools" value={skillFields.tools} onChange={handleSkillInputs}/></label>
                        <label htmlFor="">Soft Skills : <input type="text" name="soft_skills" value={skillFields.soft_skills} onChange={handleSkillInputs}/></label>
                    </form>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <button type="button" style={{padding:'0.5rem', width:'15rem', borderRadius:'0.5rem'}} onClick={saveSkills}>Save Skills</button>
                    </div>
                </div>
                </>)}



                {/*EXPERIENCE FORM */}
                {profileForm ==="Experience" && (<>
                
                <div className="experience_form_container">
                    <div style={{display:'flex', justifyContent:'space-between', padding:'1rem'}}>
                        <h3>Internship / Experience</h3>
                        <h3>Edit</h3>
                    </div>
                    <form >

                        <label htmlFor="">Experience Type : 
                            <select name="experience_type" value={experienceFields.experience_type} onChange={handleExperienceInputs}>
                                <option value="Internship">Internship</option>
                                <option value="partTime">Part-Time Job</option>
                                <option value="Freelancer">Freelancer Work</option>
                                <option value="FullTIME">Full Time Experience</option>
                            </select>
                        </label>
                        <label htmlFor="">Company Name : <input type="text" name="company_name" value={experienceFields.company_name} onChange={handleExperienceInputs}/></label>
                        <label htmlFor="">Job Title / Role : <input type="text" name="job_title" value={experienceFields.job_title} onChange={handleExperienceInputs}/></label>
                        <label htmlFor="">Experience : <input type="text" name="working_experience"  placeholder="Experience of working" min="0" value={experienceFields.working_experience} onChange={handleExperienceInputs} /></label>
                        <label htmlFor="">Experience Certificate : <input type="file" name="" accept=".pdf,.jpg,.jpeg,.png" value={experienceFields.experience_certificate}  onChange={handleExperienceInputs}/></label>
                    </form>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <button type="button" style={{padding:'0.5rem', width:'15rem', borderRadius:'0.5rem'}} onClick={saveExperience}>Save Experience</button>
                    </div>
                </div>
                </>)}
                
            </div>
            </>)}


            {/* PROJECT PAGE */}
            {pages ==="Project" && (<>
            
            <div className="project_page_container">
                <div className="heading">
                    <h2>My Projects</h2>
                    <button type="button" onClick={(e)=>{e.preventDefault(); setPages("projectForm")}}>+ Project</button>
                </div>

                {/* DISPLAY ALL PROJECTS */}
                <div className="display_project_container">
                    <h2>Uploaded projects will be display here in form of cards</h2>
                </div>
            </div>
            </>)}

            {pages ==="projectForm" && (<>
            
            <div className="project_form_container">
                <form>
                    <input type="text" name="project_name" placeholder="Project Name"  value={projectFields.project_name} onChange={handleProjectInputs}/>
                    <input type="text" name="project_description" placeholder="Description" value={projectFields.project_description} onChange={handleProjectInputs}/>
                    <input type="text" name="project_technology" placeholder="Technology" value={projectFields.project_technology} onChange={handleProjectInputs}/>
                    <input type="text" name="project_giturl" placeholder="Github URL" value={projectFields.project_giturl} onChange={handleProjectInputs}/>
                    <input type="text" name="project_livedemo" placeholder="Live Demo Url" value={projectFields.project_livedemo} onChange={handleProjectInputs}/>
                    <input type="text" name="project_yourrole" placeholder="Your Role"  value={projectFields.project_yourrole} onChange={handleProjectInputs}/>
                    <button type="button"  onClick={uploadProject}>Upload Project</button>
                    <button type="button" onClick={(e)=>{e.preventDefault(); setPages("Project")}}>Cancell</button>
                </form>
            </div>
            </>)}





            {/*RESUME PAGE*/}
            {pages === "Resume" && (
            <div className="resume_page_container">

        {/* PAGE HEADING */}
        <div className="heading">
            <h2>My Resume</h2>
            <p>
                Create, improve and manage your professional resume.
            </p>
        </div>


        {/* ================= AI RESUME ANALYZER ================= */}

        <div className="ai_resume_builder_container">

            <div className="heading">
                <h3>🤖 AI Resume Analyzer</h3>

                <p>
                    Upload your existing resume and get AI-powered
                    suggestions based on your target job.
                </p>
            </div>


            {/* AI FILE */}

            <div className="ai_resume">

                <h3>📄 Upload Resume for AI Analysis</h3>

                <p>
                    AI will analyze your resume and suggest
                    improvements.
                </p>

                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                />

                <small>
                    PDF, JPG and PNG supported
                </small>

            </div>


            {/* TARGET ROLE */}

            <div className="target_role">

                <label>
                    Target Role
                </label>

                <input
                    type="text"
                    placeholder="e.g. Java Developer"
                />


                <label>
                    Experience Level
                </label>

                <div className="experience_options">

                    <label>
                        <input
                            type="radio"
                            name="experience"
                        />
                        Fresher
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="experience"
                        />
                        0-1 Year
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="experience"
                        />
                        1-3 Years
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="experience"
                        />
                        3-5 Years
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="experience"
                        />
                        5+ Years
                    </label>

                </div>

            </div>


            <button className="analyze_resume_btn" onClick={generateAiResume}>
                Generate Resume 🤖
            </button>

        </div>

    </div>
)}

          

          {/*APPLICATION PAGE */}
          {pages ==="Jobs" &&(<>
          
          <div className="applicaton_page_container">
            <div className="heading">
                <h2>My Jobs</h2>
                <label htmlFor="">Search Job : <input type="search" name=""  placeholder="Job Role , Skills , locations ..." /> <button>Search</button></label>
            </div>

            <div className="jobs">
                <h2>Filterd jobs by AI as per student skills</h2>
                {loadingJobs ?(
                    <h4>Loading jobs....</h4>
                ):jobs.length === 0 ? (
                    <h4>No Job Available</h4>
                ):(
                    <div className="recentJob_container">
                        {jobs. reverse().map( (job)=>{
                            console.log("FILTERED JOB:", jobs);

                            return(
                             <div className="job_cards" key={job.job_id}>
                                <div>
                                    <img src={job.recruiter_id?.comp_Logo || ""} alt="" />
                                    <h4>{job.recruiter_id?.company_name}</h4>
                                </div>
                                <h3>{job.job_title}</h3>
                                <h4>{job.skills}</h4>

                                <div>
                                    <h4>{job.min_experience} - {job.max_experience} Years</h4>
                                 </div>

                                <h4>{job.min_package} - {job.max_package}</h4>

                                <div>
                                    <h4><strong>Location : </strong> {job.job_location}</h4>
                                    <h4><strong>Visite : </strong> <a href={job.recruiter_id?.website} target="blank">{job.recruiter_id?.website}</a></h4>
                                </div>

                                <div style={{display:'flex', gap:'1rem'}}>
                                    <button onClick={()=>{setSelectedJob(job) ; setShowJobDetails(true)}}>View Job</button>
                                    <button onClick={()=>applyJob(job)}>Apply</button>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                )}
            </div>

            
          </div>
          </>)}



           


            {/* ================================================= */}
        {/* FULL JOB DETAILS POPUP */}
        {/* ================================================= */}

        {showJobDetails && selectedJob && (

            <div className="job_details_overlay">

                <div className="job_details_popup">


                    {/* POPUP HEADER */}

                    <div className="job_details_header">

                        <div>

                            <h2>
                                {selectedJob.job_title}
                            </h2>

                            <h4>
                                {selectedJob.company_name}
                            </h4>

                        </div>


                        {/* CLOSE BUTTON */}

                        <button
                            className="job_close_button"
                            onClick={() => {
                                setShowJobDetails(false);
                                setSelectedJob(null);
                            }}
                        >
                            ×
                        </button>

                    </div>


                    {/* JOB INFORMATION */}

                    <div className="job_details_information">


                        {/* COMPANY */}

                        <div className="job_detail_item">

                            <strong>
                                Company
                            </strong>

                            <p>
                                {selectedJob.company_name || "Not available"}
                            </p>

                        </div>


                        {/* LOCATION */}

                        <div className="job_detail_item">

                            <strong>
                                Location
                            </strong>

                            <p>
                                {selectedJob.job_location || "Not available"}
                            </p>

                        </div>


                        {/* WORK MODE */}

                        <div className="job_detail_item">

                            <strong>
                                Work Mode
                            </strong>

                            <p>
                                {selectedJob.work_mode || "Not specified"}
                            </p>

                        </div>


                        {/* EXPERIENCE */}

                        <div className="job_detail_item">

                            <strong>
                                Experience
                            </strong>

                            <p>
                                {selectedJob.min_experience} -{" "}
                                {selectedJob.max_experience} Years
                            </p>

                        </div>


                        {/* PACKAGE */}

                        <div className="job_detail_item">

                            <strong>
                                Salary / Package
                            </strong>

                            <p>
                                ₹ {selectedJob.min_package} -{" "}
                                {selectedJob.max_package}
                            </p>

                            <small>
                                LPA
                            </small>

                        </div>


                        {/* SKILLS */}

                        <div className="job_detail_item">

                            <strong>
                                Required Skills
                            </strong>

                            <p>
                                {selectedJob.skills || "Not specified"}
                            </p>

                        </div>


                        {/* WEBSITE */}

                        <div className="job_detail_item">

                            <strong>
                                Company Website
                            </strong>

                            <p>
                                {selectedJob.comp_website || "Not available"}
                            </p>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* FULL JOB DESCRIPTION */}
                    {/* ================================================= */}

                    <div className="job_full_description">

                        <h3>
                            Job Description
                        </h3>

                        <p>
                            {selectedJob.job_description ||
                                "No job description available."}
                        </p>

                    </div>


                    {/* POPUP FOOTER */}

                    <div className="job_details_footer">

                        <button
                            onClick={() => {
                                setShowJobDetails(false);
                                setSelectedJob(null);
                            }}
                        >
                            Close
                        </button>


                        
                    </div>

                </div>

            </div>

        )}




        {/*INTERVIEWS PAGE */}

        {pages === "Interviews" && (<>
        
         <div className="interview_page_container">
            <div className="heading">
                <div>
                    <h1>Interviews</h1>
                    <h5>Join Interviews and Get Opportunities .</h5>
                </div>
            </div>

            {/*INTERVIEW CONTAINER*/}
            <div className="interview_container">
                <div className="interview_heading">
                    <h4>Upcoming (12) </h4>
                    <h4>Completed (4)</h4>
                   
                </div>


                {/*SCHEDULING TABLE */}
                <div className="table_container">
                    <table>
                        <thead>
                            <tr>
                                <th>Company_Name</th>
                                <th>Recruiter_Name</th>
                                <th>Job </th>
                                <th>Interview Type</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Mode</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

    {interviewsLoading ? (

        <tr>
            <td colSpan="10">Loading interviews...</td>
        </tr>

    ) : studentInterviews.length === 0 ? (

        <tr>
            <td colSpan="10">No scheduled interviews</td>
        </tr>

    ) : (

        studentInterviews.map((interview) => (

            <tr key={interview.interview_id}>

                {/* COMPANY NAME */}
                <td>
                    {interview.company_name || "--"}
                </td>

                {/* RECRUITER NAME */}
                <td>
                    {interview.recruiter_name || "--"}
                </td>

                {/* JOB */}
                <td>
                    {interview.job_title || "--"}
                </td>

                {/* INTERVIEW TYPE */}
                <td>
                    {interview.interview_type || "--"}
                </td>

                {/* DATE */}
                <td>
                    {interview.interview_date || "--"}
                </td>

                {/* TIME */}
                <td>
                    {interview.interview_time || "--"}
                </td>

                {/* MODE */}
                <td>
                    {interview.interview_mode || "--"}
                </td>

                {/* ADDRESS */}
                <td>
                    {interview.interview_address || "--"}
                </td>

                {/* STATUS */}
                <td>
                    {interview.status || "Scheduled"}
                </td>

                {/* ACTION */}
                <td>

                    {interview.meeting_link ? (

                        <button
                            type="button"
                            onClick={() =>
                                window.open(
                                    interview.meeting_link,
                                    "_blank"
                                )
                            }
                        >
                            Join Meeting
                        </button>

                    ) : (

                        <span>Offline</span>

                    )}

                </td>

            </tr>

        ))

    )}

</tbody>
                    </table>
                </div>
            </div>

       </div>
        
        </>)}

            
        </div>
    </div>
    </>)
}
export default StudentDashboard;