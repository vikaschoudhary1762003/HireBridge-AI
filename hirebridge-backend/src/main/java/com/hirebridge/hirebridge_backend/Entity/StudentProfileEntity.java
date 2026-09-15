//THIS FILE WILL CONTAIN THE TABLE NAME AND COLUMNS

package com.hirebridge.hirebridge_backend.Entity;

//IMPORT PACKAGES
import jakarta.persistence.*;

@Entity
@Table(name = "Student_Profile")
public class StudentProfileEntity {

    //GENERATING AUTO INCREMENT ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long student_profile_id;

    //CONNECTING TABLES
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    // Fixed: Changed nullable to true so students can save text data without uploading a photo first!
    @Column(nullable = true, name = "Profile_Photo")
    private String profile_photo;

    @Column(nullable = false, name = "First_Name")
    private String first_name;

    @Column(nullable = false, name = "Last_Name")
    private String last_name;

    @Column(nullable = false, name = "Email", unique = true)
    private String email;

    @Column(nullable = false, name = "Phone", unique = true)
    private String phone;

    @Column(name = "Date_of_Birth")
    private String dob;

    @Column(name = "Gender")
    private String gender;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name = "Nationality")
    private String nationality;

    @Column(name = "Profession")
    private String profession;

    @Column(name = "About_Me")
    private String about_me;

    @Column(name = "LinkedIn_URL")
    private String linkedin_url;

    @Column(name = "Github_URL")
    private String github_url;

    @Column(name = "Portfolio_URL")
    private String portfolio_url;

    @Column(name = "Language")
    private String language;

    // FIXED: Added required standard default constructor
    public StudentProfileEntity() {}

    // GETTER AND SETTER METHODS
    public UserEntity getUser(){ return user; } 
    public void setUser(UserEntity user){ this.user = user; }

    public Long getStudent_profile_id(){ return student_profile_id; }
    public void setStudent_profile_id(Long student_profile_id){ this.student_profile_id = student_profile_id; }

    public String getProfile_photo(){ return profile_photo; }
    public void setProfile_photo(String profile_photo){ this.profile_photo = profile_photo; }

    public String getFirst_name(){ return first_name; }
    public void setFirst_name(String first_name){ this.first_name = first_name; }

    public String getLast_name(){ return last_name; }
    public void setLast_name(String last_name){ this.last_name = last_name; }

    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }

    public String getPhone(){ return phone; }
    public void setPhone(String phone){ this.phone = phone; }

    public String getDob(){ return dob; }
    public void setDob(String dob){ this.dob = dob; }

    public String getGender(){ return gender; }
    public void setGender(String gender){ this.gender = gender; }

    public String getAddress(){ return address; }
    public void setAddress(String address){ this.address = address; }

    public String getNationality(){ return nationality; }
    public void setNationality(String nationality){ this.nationality = nationality; }

    public String getProfession(){ return profession; }
    public void setProfession(String profession){ this.profession = profession; }

    public String getAbout_me(){ return about_me; }
    public void setAbout_me(String about_me){ this.about_me = about_me; }

    public String getLinkedin_url(){ return linkedin_url; }
    public void setLinkedin_url(String linkedin_url){ this.linkedin_url = linkedin_url; }

    public String getGithub_url(){ return github_url; }
    public void setGithub_url(String github_url){ this.github_url = github_url; }

    public String getPortfolio_url(){ return portfolio_url; }
    public void setPortfolio_url(String portfolio_url){ this.portfolio_url = portfolio_url; }

    public String getLanguage(){ return language; }
    public void setLanguage(String language){ this.language = language; }
}
