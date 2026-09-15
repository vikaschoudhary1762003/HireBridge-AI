package com.hirebridge.hirebridge_backend.Entity;

 
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;




@Entity
@Table(name = "Posted_Job")
public class JobpostEntity {
    
    //GENERATE AUTO INCREMENT ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Job_id")
    private Long job_id;

    //JOIN POSTED_JOB TABLE WITH RECRUITER PROFILE TABLE
    @ManyToOne
    @JoinColumn(name = "Recruiter_id" ,nullable = false)
    private RecruiterProfileEntity recruiter_id;


    @Column(name = "Job_Tittle")
    private String job_title;

    @Column(name = "Skills")
    private String skills;

    @Column(name = "Min_Experience")
    private int min_experience;

    @Column(name = "Max_Experience")
    private int max_experience;

    @Column(name = "Job_Location")
    private String job_location;

    @Column(name = "Work_Mode")
    private String work_mode;

    @Column(name = "Min_Package")
    private String min_package;

    @Column(name = "Max_Package")
    private String max_package;

    @Column(name = "Job_Description" , columnDefinition = "TEXT")
    private String job_description;


    //GETTER SETTER METHODS

    //GET POSTED JOB ID
    public Long getJob_id(){
        return job_id;
    }

    public void setJob_id(Long job_id){
        this.job_id = job_id;
    }

    //GET RECRUITER ID
    public RecruiterProfileEntity getRecruiter_id(){
        return recruiter_id;
    }

    public void setRecruiter_id(RecruiterProfileEntity recruiter_id){
        this.recruiter_id = recruiter_id;
    }

    //GET JOB TITLE
    public String getJob_title(){
        return job_title;
    }

    public void setJob_title(String job_title){
        this.job_title = job_title;
    }

    //GET SKILLS
    public String getSkills(){
        return skills;
    }

    public void setSkills(String skills){
        this.skills = skills;
    }

    //GET MIN_EXP
    public int getMin_experience(){
        return min_experience;
    }

    public void setMin_experience(int min_experience){
        this.min_experience = min_experience;
    }

    //GET MAX_EXP
    public int getMax_experience(){
        return max_experience;
    }

    public void setMax_experience(int max_experience){
        this.max_experience = max_experience;
    }

    //GET JOB LOCATION
    public String getJob_location(){
        return job_location;
    }

    public void setJob_location(String job_location){
        this.job_location = job_location;
    }

    //GET WORK MODE
    public String getWork_mode(){
        return work_mode;
    }

    public void setWork_mode(String work_mode){
        this.work_mode = work_mode;
    }

    //GET MIN_PACKAGE
    public String getMin_package(){
        return min_package;
    }

    public void setMin_package(String min_package){
        this.min_package = min_package;
    }

    //GET MAX_PACKAGE
    public String getMax_package(){
        return max_package;
    }

    public void setMax_package(String max_package){
        this.max_package = max_package;
    }

    //GET JOB DESCRIPTION
    public String getJob_description(){
        return job_description;
    }

    public void setJob_description(String job_description){
        this.job_description = job_description;
    }
    


}
