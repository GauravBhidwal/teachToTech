package com.teachtotech.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teachtotech.model.Assignment;
import com.teachtotech.model.Topic;
import com.teachtotech.model.TopicCreateRequest;

@Repository
public interface TopicRepository extends JpaRepository<Topic,Long> {



	Collection<Topic> findAllByCategoryId(String categoryId);

	Topic save(TopicCreateRequest topic);
	
	List<Assignment> findByTopicTopicIdAndRecstatus(Long topicId, String recstatus);

     
}
