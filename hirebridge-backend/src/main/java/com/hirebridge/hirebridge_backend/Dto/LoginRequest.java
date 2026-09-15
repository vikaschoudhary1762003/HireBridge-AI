package com.hirebridge.hirebridge_backend.Dto;

// THIS FILE DTO IS A DATA TRANSFER FILE USED TO TRANSFER DATA FROM FRONTEND TO BACKEND 
public class LoginRequest {
    
    //VARIABLE
    private String email ;

    private String password;

    //GETTER AND SETTER METHOD
    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }


    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
}
