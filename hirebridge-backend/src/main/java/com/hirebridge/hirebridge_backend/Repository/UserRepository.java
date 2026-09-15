package com.hirebridge.hirebridge_backend.Repository;

//IMPORT USABLE PACKAGES AND FILES
import com.hirebridge.hirebridge_backend.Entity.UserEntity;  // CALLING ENTITY FILE OF USER
import org.springframework.data.jpa.repository.JpaRepository; // it used to communicate with database
import org.springframework.stereotype.Repository; //ANNOTATION

import java.util.Optional;  // this is used when a record may or may not exists



@Repository  // this annotation provides methods like save() findById() findAll() deleteBy() existsByid()
public interface UserRepository extends JpaRepository <UserEntity , Long> {
    
    // FIND USER BY THEIR EMAIL ID  , its used for validating login and registration both 
    // springbott JpaRepository automatically creates the query based on the method name 
    
    Optional <UserEntity> findByEmail(String email);   

    // CHECK WHETHER EMAIL EXISTS OR NOT 
    boolean existsByEmail(String email);   
}
