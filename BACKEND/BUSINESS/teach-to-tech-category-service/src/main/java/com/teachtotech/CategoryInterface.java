package com.teachtotech;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.teachtotech.model.ArticleDTO;
import com.teachtotech.request.CategoryIdRequest;

@FeignClient("teach-to-tech-article-service")
public interface CategoryInterface {
	
	@PostMapping("/articles/getarticlebycategoryid")
	List<ArticleDTO> getArticleByCategoryId(@RequestBody CategoryIdRequest request);

	
	

}
