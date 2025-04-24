package com.teachtotech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teachtotech.model.Assignment;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByTopicTopicId(Long topicId);
    
    List<Assignment> findByTopicTopicIdAndRecstatus(Long topicId, String recstatus);

}