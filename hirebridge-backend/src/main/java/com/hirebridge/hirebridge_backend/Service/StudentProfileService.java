package com.hirebridge.hirebridge_backend.Service;


import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
 //IMPORT REPOSITORY
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;
//IMPORT ANNOTATION
import org.springframework.web.bind.annotation.*;




@Service
public class StudentProfileService {
    
    //INJECT USER REPOSITORY OBJECT
    @Autowired
    private StudentProfileRepository stud_prof_repository;

    @Autowired
    private UserRepository userRepository;

    //FUNCTION TO SAVE PROFILE INTO TABLE
    public StudentProfileEntity  SaveProfile(StudentProfileEntity  stud_profile_entity){
        return stud_prof_repository.save(stud_profile_entity);
    }


    //FUNCTION TO GET STUDENT STORED PROFILE INFORMATION
     public StudentProfileEntity getStudentProfileByUserId(Long user_id) {
        return stud_prof_repository.findStudentProfileByUserId(user_id).orElseThrow(()->new RuntimeException("Student profile not found"));
     }
}
