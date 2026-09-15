package com.hirebridge.hirebridge_backend.Dto;


import java.util.Map;



public class AiResumeRequest {
    

    //VARIABLES
    private String name;
    private String targetRole ;
    private String experienceLevel;

    private Map<String,Object> profile;
    private Map<String,Object> educaiton;
    private Map<String,Object> skills;
    private Map<String,Object> experience;
    private Map<String,Object> project;



    //GETTER SETTER

    // CANDIDATE NAME
    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    
    //TARGET ROLE
    public String getTargetRole(){
        return targetRole;
    }

    public void setTargetRole(String  targetRole){
        this. targetRole = targetRole;
    }

    //EXPERIENCE LEVEL
    public String getExperienceLevel(){
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel){
        this . experienceLevel = experienceLevel;
    }

    //PROFILE
    public Map<String,Object> getProfile(){
        return profile;
    }

    public void setProfile(Map<String,Object> profile){
        this.profile = profile;
    }

    //EDUCATION
    public Map<String,Object> getEducation(){
        return educaiton;
    }

    public void setEducation(Map<String,Object> education){
        this.educaiton = education;
    }

    //SKILLS
    public Map<String,Object> getSkills(){
        return skills;
    }

    public void setSkills(Map<String,Object> skills){
        this. skills = skills;
    }

    //EXPERIENCE
    public Map<String,Object> getExperience(){
        return experience;
    }

    public void setExperience(Map<String,Object> experience){
        this.experience = experience;
    }

    //PROJECT
    public Map<String,Object> getProject(){
        return project;
    }

    public void setProject(Map<String,Object> project){
        this.project = project;
    }
}
