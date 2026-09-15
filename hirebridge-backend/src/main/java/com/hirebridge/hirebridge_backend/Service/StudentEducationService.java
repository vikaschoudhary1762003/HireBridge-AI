package com.hirebridge.hirebridge_backend.Service;


//IMPORT FILES ENTITY
import com.hirebridge.hirebridge_backend.Entity.StudentEducationEntity;
import com.hirebridge.hirebridge_backend.Repository.StudentEducationRepository;

//IMPORT BUILD IN PACKAGES
 import org.springframework.stereotype.Service;
 import org.springframework.beans.factory.annotation.Autowired;
import com.hirebridge.hirebridge_backend.Entity.StudentEducationEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Repository.StudentEducationRepository;
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;
@Service
public class StudentEducationService {

    //OBJECTS
    private final StudentEducationRepository studentEducationRepository;
    private final StudentProfileRepository studentProfileRepository;


    //INJECT CONSTRUCTOR
    public StudentEducationService( StudentEducationRepository studentEducationRepository,  StudentProfileRepository studentProfileRepository) {
        this.studentEducationRepository = studentEducationRepository;
        this.studentProfileRepository = studentProfileRepository;
    }




    // SAVE EDUCATION DATA IN DATABASE  
    public StudentEducationEntity saveEducationData(StudentEducationEntity educationEntity,Long studentProfileId) {

        // FIND STUDENT PROFILE ID FOR CONFIRMING THAT EITHER USER EXISTS IN TABLE OR NOT
        StudentProfileEntity studentProfile = studentProfileRepository.findById(studentProfileId).orElseThrow(() -> new RuntimeException("Student Profile not found with ID: "  + studentProfileId  ));

        // CONNECT EDUCATION WITH STUDENT PROFILE
        educationEntity.setStudentprofile(studentProfile);

        // SAVE EDUCATION
        return studentEducationRepository.save(educationEntity);
    }





    // GET EDUCATION DATA USING STUDENT PROFILE ID

    public StudentEducationEntity getEducation_Data(Long studentProfileId) {
        return studentEducationRepository.findByStudentProfileId(studentProfileId).orElseThrow(() -> new RuntimeException("Education data not found for Student Profile ID: "+ studentProfileId ));
   }





   //UPDATE THE STUDENT EDUCATION DATA 
   public StudentEducationEntity updateData(Long educationId , StudentEducationEntity educationEntity){

        //FIND EXISTING EDUCATION RECORD
        StudentEducationEntity existingData = studentEducationRepository.findById(educationId).orElseThrow(()->new RuntimeException("Education data not found with id" + educationId));

        //UPDATE 10TH DATA
        existingData.setTenschool_name(educationEntity.getTenSchool_name());
        existingData.setTen_board(educationEntity.getTen_board());
        existingData.setTen_percentage(educationEntity.getTen_percentage());
        existingData.setTen_passing(educationEntity.getTen_passing());


        //UPDATE 12TH DATA
        existingData.setTwelve_schoolname(educationEntity.getTwelve_schoolname());
        existingData.setTwelve_board(educationEntity.getTwelve_board());
        existingData.setTwelve_stream(educationEntity.getTwelve_stream());
        existingData.setTwelve_percentage(educationEntity.getTwelve_percentage());
        existingData.setTwelve_passing(educationEntity.getTen_passing());


        //UPDATE GRADUATION
        existingData.setCollege_name(educationEntity.getCollege_name());
        existingData.setCourse(educationEntity.getCourse());
        existingData.setSpacialization(educationEntity.getSpacialization());
        existingData.setCurrent_semester(educationEntity.getCurrent_semester());
        existingData.setCurrent_year(educationEntity.getCurrent_year());
        existingData.setCollege_cgpa(educationEntity.getCollege_cgpa());
        existingData.setGraduation_year(educationEntity.getGraduation_year());

        //SAVE UPDATED RECORDS
        return studentEducationRepository.save(existingData);
   }
}