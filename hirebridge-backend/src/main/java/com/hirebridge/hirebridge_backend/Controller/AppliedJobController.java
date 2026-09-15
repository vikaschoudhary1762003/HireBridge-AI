package com.hirebridge.hirebridge_backend.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hirebridge.hirebridge_backend.Entity.AppliedJobEntity;
import com.hirebridge.hirebridge_backend.Service.AppliedJobService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
 


@RestController
@RequestMapping("/api/application")
@CrossOrigin(origins = "http://localhost:5173")

public class AppliedJobController {
    
    //CREATE OBJECT FOR SERVICE
    private final AppliedJobService appliedjobService;

    //INJECT CONSTRUCTOR
    public AppliedJobController(AppliedJobService appliedJobService){
        this.appliedjobService = appliedJobService;
    }

    //REST API TO POST THE DATA OF STUDENT AND JOB TO THE APPLIED_JOB TABLE 
    @PostMapping("/apply/{user_id}/{job_id}")
    public ResponseEntity<?> applyJob(@PathVariable Long user_id , @PathVariable Long job_id) {
        
        //RESPONSE
        Map<String,Object> response = new HashMap<>();
        try {
            appliedjobService.applyJob(user_id , job_id);

            response.put("success", true);
            response.put("message", "Job applied successfully");

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(response);
        }
    }



    //REST API TO GET / RECEIVE THE APPLIED JOB DATA FROM TABLE TO SEND TO FRONTEND
    @GetMapping("/student/{user_id}")
    public ResponseEntity<?> getAppliedJob(@PathVariable Long user_id) {
        
        try {
            List <AppliedJobEntity> appliedjob = appliedjobService.getAppliedJob(user_id);
            return ResponseEntity.ok(appliedjob);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }



    //GET APPLICATION DATA FOR RECRUITER 
    @GetMapping("/recruiter/{recruiterid}")
    public ResponseEntity<?> getRecruiterApplication(@PathVariable("recruiterid") Long recruiter_id) {
        
        try {
            List<AppliedJobEntity> application = appliedjobService.getApplicationRecruiter(recruiter_id);

            return ResponseEntity.ok(application);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success",false  , "message" , e.getMessage()));
        }  
    }




    //METHOD TO UPDATE OR PUT  APPLIED JOB STATUS EITHER SHORTLISTED REJECTED OR APPLIED
    // UPDATE APPLICATION STATUS - SHORTLIST / REJECT
@PutMapping("/status/{application_id}/{status}")
public ResponseEntity<?> updateApplicationStatus(
        @PathVariable Long application_id,
        @PathVariable String status) {

    Map<String, Object> response = new HashMap<>();

    try {

        AppliedJobEntity updatedApplication =
                appliedjobService.updateApplicationStatus(application_id, status);

        response.put("success", true);
        response.put("message", "Application status updated successfully");
        response.put("application", updatedApplication);

        return ResponseEntity.ok(response);

    } catch (RuntimeException e) {

        response.put("success", false);
        response.put("message", e.getMessage());

        return ResponseEntity.badRequest().body(response);
    }
}


}




