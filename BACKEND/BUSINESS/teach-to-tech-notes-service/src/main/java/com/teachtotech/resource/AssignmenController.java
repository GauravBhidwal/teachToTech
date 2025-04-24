package com.teachtotech.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teachtotech.model.AssignmentUpdateRequestDto;
import com.teachtotech.model.TopicIdRequest;
import com.teachtotech.request.AssignmentCreateRequestDto;
import com.teachtotech.request.Assignmentidrequest;
import com.teachtotech.response.ApiResponse;
import com.teachtotech.service.AssignmentService;

@RestController
@RequestMapping("/assignment")
public class AssignmenController {
	
	@Autowired
    private AssignmentService assignmentService;
	
    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createAssignment(@RequestBody AssignmentCreateRequestDto requestDto) {
        ApiResponse response = assignmentService.createAssignment(requestDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse> updateAssignment(@RequestBody AssignmentUpdateRequestDto requestDto) {
        ApiResponse response = assignmentService.updateAssignment(requestDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<ApiResponse> deleteAssignment(@RequestBody Assignmentidrequest assignmentId) {
        ApiResponse response = assignmentService.deleteAssignment(assignmentId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/getByTopic")
    public ResponseEntity<ApiResponse> getAssignmentsByTopic(@RequestBody TopicIdRequest topicId) {
        ApiResponse response = assignmentService.getAssignmentsByTopicId(topicId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
