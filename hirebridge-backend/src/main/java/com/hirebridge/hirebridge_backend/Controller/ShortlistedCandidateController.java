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

import com.hirebridge.hirebridge_backend.Entity.ShortlistedCandidateEntity;
import com.hirebridge.hirebridge_backend.Service.ShortlistedCandidateService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/shortlisted_candidates")
@CrossOrigin(origins = "http://localhost:5173")


public class ShortlistedCandidateController {
    
    //INJECT SERVICE
    private final ShortlistedCandidateService shortlistedService;

    //INJECT CONSTRUCTOR
    public ShortlistedCandidateController(ShortlistedCandidateService  shortlistedService){
        this.shortlistedService = shortlistedService;
    }

    //REST API TO SAVE SHORTLISTED CANDIDATE INTO TABLE
    @PostMapping("/save/{recruiter_id}/{applicant_id}")
    public ResponseEntity<?> saveShortlistedCandidates(@PathVariable Long recruiter_id , @PathVariable Long applicant_id) {
        
        try {
            //SHORTLISTED CANDIDATES
            ShortlistedCandidateEntity shortlisted = shortlistedService.shortlistedCandidates(recruiter_id, applicant_id);

            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Candidate Shortlisted Successfully");
            response.put("data", shortlisted); // it contain all data of table

            return ResponseEntity.ok(shortlisted);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String,Object>response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        
     }




     //REST API TO GET / RECEIVE SHORTLISTED CANDIDATES
     @GetMapping("/recruiter/{recruiter_id}")
     public ResponseEntity <?> getShortlistedCandidates(@PathVariable Long recruiter_id) {
         try {
            //GET SHORTLISTED CANDIDATES
            List <ShortlistedCandidateEntity> shortlistedCandidates = shortlistedService.getShortlistCandidates(recruiter_id);

            Map<String,Object>response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Shorlisted candidates fetched");
            response.put("data", shortlistedCandidates);

            return ResponseEntity.ok(response);

         } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
         }
     }



     // REST API TO SEND INVITATION EMAIL TO CANDIDATE
@PostMapping("/send-invitation/{recruiter_id}/{student_profile_id}")
public ResponseEntity<?> sendInvitation(
        @PathVariable Long recruiter_id ,
        @PathVariable Long student_profile_id) {

    try {

        // SEND INVITATION EMAIL
        shortlistedService.sendInvitation(recruiter_id , student_profile_id);

        Map<String, Object> response = new HashMap<>();

        response.put("success", true);
        response.put(
                "message",
                "Invitation email sent successfully"
        );

        return ResponseEntity.ok(response);

    } catch (Exception e) {

        e.printStackTrace();

        Map<String, Object> response = new HashMap<>();

        response.put("success", false);
        response.put("message", e.getMessage());

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}

     
    
}
