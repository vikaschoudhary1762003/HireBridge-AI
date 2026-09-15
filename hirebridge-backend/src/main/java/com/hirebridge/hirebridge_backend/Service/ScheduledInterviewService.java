package com.hirebridge.hirebridge_backend.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hirebridge.hirebridge_backend.Dto.StudentInterviewResponseDTO;
import com.hirebridge.hirebridge_backend.Entity.AppliedJobEntity;
import com.hirebridge.hirebridge_backend.Entity.JobpostEntity;
import com.hirebridge.hirebridge_backend.Entity.RecruiterProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.ScheduledInterviewEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.UserEntity;
import com.hirebridge.hirebridge_backend.Repository.AppliedJobRepository;
import com.hirebridge.hirebridge_backend.Repository.RecruiterProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.ScheduledInterviewRepository;
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.UserRepository;




@Service
public class ScheduledInterviewService {
    
    //INJECT REPOSITORY
    private final ScheduledInterviewRepository scheduledRepository;
    private final AppliedJobRepository appliedRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final StudentProfileRepository studentRepository;
    private final RecruiterProfileRepository recruiterRepository;

    //CONSTRUCTOR INJECTION
    public ScheduledInterviewService(ScheduledInterviewRepository scheduledRepository , AppliedJobRepository appliedRepository , EmailService emailService , UserRepository userRepository , StudentProfileRepository studentRepository , RecruiterProfileRepository recruterRepository){
        this.scheduledRepository = scheduledRepository;
        this.appliedRepository = appliedRepository;
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.recruiterRepository = recruterRepository;
    }


    //FUNCTION TO SCHEDULE INTERVIEW 
    public ScheduledInterviewEntity scheduleInterview(Long recruiterId,Long applicationId, String interviewType , String interviewMode, LocalDate interviewDate,LocalTime interviewTime,String meetingLink,String additionalInfo){
         // FIND RECRUITER
        //FIND  APPLICATION
        AppliedJobEntity application = appliedRepository.findById(applicationId).orElseThrow(()-> new RuntimeException("APPLICATION ID NOT FOUND" + applicationId));
        
        // GET THE ACTUAL RECRUITER WHO POSTED THIS JOB
        if (application.getJob() == null) {
            throw new RuntimeException("Job not found for Application ID: "+ applicationId);
        }
        RecruiterProfileEntity jobRecruiter = application.getJob().getRecruiter_id();

        if (jobRecruiter == null) {
            throw new RuntimeException("Recruiter profile not found for Job ID: " + application.getJob().getJob_id());
        }

        //GET THE STUDENT WHO APPLIED 
        StudentProfileEntity studentprofile = application.getStudent_profile();
        if (studentprofile == null) {
            throw new RuntimeException("Student profile not found for application" + applicationId);
        }
        if (jobRecruiter.getUser() == null) {
            throw new RuntimeException("Recruiter user not found for Recruiter ID: "+ jobRecruiter.getRecruiter_id());
        }

        // GET RECRUITER FROM THE JOB'S RECRUITER PROFILE
        UserEntity recruiter = jobRecruiter.getUser();

        //SCHEDULE INTERVIEW OBJECT
        ScheduledInterviewEntity interview = new ScheduledInterviewEntity();

        //CONNECT INTERVIEW WITH STUDENT and APPLICATION AND RECRUITER
        interview.setRecruiter(recruiter);
        interview.setStudent_profile(studentprofile);
        interview.setApplication(application);


        //STORE INTERVIEW DETAILS
        interview.setInterview_type(interviewType);
        interview.setInterview_mode(interviewMode);
        interview.setInterview_date(interviewDate);
        interview.setInterview_time(interviewTime);
        interview.setMeeting_link(meetingLink);
        interview.setAdditional_info(additionalInfo);
        interview.setStatus("Scheduled");


        //SAVE THE DETAILS INTO SCHEDULED_INTERVIEW TABLE
        ScheduledInterviewEntity saveInterview = scheduledRepository.save(interview);


        //SEND EMAIL TO CANDIDATE
        String candidateName = studentprofile.getFirst_name() + studentprofile.getLast_name();
        String candidateEmail = studentprofile.getEmail();
        String jobTitle = application.getJob().getJob_title();
        emailService.sendInterviewEmail(candidateName , candidateEmail , jobTitle ,interviewType , interviewMode , interviewDate , interviewTime , meetingLink , additionalInfo);
        return saveInterview;

    }





    //GET OR RECIEVE ALL SCHEDULED INTERVIEWS 
    public List<ScheduledInterviewEntity> getAllInterview(){
        return scheduledRepository.findAll();
    }


    //GET OR RECIEVE DETAIL OF ALL INTERVIEW ROUNDS OF ONE STUDENT
    public List<ScheduledInterviewEntity> getStudentInterview(StudentProfileEntity studentProfile){
        return scheduledRepository.findByStudentProfile(studentProfile);
    }

    public List<ScheduledInterviewEntity> getRecruiterInterviews(Long recruiterId) { 
        //RECRUITER ID PROFILE
        RecruiterProfileEntity recruiterprofile = recruiterRepository.findById(recruiterId).orElseThrow(()->new RuntimeException("RECRUITER PROFILE NOT FOUND"));

        //GET USER ENTITY CONNECTED TO THIS RECRUITER PROFILE
        UserEntity recruiter = recruiterprofile.getUser();
        if (recruiter == null) {
            throw new RuntimeException("User not found for recruiter profile id" + recruiterId);
        }

        //FETCH SHCEDULED INTERVIEW USING USER ENTITY
        return scheduledRepository.findByRecruiter(recruiter);
    }

    
    //FUNCTION TO GET STUDENT INTERVIEWS USING USER_ID FOR DISPLAY INTEVIEWS TO PARTICULAR STUDENT WHERE THEY APPLIED AND SHORTLISTED FOR INTERVIEW
    public List<StudentInterviewResponseDTO> getStudentInterviewsByUserId(Long userId){

        //FIND  STUDENT PROFILE USING USER_ID
        StudentProfileEntity student = studentRepository.findStudentProfileByUserId(userId).orElseThrow(()->new RuntimeException("User id not found" + userId));

        //GET ALL INTERVIEWS BELONGS TO THIS PARTICULAR USER/ STUDENT
        List<ScheduledInterviewEntity> interviews = scheduledRepository.findByStudentProfile(student);

        //RESPONSE LIST FOR FRONTEND
        List<StudentInterviewResponseDTO> responseList = new ArrayList<>();

        //PROCESS EACH INTERVIEW
        for(ScheduledInterviewEntity interview : interviews){
            

            //INTERVIEW DETAILS

            //OBJECT
            StudentInterviewResponseDTO response = new StudentInterviewResponseDTO();

            response.setInterview_id(interview.getInterview_id());
            response.setInterview_date(interview.getInterview_date());
            response.setInterview_time(interview.getInterview_time());
            response.setInterview_type(interview.getInterview_type());
            response.setInterview_mode(interview.getInterview_mode());
            response.setMeeting_link(interview.getMeeting_link());
            response.setAdditional_info(interview.getAdditional_info());
            response.setInterview_address(interview.getInterview_address());
            response.setStatus(interview.getStatus());


            //APPLICATION DETAILS
            AppliedJobEntity application = interview.getApplication();

            if (application == null) {
                responseList.add(response);
                continue;
            }


            //GET JOB FROM APPLICATION
            JobpostEntity job = application.getJob();
            if (job == null) {
                responseList.add(response);
                continue;
            }

            //JOB TITLE
            response.setJob_title(job.getJob_title());

            //GET ACTUAL RECRUITER WHO POSTED THE JOB
            RecruiterProfileEntity recruiter = job.getRecruiter_id();

            if (recruiter != null) {
                //COMPANY
                response.setCompany_name(recruiter.getCompany_name());
                response.setDesignation(recruiter.getDesignation());
                String fullName = recruiter.getFull_name();
                if (fullName != null && !fullName.trim().isEmpty()) {
                    response.setRecruiter_name(fullName);
                }else if(recruiter.getUser() != null){
                }
            }
            // ADD FINAL RESPONSE
            responseList.add(response);
        }
        return responseList;
    }
}
