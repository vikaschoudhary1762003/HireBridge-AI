package com.hirebridge.hirebridge_backend.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hirebridge.hirebridge_backend.Dto.AiResumeRequest;
import com.hirebridge.hirebridge_backend.Service.AiResumeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;






@RestController
@RequestMapping("/api/ai-resume")
@CrossOrigin(origins = "http://localhost:5173")
public class AiResumeController {
    
    //IT CONTAINS ACTUAL BUSINESS LOGIC

    //INJECT OBJECT
    private final AiResumeService airesumeService;

    //CONSTRUCTOR INJECTION
    public AiResumeController(AiResumeService airesumeService){
        this. airesumeService = airesumeService;
    }

    //REST API FOR GENERATE RESUME
    @PostMapping("/generate")
    public ResponseEntity<?> generateResume(@RequestBody AiResumeRequest request) {
        
        try {
            
            //SEND STUDENT INFORMATION TO THE SERVICE AND SERVICE WILL COMMUNICATE WITH open_AI
            String resume = airesumeService.generateResume(request);

            //RESPONSE
            return ResponseEntity.ok(Map.of("success",true ,
                "message", "Resume generated successfully",
                "resume", resume
            ));


        } catch (Exception e) {
            // IF SOMETHING GOES WRONG : OPEN_AI PROBLEM OR NETWORK PROBLEM ANY
            return ResponseEntity.internalServerError().body(Map.of("success",false,
                "message",e.getMessage()
            ));
        }
    }
    
}
