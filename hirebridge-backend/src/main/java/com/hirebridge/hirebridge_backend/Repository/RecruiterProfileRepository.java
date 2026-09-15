package com.hirebridge.hirebridge_backend.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.hirebridge.hirebridge_backend.Entity.RecruiterProfileEntity;

@Repository
public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfileEntity, Long> {
    
    // FIND RECRUITER BY USER ID
    // Fixed: Changed r.user.user_id to r.user.userId to match UserEntity fields
    @Query("SELECT r FROM RecruiterProfileEntity r WHERE r.user.userId = :user_id")
    Optional<RecruiterProfileEntity> findByUserId(@Param("user_id") Long user_id);
}
