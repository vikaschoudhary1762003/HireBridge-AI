package com.hirebridge.hirebridge_backend.Service;

import org.springframework.stereotype.Service;

import com.hirebridge.hirebridge_backend.Dto.AiResumeRequest;
import com.openai.client.OpenAIClient;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.Response;



@Service
public class AiResumeService {

    //CREATE OBJECT  , SPRING AUTO GIVE RESTCLIENT OBJECT THO THIS SERVICE THROUGH CONSTRUCTOR
    private final OpenAIClient openAiClient;

    //CONSTRUCTOR INJECTION
    public AiResumeService(OpenAIClient openAiClient){
        this.openAiClient = openAiClient;
    }


    // RESUME FUNCTION()
    public String generateResume(AiResumeRequest request){
        //BUILD INSTRUCTIONS THAT WILL BE SENT TO AI SO THAT AI CREATE RESUME AS PER THE INSTRUCTION
        String prompt = """
                You are an expert professional resume writer.

                Create a professional and ATS-friendly resume
                for the following candidate.

                Candidate Name:
                %s

                Profession:
                %s

                Education:
                %s

                Skills:
                %s

                Experience:
                %s

                Projects:
                %s


                IMPORTANT RULES:

                1. Do not invent candidate information.
                2. Use professional language.
                3. Make the resume ATS-friendly.
                4. Highlight important technical skills.
                5. Write professional project descriptions.
                6. Use clear resume sections.
                7. Make it suitable for every jobs.
                8. Return only the resume content.

                """

                .formatted(
                    //GET CANDIDATE NAME FROM DTO
                    request.getName(),
                    //GET PROFESSION
                    request.getProfile(),
                    request.getEducation(),
                    request.getSkills(),
                    request.getExperience(),
                    request.getProject()
                );


                //CREATE OPEN_AI REQUEST Responsecreateparam is provideed by openAi java sdk.
                ResponseCreateParams params = ResponseCreateParams.builder()  // OBJECT
                .model("gpt-4.1-mini")  //AI MODEL THAT WE ARE USING
                .input(prompt)  // GIVE PROMT TO AI FOR BUILDING EXACT RESUME AS PER INSTRUCTIONS
                .build(); // THIS IS FINALLY RESUME BUILD


                // SEND REQUEST TO OPENAI
                Response response = openAiClient.responses().create(params);

                // GET GENERATED TEXT FROM RESPONSE
                return response.output().stream()
                .flatMap(item -> item.message().stream())
                .flatMap(message -> message.content().stream())
                .flatMap(content -> content.outputText().stream())
                .map(outputText -> outputText.text())
                .collect(java.util.stream.Collectors.joining("\n"));
    }


}
