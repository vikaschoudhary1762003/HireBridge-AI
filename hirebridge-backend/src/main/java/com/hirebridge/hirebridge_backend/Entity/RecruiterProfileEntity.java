package com.hirebridge.hirebridge_backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;






@Entity
@Table(name="Recruiter_Profile")
public class RecruiterProfileEntity {

    
    //GENERATE ID PRIMARY KEY FOR RECRUITER PROFILE
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   
    @Column(name = "Recruiter_ID")
    private Long recruiter_id;


    //JOIN TABLE WITH USER ID FOR RECRUITER TABLE
    @OneToOne
    @JoinColumn(name = "user_id" , nullable = false , unique = true) // TABLE NAME FROM WHICH ITS CONNECTED OR JOINED
    private UserEntity user;  // FOREIGN KEY  "RECRUITER ID"  


    //RECRUITER FULL NAME
    @Column(name = "Full_Name")
    private String full_name;

    @Column(name = "Email")
    private String email;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Designation")
    private String designation;

    @Column(name = "Profile_Photo")
    private String profile_photo;
    
    
    // COMPANY INFO
    @Column(name = "Company_Name")
    private String company_name;

    @Column(name = "Industry")
    private String industry;

    @Column(name = "Website")
    private String comp_website;

    @Column(name = "Location")
    private String comp_location;

    @Column(name = "Company_Logo")
    private String comp_logo;


    // GETTER SETTER METHODS

    // USER ID
    public UserEntity getUser(){
        return user;
    }

    public void setUser(UserEntity user){
        this.user = user;
    }

    //RECRUITER ID
    public Long getRecruiter_id(){
        return recruiter_id;
    }

    public void setRecruiter_id(Long recruiter_id){
        this.recruiter_id = recruiter_id;
    }

    // FULL NAME
    public String getFull_name(){
        return full_name;
    }

    public void setFull_name(String full_name){
        this.full_name = full_name;
    }

    //EMAIl
    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    // PHONE
    public String getPhone(){
        return phone;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }

    //DESIGNATION
    public String getDesignation(){
        return designation;
    }

    public void setDesignation(String designation){
        this.designation = designation;
    }

    //PROFILE PHOT
    public String getProfile_photo(){
        return profile_photo;
    }

    public void setProfile_photo(String profile_photo){
        this.profile_photo = profile_photo;
    }

    //COMPANY NAME
    public String getCompany_name(){
        return company_name;
    }

    public void setCompany_name(String company_name){
        this.company_name = company_name;
    }

    //INDUSTRY
    public String getIndustry(){
        return industry;
    }

    public void setIndustry(String industry){
        this.industry = industry;
    }

    //WEBSITE
    public String getWebsite(){
        return comp_website;
    }

    public void setWebsite(String comp_website){
        this.comp_website = comp_website;
    }

    //LOCATION
    public String getLocation(){
        return comp_location;
    }

    public void setLocation(String comp_location){
        this.comp_location = comp_location;
    }

    //COMPANY LOGO
    public String getComp_Logo(){
        return comp_logo;
    }

    public void setComp_logo(String comp_logo){
        this.comp_logo = comp_logo;
    }
}
