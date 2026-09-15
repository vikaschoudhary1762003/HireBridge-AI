package com.hirebridge.hirebridge_backend.Service;

import com.hirebridge.hirebridge_backend.Entity.AppliedJobEntity;
import com.hirebridge.hirebridge_backend.Entity.JobpostEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;

import com.hirebridge.hirebridge_backend.Service.EmailService;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.hirebridge.hirebridge_backend.Repository.AppliedJobRepository;
import com.hirebridge.hirebridge_backend.Repository.PostedJobRepository;
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;

import java.util.List;


@Service
public class AppliedJobService {

    private final EmailService emailService;    
    //INJECT OBJECT OR CREATE
    private final AppliedJobRepository appliedjobRepository;
    private final StudentProfileRepository studentprofileRepository;
    private final PostedJobRepository postedjobRepository;

    //INJECT CONSTRUCTOR
    public AppliedJobService (AppliedJobRepository appliedJobRepository , StudentProfileRepository studentProfileRepository , PostedJobRepository postedJobRepository, EmailService emailService){
        this.appliedjobRepository = appliedJobRepository;
        this. studentprofileRepository = studentProfileRepository;
        this. postedjobRepository = postedJobRepository;
        this.emailService = emailService;
    }


    //FUNCTION TO APPLY JOB
    public AppliedJobEntity applyJob(Long user_id , Long job_id){
        //FIND STUDENT PROFILE USEING USER ID
        StudentProfileEntity studentProfile = studentprofileRepository.findStudentProfileByUserId(user_id).orElseThrow(()->new RuntimeException("STUENT PROFILE NOT FOUND"));

        //FIND JOB USING JOB ID
        JobpostEntity job = postedjobRepository.findById(job_id).orElseThrow(()->new RuntimeException("JOB ID NOT FOUND"));

        //CHECK DUPLICATE APPLICATION
        boolean alreadyApplied = appliedjobRepository.existsByStudentAndJob(studentProfile.getStudent_profile_id(), job_id);

        if (alreadyApplied) {
            throw new RuntimeException("you have already applied for this job");
        }


        //CREATE APPLICATION
        AppliedJobEntity application = new AppliedJobEntity();

        application.setStudent_profile(studentProfile);
        application.setJOb(job);
        application.setApplication_status("Applied");
        application.setApplied_datetime(LocalDateTime.now());

        //SAVE APPLICATION
        return appliedjobRepository.save(application);
    }



    //FUNCTION TO RECEIVE OR GET DATA FROM APPLIED_JOBS TABLE TO DISPLAY ON UI
    public List <AppliedJobEntity> getAppliedJob(Long user_id){
        //GET STUDENT DATA FOR DISPLAYING ON RECRUITER DASHBOARD
        StudentProfileEntity studentProfile = studentprofileRepository.findStudentProfileByUserId(user_id).orElseThrow(()->new RuntimeException("STUDENT PROFILE NOT FIND"));
        
        //RETURN THE DATA
        return appliedjobRepository.findByStudentProfileId(studentProfile.getStudent_profile_id());
        
    }


    //FUNCTION TO GET ALL APPLICATIONS FOR RECRUITER
    public List <AppliedJobEntity> getApplicationRecruiter(Long recruiter_id){
        return appliedjobRepository.findApplicationsByRecruiterId(recruiter_id);
    }



    //FUNCTION TO UPDATE OR PUT THE APPLIED JOB STATUS EITHER SHORTLISTED REJECTED 
 public AppliedJobEntity updateApplicationStatus(
        Long application_id,
        String status) {

    // FIND APPLICATION BY APPLICATION ID
    AppliedJobEntity application =
            appliedjobRepository.findById(application_id)
            .orElseThrow(() ->
                    new RuntimeException("Application not found"));

    // ALLOW ONLY THESE STATUSES
    if (!status.equals("Shortlisted") &&
        !status.equals("Rejected") &&
        !status.equals("Applied")) {

        throw new RuntimeException("Invalid application status");
    }

    // UPDATE STATUS
    application.setApplication_status(status);

    //SAVE APPLICATION
    AppliedJobEntity updatedApplication = appliedjobRepository.save(application);


 
    
    //SEND EMAIL TO THE SHORTLISTED CANDIDATES
    if (status.equals("Shortlisted")) {
        //GET CANDIDATE NAME
        String candidateName = application.getStudent_profile().getFirst_name() + " " + application.getStudent_profile().getLast_name();
        
        //GET CANDIDATE EMAIL
        String candidateEmail = application.getStudent_profile().getEmail();

        //GET JOB TITLE
        String jobTitle = application.getJob().getJob_title();

        //SEND EMAIL
        emailService.sendEmail(candidateName , candidateEmail , jobTitle);
        
    }

    //RETURN UDATAED APPLICATION
    return updatedApplication;
}
}
