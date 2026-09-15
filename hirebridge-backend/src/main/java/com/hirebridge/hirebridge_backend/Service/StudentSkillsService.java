package com.hirebridge.hirebridge_backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentSkillEntity;
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.StudentSkillsRepository;

@Service
public class StudentSkillsService {

    private final StudentSkillsRepository skillRepository;
    private final StudentProfileRepository profileRepository;

    // INJECT CONSTRUCTOR
    public StudentSkillsService(StudentSkillsRepository skillsRepository, StudentProfileRepository profileRepository) {
        this.skillRepository = skillsRepository;
        this.profileRepository = profileRepository;
    }

    // FUNCTION SAVE SKILL DATA TO THE SKILL DATABASE
    public StudentSkillEntity saveSkillData(StudentSkillEntity skillEntity, Long studentprofile_id) {

        // FIND STUDENT PROFILE
        StudentProfileEntity studprofile_id = profileRepository.findById(studentprofile_id)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        // FIXED: Changed .orElseThrow(null) to .orElse(null) to prevent runtime exceptions on new users
        StudentSkillEntity existingData = skillRepository.findByStudentProfileId(studentprofile_id).orElse(null);

        // IF DATA EXISTS - UPDATE THE DATA (SQL UPDATE)
        if (existingData != null) {
            existingData.setProgramming_skills(skillEntity.getProgramming_skills());
            existingData.setTechnical_skills(skillEntity.getTechnical_skills());
            existingData.setTools(skillEntity.getTools());
            existingData.setSoft_skills(skillEntity.getSoft_skills());
            
            // SAVE UPDATED ROW
            return skillRepository.save(existingData);
        }

        // IF NO DATA EXISTS - CREATE NEW ROW (SQL INSERT)
        // Note: Passes the complete 'studprofile_id' object record cleanly into the target profile mapping relationship
        skillEntity.setStudentprofile_id(studprofile_id);

        return skillRepository.save(skillEntity);
    }

    // GET OR RECEIVE THE STORED DATA FROM DATABASE TO THE FRONTEND
    public StudentSkillEntity getSkillData(Long studentprofile_id) {
        return skillRepository.findByStudentProfileId(studentprofile_id)
                .orElseThrow(() -> new RuntimeException("student id not found"));
    }



    //FUNCTION TO GET SKILLS OF CANDIDATE FOR SEARCHING
    public List<StudentSkillEntity> getskillsforsearching(){
        //get all skill records from database
        return skillRepository.findAll();
    }
}
