package com.teachtotech.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teachtotech.model.Topic;
import com.teachtotech.model.TopicCreateRequest;
import com.teachtotech.model.TopicDTO;
import com.teachtotech.request.CategoryIdRequest;
import com.teachtotech.service.TopicService;

@RestController
@RequestMapping("/topic")
public class TopicController {
   @Autowired
   private TopicService topicservice;
   
   @PostMapping("/create")
   public ResponseEntity<?> createTopic(@RequestBody TopicCreateRequest topic){
     Topic topic1=topicservice.createTopic(topic);
     return ResponseEntity.ok(topic1);
   }
   @PostMapping("/getAll")
   public ResponseEntity<?> getTopic(){
     List<Topic> topic1=topicservice.getAllTopic();
     return ResponseEntity.ok(topic1);
   }
   
   @PostMapping("/gettopicbycategoryid")
	List<TopicDTO> getTopicByCategoryId(@RequestBody CategoryIdRequest request){
       return topicservice.getAllTopicsBycategoryId(request);
   }
}
