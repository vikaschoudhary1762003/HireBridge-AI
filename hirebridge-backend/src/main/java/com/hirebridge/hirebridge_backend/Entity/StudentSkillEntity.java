package com.hirebridge.hirebridge_backend.Entity;

//IMPORT PACKAGE
import jakarta.persistence.*;


@Entity
@Table(name = "Student_Skills")
public class StudentSkillEntity {

    //GENERATE UNIQUE ID OF SKILL'S CALLED SKILL_ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Skill_ID" ,nullable =  false)
    private Long skill_id;

    //JOIN TABLE WITH STUDENT PROFILE ID
    @OneToOne
    @JoinColumn(name = "Student_Profile" ,  nullable = false , unique=true)
    private StudentProfileEntity studentprofile_id; 


    //PROGRAMMING SKILL ENTITY
    @Column(name = "Programming_Skills")
    private String programming_skills;

    //TECHNICAL SKILL COLUMN
    @Column(name = "Technical_Skills")
    private String technical_skills;

    //TOOLS AND TECHNOLOGY COLUMN
    @Column(name = "Tools")
    private String tools;

    //SOFT SKILL COLUMN
    @Column(name = "Soft_Skills")
    private String soft_skills;




    //GETTTER SETTER METHODS

    //GET STUDENT PROFILE ID
    public StudentProfileEntity getStudentprofile_id(){
        return studentprofile_id;
    }

    //SET STUDENT PROFIE ID
    public void setStudentprofile_id(StudentProfileEntity studentprofile_id){
        this.studentprofile_id = studentprofile_id;
    }

    // GET SKILL ID
    public Long getSkill_id(){
        return skill_id;
    }

    //SET SKILL I
    public void setSkill_id(Long skill_id){
        this.skill_id = skill_id;
    }

    //GET PROGRAMMINGSKILL
    public String getProgramming_skills(){
        return programming_skills;
    }

    //SET PROGRAMMING SKILS
    public void setProgramming_skills(String programming_skills){
        this.programming_skills = programming_skills;
    }

    //GET TECHNICAL SKILLS
    public String getTechnical_skills(){
        return technical_skills;
    }

    //SET TECHNICAL SKILLS
    public void setTechnical_skills(String technical_skills){
        this.technical_skills = technical_skills;
    }

    //GET TOOLS
    public String getTools(){
        return tools;
    }

    //SET TOOLS
    public void setTools(String tools){
        this.tools = tools;
    }

    //GET SOFT SKILLS
    public String getSoft_skills(){
        return soft_skills;
    }

    //SET SOFT SKILLS
    public void setSoft_skills(String soft_skills){
        this.soft_skills = soft_skills;
    }
    
}
