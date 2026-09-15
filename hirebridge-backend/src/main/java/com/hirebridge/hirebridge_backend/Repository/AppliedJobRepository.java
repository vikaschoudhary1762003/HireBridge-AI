package com.hirebridge.hirebridge_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hirebridge.hirebridge_backend.Entity.AppliedJobEntity;
import java.util.List;



@Repository
public interface AppliedJobRepository extends JpaRepository <AppliedJobEntity , Long>{

    //CHEKS DUPLICATE APPLICATIONS
    @Query("""
        SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END
        FROM AppliedJobEntity a
        WHERE a.studentprofile.student_profile_id = :studentProfileId
        AND a.job.job_id = :jobId
    """)
    boolean existsByStudentAndJob(@Param("studentProfileId") Long studentProfileId, @Param("jobId") Long jobId);


    //GET APPLICATION OF ONE STUDENT 
    @Query("""
    SELECT a
    FROM AppliedJobEntity a
    WHERE a.studentprofile.student_profile_id = :studentProfileId
    """)
    List<AppliedJobEntity> findByStudentProfileId(@Param("studentProfileId") Long studentProfileId);


    // GET APPLICATIONS FOR RECRUITER

    @Query("""
        SELECT a
        FROM AppliedJobEntity a
        WHERE a.job.recruiter_id.recruiter_id = :recruiterId
        ORDER BY a.applied_Datetime DESC
    """)
    List<AppliedJobEntity> findApplicationsByRecruiterId( @Param("recruiterId") Long recruiterId);
}
