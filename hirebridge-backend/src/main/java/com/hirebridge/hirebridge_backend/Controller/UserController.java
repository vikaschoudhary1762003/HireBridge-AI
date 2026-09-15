package com.hirebridge.hirebridge_backend.Controller;

import com.hirebridge.hirebridge_backend.Dto.LoginRequest;

//THIS FILE IS USED FOR CREATING REST API AND PATHS

//IMPORT FILES
import com.hirebridge.hirebridge_backend.Entity.UserEntity;
import com.hirebridge.hirebridge_backend.Service.UserService;

//AUTOWIRED FOR INJECT FILES
import org.springframework.beans.factory.annotation.Autowired;

//HTTP STATUS CODE EX 201 404
import org.springframework.http.HttpStatus;
//RESPONSE ENTITY THAT ALLOW TO CONTROL HTTP RESPONSES
import org.springframework.http.ResponseEntity;

//REST CONTROLLER ANNOTATION
import org.springframework.web.bind.annotation.*;

//HASHMAP IS USED TO CREATE RESPONSE OBJECT
import java.util.HashMap;
import java.util.Map;







@RestController  // IT TELLS THE SPRINGBOTT THAT THIS CLASS HANDLES REST APIs

 // ALL URL INSIDE CONTROLLER WILL START WITH "/api/user"
@RequestMapping("/api/user")

//Allows our React frontend running on port 5173  to communicate with this backend running on port 8080.
@CrossOrigin(
    origins = "http://localhost:5173",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE,
        RequestMethod.PUT,
        RequestMethod.OPTIONS
    }
)
public class UserController {
    
    //INJECT USER SERVICE
    @Autowired
    private UserService user_service; //injected object

    //REGISTER USER API
    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody UserEntity user) {

     System.out.println("========== REGISTER DATA ==========");
    System.out.println("Email: " + user.getEmail());
    System.out.println("Password: " + user.getPassword());
    System.out.println("Role: " + user.getUserRole());
    System.out.println("==================================");

        
        try {
            //SEND USER DATA TO SERVICE TO REGISTER THE USER
            UserEntity savedUser = user_service.Register(user);

            //CREATE SUCCESSFULL RESPONSE
            Map <String ,Object> response = new HashMap<>();

            //TELL FRONTEND THAT REGISTRATION IS SUCCESSFULL
            response.put("success", true);
            response.put("message", "Account Created Successfull");
            response.put("userid", savedUser.getUserId());

            //HTTP 201 CREATED 
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
        
            // CREATE ERROR RESPONSE
            Map <String ,Object> response = new HashMap<>();

            //REGISTRATION FAILED
            response.put("success", false);
            response.put("message", e.getMessage());

            //HTTP 400 BAD REQUEST
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);


        }
    }
    


    //LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginRequest request) {
        
        try {
            //CALL LOGIN FUNCTION FROM USERSERVICE, GET EMAIL SEND BY REACT
            UserEntity loggedInUser = user_service.Login(request.getEmail(), request.getPassword());

            System.out.println("LOGGED USER ID = " + loggedInUser.getUserId());
System.out.println("LOGGED USER EMAIL = " + loggedInUser.getEmail());

            //CREATE RESPONSE OBJECT
            Map<String ,Object> response = new HashMap<>();

            //TELL FRONTEND LOGIN IS SUCCESSFULL
            response.put("success", true);
            response.put("message", "Login Successfull");
            response.put("user_role", loggedInUser.getUserRole());
            response.put("user_id", loggedInUser.getUserId());

            //HTTP STATUS SUCCESS 200
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (RuntimeException e) {
            
            //CREATE ERROR RESPONSE
            Map<String , Object> response = new HashMap<>();

            //SEND MESSAGE TO FRONTEND
            response.put("success", false);
            response.put("message", e.getMessage());

            //401 ERROR HTTP STATUS
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        
    }
    

}
