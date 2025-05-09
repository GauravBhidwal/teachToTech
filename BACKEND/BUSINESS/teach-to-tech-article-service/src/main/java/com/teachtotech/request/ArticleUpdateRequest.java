package com.teachtotech.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ArticleUpdateRequest {

	private Long articleId;
	private String title;
	private String content;
	private String categoryId;
	private String userId;

}
