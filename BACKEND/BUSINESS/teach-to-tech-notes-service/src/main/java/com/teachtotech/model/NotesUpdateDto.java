package com.teachtotech.model;

import java.util.List;

import lombok.Data;

@Data
public class NotesUpdateDto {
	private Long noteId;
	 private String topic; // Reference to Topic
	    private String content;
		private String userId;
}
