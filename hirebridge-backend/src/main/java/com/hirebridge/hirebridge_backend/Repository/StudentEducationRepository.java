package com.hirebridge.hirebridge_backend.Repository;

//IMPORT PACKAGES
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hirebridge.hirebridge_backend.Entity.StudentEducationEntity;

import java.util.Optional;
 


@Repository
public interface StudentEducationRepository extends JpaRepository <StudentEducationEntity ,Long> {
    
// FIND EDUCATION DATA OF PARTICULAR USER USING STUDENT PROFILE ID
    @Query("""
           SELECT e
           FROM StudentEducationEntity e
           WHERE e.studentprofile.student_profile_id = :studentprofile_id
           """)

    Optional<StudentEducationEntity> findByStudentProfileId( @Param("studentprofile_id") Long studentprofile_id );
}
