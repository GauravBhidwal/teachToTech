package com.teachtotech.service;

import java.util.List;

import com.teachtotech.model.CategoryWithTopicDTO;
import com.teachtotech.request.CategoryTitleRequest;
import com.teachtotech.response.CategoryResponse;
import com.teachtotech.response.CategoryWithArticlesDTO;


public interface CategoryService {


	List<CategoryResponse> getAllCategories();

	 List<CategoryWithArticlesDTO> getCategoriesWithArticles();

	 List<CategoryWithTopicDTO> getCategorieswithTopics();

	CategoryResponse addCategory(CategoryTitleRequest request);

}
