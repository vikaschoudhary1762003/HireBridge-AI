package com.hirebridge.hirebridge_backend.Entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty; // Using single property mapping instead

@Entity
@Table(name ="users_table") 
public class UserEntity {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") 
    private Long userId; 

   
    @Column(nullable = false, unique = true, name = "Email")
    private String email;


    @Column(nullable = false, name = "Password")
    private String password;

    @JsonProperty("user_role") // Maps frontend "user_role" to this field
    @Column(nullable = false, name = "User_Role")
    private String userRole; 

    // DEFAULT CONSTRUCTOR
    public UserEntity(){}

    // GETTERS AND SETTERS
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
}
