package com.hirebridge.hirebridge_backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hirebridge.hirebridge_backend.Entity.StudentExperienceEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Repository.StudentExperienceRepository;
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;
 



@Service
public class StudentExperienceService {
    

    //CREATE OBJEC
    private final StudentExperienceRepository experienceRepository;
    private final StudentProfileRepository    profileRepository;

    //INJECT CONSTRUCTOR
    public StudentExperienceService(StudentExperienceRepository experienceRepository , StudentProfileRepository profileRepository){
        this.experienceRepository = experienceRepository;
        this.profileRepository = profileRepository;
    }


    //FUNCTION TO SAVE EXPERIENCE DATA INTO DATBASE
    public StudentExperienceEntity saveExpData(StudentExperienceEntity experienceEntity , Long studentprofile_id){

        //FIND STUDENT PROFILEID IN EXPERIENCE TABLE FOR GETTING OTHER DATA OF EXPEIRINCE
        StudentProfileEntity profileEntity = profileRepository.findById(studentprofile_id).orElseThrow(()->new RuntimeException("PROFILE ID NOT FOUND"));
        
        //CONNECT EXPERIENCE WITH PROFILEID
        experienceEntity.setStudentprofile_id(profileEntity);

        //SAVE EXPERIENCE DATA INTO DATABASE
        return experienceRepository.save(experienceEntity);

    }


    //FUNCTION TO GET EXPERIENCE DATA FROM DATABASE AND STORE INN LIST 
    public List <StudentExperienceEntity> getExpData(Long studentprofile_id){
        return experienceRepository.findByStudentProfileId(studentprofile_id);
    }



    //FUNCTION TO GET STUDENT EXPERINCE FOR SEARCHING 
    public List<StudentExperienceEntity> getexpforsearching(){

        //RETURN ALL DATA
        return experienceRepository.findAll();
    }
}
