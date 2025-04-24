package com.teachtotech.service;

import java.util.List;

import com.teachtotech.model.Topic;
import com.teachtotech.model.TopicCreateRequest;
import com.teachtotech.model.TopicDTO;
import com.teachtotech.request.CategoryIdRequest;

public interface  TopicService {
    
    Topic createTopic(TopicCreateRequest topic);

    List<Topic> getAllTopic();

	List<TopicDTO> getAllTopicsBycategoryId(CategoryIdRequest request);
}
