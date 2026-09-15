package com.hirebridge.hirebridge_backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProjectEntity;
import org.springframework.data.jpa.repository.Query;



@Repository
public interface StudentProjectRepository extends JpaRepository <StudentProjectEntity , Long>{
    
    @Query("""
            SELECT e FROM StudentProjectEntity e WHERE e.studentprofile_id.student_profile_id = :studentprofile_id
            """)

    List <StudentProjectEntity> findByStudentprofile_id( @Param("studentprofile_id") Long studentprofile_id);
}
