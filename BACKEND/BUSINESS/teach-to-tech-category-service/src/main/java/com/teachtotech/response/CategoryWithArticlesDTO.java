package com.teachtotech.response;

import java.util.List;

import com.teachtotech.model.ArticleDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryWithArticlesDTO {
	

	private Long id;
    private String name;
    private List<ArticleDTO> articles;
}
