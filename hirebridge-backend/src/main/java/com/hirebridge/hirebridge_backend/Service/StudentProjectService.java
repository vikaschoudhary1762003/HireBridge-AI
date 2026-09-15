package com.hirebridge.hirebridge_backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProjectEntity;
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.StudentProjectRepository;

import lombok.extern.java.Log;






@Service
public class StudentProjectService {
    
    //CREATE ENTITY OBJECT AND PROFILE REPOSITORY OBJECT
    private final StudentProjectRepository projectRepository;
    private final StudentProfileRepository profileRepository;


    //CONSTRUCTOR INJECT
    public StudentProjectService(StudentProfileRepository profileRepository , StudentProjectRepository projectRepository){
        this.profileRepository = profileRepository;
        this.projectRepository = projectRepository;
    }


    //FUNCTION TO SAVE PROJECT INFO INTO DATABASE
    public StudentProjectEntity saveProData(StudentProjectEntity projectEntity , Long studentprofile_id){

        //FIND PROFILE ID FOR GETTING DATA AS PER PROFIEID
        StudentProfileEntity profileEntity = profileRepository.findById(studentprofile_id).orElseThrow(()->new RuntimeException("PROFILE ID NOT FOUND"));

        //AFTER GETTING ID CONNECT PROJECT DATA WITH PROFILE ID SO THAT USER CAN FETCH THE EXACT DATA AS PER THEIR ID
        projectEntity.setStudentprofile_id(profileEntity);

        //SAVE PROJECT DATA
        return projectRepository.save(projectEntity);
    }



    //FUNCION TO GET PROJECT INFO FROM DATABASE
    public List <StudentProjectEntity> getProData(Long studentprofile_id){
        return projectRepository.findByStudentprofile_id(studentprofile_id);
    } 
}
