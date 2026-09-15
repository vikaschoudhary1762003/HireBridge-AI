package com.hirebridge.hirebridge_backend.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hirebridge.hirebridge_backend.Entity.StudentExperienceEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProjectEntity;
import com.hirebridge.hirebridge_backend.Service.StudentExperienceService;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/api/student_experience")
@CrossOrigin(
    origins = "http://localhost:5173",
    methods = {
         RequestMethod.POST,
         RequestMethod.PUT,
         RequestMethod.DELETE,
         RequestMethod.GET,
         RequestMethod.OPTIONS
    }
)


public class StudentExperienceController {
    

    //CREATE OBJECT
    private final StudentExperienceService experienceService;

    //INJECT CONSTRUCTOR
    public StudentExperienceController(StudentExperienceService experienceService){
        this.experienceService = experienceService;
    }


    //REST API FOR POST DATA INTO DATABASE
    @PostMapping(value = "/experienceData/{studentprofile_id}" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveExpData(@RequestParam("company_name")String company_name, 
    @RequestParam("experience_type") String experience_type,
    @RequestParam("job_title") String job_title,
    @RequestParam("working_experience") String working_experience,
    @RequestParam(value = "experience_certificate" , required = false)
    MultipartFile experience_certificate,
    
    @PathVariable Long studentprofile_id) {

        try {

            //CREATE OBJECT  AND SET DATA INTO METHOD
            StudentExperienceEntity experienceEntity = new StudentExperienceEntity();

            experienceEntity.setCompany_name(company_name);
            experienceEntity.setExperience_type(experience_type);
            experienceEntity.setJob_title(job_title);
            experienceEntity.setWorking_experience(working_experience);


            //SET EXPERIENCE CERTIFICATE
            if (experience_certificate != null && !experience_certificate.isEmpty()) {
                experienceEntity.setExperience_certificate(experience_certificate.getBytes());
            }



            //SAVE EXPERINECE DATA INTO DB
            StudentExperienceEntity saveData = experienceService.saveExpData(experienceEntity, studentprofile_id);

            //CREAE SUCCESS RESPONSE
            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Experience Data Saved");
            response.put("data", saveData); // it contains recieve all experience dta

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put(("success"),false);
            response.put("message", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    



    //GET EXPEINECE DATA FROM DATABASE TO FRONTEND
    @GetMapping("/getExpData/{studentprofile_id}")
    public ResponseEntity<?> getExpData(@PathVariable("studentprofile_id") Long studentprofile_id) {
        
        try {
            //GET PROJECT DATA FROM DATABASE
            List <StudentExperienceEntity> getExpData = experienceService.getExpData(studentprofile_id);

            //CREATE SUCCESS 
            Map<String , Object> response = new HashMap<>();
            response.put("success", true);
            response.put(("message"), "Data Received");
            response.put("data", getExpData);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response =  new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    



    //GET EXPERIENCE OF THE STUDENT FOR SEARCHING 
    @GetMapping("/getstudentexperinecforsearching")
    public ResponseEntity<?> getExperienceforsearching() {
        
        try {
            //CALL SERVICE METHOD TO FETCH STUDENT SKILLS
            List<StudentExperienceEntity> expData = experienceService.getexpforsearching();

            //RESPONSE FOR FRONTEND
            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "experience fetched successfully");
            response.put("data", expData);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);


        } catch (Exception e) {
            
            e.printStackTrace();

            Map<String,Object> response= new HashMap<>();

            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
}
