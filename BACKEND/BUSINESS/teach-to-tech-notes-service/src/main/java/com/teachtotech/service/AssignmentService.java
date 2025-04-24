package com.teachtotech.service;

import com.teachtotech.model.AssignmentUpdateRequestDto;
import com.teachtotech.model.TopicIdRequest;
import com.teachtotech.request.AssignmentCreateRequestDto;
import com.teachtotech.request.Assignmentidrequest;
import com.teachtotech.response.ApiResponse;

public interface AssignmentService {

	ApiResponse createAssignment(AssignmentCreateRequestDto requestDto);

	ApiResponse updateAssignment(AssignmentUpdateRequestDto requestDto);

	ApiResponse deleteAssignment(Assignmentidrequest assignmentId);

	ApiResponse getAssignmentsByTopicId(TopicIdRequest topicId);

}
