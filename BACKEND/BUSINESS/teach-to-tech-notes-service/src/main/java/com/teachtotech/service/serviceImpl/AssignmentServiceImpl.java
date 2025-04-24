package com.teachtotech.service.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachtotech.model.Assignment;
import com.teachtotech.model.AssignmentResponseDto;
import com.teachtotech.model.AssignmentUpdateRequestDto;
import com.teachtotech.model.Topic;
import com.teachtotech.model.TopicIdRequest;
import com.teachtotech.repository.AssignmentRepository;
import com.teachtotech.repository.TopicRepository;
import com.teachtotech.request.AssignmentCreateRequestDto;
import com.teachtotech.request.Assignmentidrequest;
import com.teachtotech.response.ApiResponse;
import com.teachtotech.service.AssignmentService;

@Service
public class AssignmentServiceImpl implements AssignmentService{

	@Autowired
	private TopicRepository topicRepository;
	@Autowired
	private AssignmentRepository assignmentRepository;
	@Override
	public ApiResponse createAssignment(AssignmentCreateRequestDto requestDto) {
		Long topicid= Long.parseLong(requestDto.getTopicId());
		Topic topic = topicRepository.findById(Long.parseLong(requestDto.getTopicId()))
				 .orElseThrow(() -> new RuntimeException("Topic with ID " + topicid + " not found"));

        Assignment assignment = new Assignment();
        assignment.setTopic(topic);
        assignment.setQa(requestDto.getQa());
        assignment.setUserId(requestDto.getUserId());
       
        Assignment savedAssignment = assignmentRepository.save(assignment);
        
        AssignmentResponseDto response= new AssignmentResponseDto();
        response.setAssignmentId(savedAssignment.getAssignemntId());
        response.setTopicId(savedAssignment.getTopic().getTopicId());
        response.setQa(savedAssignment.getQa());
        response.setUserId(savedAssignment.getUserId());
        response.setCreatedAt(savedAssignment.getCreatedAt());
        List<AssignmentResponseDto> responselist= new ArrayList<>();
        responselist.add(response);
        return new ApiResponse("Assignment created successfully", "SUCCESS", responselist);
    }
	

	@Override
	public ApiResponse updateAssignment(AssignmentUpdateRequestDto requestDto) {
		  Assignment assignment = assignmentRepository.findById(requestDto.getAssignmentId())
		            .orElseThrow(() -> new RuntimeException("Assignment not found with id: " + requestDto.getAssignmentId()));

		    if (requestDto.getTopicId() != null) {
		        Topic topic = topicRepository.findById(Long.parseLong(requestDto.getTopicId()))
		                .orElseThrow(() -> new RuntimeException("Topic not found with id: " + requestDto.getTopicId()));
		        assignment.setTopic(topic);
		    }

		    if (requestDto.getQa() != null) {
		        assignment.setQa(requestDto.getQa());
		    }
		    
		    if (requestDto.getUserId() != null) {
		        assignment.setUserId(requestDto.getUserId());
		    }

		    Assignment updatedAssignment = assignmentRepository.save(assignment);
		    
		    AssignmentResponseDto responseDto = mapToAssignmentResponseDto(updatedAssignment);
		    
		    return ApiResponse.builder()
		            .message("Assignment updated successfully")
		            .status("SUCCESS")
		            .assignmentList(List.of(responseDto))
		            .build();
	}

	@Override
	public ApiResponse deleteAssignment(Assignmentidrequest assignmentId) {
		Long assignId =assignmentId.getAssignmentId();
	    
	    Assignment assignment = assignmentRepository.findById(assignId)
	            .orElseThrow(() -> new RuntimeException("Assignment not found with id: " + assignId));

	   assignment.setRecStatus("X");
	   assignmentRepository.save(assignment);
	    
	    return ApiResponse.builder()
	            .message("Assignment deleted successfully")
	            .status("SUCCESS")
	            .build();
	}

	@Override
	public ApiResponse getAssignmentsByTopicId(TopicIdRequest topicId) {
		String topicid = topicId.getTopicId();
	    Long id = Long.parseLong(topicid);
	    
	    // First check if topic exists
	    if (!topicRepository.existsById(id)) {
	        throw new RuntimeException("Topic not found with id: " + topicId);
	    }
	    
	    List<Assignment> assignments = assignmentRepository.findByTopicTopicIdAndRecstatus(id,"A");
	    
	    List<AssignmentResponseDto> assignmentDtos = assignments.stream()
	            .map(this::mapToAssignmentResponseDto)
	            .collect(Collectors.toList());
	            
	    return ApiResponse.builder()
	            .message("Assignments fetched successfully")
	            .status("SUCCESS")
	            .assignmentList(assignmentDtos)
	            .build();
	}
	
	private AssignmentResponseDto mapToAssignmentResponseDto(Assignment assignment) {
	    return AssignmentResponseDto.builder()
	            .assignmentId(assignment.getAssignemntId())
	            .qa(assignment.getQa())
	            .userId(assignment.getUserId())
	            .topicId(assignment.getTopic().getTopicId())
	            .createdAt(assignment.getCreatedAt())
	            .build();
	}
}
