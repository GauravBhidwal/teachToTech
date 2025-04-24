package com.teachtotech.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentUpdateRequestDto {
    
    private Long assignmentId;
    private String topicId;
    private String qa;
    private String userId;
}