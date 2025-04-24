package com.teachtotech.model;

import java.util.List;

import com.teachtotech.DTOs.TopicDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryWithTopicDTO {
	private Long id;
    private String name;
    private List<TopicDTO> topics;
}
