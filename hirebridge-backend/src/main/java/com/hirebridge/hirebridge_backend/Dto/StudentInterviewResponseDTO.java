package com.hirebridge.hirebridge_backend.Dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class StudentInterviewResponseDTO {
    
    private Long interview_id;
    private String company_name;
    private String recruiter_name;
    private String designation;
    private String job_title;

    private LocalDate interview_date;
    private LocalTime interview_time;

    private String interview_type;
    private String interview_mode;

    private String meeting_link;
    private String additional_info;
    private String interview_address;
    private String status;


    // =========================
    // GETTERS AND SETTERS
    // =========================

    public Long getInterview_id() {
        return interview_id;
    }

    public void setInterview_id(Long interview_id) {
        this.interview_id = interview_id;
    }


    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }


    public String getRecruiter_name() {
        return recruiter_name;
    }

    public void setRecruiter_name(String recruiter_name) {
        this.recruiter_name = recruiter_name;
    }


    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }


    public String getJob_title() {
        return job_title;
    }

    public void setJob_title(String job_title) {
        this.job_title = job_title;
    }


    public LocalDate getInterview_date() {
        return interview_date;
    }

    public void setInterview_date(LocalDate interview_date) {
        this.interview_date = interview_date;
    }


    public LocalTime getInterview_time() {
        return interview_time;
    }

    public void setInterview_time(LocalTime interview_time) {
        this.interview_time = interview_time;
    }


    public String getInterview_type() {
        return interview_type;
    }

    public void setInterview_type(String interview_type) {
        this.interview_type = interview_type;
    }


    public String getInterview_mode() {
        return interview_mode;
    }

    public void setInterview_mode(String interview_mode) {
        this.interview_mode = interview_mode;
    }


    public String getMeeting_link() {
        return meeting_link;
    }

    public void setMeeting_link(String meeting_link) {
        this.meeting_link = meeting_link;
    }


    public String getAdditional_info() {
        return additional_info;
    }

     public void setAdditional_info(String additional_info) {
        this.additional_info = additional_info;
    }


    public String getInterview_address() {
        return interview_address;
    }

    public void setInterview_address(String interview_address) {
        this.interview_address = interview_address;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
