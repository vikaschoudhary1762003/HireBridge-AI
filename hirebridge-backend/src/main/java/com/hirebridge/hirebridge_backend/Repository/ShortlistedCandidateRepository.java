package com.hirebridge.hirebridge_backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hirebridge.hirebridge_backend.Entity.ShortlistedCandidateEntity;

@Repository
public interface ShortlistedCandidateRepository extends JpaRepository <ShortlistedCandidateEntity , Long> {


    // GET ALL SHORTLISTED CANDIDATES OF PARTICULAR RECRUITER 
    @Query("""
         SELECT s FROM ShortlistedCandidateEntity s WHERE s.recruiter_id.recruiter_id = :recruiter_id 
        """)

    List<ShortlistedCandidateEntity> findByRecruiterId( @Param("recruiter_id") Long recruiter_id );
    
    // CHECK WHETHER APPLICATION IS ALREADY SHORTLISTED 
    @Query("""
         SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM ShortlistedCandidateEntity s WHERE s.recruiter_id.recruiter_id = :recruiter_id AND s.applicant_id.application_id = :application_id 
        """) 

    boolean existsByRecruiterIdAndApplicationId( @Param("recruiter_id") Long recruiter_id, @Param("application_id") Long application_id );
}
