package com.teachtotech.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.teachtotech.NotesApplication;
import com.teachtotech.model.Topic;
import com.teachtotech.model.TopicCreateRequest;
import com.teachtotech.model.TopicDTO;
import com.teachtotech.repository.TopicRepository;
import com.teachtotech.request.CategoryIdRequest;
import com.teachtotech.service.TopicService;

import jakarta.transaction.Transactional;

@Service
public class TopicServiceImpl implements TopicService {

    private final NotesApplication notesApplication;

    @Autowired
    private TopicRepository topicRepository;

    TopicServiceImpl(NotesApplication notesApplication) {
        this.notesApplication = notesApplication;
    }
    
    @Override
    @Transactional
    public Topic createTopic(TopicCreateRequest topic){
    	 Topic newTopic  = new Topic();
    	   newTopic.setCategoryId(topic.getCategoryId());
    	   newTopic.setName(topic.getName());
    	    // set other fields

    	    return topicRepository.save(newTopic);
    }
    
    @Override
    public List<Topic> getAllTopic(){
       List<Topic> topic = topicRepository.findAll();
       return topic;
    }
    

	@Override
	public List<TopicDTO> getAllTopicsBycategoryId(CategoryIdRequest request) {
		return topicRepository.findAllByCategoryId(request.getCategoryId()).stream()
				.map(topic-> new TopicDTO(
							topic.getTopicId(),
							topic.getName()
				))
				.collect(Collectors.toList());
	}
}
