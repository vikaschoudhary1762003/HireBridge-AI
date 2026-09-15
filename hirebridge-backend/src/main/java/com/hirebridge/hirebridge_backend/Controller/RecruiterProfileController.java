package com.hirebridge.hirebridge_backend.Controller;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hirebridge.hirebridge_backend.Entity.RecruiterProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.UserEntity;
import com.hirebridge.hirebridge_backend.Repository.RecruiterProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.UserRepository;
import com.hirebridge.hirebridge_backend.Service.RecruiterProfileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.nio.file.Path;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;






@RestController
@RequestMapping("/api/recruiter_profile")
@CrossOrigin(
    origins = "http://localhost:5173",
    methods = {
        RequestMethod.GET,
        RequestMethod.PUT,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.OPTIONS
    }
)

public class RecruiterProfileController {
    
    //INJECT OBJECT
    @Autowired
    private RecruiterProfileService recruiterService;

    @Autowired
    private RecruiterProfileRepository recruiterRepository;

    @Autowired
    private UserRepository userRepository;


    //REST API TO SAVE PROFILE INFO INTO REACRUITER TABLE
    @PostMapping(value = "/saveProfile/{user_id}" , consumes = "multipart/form-data")
    public ResponseEntity<?> saveProfile( @PathVariable("user_id") Long user_id,

        @RequestPart("full_name") String full_name ,
        @RequestPart("email") String email,
        @RequestPart("phone") String phone,
        @RequestPart("designation") String designation,
         
        @RequestPart("company_name") String company_name,
        @RequestPart("industry") String industry,
        @RequestPart("website") String comp_website,
        @RequestPart("location") String comp_location,
    
        @RequestPart(value = "profile_photo" , required = true)  // THIS FOR RECIEVING IMAGE FILE
        MultipartFile profile_photo , // ALLOW TO UPLOAD OR RECEIVE IMAGE FILE

        @RequestPart(value = "comp_logo" , required = true)
        MultipartFile comp_logo
) {
    
    try {
        //CHECK PROFILE_PHOTO UPLOADED
        if (profile_photo == null || profile_photo.isEmpty()) {
            Map<String,Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "profile photo is required");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        //CHECK COMPANY LOGOG UPLOADS
        if (comp_logo == null || comp_logo.isEmpty()) {
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Company logo is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        //FIND USER BY EMAIL IN USER_TABLE
        UserEntity user = userRepository.findById(user_id).orElseThrow(()->new RuntimeException("User id not found"));

        //CREATE OBJECT TO SET OR POST THE DATA TO SAVE INTO TABLE
        RecruiterProfileEntity recruiterEntity = new RecruiterProfileEntity();

        recruiterEntity.setUser(user);
        recruiterEntity.setFull_name(full_name);
        recruiterEntity.setEmail(email);
        recruiterEntity.setPhone(phone);
        recruiterEntity.setDesignation(designation);
 
        recruiterEntity.setCompany_name(company_name);
        recruiterEntity.setIndustry(industry);
        recruiterEntity.setWebsite(comp_website);
        recruiterEntity.setLocation(comp_location);
 
 
  
        //CREATE DIRACTORY TO SAVE PROFILE IMAGE AND COMPANY LOGO
        String  uploadProfDir = "uploads/profile_photos";
        String uploadCompDir = "uploads/comp_logo";

        // Create folder if it does not exist
        Path profilePath = Paths.get(uploadProfDir);
        Path companyPath = Paths.get(uploadCompDir);
        
        if (!Files.exists(profilePath)) {
            Files.createDirectories(profilePath);
        }

        if (!Files.exists(companyPath)) {
            Files.createDirectories(companyPath);
        } 


        //CREATE FILE NAME
        String profileFileName = System.currentTimeMillis() + "_" + profile_photo.getOriginalFilename();
        String companyFileName =System.currentTimeMillis() + "_" + comp_logo.getOriginalFilename();

        //CREATE FILE PATH
        Path profileFilePath = profilePath.resolve(profileFileName);
        Path companyFilePath = companyPath.resolve(companyFileName);

        //SAVE FILES
        Files.copy(profile_photo.getInputStream(), profileFilePath);
        Files.copy(comp_logo.getInputStream(), companyFilePath);
        recruiterEntity.setProfile_photo(profileFileName);
        recruiterEntity.setComp_logo(companyFileName);


        //SAVE RECORD IN DATABASE RECRUITER PROFILE TABLE
        RecruiterProfileEntity saveProfile = recruiterRepository.save(recruiterEntity);


        //RESPONSE TO FRONTEND
        Map<String,Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Data Saved Successfully");
        response.put("data", saveProfile);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);


    } catch (Exception e) {
        e.printStackTrace();

        Map <String ,Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}


    // FUNCTION TO GET/RETRIEVE DATA FROM DATABASE
    @GetMapping("/getData/{user_id}")
    public ResponseEntity<?> getData(@PathVariable("user_id") Long user_id) {
        
        try {
            RecruiterProfileEntity recruiterEntity = recruiterService.getData(user_id);

            return ResponseEntity.ok(recruiterEntity);

        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No profile" + e.getMessage());
        }
    }



    //REST API TO RECIEVE OR GET COMPANY DATA TO DISPLAY ON COMPANY PAGE UI
    @GetMapping("/getAllData")
    public ResponseEntity<?> getAllCompanies() {
        try {
            return ResponseEntity.ok(recruiterRepository.findAll());
        } catch (Exception e) {
            // ERROR
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch Companies");
        }
    }
    
    
}
    
