package com.teachtotech.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentResponseDto {
    private Long assignmentId;
    private Long topicId;
    private String qa;
    private String userId;
    private Timestamp createdAt;
}