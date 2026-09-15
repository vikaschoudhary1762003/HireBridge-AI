package com.hirebridge.hirebridge_backend.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hirebridge.hirebridge_backend.Entity.StudentSkillEntity;
import com.hirebridge.hirebridge_backend.Service.StudentSkillsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/student_skills")
@CrossOrigin(
    origins = "http://localhost:5173",
    methods = {
        RequestMethod.GET, 
        RequestMethod.PATCH,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT
    }
)
public class StudentSkillsController {
    

    //CREATE OBJECT FOR SKILL SERVICE
    private final StudentSkillsService skillService;

    //CONSTRUCTOR INJECT
    public StudentSkillsController(StudentSkillsService skillsService){
        this.skillService = skillsService;
    }

    //REST API POST METHOD TO SAVE DATA INTO DATABASE
    @PostMapping("/skillData/{studentprofile_id}")
    public ResponseEntity<?> saveSkillData(@RequestBody StudentSkillEntity skillEntity , @PathVariable Long studentprofile_id) {
       
        try {
            //SAVE SKILL DATA TO THE INTO DATABASE USING SAVESKILLDATA FUNCTION "IN SERVICE FILE"
            StudentSkillEntity saveData = skillService.saveSkillData(skillEntity, studentprofile_id);

            //RESPONSE TO THE FRONTEND
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Data Savaed Successfully");
            response.put("data", saveData.getSkill_id()); // THIS WILL GET ALL THE PRESENT DATA OF THE TABLE

            //RETURN THE SUCCESS STATUS
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    


    //GET DATA FROM DATABASE TO THE FRONTEND
    @GetMapping("/getskilldata/{studentprofile_id}")
    public ResponseEntity<?> getSkillData(@PathVariable("studentprofile_id") Long studentprofile_id) {
       
        try {
            //GET DATA FROM DATABASE
            StudentSkillEntity skillEntity = skillService.getSkillData(studentprofile_id);

            //CREATE RESPONSE FOR FRONTEND
            Map<String,Object> respone = new HashMap<>();
            respone.put("success", true);
            respone.put("message", "Data found");
            respone.put("data", skillEntity); //tt will receive all entity data or the skill table

            return ResponseEntity.status(HttpStatus.CREATED).body(respone);

        } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    



    //GET ALL SKILLS FROM DATABASE FOR SEARCHING CANDIDATE AS PER SKILLS BY RECRUITER
    @GetMapping("/getAllSkillsforsearching")
    public ResponseEntity<?> getskillsforsearching() {
        
        try {
            //call function/service to get skills of all candidates
            List<StudentSkillEntity> skillsData = skillService.getskillsforsearching();

            //RESPONSE FOR FRONTEND
            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "All candidate skills found");
            response.put("data", skillsData);
            
            //RETURN ALL SKILL DATA
            return ResponseEntity.status(HttpStatus.CREATED).body(response);


        } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put("success", "false");
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
}
