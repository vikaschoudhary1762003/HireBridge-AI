package com.hirebridge.hirebridge_backend.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hirebridge.hirebridge_backend.Entity.StudentProjectEntity;
import com.hirebridge.hirebridge_backend.Service.StudentProjectService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;







@RestController
@RequestMapping("/api/student_project")
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
public class StudentProjectController {
    

    //CREATE OBJECT FOR SERVICE
    private final StudentProjectService projectService;

    //INJECT CONSTRUCTOR
    public StudentProjectController(StudentProjectService projectService){
        this.projectService = projectService;
    }


    //RESP API TO SEND DATA TO DATABASE
    @PostMapping("/uploadProject/{studentprofile_id}")
    public ResponseEntity <?> saveData(@RequestBody StudentProjectEntity projectEntity , @PathVariable("studentprofile_id") Long studentProfileId) {
       
        try {
            //SAVE DATA
            StudentProjectEntity saveData = projectService.saveProData(projectEntity, studentProfileId);

            //AFTER SAVING ENTITY INTO THE SERVICE SAVEPRODATA() METHOD CREATE SUCCESS RESPONSE TO FRONTEND
            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Project uploaded successfully");
            response.put("data", saveData); // this contains all data of project

            return ResponseEntity.status(HttpStatus.CREATED).body(response);


        } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    




    //GET PROJECT DATA FROM DATABASE
    @GetMapping("/getProjectData/{studentprofile_id}")
    public ResponseEntity<?> getProData(@PathVariable("studentprofile_id") Long studentprofile_id) {
        
        try {
            //GET PROJECT DATA FROM DATABASE
            List <StudentProjectEntity> getProData = projectService.getProData(studentprofile_id);
            //CREATE RESPONSE
            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "DATA RECEIVED");
            response.put("data", getProData);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
}
