package com.teachtotech;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.teachtotech.DTOs.TopicDTO;
import com.teachtotech.request.CategoryIdRequest;

@FeignClient("teach-to-tech-notes-service")
public interface NotesInterface {
	
	@PostMapping("/topic/gettopicbycategoryid")
	List<TopicDTO> getTopicByCategoryId(@RequestBody CategoryIdRequest request);
}
