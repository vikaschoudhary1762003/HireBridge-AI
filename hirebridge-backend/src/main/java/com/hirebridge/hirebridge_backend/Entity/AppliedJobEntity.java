package com.hirebridge.hirebridge_backend.Entity;

import java.time.LocalDateTime;

import org.springframework.boot.autoconfigure.web.WebProperties.Resources.Chain.Strategy;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "Applied_Jobs" , uniqueConstraints = {@UniqueConstraint(name = "uk_student_job" , columnNames = {"Student_Profile" , "Job_id"})})
public class AppliedJobEntity {

    //GENERATE AUTO INCMENT APPLICATION ID
    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    @Column(name = " Application_Id" , nullable = false)
    private Long application_id;

    //STUDENT WHO APPLIED
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Student_Profile", nullable = false)
    private StudentProfileEntity studentprofile;


    //JOB FOR WHICH STUDENT APPLIEDD
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Job_id" , nullable = false)
    private JobpostEntity job;


    //APPLICATION STATUS
    @Column(name = "Application_Status")
    private String application_status;

    //APPLICATION DATA TIME
    @Column(name = "Applied_DataTime")
    private LocalDateTime applied_Datetime;



    //GETTER SETTER METHOS

    //GET APPLICATION ID
    public Long getApplication_id(){
        return application_id;
    }

    public void setApplication_id(Long application_id){
        this.application_id = application_id;
    }


    //GET STUDENT PROFILE ID
    public StudentProfileEntity getStudent_profile(){
        return studentprofile;
    }

    public void setStudent_profile(StudentProfileEntity studentprofile){
        this.studentprofile = studentprofile;
    }

    //GET JOB POST ID
    public JobpostEntity getJob(){
        return job;
    }

    public void setJOb(JobpostEntity job){
        this.job = job;
    }

    //GET STATUS SELECTD , SHORTLISTED , REJECTED, INTERVIEW
    public String getApplication_status(){
        return  application_status;
    }
    
    public void setApplication_status(String application_status){
        this. application_status = application_status;
    }


    //GET APPLIED DATA TIME
    public LocalDateTime getApplied_datetime(){
        return  applied_Datetime;
    }

    public void setApplied_datetime(LocalDateTime applied_datetime){
        this.applied_Datetime = applied_datetime;
    }
}
