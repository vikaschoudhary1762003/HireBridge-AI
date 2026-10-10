package com.hirebridge.hirebridge_backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hirebridge.hirebridge_backend.Entity.JobpostEntity;
import com.hirebridge.hirebridge_backend.Entity.RecruiterProfileEntity;
import com.hirebridge.hirebridge_backend.Repository.PostedJobRepository;
import com.hirebridge.hirebridge_backend.Repository.RecruiterProfileRepository;




@Service
public class PostedJobService {
    
    //CREATE OBJECT 
    private final PostedJobRepository postedjobRepository;
    private final RecruiterProfileRepository recruiterRepository;

    //INJECT CONSTRUCTOR
    public PostedJobService( PostedJobRepository postedJobRepository, RecruiterProfileRepository recruiterRepository) {
        this.postedjobRepository = postedJobRepository;
        this.recruiterRepository = recruiterRepository;
    }

    //FUNCTION TO SAVE POSTED JOB INTO DATABASE TABLE
    public JobpostEntity saveJobData(JobpostEntity jobpostEntity , Long recruiter_id){

        //FIND USER
        RecruiterProfileEntity recruiter = recruiterRepository.findById(recruiter_id).orElseThrow(()->new RuntimeException("RECRUITER ID NOT FOUND"));

        //ATTACH POSTED JOB TO THE RECRUITER ID
        jobpostEntity.setRecruiter_id(recruiter);

        //SAVE POSTED JOB DATA INTO TABLE
        return postedjobRepository.save(jobpostEntity);

    }

    //FUNCTION TO GET POSTED JOB DATA
    public List <JobpostEntity> getPostedJob(Long recruiter_id){
        RecruiterProfileEntity recruiterEntity = recruiterRepository.findById(recruiter_id).orElseThrow(() -> new RuntimeException("RECRUITER ID NOT FOUND"));
        return postedjobRepository.findByRecruiter_id(recruiter_id);
    }

    // GET ALL JOBS FOR STUDENTS
    public List<JobpostEntity> getAllPostedJobs() {
        return postedjobRepository.findAll();
    }



    //GET ALL JOB TITLE FOR SEARCHING
    public List<JobpostEntity> getPostedJobsforsearching(){
        return postedjobRepository.findAll();
    }
}