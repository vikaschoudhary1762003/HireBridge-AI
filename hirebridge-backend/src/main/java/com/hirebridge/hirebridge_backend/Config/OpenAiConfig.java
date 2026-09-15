package com.hirebridge.hirebridge_backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;

@Configuration
public class OpenAiConfig {

    @Bean
    public OpenAIClient openAiClient() {

        String key = System.getenv("OPENAI_API_KEY");

        System.out.println("======================================");
        System.out.println("OPENAI KEY EXISTS: " + (key != null));
        System.out.println("OPENAI KEY LENGTH: " + (key != null ? key.length() : 0));
        System.out.println("======================================");

        return OpenAIOkHttpClient.fromEnv();
    }
}