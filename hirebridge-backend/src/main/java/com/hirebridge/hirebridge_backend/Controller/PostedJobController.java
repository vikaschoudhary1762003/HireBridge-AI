package com.hirebridge.hirebridge_backend.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hirebridge.hirebridge_backend.Entity.JobpostEntity;
import com.hirebridge.hirebridge_backend.Repository.PostedJobRepository;
import com.hirebridge.hirebridge_backend.Repository.RecruiterProfileRepository;
import com.hirebridge.hirebridge_backend.Service.PostedJobService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin(
    origins = "http://localhost:5173",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.OPTIONS
    }
)

@RequestMapping("/api/posted")
public class PostedJobController {
    

    //INJECT SERVICE , REPOSITORY
    @Autowired 
    private PostedJobService postedjobService;

    @Autowired
    private PostedJobRepository postedjobRepository;

    @Autowired
    private RecruiterProfileRepository recruiterRepository;


    //REST API TO POST DATA INTO DATABASE TABLE
    @PostMapping("job/{recruiter_id}")

    public ResponseEntity<?> saveJob(@RequestBody JobpostEntity jobpostEntity , @PathVariable Long recruiter_id) {
        System.out.println("========== SAVE JOB CONTROLLER REACHED ==========");
        
        try {
            //SAVE POSTED JOB INTO TABLE USING SERVICE/FUNCITON
            JobpostEntity save = postedjobService.saveJobData(jobpostEntity, recruiter_id);

            //RESPONSE TO FRONTEND
            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "JOB POSTED SUCCESSFULLY");
            response.put("job_data", save); // this  contains all posted data

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    



    //RECEIVE  / GET TEH POSTED JOB DATA
    @GetMapping("/recievePostedData/{recruiter_id}")
    public ResponseEntity<?> getPostedJob(@PathVariable("recruiter_id") Long recruiter_id) {
        
        try {
            //GET DATA FROM DATABASE
            List <JobpostEntity> getData = postedjobService.getPostedJob(recruiter_id);

            //RESPOSNE
            Map<String,Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Data fetched");
            response.put("data", getData);

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            e.printStackTrace();

            Map<String,Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    



    //GET POSTED JOB ON STUDENT DASHBOARD
    @GetMapping("/allJobs")
    public ResponseEntity<?> getAllPostedJobs() {

        try {
            System.out.println("========== FETCHING ALL POSTED JOBS ==========");

            List<JobpostEntity> jobs = postedjobService.getAllPostedJobs();

            System.out.println("TOTAL JOBS FOUND: " + jobs.size());
            Map<String, Object> response =new HashMap<>();

            response.put("success",true);
            response.put("message","All posted jobs fetched");
            response.put("data",jobs);

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {

            e.printStackTrace();

            Map<String, Object> response = new HashMap<>();
            response.put("success",false);
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    //API FOR SEARCHING JOBS FOR MYJOB PAGE 
    @GetMapping("getjobsforsearching/{recruiter_id}")
    public ResponseEntity<?> getjobsforsearching(@PathVariable("recruiter_id") Long recruiter_id) {
        
        try {
            List <JobpostEntity> getJobs = postedjobService.getPostedJobsforsearching();

            //RESPONSE
            Map<String,Object> response = new HashMap<>();

            response.put("success", true);
            response.put("message", "all jobs title received for searching");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace();

            //RESPONSE 
            Map <String,Object> response = new HashMap<>();

            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    //API TO EDIT THE POSTED EXISTING JOB
    @PutMapping("editPostedJob/{job_id}")
    public ResponseEntity<?> editPostedJob(@PathVariable Long job_id, @RequestBody JobpostEntity updateJob) {
        
        try {
            Optional<JobpostEntity> existingJob = postedjobRepository.findById(job_id);
            if (existingJob.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false , "message", "Job not found"));
            }

            JobpostEntity job = existingJob.get();
            job.setJob_title(updateJob.getJob_title());
            job.setSkills(updateJob.getSkills());
            job.setMin_experience(updateJob.getMin_experience());
            job.setMax_experience(updateJob.getMax_experience());
            job.setJob_location(updateJob.getJob_location());
            job.setWork_mode(updateJob.getWork_mode());
            job.setMin_package(updateJob.getMin_package());
            job.setMax_package(updateJob.getMax_package());
            job.setJob_description(updateJob.getJob_description());

            JobpostEntity EditedJob = postedjobRepository.save(job);
            return ResponseEntity.ok(Map.of("success" , true , "message", "Job updated successfully" , "data", EditedJob));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false , "message", "Failed to update job"));
        }
        
        
    }
    
}
