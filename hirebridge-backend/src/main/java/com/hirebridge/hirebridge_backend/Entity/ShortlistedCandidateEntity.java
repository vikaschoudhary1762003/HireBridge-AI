package com.hirebridge.hirebridge_backend.Entity;

import java.security.PublicKey;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;



@Entity
@Table(name = "Shortlisted_Candidates" , uniqueConstraints = {@UniqueConstraint(columnNames = {"Recruiter_Id", "Applicant_Id"})})
public class ShortlistedCandidateEntity {
    

    //GENERATE AUTO INCREMENT SHORLISTED ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "Shortlisted_Id")
    private Long shortlisted_id ;


    //RECRUITER ID
    @ManyToOne
    @JoinColumn(name = "Recruiter_Id" , nullable = false)
    private RecruiterProfileEntity recruiter_id ;

    //APPLICATION ID
    @ManyToOne
    @JoinColumn(name = "Applicant_Id" , nullable = false)
    private AppliedJobEntity applicant_id;

    //DATE OF SHORTILSTED
    @Column(name = "Shortlisted_Date")
    private LocalDateTime shortlisted_date;

    //STATUS
    @Column(name = "Status") /*shortlisted , rejected, hired ,interview */
    private String status;



    //DEFAULT CONSTRUCTOR
    public ShortlistedCandidateEntity(){}

    //GETTER SETTTER

    //GET SHORTLISTED ID
    public Long getShortlisted_id(){
        return shortlisted_id;
    }

    public void setShortlisted_id(Long shortlisted_id){
        this.shortlisted_id = shortlisted_id;
    }

    //GET RECRUIER ID
    public RecruiterProfileEntity getRecruiter_id(){
        return recruiter_id;
    }

    public void setRecruiter_id(RecruiterProfileEntity recruiter_id){
        this.recruiter_id = recruiter_id;
    }

    //GET APPLICANT ID
    public AppliedJobEntity getApplicant_id(){
        return applicant_id;
    }

    public void setApplicant_id(AppliedJobEntity  applicant_id){
        this.applicant_id = applicant_id;
    }

    //GET DATA TIME 
    public LocalDateTime getShortlisted_date(){
        return shortlisted_date;
    }

    public void setShortlisted_date(LocalDateTime shortlisted_date){
        this . shortlisted_date = shortlisted_date;
    }

    //GET STATUS SHORTLISTED REJECT OR HIRED INTERVIEW
    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status = status;
    }





}
