package com.hirebridge.hirebridge_backend.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.hirebridge.hirebridge_backend.Entity.ScheduledInterviewEntity;
import com.hirebridge.hirebridge_backend.Entity.StudentProfileEntity;
import com.hirebridge.hirebridge_backend.Entity.UserEntity;

@Repository
public interface ScheduledInterviewRepository extends JpaRepository<ScheduledInterviewEntity, Long> {
 
    // Finds all scheduled interviews belonging to a particular 'StudentProfileEntity'.
    List<ScheduledInterviewEntity> findByStudentProfile( StudentProfileEntity studentProfile);

    // Get interviews belonging to one recruiter
    List<ScheduledInterviewEntity> findByRecruiter(UserEntity recruiter);
}
