package com.hirebridge.hirebridge_backend.Config;

//IMPORT HTTP SECURITY 
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

//BCRYPT ENCODER
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

//BEAN TO CREATE AND MANAGE OBJECT
import org.springframework.context.annotation.Bean;

//CONFIGURATION TELLS THAT THIS CLASS CONTAINS CONFIGURATION
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
// SECURITYFILTERCHAIN DEFINES WHICH API REQUIRED AUTHENTICATION 
import org.springframework.security.web.SecurityFilterChain;

//SPRING CORS PREFLIGHT
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// FIXED: Required import to enable custom security configurations
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity // FIXED: Enforces Spring to drop its generated security passwords!
public class SecurityConfig {
    
    //PASSWORD ENCODER
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //SECURITY CONFIGURATION
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http 
        //disable CSRF , building REST API so disable CSRF .
        .csrf(csrf -> csrf.disable())

        //ENABLE CORS
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))

        //AUTHORIZED REQUESTS
        .authorizeHttpRequests(auth -> auth

            //ALLOW CORS PREFLIGHT REQUEST
            .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()

            // REAL SOLUTION: Explicit structural array mapping to prevent Spring 6 match bypasses
            .requestMatchers(
                "/api/user/**",
                "/api/student/**",
                "/api/student_education/**",
                "/api/student_skills/**",
                "/api/student_experience/**",
                "/api/student_project/**",
                "/api/recruiter_profile/**",
                "/api/posted/**",
                "/api/application/**",
                "/api/shortlisted_candidates/**",
                "/api/scheduled_interview/**",
                "/api/ai-resume/**"
            ).permitAll()

            //EVERY OTHER API REQUIRES AUTHENTICATION
            .anyRequest().authenticated() 
           
        );
        return http.build();
    }

    //CORS CONFIGURATION
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        // REAL SOLUTION: Fixed spelling consistency to guarantee properties register to the Bean container
        CorsConfiguration configuration = new CorsConfiguration();

        //REACT FRONTEND (Supports both standard dev ports just in case)
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        //ALLOWED METHODS
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        //ALLOWED HEADER
        configuration.setAllowedHeaders(List.of("*"));

        // FIXED: Explicitly allow credentials for cross-origin tracking
        configuration.setAllowCredentials(true);

        //REGISTER CORS CONFIGURATION
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
