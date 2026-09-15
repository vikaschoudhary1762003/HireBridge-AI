package com.hirebridge.hirebridge_backend.Controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hirebridge.hirebridge_backend.Dto.StudentInterviewResponseDTO;
import com.hirebridge.hirebridge_backend.Entity.ScheduledInterviewEntity;
import com.hirebridge.hirebridge_backend.Service.ScheduledInterviewService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/scheduled_interview")
@CrossOrigin(origins = "http://localhost:5173")
public class ScheduledInterviewController {
    

    private final ScheduledInterviewService scheduledinterviewService;

    //CONSTRUCTOR
    public ScheduledInterviewController(ScheduledInterviewService scheduledInterviewService){
        this. scheduledinterviewService = scheduledInterviewService;
    }


    //METHOD TO POST THE DATA INTO TABLE
    @PostMapping("/schedule/{recruiterId}/{applicationId}")
    public ResponseEntity<?> scheduledInterview( @PathVariable Long recruiterId, @PathVariable Long applicationId,@RequestParam String interviewType,@RequestParam String interviewMode,@RequestParam LocalDate interviewDate,@RequestParam LocalTime interviewTime,@RequestParam(required = false) String meetingLink,@RequestParam(required = false) String additionalInfo) {
        
        try {
            ScheduledInterviewEntity interview = scheduledinterviewService.scheduleInterview(recruiterId, applicationId, interviewType, interviewMode, interviewDate, interviewTime, meetingLink, additionalInfo);

            //RESPONSE TO FRONTEND
            Map<String , Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Interview Scheduled Successfull");
            response.put("data", interview);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to schedule interview " + e.getMessage());
        }
        
    }




    //GET OR RECEIVE ALL INTERVIEW DATA
    @GetMapping("/recruiter/{recruiterId}")

    public ResponseEntity<?> getRecruiterInterviews( @PathVariable Long recruiterId) {

        try {

            List<ScheduledInterviewEntity> interviews = scheduledinterviewService.getRecruiterInterviews(recruiterId);

            //RESPONSES 
            Map<String, Object> response = new HashMap<>();

            response.put("success", true);
            response.put("message", "Recruiter Interviews Fetched Successfully");
            response.put("data", interviews);


            return ResponseEntity.ok(response);


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( "Failed to fetch recruiter interviews: "+ e.getMessage());
        }
    }



    //REST API TO FETCH SCHEDULED INTERVIEW DATA FOR STUDENT_DASHBOARD INTERVIEWS PAGE
    @GetMapping("/student/{userId}")
    public ResponseEntity<?> getSchedueledInterviewforstudents(@PathVariable Long userId) {
        try {

            List<StudentInterviewResponseDTO> interviews = scheduledinterviewService.getStudentInterviewsByUserId(userId);

            //RESPONSES 
            Map<String, Object> response = new HashMap<>();

            response.put("success", true);
            response.put("message", "Student Interviews Fetched Successfully");
            response.put("data", interviews);


            return ResponseEntity.ok(response);


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( "Failed to fetch student interviews: "+ e.getMessage());
        }
    }
    
    
    
}
