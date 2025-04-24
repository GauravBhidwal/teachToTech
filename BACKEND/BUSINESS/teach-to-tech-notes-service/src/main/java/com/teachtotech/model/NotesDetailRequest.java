package com.teachtotech.model;

import java.util.List;

import lombok.Data;

@Data
public class NotesDetailRequest {
    
    private String topic; // Reference to Topic
    private String content;
	private String userId;
}
