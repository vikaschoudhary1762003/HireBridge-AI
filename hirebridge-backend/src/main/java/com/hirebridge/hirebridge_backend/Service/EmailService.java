package com.hirebridge.hirebridge_backend.Service;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;





@Service
public class EmailService {

    //INJECT OBJECT
    private final JavaMailSender mailSender ;
    
    //INJECT CONSTRUCUTOR
    public EmailService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }


    //FUNCTION TO SEND SHORTLISTED EMAIL TO CANDIDATE
    public void sendEmail(String candidateName , String candidateEmail , String jobTitle){
        //CREATE OBJECT
        SimpleMailMessage message = new SimpleMailMessage();

        //Receiver  address
        message.setTo(candidateEmail);
        //subject 
        message.setSubject("Congratulations! You Have Been Shortlisted");

        //body
        String body =  "Dear " + candidateName + ",\n\n" +

                "Congratulations!\n\n" +

                "We are pleased to inform you that you have been " +
                "shortlisted for the " + jobTitle + " position.\n\n" +

                "Your profile has been reviewed by the recruitment team " +
                "and we would like to proceed with the interview process.\n\n" +

                "If you are interested in attending the interview, " +
                "please confirm your interest through the HireBridgeAI platform.\n\n" +

                "If you are not interested in proceeding, " +
                "you can decline the interview invitation.\n\n" +

                "Please respond at your earliest convenience.\n\n" +

                "Best regards,\n" +
                "Recruitment Team\n" +
                "HireBridgeAI";

                //set body to text
                message.setText(body);
                //finally send email to candidate
                mailSender.send(message);

    }






    //SEND INVITATION EMAIL TO THE CANDIDATE
    public void sendApplyInvitationEmail(String candidateEmail , String candidateName  ,  String companyName ,String companyWebsite ){
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            //CANDIDATE EMAIL
            helper.setTo(candidateEmail);

            //EMAIL SUBJECT

            // EMAIL BODY
        String body =
                  "<html>" +
        "<body>" +

        "<h2>Hello " + candidateName + ",</h2>" +

        "<p>We are pleased to inform you that " +
        "<strong>" + companyName + "</strong> " +
        "is inviting you to explore career opportunities through HireBridgeAI.</p>" +

        "<p>The recruiter from <strong>" + companyName + "</strong> " +
        "has found your profile and would like to consider you for suitable " +
        "opportunities within the organization.</p>" +

        "<p>If you are interested in exploring opportunities with " +
        "<strong>" + companyName + "</strong>, " +
        "please upload your latest resume through HireBridgeAI.</p>" +

        "<br>" +

        "<a href=\"" + companyWebsite + "\" " +
        "style=\"display:inline-block;" +
        "padding:12px 25px;" +
        "background-color:#007bff;" +
        "color:white;" +
        "text-decoration:none;" +
        "border-radius:5px;" +
        "font-weight:bold;\">" +
        "Visit " + companyName + " career" +
        "</a>" +

        "<br><br>" +

        "<p>Make sure your resume contains your latest skills, " +
        "projects, education and experience.</p>" +

        "<p>We look forward to hearing from you.</p>" +

        "<p>Best Regards,<br>" +
        "<strong>HireBridgeAI Team</strong></p>" +

        "</body>" +
        "</html>";

        // TRUE = HTML EMAIL
        helper.setText(body, true);

        // SEND EMAIL
        mailSender.send(message);


        } catch (Exception e) {
            throw new RuntimeException(
                "Failed to send invitation email",
                e
        );
    
        }
    }




    //SEND INTERVIEW EMAIL TO CONDUCT  INTERVIEW
    public void sendInterviewEmail(String candidateName , String candidateEmail , String jobTitle,String interviewType, String interviewMode, LocalDate interviewDate,LocalTime interviewTime, String meetingLink,String additionalInfo){
        //CREATE EMAIL OBJECT
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(candidateEmail);
        message.setSubject("Interview Scheduled - " + jobTitle);

        //EMAIL CONTENT
        String body = "Dear " + candidateName + ",\n\n" +

            "We are pleased to inform you that your interview " +
            "has been scheduled through HireBridgeAI.\n\n" +

            "INTERVIEW DETAILS\n" +
            "-------------------------\n\n" +

            "Job Applied For: " + jobTitle + "\n" +
            "Interview Type: " + interviewType + "\n" +
            "Interview Mode: " + interviewMode + "\n" +
            "Interview Date: " + interviewDate + "\n" +
            "Interview Time: " + interviewTime + "\n" +
            "Meeting Link: " + meetingLink + "\n\n" +

            "Additional Information:\n" +
            additionalInfo + "\n\n" +

            "Please join the interview at the scheduled " +
            "date and time.\n\n" +

            "If the interview is online, please use the " +
            "meeting link provided above.\n\n" +

            "Best regards,\n" +
            "Recruitment Team\n" +
            "HireBridgeAI";

            //SET EMAIL BODY
            message.setText(body);
            //SEND EMAIL
            mailSender.send(message);
    }
}
