package com.teachtotech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teachtotech.model.NotesDetails;
import com.teachtotech.model.Topic;

public interface NotesRepository extends JpaRepository<NotesDetails,Long> {


	NotesDetails findByTopic(Topic topic);

	List<NotesDetails> findAllByRecStatus(String string);

	NotesDetails findByTopicAndRecStatus(Topic topic);
	
	
    
}
