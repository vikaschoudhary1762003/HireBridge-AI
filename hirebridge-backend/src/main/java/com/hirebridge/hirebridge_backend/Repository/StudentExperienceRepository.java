package com.hirebridge.hirebridge_backend.Repository;

 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hirebridge.hirebridge_backend.Entity.StudentEducationEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentExperienceEntity;
import java.util.List;

 



@Repository
public interface StudentExperienceRepository extends JpaRepository <StudentExperienceEntity , Long>{
    
    //FIND EXPERIENCE DATA OF PARTICULAR USER BY ITS STUDENTPROFILE_ID

     @Query("""
        SELECT e FROM StudentExperienceEntity e
        WHERE e.studentprofile_id.student_profile_id = :studentprofile_id
    """)
    List<StudentExperienceEntity> findByStudentProfileId(  @Param("studentprofile_id") Long studentprofile_id);

}
