package com.hirebridge.hirebridge_backend.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hirebridge.hirebridge_backend.Entity.AppliedJobEntity;
import com.hirebridge.hirebridge_backend.Entity.RecruiterProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.ShortlistedCandidateEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Repository.AppliedJobRepository;
import com.hirebridge.hirebridge_backend.Repository.RecruiterProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.ShortlistedCandidateRepository;
import com.hirebridge.hirebridge_backend.Service.EmailService;
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;

 
@Service
public class ShortlistedCandidateService {
    
    //INJECT OBJECSTS
    private final ShortlistedCandidateRepository shortlistedRepository ;
    private final AppliedJobRepository appliedjobRepository;
    private final RecruiterProfileRepository recruiterRepository;
    private final EmailService emailService;
    private final StudentProfileRepository studentProfileRepository;


    //INJECT CONSTRUCTOR
    public ShortlistedCandidateService(ShortlistedCandidateRepository shortlistedRepository , AppliedJobRepository appliedJobRepository , RecruiterProfileRepository recruiterRepository , EmailService emailService , StudentProfileRepository studentProfileRepository){
        this. shortlistedRepository = shortlistedRepository;
        this.appliedjobRepository = appliedJobRepository;
        this . recruiterRepository = recruiterRepository;
        this.emailService = emailService;
        this.studentProfileRepository = studentProfileRepository;
    }


    //FUNCTION TO SAVE SHORTLISTED CANDIDATE DATA OR IDS INO THE SHORTLISTD_CANDIDATE TABLE
    public ShortlistedCandidateEntity shortlistedCandidates(Long recruiter_id , Long applicant_id){


        //CHECK IF CANDIDATE ALREADY SHORTLISTED
        boolean alreadyShortlisted = shortlistedRepository.existsByRecruiterIdAndApplicationId(recruiter_id , applicant_id);
        if (alreadyShortlisted) {
            throw new RuntimeException("Candidate is already shortlisted");
        }

        //FUNCTION TO GET RECRUITER DATA
        RecruiterProfileEntity recruiter = recruiterRepository.findById(recruiter_id).orElseThrow(()->new RuntimeException("RECRUITERO NOT FOUND"));

        //GET APPLICANT
         AppliedJobEntity  appliedjob = appliedjobRepository.findById(applicant_id).orElseThrow(()->new RuntimeException("APPLICATION NOT FOUND"));

        //CREATE SHORTLISTED ENTITY
        ShortlistedCandidateEntity shortlisted = new ShortlistedCandidateEntity();


        //SET RECRUITER
        shortlisted.setRecruiter_id(recruiter);
        shortlisted.setApplicant_id(appliedjob);
        shortlisted.setShortlisted_date(LocalDateTime.now());
        shortlisted.setStatus("Shortlisted");

    // SAVE TO DATABASE 
    ShortlistedCandidateEntity savedShortlisted = shortlistedRepository.save(shortlisted);


    //SEND EMAIL TO SHORTLISTED CANDIDATES

    String candidateEmail = appliedjob.getStudent_profile().getEmail();
    String candidateName = appliedjob.getStudent_profile().getFirst_name() + " " + appliedjob.getStudent_profile().getLast_name();
    String jobTitle = appliedjob.getJob().getJob_title();

    emailService.sendEmail(candidateName, candidateEmail, jobTitle);

    // RETURN SAVED SHORTLISTED CANDIDATE 
    return savedShortlisted;
    
    }





    //FUNCTION TO GET OR RECEIVE ALL SHORTLISTED CANDIDATES FROM TABLE 
    public List<ShortlistedCandidateEntity> getShortlistCandidates(Long recruiter_id){
        return shortlistedRepository.findByRecruiterId(recruiter_id);
    }





// FUNCTION TO SEND INVITATION EMAIL TO CANDIDATE
// FUNCTION TO SEND INVITATION EMAIL TO CANDIDATE
public void sendInvitation(Long recruiter_id, Long student_profile_id) {

    // FIND CANDIDATE USING STUDENT PROFILE ID
    StudentProfileEntity candidate =
            studentProfileRepository.findById(student_profile_id)
            .orElseThrow(() ->
                    new RuntimeException("Candidate not found"));

    // FIND RECRUITER USING RECRUITER ID
    RecruiterProfileEntity recruiter =
            recruiterRepository.findById(recruiter_id)
            .orElseThrow(() ->
                    new RuntimeException("Recruiter not found"));

    // GET CANDIDATE EMAIL
    String candidateEmail = candidate.getEmail();

    // GET CANDIDATE NAME
    String candidateName =
            candidate.getFirst_name() + " " +
            candidate.getLast_name();

    // GET COMPANY NAME
    String companyName = recruiter.getCompany_name();

    // LINK FOR CANDIDATE
    String companyWebsite = recruiter.getWebsite();

    // SEND INVITATION EMAIL
    emailService.sendApplyInvitationEmail(
            candidateEmail,
            candidateName,
            companyName,
            companyWebsite
    );
}


}


