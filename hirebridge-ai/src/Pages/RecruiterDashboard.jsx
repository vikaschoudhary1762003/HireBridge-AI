import { use, useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";


function RecruiterDashboard() {

    const navigate = useNavigate();

    const [pages , setPages] = useState("Dashboard"); // this will show pages as per nav
    const [popup , setPopup] = useState(false); // this will popup the form form new job posting and interveiw scheduling 

    //PROFILE FORM STATE
    const[profileFields , setProfileFields] = useState({full_name:"" , email:"" , phone:"" , designation:""  ,profile_photo:"" , company_name:"" , industry:"" , comp_website:"" , comp_location:"", comp_logo:""})
    //STATE FOR SAVING RECEIVED RECRUITER PROFILE DATA
    const [recruiterProfile, setRecruiterProfile] = useState({ full_name: "",email: "", phone: "", company_name: "",designation: "",industry: "",   comp_location: "", comp_website: "", profile_photo: "", comp_Logo: ""});
    const [recruiterId, setRecruiterId] = useState(null);

    //POSTED JOB INPUT STATES
    const [postedJobFields , setPostedJobFields] = useState({job_title:"" , skills:"" , min_experience:"" , max_experience:"" , job_location:"" , work_mode:"" , min_package:"" , max_package:"" , job_description:""});
    const [postedjobData , setPostedJobData]= useState([]); // this state contains received data from database table posted_job
    const [editingJobId , setEditingJobId] = useState(null);// this is for editing the existing posted job

    //STATE FOR DISPLAY APPLIED CANDIDATES PROFILE AND JOB IN APPLICATION PAGE
    const [applications, setApplications] = useState([]);
    const [loadingApplications, setLoadingApplications] = useState(true);
    const [showStudentProfile, setShowStudentProfile] = useState(false); // this will popup the profile page to dipslay student profile 

    //STATE FOR ACTIVE JOBS COUNT SHORTLISTED CANDIDATES INTERVIEWS APPLICATIONS ON DASHBOARD
    const [activeJobsCount, setActiveJobsCount] = useState(0);
    const [applicationsCount, setApplicationsCount] = useState(0);
    const [shortlistedCount, setShortlistedCount] = useState(0);
    const [interviewsCount, setInterviewsCount] = useState(0);


    //STATE TO CONTAIN OR DISPLAY THE STUDENT PROFILE TO THE RECRUITER
    const [studentProfile , setStudentProfile] = useState(null);
    const [loadingProfile , setLoadingProfile] = useState(false);
    const [studentEducation, setStudentEducation] = useState(null);
    const [studentSkills, setStudentSkills] = useState(null);
    const [studentExperiences, setStudentExperiences] = useState([]);
    const [studentProjects, setStudentProjects] = useState([]);


    //STAES TO DISPLAY ONLY TOP 20 CANDIDATES AS PER THE REQUIRED FIELDS
    const [topCandidates, setTopCandidates] = useState([]);
    const [candidateLoading, setCandidateLoading] = useState(false);
    const [recruiterJobSkills , setRecruiterJobSkills]= useState(""); // state for store paricular recruiter posted job skills to display the top candidates to the particular recruiter as per their required skills of posted jobs

    //STATES TO DISPLAY SHORTLISTED CANDIDATES
    const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
    const [shortlistedLoading, setShortlistedLoading] = useState(false);


    // SEARCH FILTERED CANDIDATES FOR RECRUITERF
    const [appliedSearch, setAppliedSearch] = useState(""); // what recruiter typed
    const [selectedExp, setSelectedExp] = useState([]); // this is what recruiter selected for expereince searching
    const [candidateSkills , setCandidateSkills] = useState([]); // this will include all skills data of candidate for searching filter
    const [candidateExperience , setCandidateExperience] = useState([]); // this wll include  all experience of candidate for searching filter
    const [filteredCandidate , setFilteredCandidate] = useState([]); // this will include final candidate after filtering candidate by skills and experience


    //STORE THE SHORTLISTED CANDIDATE INTO DATA BASE AND ALSO SCHEDULE INTERVIEW AND SEND EMAIL
    const [candidates, setCandidates] = useState([]);
    const [interviewForm , setInterviewForm]= useState({candidateName:"" , jobTitle:"" , interviewType:"", interviewMode:"", interviewDate:"", interviewTime:"", interviewer:"", meetingLink:"", additionalInfo:""})
    const [selectedCandidate, setSelectedCandidate] = useState(null);


    //STATE FOR INTERVIEW PAGE IT DISPLAY OR CONTAIN ALL INTERVIEWS CANDIDATES TO DISPLAY TO RECRUITERS
    const [scheduledInterviews, setScheduledInterviews] = useState([]); // this will contain all the data of candidate who has interview
    const [interviewLoading, setInterviewLoading] = useState(false);


    //STATE FOR SEARCHING FUNCTION FOR MYJOB PAGE TO SEARCH JOBS BY WRITING IN SEARCHBOX AND APLLIED /CLOSED
    const [searchedText , setSearchedText]= useState(""); // it store what recruiter typed in search box
    const [jobstatus , setJobStatus] = useState("") ; // it store what job status selected either Active jobs / Closed job
    const [filteredjobs , setFilteredJobs] = useState([]); // it store all filtered jobs


    //HANDLE PROFILE INPUT
    const handleProfileInput=(e)=>{
        const {name , type , value , files} = e.target;

        setProfileFields( (prev)=>({...prev , [name]:type==="file"?files[0]: value}))
    }


    //HANDLE POSTED JOB INPUTS
    const handlePostedJobInput=(e)=>{
        setPostedJobFields({...postedJobFields ,[e.target.name]:e.target.value})
    }


    //HANDLE SCHEDULE INTERVIEW FORM INPUTS
    const handleInterviewForm = (e) => {
        const { name, value } = e.target;
        setInterviewForm(prev => ({ ...prev,[name]: value}));
    };


    //HANDLE SELECTED EXPERIENCE FOR SEARCHING
    const handleselectedExpforsearching=(e)=>{
        const value = e.target.value;
        if (e.target.checked) {
            //add selected experience
            setSelectedExp([...selectedExp, value])
        }else{
            //remove unselected experinece
            setSelectedExp(selectedExp.filter( (exp)=> exp !== value));
        }
    }


    const handleEditJob = (job) => {
        console.log("job selected for edit", job);
        setSelectedJob(job);
        setShowEditJobForm(true);
    };



    //FUNCTION TO SAVE RECRUITER AND COMPANY PROFILE INFO TO DATABASE
    const saveProfile=async(e)=>{
        e.preventDefault();

         // GET LOGGED-IN USER ID
        const user_id = localStorage.getItem("user_id");

        if (!user_id) {
            console.log("USER ID NOT FOUND");
            return;
        }

        //FOMR DATA FOR SENDING TEXT AND FILES
        const formData = new FormData();
        
        //ADD TEXT DATA

        formData.append("full_name" , profileFields.full_name);
        formData.append('email', profileFields.email);
        formData.append("phone" , profileFields.phone);
        formData.append("designation" , profileFields.designation);
        formData.append("company_name" , profileFields.company_name);
        formData.append("industry" , profileFields.industry);
        formData.append("website" , profileFields.comp_website);
        formData.append("location" , profileFields.comp_location);

        //ADD PROFILE PHOT
        if (profileFields.profile_photo) {
            formData.append("profile_photo" , profileFields.profile_photo);
        }

        //ADD COMPANY LGO
        if (profileFields.comp_logo) {
            formData.append("comp_logo" ,profileFields.comp_logo);
        }

        try {
            //API TO SEND / POST DATA TO BACKEND
            const resp = await fetch(`http://localhost:8080/api/recruiter_profile/saveProfile/${user_id}`,{
                method:'POST',
                body:formData
            })

            //DATA
            const data = await resp.json();
            console.log("recruiter profiile data" , data);

            if (data.success === true) {
                alert(data.message);
                console.log("pofile data" , data.data);

                //get recruiter_id to store in local storage for further use of posting multiple jobs and  fetch as per id
                const recruiter_id = data.data.recruiter_id;
                console.log("RECRUITER ID FROM BACKEND:", recruiter_id);
                
                if(recruiter_id){
                    localStorage.setItem("recruiter_id", recruiter_id); //STORE RECRUITER ID
                    console.log("STORED RECRUITER ID :" , recruiter_id);
                    return;
                }else{
                    console.log("RECRUITER ID NOT FOUND IN RESPONSE");
                }
                
                return;
            }else if(data.success === false){
                alert(data.message);
                return;
            }
            
        } catch (error) {
            console.log("RECRUITER ERROR" , error);
            alert(error);
        }
    }

    useEffect(() => {
    const fetchRecruiterProfile = async () => {

        const user_id = localStorage.getItem("user_id");
        console.log("USER ID FOR PROFILE:", user_id);

        if (!user_id) {
            console.log("USER ID NOT FOUND IN LOCAL STORAGE");
            return;
        }

        try {
            //API TO GET RECRUITER PROFILE DATA
            const resp = await fetch(`http://localhost:8080/api/recruiter_profile/getData/${user_id}`);

            console.log("PROFILE HTTP STATUS:", resp.status);

            if (!resp.ok) {
                const text = await resp.text();
                console.log("Profile error response:", text);
                throw new Error(text || "FAILED TO FETCH RECRUITER PROFILE");
            }

            const data = await resp.json();
            console.log("REC PROF DATA:", data);
            setRecruiterProfile(data);

            // GET RECRUITER ID FROM BACKEND
            const recruiter_id = data.recruiter_id;
            console.log("RECRUITER ID FROM PROFILE:", recruiter_id);

            if (recruiter_id) {
                // STORE IN STATE
                setRecruiterId(recruiter_id);

                // STORE IN LOCAL STORAGE
                localStorage.setItem("recruiter_id", recruiter_id);
                console.log("RECRUITER ID SET:",recruiter_id);
            } else {
                console.error("RECRUITER ID NOT FOUND IN PROFILE RESPONSE");
            }

        } catch (error) {
            console.error("ERROR FETCHING RECRUITER PROFILE:",error);
        }
    };
    fetchRecruiterProfile();
    }, []);



    //FUNCTION TO POSTE JOB
    const postJob= async(e)=>{
        e.preventDefault();
        try {
            const recruiter_id = recruiterId;
            console.log("RECRUITER ID:", recruiter_id);

            //API TO SEND DATA TO BACKEND
            const resp = await fetch(`http://localhost:8080/api/posted/job/${recruiter_id}`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(postedJobFields)
            })

            //DATA
            const data = await resp.json();
            console.log("POSTED JOB ", data);

            if (data.success === true) {
                alert(data.message);
                // GET UPDATED JOB LIST FROM DATABASE
                await fetchPostedJobs();
                // CLEAR FORM
                setPostedJobFields({job_title: "", skills: "",min_experience: "", max_experience: "",job_location: "",work_mode: "",  min_package: "", max_package: "", job_description: "" });
                //CLOSE THE FORM
                setPopup(false);
                return

            }else if (data.success === false) {
                alert(data.message);
                return;
            }
        } catch (error) {
            console.log("POSTED JOB ERROR" , error);
        }
    }





    //FUNCTION TO LOGOUT FROM PLATEFORM
    const handleLogout = () => {
        const user_id = localStorage.removeItem("user_id");
        const user_role  =localStorage.removeItem("user_role");
        console.log("LOGOUT USER ID " , user_id);
        console.log("LOGOUT USERROLE" , user_role);
        alert("loggout successfully");
        navigate("/");
    };




    //FUNCTION TO VIEW STUDENT PROFILE TO DISPLAY TO THE RECRUTITER 
    const fetchStudentProfile=async(studentProfileId , userId)=>{

        try {
            //LOADING THE DATA
            setLoadingProfile(true);

            //API TO FETCH STUDENT PERSONAL PROFILE DATA FROM BACKEND
            const profileResponse = await fetch(`http://localhost:8080/api/student/getProfile/${userId}`);            
            const profileData = await profileResponse.json();
            console.log("profile" , profileData);

            //API TO FETCH STUDENT EDUCATION DATA
            const educationResponse = await fetch(`http://localhost:8080/api/student_education/getEducation_Data/${studentProfileId}`)
            const educationData = await educationResponse.json();

            //API TO FETCH SKILLS
            const skillResponse = await fetch( `http://localhost:8080/api/student_skills/getskilldata/${studentProfileId}`)
            const skillData = await skillResponse.json();

            //API TO FETCH EXPERIENCE
            const experienceResponse = await fetch(`http://localhost:8080/api/student_experience/getExpData/${studentProfileId}`)
            const experienceData = await experienceResponse.json();
            console.log("EXPERIENCE DATA FOR RECRUITER:", experienceData);

            //API TO FETCH PROJECT DETAILS
            const projectResponse = await  fetch(`http://localhost:8080/api/student_project/getProjectData/${studentProfileId}`)
            const projectData = await projectResponse.json();

            //STORE EACH RESPONSES
            setStudentProfile(profileData); // this is container that will contain all details of profile
            setStudentEducation(educationData.data);
            setStudentExperiences(experienceData.data);
            setStudentSkills(skillData.data);
            setStudentProjects(projectData.data);
            
        } catch (error) {
            console.error("error fetching student profile", error);
        }finally{
            setLoadingProfile(false); // stop loading data
        }
    }






    // FUNCTION TO SEND INVITATION EMAIL TO CANDIDATE
    const shortlistCandidate = async (candidate) => {

      try {
        // GET LOGGED-IN RECRUITER ID
        const recruiterId = localStorage.getItem("recruiter_id");
        const applicantId = candidate?.application_id;
        console.log("RECRUITER ID:", recruiterId);
        console.log("APPLICATION ID:", applicantId);
        console.log("CANDIDATE:", candidate);


        // CHECK RECRUITER LOGIN
        if (!recruiterId) {
            alert("Please login first");
            return;
        }
        if(!applicantId){
            alert("Application id not found");
            return;
        }

        // SEND SHORTLIST EMAIL
        const response = await fetch(`http://localhost:8080/api/shortlisted_candidates/save/${recruiterId}/${applicantId}`,{
            method: "POST"
        });

        console.log("SHORTLIST API RESPONSE ", response.status);
        
        //CONVERT RESPONSE TO JSON
        const data = await response.json();
        console.log("SHORTLIST RESPONSE:", data);

        
        if (response.ok && data.status === "Shortlisted") {
            setApplications( prevApplication => prevApplication.map( app=> app.application_id === applicantId ?{...app , application_status : "Shortlisted"}:app))
            alert("Candidate Shortlisted Successfully");
            return;
        }

        //BACKEND ERROR
        alert(data.message || "Failed to shortlist candidate");


        } catch (error) {
         console.error("SHORTLIST ERROR:", error);
         alert("Failed to shortlist candidate");
        }
    };





   //FUNCTION TO FETCH SHORTLISTED CANDIDATES FORM DATBASE TABLE TO DISPLAY INTO SHORTLISTED PAGE
   const fetchShortlistedCandidates =async()=>{
    try {
        //LOADING CANDIDATES
        setShortlistedLoading(true);

        const recruiter_id = localStorage.getItem("recruiter_id");
        console.log("Shortlisted recruiter id"  ,recruiter_id);

        //API
        const response = await fetch(`http://localhost:8080/api/shortlisted_candidates/recruiter/${recruiter_id}`)
        console.log("SHORTLISTED GET HTTP STATUS:", response.status);

        const data = await response.json();

        console.log("SHORTLISTED CANDIDATES RESPONSE:", data);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status} - ${data.message || ""}`
            );
        }

        if (data.success === true) {
            setShortlistedCandidates(data.data || []);
            console.log("SHORTLISTED CANDIDATES:",data.data);
        }else {console.error( "FAILED TO FETCH SHORTLISTED CANDIDATES:",    data.message);
            setShortlistedCandidates([]);
        }

        } catch (error) {
            console.error("ERROR FETCHING SHORTLISTED CANDIDATES:", error );
             setShortlistedCandidates([]);
        }finally {
          setShortlistedLoading(false);
        }
    }
    
    useEffect(() => {
        if (pages === "Shortlisted") {
            fetchShortlistedCandidates();
        }
    }, [pages]);




    //FUNCTION TO RECEIVE AND DISPLAY APPLIED JOBS(BY STUDENTS) TO RECRUITER
    const fetchPostedJobs = async (id = recruiterId) => {

        try {

            console.log("RECRUITER ID FOR POSTED JOBS:", id);
            if (!id) {
                console.log("RECRUITER ID NOT READY");
                return;
            }

            const resp = await fetch(`http://localhost:8080/api/posted/recievePostedData/${id}`);
            console.log("POSTED JOB STATUS:", resp.status);
            const data = await resp.json();
            console.log("POSTED JOB DATA:", data);
            if (data.success === true) {
                setPostedJobData(data.data || []);
                console.log("POSTED JOB DATA:",data.data);
            } else {
                console.error("FAILED TO FETCH POSTED JOBS:",data.message);
                setPostedJobData([]);
            }

        } catch (error) {
            console.error("ERROR FETCHING POSTED JOBS:",error);
        setPostedJobData([]);
        }
    };

    useEffect(() => {
        if (recruiterId) {
            console.log("FETCHING JOBS FOR RECRUITER:", recruiterId);
            fetchPostedJobs(recruiterId);
        }
    }, [recruiterId]);





    //FUNCTION TO FETCH APPLICATIONS ( THE STUDENT HAS BEEN APPLIED FOR JOB NOW THE STUDENT PROFILE TO BE DISPLAY TO THE RECRUITER SO THAT THEY CAN SEE THEIR PROFILE AND SHORTLIST)
    const fetchApplication = async (id = recruiterId) => {

        try {
            setLoadingApplications(true);
            console.log("RECRUITER ID FOR APPLICATION:",id);
            if (!id) {
                console.error("RECRUITER ID NOT READY");
                setApplications([]);
                return;
            }

            const resp = await fetch(`http://localhost:8080/api/application/recruiter/${id}`);
            console.log("APPLICATION HTTP STATUS:",resp.status);
            const data = await resp.json();
            console.log("APPLICATION API RESPONSE:",data);

            if (!resp.ok) {
                throw new Error(`HTTP ${resp.status} - ${data.message || ""}`);
            }

            if (Array.isArray(data)) {
                setApplications(data);
                console.log("APPLICATION RECEIVED:",data);

            }else{
                console.error("APPLICATION RESPONSE IS NOT ARRAY:",data);
            setApplications([]);
            }

        } catch (error) {

            console.error("ERROR FETCHING APPLICATION:",error);
            setApplications([]);
        }finally {
            setLoadingApplications(false);
        }
    };

    useEffect( ()=>{
        if (pages === "Applications") {
            fetchApplication();
        }
    },[pages]);



    //FUNCTION TO OPEN INTERVIEW FORM FOR CONDUCT INTERVIEW
    const openInterviewForm = (application) => {

        console.log("APPLICATION:", application);

        setSelectedCandidate(application);

        // Get candidate directly from application
        const student = application?.student_profile;
        const job = application?.job;

        console.log("STUDENT:", student);
        console.log("JOB:", job);

        //candidate name and jobtitle
        const candidateName =`${student?.first_name || ""} ${student?.last_name || ""}`.trim();
        const jobTitle = application?.job?.job_title || "--";

        console.log("CANDIDATE NAME:", candidateName);
        console.log("JOB TITLE:", jobTitle);

        setInterviewForm({candidateName: candidateName,jobTitle: jobTitle,interviewType: "",interviewMode: "",interviewDate: "",interviewTime: "",interviewer: "",meetingLink: "",additionalInfo: ""})
        setPopup("ScheduleInterviewForm");
    };



    //FUNCTION TO COUNT ACTIVE JOBS SHORTLISTED CANDIDATES ETC FOR DASHBOARD 
    const fetchDashboardCounts = async () => {

        try {
            const recruiterId = localStorage.getItem("recruiter_id");

            if (!recruiterId) {
                console.error("Recruiter ID not found");
                return;
            }

            console.log("Fetching dashboard counts for recruiter:", recruiterId);

            // ACTIVE JOBS
            const jobsResponse = await fetch(`http://localhost:8080/api/posted/recievePostedData/${recruiterId}`);

            if (jobsResponse.ok) {
                const jobsData = await jobsResponse.json();
                const jobs = jobsData.data || [];
                console.log("Recruiter Jobs:", jobs);
                setActiveJobsCount(jobs.length);
            }


            // APPLICATIONS
            const applicationsResponse = await fetch(`http://localhost:8080/api/application/recruiter/${recruiterId}`);

            if (applicationsResponse.ok) {
                const applicationsData = await applicationsResponse.json();
                const applications = applicationsData.data || applicationsData || [];
                console.log("Recruiter Applications:", applications);
                setApplicationsCount(applications.length);
            }


            // SHORTLISTED CANDIDATES
            const shortlistedResponse = await fetch(`http://localhost:8080/api/shortlisted_candidates/recruiter/${recruiterId}`);

            if (shortlistedResponse.ok) {
                const shortlistedData = await shortlistedResponse.json();
                const shortlisted = shortlistedData.data || shortlistedData || [];
                console.log("Recruiter Shortlisted:", shortlisted);
                setShortlistedCount(shortlisted.length);
            }


            // INTERVIEWS
            const interviewsResponse = await fetch(`http://localhost:8080/api/scheduled_interview/recruiter/${recruiterId}`);

            if (interviewsResponse.ok) {
                const interviewsData = await interviewsResponse.json();
                const interviews = interviewsData.data || interviewsData || [];
                console.log("Recruiter Interviews:", interviews);
                setInterviewsCount(interviews.length);
            }

        }catch (error) {
            console.error("Error fetching dashboard counts:",error);
        }
    };

    useEffect(() => {
        if (pages === "Dashboard") {
            fetchDashboardCounts();
        }
    }, [pages]);


    //FUNCTION TO SCHEDULE INTERVIEW AND SAVE DATA TO SCHEDULE_INTERVIEW TABLE
    const scheduleInterview=async()=>{
        try {
            // LOGGED IN RECRUITER ID  AND  APPLICATION ID
            const recruiterId = localStorage.getItem("recruiter_id"); // CHANGE
            const applicationId = selectedCandidate?.application_id;  // ADD

            if (!recruiterId) {
                alert("Please login");
                return;
            }

            if (!applicationId) {
                alert("No application id");
                return;
            }

            //VALIDATIONS
            if (!interviewForm.candidateName || !interviewForm.jobTitle || !interviewForm.interviewType || !interviewForm.interviewMode || !interviewForm.interviewDate || !interviewForm.interviewTime || !interviewForm.interviewer || !interviewForm.meetingLink || !interviewForm.additionalInfo) {
                alert("Please fill all details");
                return;
            }


            //ADD PARAM
            const params = new URLSearchParams();
            params.append("candidateName" , interviewForm.candidateName) ;
            params.append("jobTitle", interviewForm.jobTitle);
            params.append("interviewType", interviewForm.interviewType);
            params.append("interviewMode", interviewForm.interviewMode);
            params.append("interviewDate", interviewForm.interviewDate);
            params.append("interviewTime", interviewForm.interviewTime);
            params.append("interviewer", interviewForm.interviewer);
            params.append("meetingLink", interviewForm.meetingLink);
            params.append("additionalInfo", interviewForm.additionalInfo);      

            //API TO SEND EMAIL AND SAVE DATA TO THE DATABASE
            const resp = await fetch(`http://localhost:8080/api/scheduled_interview/schedule/${recruiterId}/${applicationId}?${params.toString()}`,{
                method:'POST'
            })

            console.log("SCHEDULE INTERVIEW STATUS" , resp.status);
            const data = await resp.json();
            console.log("SCHEDULE INTERVIEW RESPONSE ", data);

            if (data.success === true) {
                alert("Interview Scheduled Successfully !\nInterview details have been sent to the candidate.")
                //CLOSE FORM
                setInterviewForm({candidateName:"" , jobTitle:"" , interviewType:"", interviewMode:"", interviewDate:"", interviewTime:"", interviewer:"", meetingLink:"", additionalInfo:""});
                fetchScheduledInteviews(); // this function immediately fetch the candidate data when scheduled interview
                //close schedule interview form
                setPopup(false);
                return;
            }else{
                alert(data.message || "Failed to schedule interview");
            }
        } catch (error) {
            console.error("ERROR SCHEDULING INTERVIEW :" , error);
            alert("Something went wrong while scheduling the interview.");   
        }
    }

    


    //FUCNTION TO FETCH SCHEDULED INTERVIEW / CANDIDATE WHO HAS INTERVIEW
    const fetchScheduledInteviews=async()=>{
        try {
            setInterviewLoading(true);
            const recruiterId = localStorage.getItem("recruiter_id");
            if (!recruiterId) {
                console.log("RECRUITER ID NOT FOUND");
                return;
            }

            //API TO FETCH DATA
            const resp = await fetch(`http://localhost:8080/api/scheduled_interview/recruiter/${recruiterId}`)
            console.log("SCHEDULED INTERVIEW STATUS", resp.status);
            const data = await resp.json();
            console.log("scheduled interview response", data);

            if (data.success === true) {
                setScheduledInterviews(data.data);
                return;
            }else{
                console.error("failed to fetch scheduled interview data");
                setScheduledInterviews([]);
            }
            
            
        } catch (error) {
            console.error("ERROR FETCHING SCHEDULED INTERVIEWS:",error);
            setScheduledInterviews([]);
        }finally{
            setInterviewLoading(false);
        }
    }

    useEffect( ()=>{
        if (pages === "Interview") {
            fetchScheduledInteviews();
        }
    },[pages])




    //FUNCTION TO JOIN MEETING
    const joinMeeting = (interview)=> {
        const meetingLink = interview?.meeting_link || "";

        console.log("JOIN MEETING INTERVIEW:", interview);
        console.log("MEETING LINK:", meetingLink);
        if (!meetingLink) {
            alert("Meeting link not available");
            return;
        }
        //OPEN GOOGLE MEET OR ZOOM 
        window.open(meetingLink, "_blank","noopener,noreferrer");
    };





    //FUNCTION TO SEARCH_CANDIDATE FOR CANDIDATE PAGE
    const searchCandidates = async () => {

        //GET SEARCH INPUT
        const searchText = appliedSearch.trim().toLowerCase();
        //IF SEARCH INPUT IS EMPTY
        if (searchText == "") {
            setFilteredCandidate([]);
            return;
        }

        try {
            //API TO FETCH SKILLS
            const skillResp = await fetch(`http://localhost:8080/api/student_skills/getAllSkillsforsearching`);
            const skillresponse = await skillResp.json();
            const skillsData = skillresponse.data || [];
            console.log("Skills response ", skillsData);
            if (skillsData) {
                setCandidateSkills(skillsData);
            }

            //API TO FETCH EXPERIENCE DATA
            const expResp = await fetch(`http://localhost:8080/api/student_experience/getstudentexperinecforsearching`);
            const expResponse = await expResp.json();
            const expData = expResponse.data || [];
            console.log("EXPERIENCE DATA", expData);

            //STORE EXPERIENCE DATA TO ARRAY STATE
            if (expData) {
                setCandidateExperience(expData);
            }


            // FIND CANDIDATES WHOSE SKILLS MATCH
            const matchedCandidates = skillsData.filter((candidate) => {
                const skills = `
                    ${candidate.programming_skills || ""}
                    ${candidate.technical_skills || ""}
                    ${candidate.tools || ""}
                    ${candidate.soft_skills || ""} `.toLowerCase();

                //MATCH SEARCH TEXT WITH SKILLS
                return skills.includes(searchText);
            });

            console.log("MATCHED SKILL CANDIDATES", matchedCandidates);

            // FIND CANDIDATES WHOSE EXPERIENCE MATCHES
            let matcheExperienceCandidate = [];

            //SEARCH EXPERIENCE ONLY IF USER SELECTED EXPERIENCE
            if (selectedExp.length > 0) {
                matcheExperienceCandidate = expData.filter((candidate) => {
                    const experience =`${candidate.working_experience || ""}`.toLowerCase();

                    //CHECK SELECTED EXPERIENCE VALUE
                    return selectedExp.some((exp) => {
                        if (exp === "0-1") {
                            return experience.includes("0-1");
                        }
                        if (exp === "1-3") {
                            return experience.includes("1-3");
                        }
                        if (exp === "3-5") {
                            return experience.includes("3-5");
                        }
                        if (exp === "5+") {
                            return experience.includes("5+");
                        }
                        return false;
                    });
                });
            }
            console.log("MATCHED EXPERIENCE CANDIDATES",matcheExperienceCandidate);

            // COMBINE SKILLS + EXPERIENCE
            const allmatchedcandidates = [...matcheExperienceCandidate, ...matchedCandidates];
            console.log("ALL MATCHED CANDIDATES",allmatchedcandidates);

            // REMOVE DUPLICATE CANDIDATES
            const removeDuplicateCandidates = allmatchedcandidates.filter((candidate, index, array) => {
                return index === array.findIndex((item) => {
                return (item.studentprofile_id?.student_profile_id === candidate.studentprofile_id?.student_profile_id); });
            });
            console.log("DUPLICATE REMOVED CANDIDATES",removeDuplicateCandidates);

            // GET PROFILE DETAILS FOR ALL MATCHED CANDIDATES
            const candidateProfile = [];
            for (const candidate of removeDuplicateCandidates) {

                //GET STUDENT PROFILE OBJECT
                const studentprofile = candidate.studentprofile_id;

                //GET USER ID
                const userId = studentprofile?.user?.userId;

                //IF USER ID IS NOT AVAILABLE
                if (!userId) {
                    console.log("User id not found",candidate);
                    continue;
                }

                //EXISTING CANDIDATE PROFILE API
                const profileResponse = await fetch(`http://localhost:8080/api/student/getProfile/${userId}`);
                const profileData = await profileResponse.json();
                console.log("PROFILE DATA",profileData);

                //STORE CANDIDATE PROFILE DATA
                candidateProfile.push({...profileData, studentProfileId: studentprofile?.student_profile_id,
                    userId: userId,

                    // STORE SKILLS OF THIS CANDIDATE
                    programming_skills: candidate.programming_skills,
                    technical_skills: candidate.technical_skills,
                    tools: candidate.tools,
                    soft_skills: candidate.soft_skills
                });
            }
            // STORE FINAL MATCHED CANDIDATE PROFILES
            console.log("FINAL CANDIDATE PROFILES",candidateProfile);
            setFilteredCandidate(candidateProfile);

        } catch (error) {
            console.log("Error while searching candidates",error);
        }
    };




    //FUNCTION INVITE TO APPLY CANDIDATE FOR JOB
    const sendApplyInvitation = async(candidate)=>{

        try {
            //get loggedin recruiter id , studentprofile id
            const recruiterId = localStorage.getItem("recruiter_id");
            const studentProfileId = candidate.student_profile_id;

            console.log("recruiter id " , recruiterId);
            console.log("student profile id", studentProfileId);
            console.log("FULL CANDIDATE OBJECT:", candidate);

            //CANDIDATE NAME
            const candidateName = `${candidate.firstName} ${candidate.lastName}`;
            const candidateEmail = candidate.email;

            console.log("Recruiter id" , recruiterId);
            console.log("candidate email " , candidateEmail);
            

            //API TO SEND INVITATION FOR APPLY TO A JOB
            const resp = await fetch(`http://localhost:8080/api/shortlisted_candidates/send-invitation/${recruiterId}/${studentProfileId}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({recruiterId:recruiterId, candidateName:candidateName, candidateEmail:candidateEmail})
            });

            const text = await resp.text();
            let data = {};
            if (text) {
                try {
                    data=JSON.parse(text);
                } catch (error) {
                    data = {message: text};
                }
            }

            if (resp.ok) {
                alert("Invitation sent successfully");
            }else{
                alert(data.message || `Failed to send invitation. Status: ${resp.status}`);
            }


        } catch (error) {
            console.error("Error sending invitation:", error);
            alert("Something went wrong while sending the invitation.");
        }
    }



   /* //SEARCH POSTED JOBS IN MY JOB PAGE 
    const searchPostedJobSearch=async(candidate)=>{
        //get what recruiter typed on searchbox
        const searchText = searchedText.toLowerCase();
        if (searchText === "") {
            filteredjobs([]);
            return;
        }
    
        try {
            //API TO FETCH JOBS TITLE 
            const resp = await fetch(`http://localhost:8080/api/posted/recievePostedData`);

            const data = await resp.json();
            console.log("posted jobs fetched searching " , data);
            
        } catch (error) {
            console.log(error);
            
        }
    }*/



    //EDIT JOB FUNCTION
    const editJob=(job)=>{
        console.log("job selected for edit", job);

        //store job id in react usesstate
        setEditingJobId(job.job_id); 

        //load existing job data into form
        setPostedJobFields({  job_title: job.job_title || "", skills: job.skills || "" , min_experience : job.min_experience ||"" , max_experience:job.max_experience||"" , job_location:job.job_location || "" , work_mode : job.work_mode ||"", min_package : job.min_package ||"" , max_package :job.max_package||"", job_description:job.job_description ||"" });

        //open existing job form
        setPopup("EditJob");
    }

    //UPDATE EXISTING JOB FUNCTION
    const updateExistingJob=async(e)=>{
        e.preventDefault;
        if (!editingJobId) {
            alert("job id not found");
            return;
        }

        try {
            console.log("editing job id" , editingJobId);
            console.log("updated job data", postedJobFields);

            //REST API FOR UPDATING EXISTING POSTED JOB
            const resp = await fetch(`http://localhost:8080/api/posted/editPostedJob/${editingJobId}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(postedJobFields)
            })

            console.log("Update job status", resp.status);
            const responseText = await resp.text();
            console.log("RESPONSE TEXT" , responseText);
            if (!resp.ok) {
                alert(`Update failed. HTTP Status: ${resp.status}`);
                return;
            }

            const data = responseText ? JSON.parse(responseText) : {};
            console.log("updated job data ", data);

            if (data.success === true) {
                alert(data.message);
                await fetchPostedJobs(); // REFRESH THE JOB LIST
                setPostedJobFields({job_title: "", skills: "", min_experience: "", max_experience: "", job_location: "", work_mode: "", min_package: "", max_package: "", job_description: ""}); //CLEAR FORM
                setEditingJobId(null); // clear editing jobid
                setPopup(false); // close the popup form
            }else{
                alert(data.message); // Unsuccessfull message
            }
            
        } catch (error) {
            console.error("Update job err" , error);
            alert("something went wrong while updating job");
            
        }

    }


    //FUNCTION TO FIND WHICH SKILLS OF A CANDIDATE MATCH WITH THE SKILLS REQUIRED BY THE RECRUITER'S POSTED JOBS
    const getCandidateMatchedSkills = (candidate,recruiterSkills)=>{
        //COLLECT ALL SKILLS OF A CANDIDATES
        const candidateSkills = [candidate.programming_skills || "" , candidate.technical_skills ||""].join(",").split(/[,\s]+/).map((skill)=>skill.trim().toLowerCase()).filter((skill)=>skill != "");
        
        //FIND MATCHING SKILLLS
        const matchedSkills = recruiterSkills.filter((recruiterSkills)=>candidateSkills.some((candidateSkills)=> candidateSkills === recruiterSkills));

        //REMOVE DUPLICATE SKILLS
        return [...new Set(matchedSkills)];
    }

    // FUNCTION TO GET ALL SKILLS FROM THE LOGGED-IN RECRUITER'S POSTED JOBS FOR DISPLAY THE TOP CANDIDATES TO THE PARTICULAR RECRUITER AS PER THEIR POSTE JOB SKILLS
    const topCandidate = async()=>{
        try {
            //get particular reruiter id
            const recruiterId = localStorage.getItem("recruiter_id");
            console.log("check recruiter id ", recruiterId);

            if (!recruiterId) {
                console.log("Recruiter id not found");
                setRecruiterJobSkills([]); // if no recruiter found keep state empty to do not display the top candidates
                return []; 
            }

            //API TO FETCH ONLY RECRUITER POSTED JOBS 
            const resp = await fetch(`http://localhost:8080/api/posted/recievePostedData/${recruiterId}`);
            console.log("Recruiter job response status ", resp.status);
            const data = await resp.json(); // store fetched posted jobs into data variable
            console.log("display the fetched jobs " , data);

            //if failed 
            if (!resp.ok || data.success !== true) {
                console.log("Failed to fetch recruiter jobs");
                setRecruiterJobSkills([]);
                return; // stop the further execution
            }

            //VARIABLE TO STORE ALL POSTED JOBS
            const jobs = data.data || [];
            console.log("variable jobs " , jobs);
            

            //Array to store all job skills posted by particular recruiter
            const allJobSkills = [];
            jobs.forEach((job) => {
                console.log("job id", job.job_id);
                console.log("job title" , job.job_title);
                console.log("job skills " , job.skills);

                //Get skills from this particular job
                const skills = job.skills || "";

                //CONVERT THE SKILLS STRING INTO INDIVIDUAL SKILLS ", "
                const skillList = skills.split(",").map( (skill)=>skill.trim().toLowerCase()).filter( (skill)=> skill !== "");

                //add these skillList into main skill array
                allJobSkills.push(...skillList);

            });

            //REMOVE DUPLICATE SKILLS  , this is the method to remove duplicates in javascript
                const SkillLists = [...new Set(allJobSkills)];

                //STORE RECRUITER SKILLS IN STATE 
                setRecruiterJobSkills(SkillLists);

                //IF RERUITER HAS NO POSTED JOBS AND SKILLS
                if (SkillLists.length === 0) {
                    console.log("NO JOB POSTED FOR TOP CANDIDATES");
                    setFilteredCandidate([]);
                    return;
                }

                //FETCH ALL CANDIDATE SKILLS
                const candidateResponse = await fetch("http://localhost:8080/api/student_skills/getAllSkillsforsearching");
                console.log("FETCHED CANDIATE SKILLS RESPONSE " , candidateResponse.status);
                const candidateData = await candidateResponse.json();
                console.log("candidate data " , candidateData);

                if (!candidateData) {
                    console.log("No candidate found");
                    setFilteredCandidate([]);
                    return;
                }

                //CANDIDATES
                const candidates = candidateData.data || candidateData || [];
                console.log("candidates skill arrau ", candidates);

                //FIND CANDIDATES WHOS SKILLS MATCHED WITH RECRUITER SKILLS
                const matchedCandidates = [];

                candidates.forEach((candidate) => {
                    const matchedSkills = getCandidateMatchedSkills(candidate , SkillLists);
                    if (matchedSkills.length > 0) {
                        matchedCandidates.push({...candidate, matchedSkills: matchedSkills});
                        console.log("Matched candidates ", matchedCandidates);
                        
                    }
                });

                //store candidates in state
                setFilteredCandidate(matchedCandidates);      
        } catch (error) {
            console.error("ERROR FETCHING RECRUITER JOB SKILLS", error);
            setRecruiterJobSkills([]);
            setFilteredCandidate([]);
            return [];
        }
    }
    useEffect( ()=>{
        if (pages === "Dashboard") {
            topCandidate();
        }
    },[pages])



    //WRAPPER FUNCTION FOR RECRUITER DASHBOARD CANDIDAET VIEW PROFILE BTN TO VIEW THE PROFILES OF TOP CANDIDATES
    const dashboardViewProfile = (studentProfileId, userId)=>{
        //call fetchStudentprofile function to view candidate profiles
        fetchStudentProfile(studentProfileId,userId);
        setShowStudentProfile(true);
    }



    // WRAPPER FUNCTION FOR RECRUITER DASHBOARD TO SEND INVITATION EMAIL TO TOP CANDIDATES
    const dashboardSendInvitation = (candidate) => {
        
        // Get student profile object from dashboard candidate
        const profile = candidate?.studentprofile_id;

        // Get student profile ID
        const studentProfileId = profile?.student_profile_id;

        console.log("========== DASHBOARD INVITATION ==========");
        console.log("Student Profile ID:", studentProfileId);
        console.log("Student Profile:", profile);
        console.log("FULL CANDIDATE OBJECT:", candidate);

        // Check student profile ID
        if (!studentProfileId) {
            console.error("Student Profile ID not found:", candidate);
            alert("Student Profile ID not found.");
            return;
        }

        // Get candidate name
        const firstName = profile?.first_name || "";
        const lastName = profile?.last_name || "";

        // Get candidate email
        const email = profile?.email || "";

        console.log("Candidate Name:", `${firstName} ${lastName}`);
        console.log("Candidate Email:", email);

        // Create a new object in the SAME format  that existing sendApplyInvitation() already expects.
        const dashboardCandidate = {
            ...candidate,

            // Existing function expects this field
            student_profile_id: studentProfileId,

            // Existing function expects these fields
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        console.log("Candidate object sent to existing sendApplyInvitation():");
        console.log(dashboardCandidate);

        // Call the OLD function without changing it
        sendApplyInvitation(dashboardCandidate);
    };

   return (<>
    
    <div className="recruiter_container">
        
        {/*SIDE BAR*/}
        <div className="sidebar_container">
            <h3>HireBridge-AI</h3>
            <h4>Recruiter</h4>
            <nav>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("Dashboard")}}> 🏠 Dashboard  </a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("Profile")}}>👥 My Profile</a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('myjob')}}> 💼 My Jobs  </a>
                <a href="#" onClick={(e)=>{e.preventDefault();setPages('Candidates')}}>👥 Candidates </a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('Applications')}}>📄 Applications </a>
                <a href="#" onClick={(e)=>{e.preventDefault();setPages("Shortlisted")}}>⭐ Shortlisted  </a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages('Interview')}}>🎤 Interviews </a>
                <a href="#" onClick={(e)=>{e.preventDefault(); setPages("AiMatch")}}>🤖 AI Candidate Match </a>
                <a href="#" onClick={handleLogout}>🚪 Logout  </a>
            </nav>
        </div>



        {/*RECRUIER  DISPALY PAGE*/}
        <div className="recruiterHomeDashboard_container">

            {pages === "Dashboard" && (<>
            <div className="Dashboard_page_container">

                <div className="heading">
                    <div>
                        <h1>Dashboard</h1>
                        <h5>Manage your hiring process from one place .</h5>
                    </div>
                    <div>
                        <h3>Profile</h3>
                    </div>
                </div>


                {/* CARDS */}
                <div className="cardContainer">
            
                    {/* THIS WILL CONTAINER RECENT JOBS POSTED AND THE APPLIED CANDIDATES*/}

                    {/*RECENT JOBS*/}
                    <div className="cards">
                        <h4>ACTIVE JOBS</h4>
                        <h5>{activeJobsCount}</h5>
                    </div>

                    <div className="cards">
                    <h4>APPLICATIONS</h4>
                    <h5>{applicationsCount}</h5>
                    </div>

                    <div className="cards">
                        <h4>SHORTLISTED</h4>
                        <h5>{shortlistedCount}</h5>
                    </div>

                    <div className="cards">
                        <h4>INTERVIEWS</h4>
                        <h5>{interviewsCount}</h5>
                    </div>
                </div>


                {/*ACTIVE JOB*/}
                <div className="activeJob_container">
            
                    {/* THIS WILL CONTAINER RECENT JOBS POSTED AND THE APPLIED CANDIDATES*/}

                    {/*RECENT JOBS*/}
                    <div className="recentjob">
                        <div className="heading">
                            <h4>🏆 Top Candidates for a Job</h4>
                            <a href="#" onClick={(e)=>{e.preventDefault(); setPages('Candidates')}}><h4>View more</h4></a>
                        </div>

                        {/* CANDIDATE CARDS */}
                        {/* TOP CANDIDATES FOR THIS RECRUITER */}
                        <div className="top-candidates-section">

                            <h2>Recommended Candidates</h2>
                                {filteredCandidate.length === 0 ? (
                                    <p>No matching candidates found for your posted jobs.</p>
                                ) : (
                                    <div className="candidate-cards-container">
                                    {filteredCandidate.map((candidate) => {

                                    // Candidate profile data comes inside studentprofile_id
                                    const profile = candidate.studentprofile_id;

                                    return (
                                    <div className="candidate-profile-card" key={candidate.skill_id}>

                                        {/* PROFILE HEADER */}
                                        <div className="candidate-header">
                                            <div className="candidate-photo-container">
                                                <img src={profile?.profile_photo? `http://localhost:8080/uploads/${profile.profile_photo}`: "/default-profile.png"}alt={`${profile?.first_name || ""} ${profile?.last_name || ""}`}className="candidate-photo"/>
                                            </div>

                                            <div className="candidate-basic-info">
                                                <h3>{profile?.first_name || ""}{" "}{profile?.last_name || ""}</h3>
                                                <p>{profile?.profession || "Software Developer"}</p>
                                            </div>
                                        </div>

                                        {/* MATCHED SKILLS */}
                                        <div className="matched-skills">
                                            {candidate.matchedSkills?.map((skill, index) => (
                                            <span className="matched-skill"key={index}>✓ {skill}</span>
                                            ))}
                                        </div>


                                        {/* EXPERIENCE */}
                                        <div className="candidate-detail">
                                            <strong>Experience:</strong>
                                            <span>{profile?.working_experience || "Fresher"}</span>
                                        </div>


                                        {/* LOCATION */}
                                        <div className="candidate-detail">
                                            <strong>📍</strong>
                                            <span>{profile?.address || "Location not available"}</span>
                                        </div>


                                        {/* ALL SKILLS */}
                                        <div className="candidate-skills-section">
                                            <h4>Skills</h4>
                                            <p>{[candidate.programming_skills,candidate.technical_skills,candidate.tools,].filter(Boolean).join(" • ")}</p>
                                        </div>


                                        {/* EMAIL */}
                                        <div className="candidate-contact">
                                            <span>✉</span>
                                            <span>{profile?.email || "Email not available"}</span>
                                        </div>


                                        {/* PHONE */}
                                        <div className="candidate-contact">
                                            <span>☎</span>
                                            <span>{profile?.phone || "Phone not available"}</span>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="candidate-card-buttons">
                                            <button className="view-profile-btn" onClick={()=>dashboardViewProfile(candidate?.studentprofile_id?.student_profile_id, candidate.studentprofile_id?.user?.userId)}> View Profile</button>
                                            <button className="invite-candidate-btn"onClick={()=>dashboardSendInvitation(candidate)}>Invite to Apply</button>
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>
                            )}
                        </div>
                    </div>  
                </div>
            </div>
        </>)}



         {/*PROFILE PAGE*/}
         {pages === "Profile" && (<>
         
         <div className="profile_page_container">
            <div className="heading">
                 <div>
                    <h1>Profile</h1>
                    <h5>Manage your profile and account.</h5>
                 </div>
            </div>


            {/*PROFILE FORM CONTAINER*/}
            <div className="profile_form_container">
                <form >
                    <h4>Profile Information</h4>

                    <label htmlFor="">
                        <h4 style={{textDecoration:"underline"}}>HR / Recruiter Information</h4>
                    </label>
                    <label htmlFor="">Full Name : 
                        <input type="text" name="full_name" value={profileFields.full_name} onChange={handleProfileInput} />
                    </label>
                    <label htmlFor="">Email : 
                        <input type="email" name="email"  value={profileFields.email} onChange={handleProfileInput}/>
                    </label>
                    <label htmlFor="">Phone : 
                        <input type="text" name="phone"  value={profileFields.phone} onChange={handleProfileInput}/>
                    </label>
                    <label htmlFor="">Designation : 
                        <input type="text" name="designation"  value={profileFields.designation} onChange={handleProfileInput}/>
                    </label>
                    
                    <label htmlFor="">Profile Photo :
                        <input type="file" name="profile_photo" accept="image/*" onChange={handleProfileInput}/>
                    </label>


                    <label htmlFor="">
                        <h4 style={{textDecoration:'underline'}}>Company Information</h4>
                    </label>

                    <label htmlFor="">Company Name : 
                        <input type="text" name="company_name" value={profileFields.company_name} onChange={handleProfileInput}/>
                    </label>

                    <label htmlFor="">Industry : 
                        <input type="text" name="industry" value={profileFields.industry} onChange={handleProfileInput}/>
                    </label>

                    <label htmlFor="">Website :
                        <input type="text" name="comp_website" value={profileFields.comp_website} onChange={handleProfileInput}/>
                    </label>

                    <label htmlFor="">Location :
                        <input type="text" name="comp_location" value={profileFields.comp_location} onChange={handleProfileInput}/>
                    </label>


                    <label htmlFor="">Company Logo :
                        <input type="file" name="comp_logo" accept="image/*" onChange={handleProfileInput}/>
                    </label>

                    <button type="button"  onClick={saveProfile}>Save Profile</button>

                </form>



                {/*PROFILE VIEW*/}
                <div className="profile_View">
                    

                    <div style={{display:'flex', flexWrap:'wrap', width:'100%', borderBottom:'1px solid black', boxShadow:'0px 2px 2px pink'}}>
                        <h4>HR / Recruiter Profile</h4>
                    </div>

                    <div>
                        <img src={`http://localhost:8080/uploads/${recruiterProfile?.profile_photo}`} alt="Recruiter" />
                    </div>
                    <h4>{recruiterProfile?.full_name}</h4>
                    <h4>{recruiterProfile.designation}</h4>
                    <h4>{recruiterProfile.company_name}</h4>
                    <h4>{recruiterProfile.email}</h4>
                    <h4>+ {recruiterProfile.phone}</h4>
                    <h4>{recruiterProfile.comp_location}</h4>

                    <div style={{display:'flex', flexWrap:'wrap', width:'100%', borderBottom:'1px solid black', boxShadow:'0px 2px 2px pink'}}>
                        <h4>Company Profile</h4>
                    </div>
                    <div>
                        <img src={`http://localhost:8080/uploads/${recruiterProfile.comp_Logo}`} alt="Logo" />
                    </div>
                    <h4>{recruiterProfile.company_name}</h4>
                    <h4>{recruiterProfile.industry}</h4>
                    <h4><a href={recruiterProfile.website} target="blank">{recruiterProfile.website}</a></h4>
                    <h4>{recruiterProfile.location}</h4>
                </div>
            </div>
        </div>
        </>)}


         {/*MY JOB PAGES*/}
         {pages === 'myjob' && (<>
         
         
         {/*MY JOB PAGE*/}
         <div className="myjob_page_container">

            {/*HEADING*/}
            <div className="heading">
                <div>
                    <h1>My Jobs</h1>
                    <h5>Manage and track all your job postings .</h5>
                </div>
                <button type="button" onClick={(e)=>{e.preventDefault(); setPopup("NewJob")}}>+ Post New Job</button>
            </div>

            {/*SEARCHING CONTAINER*/}
            <div className="searching_container">
                <label htmlFor=""><input type="search" name="" placeholder="🔍 Search jobs ...." /></label>
                <label htmlFor=""><select name="">
                    <option value="AllStatus">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                </select></label>
            </div>



            {/*POSTED JOB CONTAINER*/}
            <div className="posted_job_container">
                <h1>Posted jobs</h1>

                {/*posted job cards*/}
                {postedjobData.length === 0 ?(
                    <h4>No Job Available</h4>
                ):(
                    postedjobData.map( (job)=>(
                        <div className="postedJobCard_container" key={job.job_id}>
                            <div>
                                <h3>{job.job_title}</h3>
                                <h4>Active</h4>
                            </div>
                            <h4>{job.skills}</h4>

                            <div>
                                <h4>{job.min_experience} - {job.max_experience} Years</h4>
                                <h4>{job.job_location}</h4>
                            </div>

                            <div>
                                <h4>₹ {job.min_package} - {job.max_package}</h4>
                            </div>

                            <div>{/*APPLICATIONS , SHORTLISTED , INTERVIEWS*/}
                                <h4>15 Applications</h4>
                                <h4>4 Shortlisted</h4>
                                <h4>2 Interview</h4>

                                <div>
                                    
                                    <button type="button" onClick={()=>editJob(job)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                

                
            </div>
         </div>
         </>)}



         {/*CANDIDATE PAGE*/}
        {pages === 'Candidates' && (<>
         <div className="candidate_page_container">

            <div className="heading">
                <div>
                    <h1>Candidates</h1>
                    <h5>Browse and manage all candidate profiles.</h5>
                </div>
            </div>

            
                {/* SEARCH BAR*/}
                <div className="searching_container">
                    {/* SEARCH CANDIDATES */}
                    <label htmlFor="candidateSearch">
                        <input type="search" id="candidateSearch" name="candidateSearch" value={appliedSearch} onChange={(e)=> setAppliedSearch(e.target.value)} />
                        <label htmlFor=""><button type="button" onClick={searchCandidates}> Search </button> </label>
                    </label>

                {/* EXPERIENCE FILTER */}
                <div className="experience_filter">
                    <span>Select Experience</span>
                    <label> <input type="checkbox" value={"0-1"} onChange={handleselectedExpforsearching} checked={selectedExp.includes("0-1")}/> 0 - 1 Years </label> 
                    <label> <input type="checkbox" value={"1-3"} onChange={handleselectedExpforsearching} checked={selectedExp.includes("1-3")}/>1 - 3 Years</label>
                    <label> <input type="checkbox" value={"3-5"} onChange={handleselectedExpforsearching} checked={selectedExp.includes("3-5")}/>3 - 5 Years</label>
                    <label> <input type="checkbox" value={"5+"} onChange={handleselectedExpforsearching} checked={selectedExp.includes("5+")}/>5+ Years </label>
                </div>
            </div>


            {/*CANDIDATES PROFILES*/}
            <div className="candidate_profile_container">
                <h2>All candidate profiles will be present here as per posted job skills and requirements</h2>
                {/*DISPLAY THE SEARCHED / FILTERED CANDIDATES TO RECRUITER*/}
                {filteredCandidate.length === 0 ? (
                    <p>No candidate found</p>
                ):(
                    filteredCandidate.map( (candidate)=>(
                        <div className="filteredcandidate_card" key={candidate.skill_id}>
                            <h3>{candidate.first_name} {candidate.last_name}</h3>
                            <h5>{candidate.profession}</h5>
                            <h5>{candidate.programming_skills} {" "} {candidate.technical_skills} {" "} {candidate.tool} </h5>
                            <h5>Email : <a href="{candidate.email}">{candidate.email}</a></h5>
                            <h5>Phone : {candidate.phone}</h5>
                            <div>
                                <button onClick={()=>{fetchStudentProfile(candidate.student_profile_id,candidate.userId); setShowStudentProfile(true)}}>View Profile</button>
                                <button onClick={()=>sendApplyInvitation(candidate)}>Invite for Apply</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>   
        </>)}



        {/*APPLICATION PAGE*/}
       {pages === 'Applications' &&(<>
       
        <div className="application_page_container">

            <div className="heading">
                <div>
                    <h1>Applications</h1>
                    <h5>Track and manage job applications. </h5>
                </div>
            </div>

            {/*SEARCH CONTAINER*/}
            <div className="search_container">
                
                <label htmlFor="">
                    <input type="search" name="Aisearch" placeholder="Search profession or skills" />
                    <button style={{display:'flex', padding:'0.5rem', borderRadius:'0.7rem', width:"100%", justifyContent:'center'}}>AI ATS RESUME FILTER</button>
                </label>
            </div>

                {/*CANDIDATE PROFILE TABLE DISPLAY*/}

                {loadingApplications ?(
                    <p>Application Loading ...</p>
                ):applications.length === 0 ?(
                    <p>No Application Received Yet</p>
                ):(
                    <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Candidates</th>
                                <th>Job Title</th>
                                <th>Skills</th>
                                <th>AI Match</th>
                                <th>Status</th>
                                <th>Applied On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map( (application)=>(
                                <tr key={application.application_id}>
                                <td>{application.student_profile?.first_name} {application.student_profile?.last_name}</td>
                                <td>{application.job?.job_title}</td>
                                <td>{application.job?.skills}</td>
                                <td>90 %</td>
                                <td>{application.application_status}</td>
                                <td>{application.applied_datetime? new Date(application.applied_datetime).toLocaleDateString():"N/A"}</td>
                                <td style={{display:'flex', gap:'1rem'}}>
                                    <button onClick={() =>{fetchStudentProfile( application.student_profile?.student_profile_id,application.student_profile?.user?.userId ); setShowStudentProfile(true);}}> View Profile</button>
                                    <button type="button"  onClick={()=>shortlistCandidate(application)} disabled={application.application_status === "Shortlisted"}style={{backgroundColor: application.application_status === "Applied" ? "yellow": "green"}}>{application.application_status === "Shortlisted" ? "Shortlisted":"Shortlist"}</button>
                                </td> 
                            </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
                )}  
        </div>
       </>)}



       {/*SHORTLISTED CANDIDATES*/}
       {pages ==="Shortlisted" && (<>
       
       <div className="shortlisted_page_container">

        <div className="heading">
            <div>
                <h1>Shortlisted Candidates</h1>
                <h5>Candidates you have shortlisted for further process.</h5>
            </div>
        </div>

        {/*SAERCH CONTAINER*/}
        <div className="search_container">
            <label htmlFor=""><input type="search" name="" placeholder="🔍 Search Shortlisted...." /></label>
            <label htmlFor=""><select name="">
                <option value="All">All Jobs</option>
                <option value="java">Java</option>{/* here fetch job title from database*/}
            </select></label>
            
        </div>


        {/*SHORTED CANDIDATES TABLE*/}
        <div className="candidate_profile_table">
                    <table>
                        <thead>
                            <tr>
                                <td>Candidates</td>
                                <td>Job Title</td>
                                <td>Status</td>
                                <td>Shortlisted Date</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {shortlistedLoading ? (
                            <tr> <td colSpan="8"> Loading shortlisted candidates...</td></tr>
                            ) : shortlistedCandidates.length === 0 ? (
                            <tr>
                                <td colSpan="8">No Candidates Shortlisted Yet.</td>
                            </tr>

                            ) : (

                                shortlistedCandidates.map((candidate) => {
                                    console.log("SHORTLISTED CANDIDATE:", candidate);

                                // GET APPLICATION OBJECT
                                const application = candidate.applicant_id;
                                // GET STUDENT PROFILE
                                const student = application?.student_profile;
                                // GET JOB
                                const job = application?.job;
                                // GET NAME
                                const firstName = student?.first_name || "";
                                const lastName = student?.last_name || "";
                                // GET JOB TITLE
                                const jobTitle = job?.job_title || "--";
                                // GET SKILLS
                                // If skills are present inside student_profile

                                const skills = student?.skills ||student?.programming_skills ||student?.technical_skills ||"--";
                                // GET APPLICATION DATE
                                const appliedDate = application?.applied_datetime;

                                return (
                                    <tr key={candidate.shortlisted_id}>

                                        {/*CANDIDATE NAME */}
                                        <td>{firstName} {lastName}</td>
                                        {/* JOB TITLE */}
                                        <td>{jobTitle}</td>
                                        
                                        {/* STATUS */}
                                        <td>{candidate.status ||application?.application_status ||"Shortlisted"}</td>
                                        {/* APPLIED ON*/}
                                        <td>{appliedDate? new Date(appliedDate).toLocaleDateString(): candidate.shortlisted_date? new Date(candidate.shortlisted_date).toLocaleDateString(): "N/A"}</td>
                                        {/* ACTION*/}
                                        <td>
                                            <button type="button" onClick={() =>{fetchStudentProfile( application.student_profile?.student_profile_id,application.student_profile?.user?.userId ); setShowStudentProfile(true);}}>View Profile</button>
                                            <button onClick={()=>openInterviewForm(application)}>Conduct Interview</button>
                                        </td>
                                    </tr>
                                );
                             })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </>)}



       {/*INTERVIEW PAGE*/}
       {pages ==="Interview" && (<>
       
        <div className="interview_page_container">
            <div className="heading">
                <div>
                    <h1>Interview</h1>
                    <h5>Manage and schedule interviews .</h5>
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
                                <th>Candidates</th>
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
                            {interviewLoading ? (
                                <tr>
                                    <td colSpan="8">Loading...</td>
                                </tr>
                                ) : scheduledInterviews.length === 0 ? (
                                    <tr>
                                        <td colSpan="8">No Interview Conducted Yet!</td>
                                    </tr>
                                ) : (
                                    scheduledInterviews.map((interview, index) => {
                                        const candidateName = interview?.candidateName || interview?.candidate_name ||(`${interview?.applicant_id?.student_profile?.first_name || ""}${interview?.applicant_id?.student_profile?.last_name || ""}`).trim() ||"--";
                                        const jobTitle = interview?.jobTitle ||interview?.job_title ||interview?.applicant_id?.job?.job_title ||interview?.application?.job?.job_title ||"--";
                                        const interviewType = interview?.interviewType ||interview?.interview_type ||"--";
                                        const interviewDate = interview?.interviewDate ||interview?.interview_date ||"--";
                                        const interviewTime =interview?.interviewTime ||interview?.interview_time ||"--";
                                        const interviewMode =interview?.interviewMode ||interview?.interview_mode ||"--";
                                        const status =interview?.status ||interview?.interview_status ||"Scheduled";
                                        const meetingLink =interview?.meetingLink ||interview?.meeting_link ||"";

                                        return (
                                            <tr key={interview?.interview_id ||interview?.scheduled_interview_id ||index}>
                                                <td>
                                                    {interview?.student_profile?.first_name? 
                                                    `${interview.student_profile.first_name} 
                                                    ${interview.student_profile.last_name || ""}`: interview?.first_name? `${interview.first_name} ${ interview.last_name || ""}`: "--"}
                                                </td>
                                                <td>{jobTitle}</td>
                                                <td>{interviewType}</td>
                                                <td>{interviewDate}</td>
                                                <td>{interviewTime}</td>
                                                <td>{interviewMode}</td>
                                                <td>office address</td>
                                                <td>{status}</td>
                                                <td>{meetingLink ? (
                                                    <button type="button" onClick={()=>joinMeeting(interview)} disabled={!meetingLink} >Join Meeting</button>
                                                ) : (
                                                    <button type="button" disabled>No Meeting Link</button>
                                                )}
                                                </td>
                                            </tr>
                                        )})
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
       </div>
    </>)}


       {/*AI CANDIDATE MATCH*/}
       {pages === "AiMatch" && (<>
       
       <div className="aimatch_container">
            <div className="heading">
                <div>
                    <h1>AI Candidate Match</h1>
                    <h5>AI-Powered recommendations for your job openings.</h5>
                </div>
            </div>

            <div className="subheading">
                <label htmlFor="">Job Position : 
                    <select name="">
                    <option value="SE">Software Engineer</option>
                    <option value="Java">Java Developer</option> {/*FETCH THESE JOB TITLE FROM DATABASE */}
                    </select>
                </label>
            </div>

            {/* TOP MATCHED CANDIDATES CONTAINER*/}
            <div className="topCandidates_container">
                <div className="top_matched_candidates">
                    <h4>Top Matched Candidates</h4>
                </div>

                <div className="ai_matchBreakdown">
                    <h4>AI - Matched Breakdown</h4>
                </div>
            </div>
       </div>
       </>)}
       


        {/*POPUP OF NEW JOB POSTING AND INTERVIEW SCHEDULING FORM */}
        {(popup === "NewJob" || popup === "EditJob") && (
        <div className="newJobpost_container">
            <form>
                <header>
                    <h3>{popup ==="EditJob"?"Edit Job" : "Post New Job"}</h3>
                    <button  type="button"onClick={() => setPopup(false)}>  X </button>
                </header>

                <label>
                    Job Title :<input  type="text" name="job_title" placeholder="e.g. Software Developer" value={postedJobFields.job_title} onChange={handlePostedJobInput}/>
                </label>


                <label>
                    Skills :<input type="text" name="skills" placeholder="e.g. Java, React, MySQL" value={postedJobFields.skills} onChange={handlePostedJobInput}/>
                </label>


                <label>
                    Experience :
                    <div className="experience_inputs">
                        <input type="number" name="min_experience" placeholder="Minimum" value={postedJobFields.min_experience} onChange={handlePostedJobInput}/>
                        <input type="number" name="max_experience"  placeholder="Maximum" value={postedJobFields.max_experience} onChange={handlePostedJobInput}/>
                    </div>
                </label>

                <label>
                    Location : <input type="text" name="job_location" placeholder="e.g. Mumbai"  value={postedJobFields.job_location} onChange={handlePostedJobInput}/>
                </label>


                <label>
                    Work Mode :
                    <select name="work_mode" value={postedJobFields.work_mode} onChange={handlePostedJobInput}>
                        <option value="">Select Work Mode</option>
                        <option>On-site</option>
                        <option>Hybrid</option>
                        <option>Remote</option>
                    </select>
                </label>


                <label>
                    Package :

                    <div className="package_inputs">
                        <input type="text" name="min_package" placeholder="Minimum (LPA)"  value={postedJobFields.min_package} onChange={handlePostedJobInput}/>
                        <input type="text" name="max_package" placeholder="Maximum (LPA)" value={postedJobFields.max_package} onChange={handlePostedJobInput}/>
                    </div>
                </label>

                <label>
                    Job Description :
                    <textarea name="job_description" placeholder="Describe the job role and responsibilities..."  value={postedJobFields.job_description}  onChange={handlePostedJobInput}/>
                </label>

                <button type="button" onClick={popup ==="EditJob"? updateExistingJob : postJob}> {popup ==="EditJob"?"Update Job" : "Post Job"}</button>
            </form>
        </div>
        )}



       {/*SCHEDULE INTERVIEW FORM POPUP */}
       {popup === 'ScheduleInterviewForm' && (<>
       <div className="shedule_inter_form_container">
    
        <div className="scheduleInterview_container">
            <form>
                <header>
                    <h3>Schedule Interview</h3>
                    <button  type="button" onClick={() => setPopup(false)}>X</button>
                </header>

                <label>
                    Candidate :<input type="text" name="candidateName" placeholder="Candidate Name" value={interviewForm.candidateName} onChange={handleInterviewForm} readOnly/>
                </label>

                <label>
                    Job Position : <input type="text" name="jobTitle" placeholder="Job Title" value={interviewForm.jobTitle} onChange={handleInterviewForm} readOnly/>
                </label>

                <label>
                    Interview Type :
                    <select name="interviewType" value={interviewForm.interviewType} onChange={handleInterviewForm}>
                        <option value="">Select Type</option>
                        <option>Technical</option>
                        <option>HR</option>
                        <option>Managerial</option>
                        <option>Final Round</option>
                    </select>
                </label>

                <label>
                    Interview Mode :
                    <select name="interviewMode" value={interviewForm.interviewMode} onChange={handleInterviewForm}>
                        <option value="">Select Mode</option>
                        <option>Online</option>
                        <option>Offline</option>
                    </select>
                </label>

                <label>
                    Interview Date :
                    <input type="date" name="interviewDate" value={interviewForm.interviewDate} onChange={handleInterviewForm}/>
                </label>

                <label>
                    Interview Time :
                    <input type="time" name="interviewTime" value={interviewForm.interviewTime} onChange={handleInterviewForm} />
                </label>

                <label>
                    Interviewer :
                    <input type="text" name="interviewer" placeholder="Interviewer name" value={interviewForm.interviewer} onChange={handleInterviewForm}/>
                </label>

                <label>
                    Meeting Link :
                    <input type="url" name="meetingLink" placeholder="https://meet.google.com/..." value={interviewForm.meetingLink} onChange={handleInterviewForm}/>
                </label>

                <label>
                    Additional Instructions :
                    <textarea name="additionalInfo" placeholder="Enter instructions for the candidate..." value={interviewForm.additionalInfo} onChange={handleInterviewForm}/>
                </label>

                <button type="button" onClick={scheduleInterview}> Schedule Interview </button>
            </form>
        </div>
        </div>
     </>)}


       

       {/* FUNCTION TO DISPLAY THE STUDENT PROFILE IN FORM OF PAGE */}
       {showStudentProfile && studentProfile &&(
        <div className="studentProfilePage_container">
            <header>
                <h3>Student Profile</h3>
                <button onClick={()=>{setShowStudentProfile(false)}}>Close</button>
            </header>

            <div>
                <div >
                    <div className="img_container">
                        <h5>Student Img</h5>
                    </div>

                    <div className="student_info">
                    <h3>{studentProfile.first_name} {studentProfile.last_name}</h3>
                    <h5>{studentProfile?.profession || "--"}</h5>
                    <h5><a href={studentProfile.email}>{studentProfile.email}</a></h5>
                    <h5>{studentProfile?.phone||"Not provided"}</h5>
                    <h5>{studentProfile?.aboutme ||"--"}</h5>
                    </div>
                </div>
                

                

                <div className="about_personal_info">
                    <h4>About / Personal Information</h4>

                    <h5>DOB : {studentProfile?.dob || "Not provided"}</h5>
                    <h5>Gender : {studentProfile?.gender ||"Not provided"}</h5>
                    <h5>Address : {studentProfile?.address ||"Not provided"}</h5>

                </div>

                <div className="education_info">
                    <h4>Education</h4>

                    <h4>10 th</h4>
                    <div>
                        <h5>School Name : {studentEducation?.tenSchool_name || "Not provided"}</h5>    
                        <h5>BOARD : {studentEducation?.ten_board || "Not provided"}</h5>
                        <h5>Percentage : {studentEducation?.ten_percentage || "Not provided"}</h5>
                    </div>

                    <h4>12 th</h4>   
                    <div>
                        <h5>School Name : {studentEducation?.twelve_schoolname || "Not provided"}</h5>
                        <h5>BOARD : {studentEducation?.twelve_board || "Not provided"}</h5>
                        <h5>Percentage : {studentEducation?.twelve_percentage || "Not provided"}</h5>
                        <h5>Stream : {studentEducation?.twelve_stream || "Not provided"}</h5>
                    </div> 

                    <h4>College</h4>  
                    <h5>College Name : {studentEducation?.college_name || "Not provided"}</h5>   
                    <h5>CGPA : {studentEducation?.college_cgpa || "Not provided"}</h5>
                    <h5>Course :{studentEducation?.course || "Not provided"}</h5>

                </div>

                <div className="skills_info">
                    <h4>Skills</h4>
                    <h5>{studentSkills?.programming_skills || "Not provided"}</h5>
                    <h5>{studentSkills?.technical_skills || "Not provided"}</h5>
                </div>

                <div className="experience_info">
                    <h4>Experience</h4>
                    <div style={{display:'flex', flexWrap:'wrap', gap:'1rem', borderBottom:"2px solid black", borderRadius:'1rem', paddingLeft:'1rem'}}>
                    <h5>{studentExperiences[0]?.company_name || "Not provided"}</h5>
                    <h5>{studentExperiences[0]?.job_title || "Not provided"}</h5>
                    <h5>{studentExperiences[0]?.experience_type || "Not provided"}</h5>
                    <h5>Total Experience: {studentExperiences[0]?.working_experience || "Nill"}</h5>
                    </div>
                </div>

                <div className="project_info">
                    <h4>Project</h4>

                    {studentProjects.length === 0 ? (
                        <p>No Project</p>
                    ):(
                        studentProjects.reverse().map( (project)=>(
                            <div className="project_cards" key={project.project_id}>
                                <div style={{display:'flex', flexDirection:"column", border:'2px solid black', borderRadius:'1rem', padding:'0.5rem'}}>
                                <h4>{project.project_name}</h4>
                                <h5>Your Role ; {project.project_yourrole}</h5>
                                <h5>Description : {project.project_description}</h5>
                                <h5>Technology : {project.project_technology}</h5>
                                <h5>GitHub : <a href={project.project_giturl} target="_blank">{project.project_giturl}</a></h5>
                                <h5>Project : <a href={project.project_livedemo} target="_blank">View Project</a></h5>  
                                </div>                              
                            </div>
                        ))
                    )}
                </div>

                <div className="resume_info">

                </div>
            </div>
        </div>
       )}
       
      
        </div>
    </div>
    </>)
}

export default RecruiterDashboard;