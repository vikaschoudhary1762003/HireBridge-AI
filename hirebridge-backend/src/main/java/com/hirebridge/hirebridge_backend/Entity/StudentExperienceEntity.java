package com.hirebridge.hirebridge_backend.Entity;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;



@Entity
@Table(name = "Student_Experience")
public class StudentExperienceEntity {
    
    //GENERATE AUTO INCREMENT ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Experience_ID" , nullable = false)
    private Long experience_id;


    //JOIN TABLE FOREIGN KEY "STUDENTPROFILE_ID" WITH TABLE STUDENT_PROFILE
    @ManyToOne
    @JoinColumn(name = "Student_Profile" , nullable =  false)
    private StudentProfileEntity studentprofile_id;

    //EXPERIENCE TYPE
    @Column(name = "Experience_Type")
    private String experience_type;

    //COMPANY NAME
    @Column(name = "Company_Name")
    private String company_name;

    //JOB TITLE /ROLE
    @Column(name = "Job_Title")
    private String job_title;

    //TOTLA WORKING EXPERIENCE
    @Column(name = "Working_Experience")
    private String working_experience;
    

    //EXPERIENCE CERTIFICATE OF COMPANY
    @Lob
    @Column(name = "Experience_Certificate")
    private byte[] experience_certificate;



    //GETTER SETTER METHOD

    //GET PROFILE ID
    public StudentProfileEntity getStudentprofile_id(){
        return studentprofile_id;
    }

    //SET PROFILE ID
    public void setStudentprofile_id(StudentProfileEntity studentprofile_id){
        this.studentprofile_id = studentprofile_id;
    }

    //GET EXPERIENCE ID
    public Long getExperience_id(){
        return experience_id;
    }

    //SET EXPERIENCE ID
    public void setExperience_id(Long experience_id){
        this.experience_id = experience_id;
    }

    //GET EXPERIENCE TYPE
    public String getExperience_type(){
        return experience_type;
    }

    //SET EXPERIENCE TYPE
    public void setExperience_type(String experience_type){
        this.experience_type = experience_type;
    }

    //GET COMPANY NAME
    public String getCompany_name(){
        return company_name;
    }

    //SET COMPANY NAME
    public void setCompany_name(String company_name){
        this.company_name = company_name;
    }

    //GET JOB TITLE
    public String getJob_title(){
        return job_title;
    }

    //SET JOB TITLE
    public void setJob_title(String job_title){
        this.job_title = job_title;
    }

    //GET TOTAL WORKING EXPERINECE
    public String getWorking_experience(){
        return working_experience;
    }

    public void setWorking_experience(String working_experience){
        this.working_experience = working_experience;
    }
    

    //GET EXPERIENECE CERTIFICATE
    public byte[] getExperience_certificate(){
        return experience_certificate;
    }

    //SET EXPERIENCE CERTIFICATE
    public void setExperience_certificate(byte[] experience_certificate){
        this.experience_certificate = experience_certificate;
    }

}
