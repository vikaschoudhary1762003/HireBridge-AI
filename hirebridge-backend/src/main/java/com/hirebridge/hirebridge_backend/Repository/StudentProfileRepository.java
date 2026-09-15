package com.hirebridge.hirebridge_backend.Repository;

import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface StudentProfileRepository extends JpaRepository<StudentProfileEntity, Long> {
    
    // FIND PROFILE USING USER BY ITS ID
    // Fixed: Changed s.user.user_id to s.user.userId to match your updated UserEntity fields!
    @Query("SELECT s FROM StudentProfileEntity s WHERE s.user.userId = :user_id")
    Optional<StudentProfileEntity> findStudentProfileByUserId(@Param("user_id") Long user_id);
}
