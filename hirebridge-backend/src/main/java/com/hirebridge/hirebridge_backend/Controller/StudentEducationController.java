package com.hirebridge.hirebridge_backend.Controller;


//IMPORT FILES ENTITY REPOSITORY SERVICE
import com.hirebridge.hirebridge_backend.Entity.StudentEducationEntity;
import com.hirebridge.hirebridge_backend.Service.StudentEducationService;


//IMPORT MAPS
import java.util.HashMap;
import java.util.Map;

//IMPORT BUILD IN PACKAGES
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


 




@RestController
@RequestMapping("/api/student_education")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // FIXED: Clean credential sharing enabled

public class StudentEducationController {
    
    //OBJECT
    private final StudentEducationService educationService;

    // CONSTRUCTOR INJECTION
    public StudentEducationController( StudentEducationService educationService) {
        this.educationService = educationService;
    }

    //EDUCATION API
    @PostMapping("/education_data/{studentProfileId}")
    public ResponseEntity<?> saveEducationData(@RequestBody StudentEducationEntity educationEntity, @PathVariable Long studentProfileId) {


        try {
            
            //SAVE EDUCATION DATA 
            StudentEducationEntity saveData = educationService.saveEducationData(educationEntity , studentProfileId );

            //CREATE SUCCESSFULL RESPONSE
            Map <String, Object> response = new HashMap<>();

            response.put("success", true);
            response.put("message", "Education Data Saved");
            response.put("education_id", saveData.getStudent_education_id()); //THIS WILL GET ALL THE PRESENT DATA OF THE TABLE

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            e.printStackTrace();

            Map <String,Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    

    //GET THE DATA FROM DATABASE TO THE FRONTEND
    @GetMapping("getEducation_Data/{student_profile}")
    public ResponseEntity <?> getEducationData(@PathVariable("student_profile") Long student_profile) {
        
        try {
            
            //GET DATA FROM DATABASE
            StudentEducationEntity getEduData = educationService.getEducation_Data(student_profile);

            //CREATE RESPONSE TO THE FRONTEND
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Education Data Found");
            response.put("data", getEduData); // it will receive all entity data or the educational data

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
           e.printStackTrace();

           Map<String,Object> response = new HashMap<>();

           response.put("success", false);
           response.put("message", e.getMessage());
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }



    //PUT UPDATE THE EDUCATIONAL DATA
    @PutMapping("/updateEduData/{educationId}")
    public ResponseEntity updateData(@PathVariable Long educationId, @RequestBody StudentEducationEntity educationEntity) {
        
        try {
            StudentEducationEntity update = educationService.updateData(educationId, educationEntity);

            //RESPONSE
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Education Data Updated Successfully");
            response.put("updatedData", update);

            return ResponseEntity.ok(response);


        } catch (Exception e) {
           e.printStackTrace();

           Map<String, Object> response = new HashMap<>();
           response.put("success", false);
           response.put("message", e.getMessage());

           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
}
