package com.hirebridge.hirebridge_backend.Entity;

import java.time.LocalDate;
import java.time.LocalTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;




@Entity
@Table(name = "Scheduled_Interview")
public class ScheduledInterviewEntity {
    
    //GENERATE ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Interview_Id")
    private Long interviewId;

    //JOIN TABLE WITH STUDENT PROFILE ID TO KNOW PARTICULAR STUDENT IS APPLIED 
    @ManyToOne
    @JoinColumn(name="Student_Profile" , nullable = false)    
    private StudentProfileEntity studentProfile;

    // JOIN TABLE WITH APPLIED JOB TABLE ID TO KNOW PARTICULAR JOB IS APPLIED FOR
    @ManyToOne
    @JoinColumn(name = "Application_Id" , nullable = false)
    private AppliedJobEntity application;

    //JOIN TABLE WITH RECRUITER ID SO THAT PARTICULAR RECRUIER CAN SEE THEIR CANDIDATES WHO APPLIED OR SCHEDULED INTERIVEW
    @ManyToOne
    @JoinColumn(name = "Recruiter_Id", nullable = false)
    private UserEntity recruiter;

    //  INTERVIEW TYPE
    @Column(name = "Interview_Type")
    private String interviewType;

    //INTERVIEW MODE
    @Column(name = "Interview_Mode")
    private String interviewMode;


    //INTERVIEW DATE
    @Column(name = "Interview_Date")
    private LocalDate interviewDate;

    //INTERVIEW TIME
    @Column(name = "Interview_Time")
    private LocalTime interviewTime;

    //MEETING LINK
    @Column(name = "Meeting_Link")
    private String meetingLink;

    //ADDITION INFO
    @Column(name = "Additional_Info")
    private String additionalInfo;

    //STATUS
    @Column(name = "Status")
    private String status;

    //ADDRESS FOR INTERVIEW
    @Column(name = "Interview_Address")
    private String interviewAddress;



    //GETTER SETTER

    //INTERVIEW ID
    public Long getInterview_id(){
        return interviewId;
    }

    public void setInterview_id(Long interview_id){
        this.interviewId = interview_id;
    }


    //STUDENT PROFILE ID
    public StudentProfileEntity getStudent_profile(){
        return studentProfile;
    }

    public void setStudent_profile(StudentProfileEntity studentprofile){
        this.studentProfile = studentprofile;
    }


    // APPLICATION
    public AppliedJobEntity getApplication() {
        return application;
    }

    public void setApplication(AppliedJobEntity application) {
        this.application = application;
    }

    //RECRUIR
    public UserEntity getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(UserEntity recruiter) {
        this.recruiter = recruiter;
    }

    //INTERVIEW TYPE
    public String getInterview_type(){
        return interviewType;
    }

    public void setInterview_type(String interview_type){
        this.interviewType = interview_type;
    }

    //INTERVIEW MODE
    public String getInterview_mode(){
        return interviewMode;
    }

    public void setInterview_mode(String interview_mode){
        this.interviewMode = interview_mode;
    }

    //INTERVIEW DATE
    public LocalDate getInterview_date(){
        return interviewDate;
    }

    public void setInterview_date(LocalDate interview_date){
        this.interviewDate = interview_date;
    }

    //INTERVIEW TIME
    public LocalTime getInterview_time(){
        return interviewTime;
    }

    public void setInterview_time(LocalTime interview_time){
        this.interviewTime = interview_time;
    }

    //MEETING LINK
    public String getMeeting_link(){
        return meetingLink;
    }

    public void setMeeting_link(String meetingLink){
        this.meetingLink = meetingLink;
    }

    //ADDITIONAL INFO
    public String getAdditional_info(){
        return additionalInfo;
    }

    public void setAdditional_info(String additionalInfo){
        this.additionalInfo = additionalInfo;
    }

    //STATUS
    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status = status;
    }

    //INTERVIEW ADDRESS
    public String getInterview_address(){
        return interviewAddress;
    }

    public void setInterview_address(String interviewAddress){
        this.interviewAddress = interviewAddress;
    }
}

