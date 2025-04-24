package com.teachtotech.response;

import java.util.List;

import com.teachtotech.model.AssignmentResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse {
    private String message;
    private String status;
    private List<AssignmentResponseDto> assignmentList;
}