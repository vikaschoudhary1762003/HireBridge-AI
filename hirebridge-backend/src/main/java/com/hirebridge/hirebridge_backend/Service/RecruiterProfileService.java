package com.hirebridge.hirebridge_backend.Service;

import org.springframework.stereotype.Service;

import com.hirebridge.hirebridge_backend.Entity.RecruiterProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.UserEntity;
import com.hirebridge.hirebridge_backend.Repository.RecruiterProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.UserRepository;




@Service
public class RecruiterProfileService {

    //CREATE OBJECT FOR ENTITY AND REPOSITORY OF USER AND RECRUITER PROFILE
    private final UserRepository userRepository;
    private final RecruiterProfileRepository recruiterRepository;


    //CONSTRUCTOR
    public RecruiterProfileService(RecruiterProfileRepository recruiterRepository , UserRepository userRepository ){
        this.recruiterRepository = recruiterRepository;
        this.userRepository = userRepository;
    }


    //FUNCTION TO SAVE RECRUITER INFO INTO DATABASE
    public RecruiterProfileEntity saveProData(RecruiterProfileEntity recruiterEntity , Long user_id){

        //FIND USER
        UserEntity user = userRepository.findById(user_id).orElseThrow(()->new RuntimeException("User ID " + user_id +" not found"));

        //ATTACH USER TO RECRUITER PROFILE
        recruiterEntity.setUser(user);

        //SAVE PROFILE
        return recruiterRepository.save(recruiterEntity);
    }



    //FUNCTION TO GET/RETRIEVE DATA FROM DATABASE
    public RecruiterProfileEntity getData(Long user_id){
        return recruiterRepository.findByUserId(user_id).orElseThrow(()->new RuntimeException("user id not found"));
    }
}
