package com.hirebridge.hirebridge_backend.Entity;


 
//IMPORT PACKAGES
import jakarta.persistence.*;
 
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;


@Entity
@Table(name = "Student_Education")
public class StudentEducationEntity {
    
    //GENERATE ID STUDENT EDUCATION ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StudentEducation_Id" , nullable = false)
    private Long student_education_id ;

    //JOIN TABLE WITH STUDENT PROFILE TABLE FOR FETCHING OTHER DATA OF PARTICULAR USER 
    @OneToOne
    @JoinColumn(name = "Student_Profile" , nullable = false , unique = true) // TABLE NAME FROM WHICH ITS CONNECTED OR JOINED
    private StudentProfileEntity studentprofile;  // FOREIGN KEY  "PROFILE ID"  


    // 10 SCHOOL NAME
    @Column(name = "10th_School_Name" , nullable = false)
    private String tenSchool_name;

    //10 BOARD
    @Column(name = "10th_Board" , nullable = false)
    private String ten_board;

    //10 PERCENTANGE
    @Column( name = "10th_Percentage" , nullable = false)
    private String ten_percentage;

    //10th PASSING YEAR
    @Column(name = "10th_PassingYear" , nullable = false)
    private String ten_passing;


    //12th SCHOOL NAME
    @Column(name = "12th_SchoolName" , nullable = false)
    private String twelve_schoolname;

    //12 BOARD
    @Column(name = "12th_Board", nullable = false)
    private String twelve_board;

    //STREAM
    @Column(name = "Stream" ,nullable = false)
    private String twelve_stream;

    //12 PERCENTAGE
    @Column(name = "12th_Percentage" ,nullable = false)
    private String twelve_percentage;

    //PASSING YEAR
    @Column(name = "12th_PassingYear" ,nullable = false)
    private String twelve_passing;

    

    //GRADUATIONG

    //COLLEGE OR UNIVERSITY NAME
    @Column(name = "College_Name")
    private String college_name;


    //COURSE/DEGREE
    @Column(name = "Course" , nullable = false)
    private String course;

    //SPECIALIZATION
    @Column(name = "Spacialization")
    private String spacialization;

    //CURRENT SEMESTER
    @Column(name = "Current_Semester" , nullable = false)
    private String current_semester;

    //YEAR
    @Column(name = "Current_Year" , nullable = false)
    private String current_year;

    //CGPA
    @Column(name = "College_cgpa" , nullable = false)
    private String college_cgpa ;

    //GRADUATION END YEAR
    @Column(name = "graduation_year" , nullable = false)
    private String graduation_year;





    //GETTER AND SETTER METJOD

    //GET STUDENT PROFILE ID
    public StudentProfileEntity getStudentprofile(){
        return studentprofile;
    }

    //SET STUDENT PROFILE ID
    public void setStudentprofile(StudentProfileEntity studentprofile){
        this.studentprofile = studentprofile;
    }



    //GET STUDENT EDUCATION ID
    public Long getStudent_education_id(){
        return student_education_id;
    }

    //SET STUDENT EDUCATIO ID
    public void setStudent_education_id(Long student_education_id){
        this.student_education_id = student_education_id;
    }

    //GET tenth SCHOOL NAME
    public String getTenSchool_name(){
        return tenSchool_name;
    }

    //SET TENTH SCHOOL NAME
    public void setTenschool_name(String tenschool_name){
        this . tenSchool_name = tenschool_name;
    }

    //GET TEN BOARD
    public String getTen_board(){
        return ten_board;
    }

    //SET TEN BOARD
    public void setTen_board(String ten_board){
        this.ten_board= ten_board;
    }

    // GET PERCENAGE OF 1O
    public  String getTen_percentage(){
        return ten_percentage;
    }

    //SET PERCENTAGE
    public void setTen_percentage(String ten_percentage){
        this.ten_percentage = ten_percentage;
    }

    //GET PASSING YEAR 10
    public String getTen_passing(){
        return ten_passing;
    }

    //SET 10 PASSING YEAR
    public void setTen_passing(String ten_passing){
        this.ten_passing = ten_passing;
    }

    // GET 12 SCHOOL NAME
    public String getTwelve_schoolname() {
        return twelve_schoolname;
    }

    public void setTwelve_schoolname(String twelve_schoolname) {
        this.twelve_schoolname = twelve_schoolname;
    }


    // 12TH BOARD

    public String getTwelve_board() {
        return twelve_board;
    }

    public void setTwelve_board(String twelve_board) {
        this.twelve_board = twelve_board;
    }


    // STREAM

    public String getTwelve_stream() {
        return twelve_stream;
    }

    public void setTwelve_stream(String twelve_stream) {
        this.twelve_stream = twelve_stream;
    }

 // 12TH PERCENTAGE

    public String getTwelve_percentage() {
        return twelve_percentage;
    }

    public void setTwelve_percentage(String twelve_percentage) {
        this.twelve_percentage = twelve_percentage;
    }


    // 12TH PASSING YEAR

    public String getTwelve_passing() {
        return twelve_passing;
    }

    public void setTwelve_passing(String twelve_passing) {
        this.twelve_passing = twelve_passing;
    }
// COLLEGE / UNIVERSITY

    public String getCollege_name() {
        return college_name;
    }

    public void setCollege_name(String college_name) {
        this.college_name = college_name;
    }


    // COURSE / DEGREE

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }


    // SPECIALIZATION

    public String getSpacialization() {
        return spacialization;
    }

    public void setSpacialization(String spacialization) {
        this.spacialization = spacialization;
    }


    // CURRENT SEMESTER

    public String getCurrent_semester() {
        return current_semester;
    }

    public void setCurrent_semester(String current_semester) {
        this.current_semester = current_semester;
    }


    // CURRENT YEAR

    public String getCurrent_year() {
        return current_year;
    }

    public void setCurrent_year(String current_year) {
        this.current_year = current_year;
    }


    // CGPA

    public String getCollege_cgpa() {
        return college_cgpa;
    }

    public void setCollege_cgpa(String college_cgpa) {
        this.college_cgpa = college_cgpa;
    }

    // GRADUATION END YEAR

    public String getGraduation_year() {
        return graduation_year;
    }

    public void setGraduation_year(String graduation_year) {
        this.graduation_year = graduation_year;
    }

}
