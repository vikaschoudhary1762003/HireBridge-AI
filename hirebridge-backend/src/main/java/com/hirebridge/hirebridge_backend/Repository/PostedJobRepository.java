package com.hirebridge.hirebridge_backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hirebridge.hirebridge_backend.Entity.JobpostEntity;
 



@Repository
public interface PostedJobRepository extends JpaRepository <JobpostEntity , Long> {
    
    //FIND POSTED JOBS BY RECRUITER_ID
    @Query("""
            SELECT r FROM JobpostEntity r WHERE r.recruiter_id.recruiter_id = :recruiter_id
            """)

            //THIS WILL PRINT THE LIST OF POSTED JOBS AS PER RECRUITER ID 
    List <JobpostEntity> findByRecruiter_id(@Param("recruiter_id") long recruiter_id);
}
