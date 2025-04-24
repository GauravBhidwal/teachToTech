package com.teachtotech.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicCreateRequest {
	    private String categoryId;
		private String name;
}
