package com.hirebridge.hirebridge_backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hirebridge.hirebridge_backend.Entity.StudentSkillEntity;
import java.util.List;


@Repository
public interface StudentSkillsRepository extends JpaRepository <StudentSkillEntity , Long>{

    @Query("SELECT s FROM StudentSkillEntity s WHERE s.studentprofile_id.student_profile_id = :studentprofile_id")
    
    Optional<StudentSkillEntity> findByStudentProfileId( @Param("studentprofile_id") Long studentprofile_id);
}
