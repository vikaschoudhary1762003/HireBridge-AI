package com.hirebridge.hirebridge_backend.Service;
//THIS FILE INCLUDES ALL THE BUSINESS LOGIC OF THE PROJECT OR PARTICULAR MODULE

//IMPORT OUR ENTITIES
import com.hirebridge.hirebridge_backend.Entity.UserEntity;
import com.hirebridge.hirebridge_backend.Repository.UserRepository;


//IMPORT @AUTOWIRED DEPENDANCY INJECTIONS 
import org.springframework.beans.factory.annotation.Autowired;

//IMPORT BCRYPT TO HASH THE PASSWORD
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//IMPORT SERVICE , IT TELLS SPRINGBOOT THAT THIS CLASS CONTAINS BUSINESS LOGIC
import org.springframework.stereotype.Service;



@Service
public class UserService {
    

    //INJECT USERREPOSITORY  : THIS ALLOWS TO PERFORM DATABASES OPERATIONS.
    @Autowired
    private UserRepository user_Repository;

    //INJECT BCRYPT : TO ENCRYPT THE USER PASSWORD
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    //REGISTER USER FUNCTION 
    public UserEntity Register(UserEntity user){

        //CHECK WHETHER EMAL ALREADY EXISTS
        if (user_Repository.existsByEmail(user.getEmail())) {
            //stop registration if email already registered
            throw new RuntimeException("Email already registered");
        }

        //ENCRYPT PASSWORD
        String encryptedPassword = passwordEncoder.encode(user.getPassword());

        // REPLACE THE ORIGINAL PASSWORD WITH ENCRYPTED PASSWORD
        user.setPassword(encryptedPassword);


        //SAVE USER INTO DATABASE
        //JpaRepository provides the save() metods

        return user_Repository.save(user);
    }


    //LOGIN USER FUNCTION
    public UserEntity Login(String email , String password){

        //CHECK IF USER  REGISTERED EMAIL EXISTS OR NOT
        UserEntity user = user_Repository.findByEmail(email).orElseThrow( ()-> new RuntimeException("User not found"));

        //CHECK WHETHER PASSWORD ENTERED BY USER MATCHES THE STORED HASHED PASSWORD IN DATABASE
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }



}
