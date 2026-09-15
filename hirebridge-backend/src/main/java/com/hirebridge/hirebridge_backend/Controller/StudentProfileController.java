//THIS FILE CONTAINS THE RESP API AND THE FUNCITONS

package com.hirebridge.hirebridge_backend.Controller;

//IMPORT ENTITY CLASSES
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.UserEntity;

//REPOSITORY CLASSES
import com.hirebridge.hirebridge_backend.Repository.StudentProfileRepository;
import com.hirebridge.hirebridge_backend.Repository.UserRepository;
import com.hirebridge.hirebridge_backend.Service.StudentProfileService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.http.MediaType;

@RestController 
@RequestMapping("/api/student") 
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class StudentProfileController {

    @Autowired
    private StudentProfileService stud_prof_service;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentProfileRepository studentProfRepository;

    //SAVE PROFILE API
        //SAVE PROFILE API
    @PostMapping(value = "/save_Profile_info", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)  
    public ResponseEntity<?> SaveProfile(
        @ModelAttribute StudentProfileEntity profileEntity,
        // FIXED: Explicitly accept the logged-in user's ID to connect the tables safely
        @RequestParam("userId") Long loggedInUserId,
        @RequestParam(value = "profilePhotoFile", required = false) MultipartFile profile_photo
    ) {
        System.out.println("========== SAVE PROFILE CONTROLLER HIT ==========");
        try {
            // FIXED: Look up the user by their unique login ID, completely ignoring whatever email they typed in the profile form
            UserEntity user = userRepository.findById(loggedInUserId).orElse(null);
            if (user == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Logged-in user session invalid or not found in system.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            // Link the user account record
            profileEntity.setUser(user);

            System.out.println("profile_photo = " + (profile_photo != null ? profile_photo.getOriginalFilename() : "NULL"));

            String uploadDirectory = "uploads/profile_photos";
            Path uploadPath = Paths.get(uploadDirectory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            if (profile_photo != null && !profile_photo.isEmpty()) {
                String filename = profile_photo.getOriginalFilename();
                Path filePath = uploadPath.resolve(filename);
                Files.copy(
                    profile_photo.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
                );
                profileEntity.setProfile_photo(filename);
            }

            // SAVE WHOLE STUDENT PROFILE DATA
            StudentProfileEntity saveProfile = stud_prof_service.SaveProfile(profileEntity);

            // CREATE SUCCESSFUL RESPONSE
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Profile Saved Successfully");
            response.put("student_name", saveProfile.getFirst_name() + " " + saveProfile.getLast_name());
            response.put("student_id", saveProfile.getStudent_profile_id());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




    //FETCH OR GET STUDENT STORED PERSONAL INFO DATA
    @GetMapping("/getProfile/{user_id}")
    public ResponseEntity<?> getStudentPersonalInfo(@PathVariable Long user_id) {
        try {
            StudentProfileEntity profile = stud_prof_service.getStudentProfileByUserId(user_id);

            System.out.println("========== STUDENT PROFILE ==========");
            System.out.println("ID: " + profile.getStudent_profile_id());
            System.out.println("First Name: " + profile.getFirst_name());
            System.out.println("=====================================");

            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No profile: " + e.getMessage());
        }
    }
    
    //GET IMAGE OF A PARTICULAR STUDENT AS PER USER ID
    @GetMapping("/profile-photo/{filename}")
    public ResponseEntity<byte[]> getProfilePhoto(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads/profile_photos").resolve(filename);
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }
            byte[] image = Files.readAllBytes(filePath);
            String contentType = Files.probeContentType(filePath);

            return ResponseEntity
                    .ok()
                    .header("Content-Type", contentType)
                    .body(image);
        } catch (Exception e) {
            // FIXED: Completed the broken catch block to avoid compilation errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
