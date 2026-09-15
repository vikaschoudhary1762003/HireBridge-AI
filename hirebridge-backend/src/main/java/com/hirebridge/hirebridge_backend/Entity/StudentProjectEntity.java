package com.hirebridge.hirebridge_backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.extern.java.Log;





@Entity
@Table(name = "Student_Project")
public class StudentProjectEntity {
    
    //GENERATE AUTO INCREMENT ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Projec_ID" , nullable = false)
    private Long project_id;

    //CONNECT TABLE WITH THE STUDENTPROFILE ID
    @ManyToOne
    @JoinColumn(name = "Student_Profile" , nullable = false)
    private StudentProfileEntity studentprofile_id;
    
    
    //COLUMN FOR PROJECT NAME
    @Column(name = "Project_Name")
    private String project_name;

    //PROJECT DESCRIPTION
    @Column(name = "Project_Description")
    private String project_description;

    //PROJECT TECHNOLOGY
    @Column(name = "Project_Technology")
    private String project_technology;

    //GITHUB URL
    @Column(name = "Project_GitUrl")
    private String project_giturl;

    //LIVE DEMO
    @Column(name = "Project_Demo")
    private String project_livedemo;

    //YOUR ROLE
    @Column(name = "Your_Role")
    private String project_yourrole;




    //GETTER SETTER MTHODS

    //GET STUDENT PROFILE ID
    public StudentProfileEntity getStudentprofile_id(){
        return studentprofile_id;
    }

    //SET PROFILEID
    public void setStudentprofile_id(StudentProfileEntity studentprofile_id){
        this.studentprofile_id = studentprofile_id;
    }

    //GET PROJECT ID
    public Long getProject_id(){
        return project_id;
    }

    //SET PROJECT ID
    public void setProject_id(Long project_id){
        this.project_id = project_id;
    }

    //GET PROJECT NAME
    public String getProject_name(){
        return project_name;
    }

    //SET PROJECT NAME
    public void setProject_name(String project_name){
        this.project_name = project_name;
    }

    //GET PROJECT DESCRIPTION
    public String getProject_description(){
        return project_description;
    }

    //SET PROJECT DESCRIPTION
    public void setProject_description(String project_description){
        this.project_description = project_description;
    }

    //GET PROJECT TECHNOLOGY USED
    public String getProject_technology(){
        return project_technology;
    }

    //SET PROJECT TECH
    public void setProject_technology(String project_technology){
        this.project_technology = project_technology;
    }

    //GET GITHUB URL
    public String getProject_giturl(){
        return project_giturl;
    }

    //SET GITHUB URL
    public void setProject_giturl(String project_giturl){
        this.project_giturl = project_giturl;
    }

    //GET LIVE DEMO
    public String getProject_livedemo(){
        return project_livedemo;
    }

    //SET LIVE DEMO
    public void setProject_livedemo(String project_livedemo){
        this.project_livedemo = project_livedemo;
    }

    //GET YOUR ROLE
    public String getProject_yourrole(){
        return project_yourrole;
    }

    //SET YOUR ROLE
    public void setProject_yourrole(String project_yourrole){
        this.project_yourrole = project_yourrole;
    }

}
