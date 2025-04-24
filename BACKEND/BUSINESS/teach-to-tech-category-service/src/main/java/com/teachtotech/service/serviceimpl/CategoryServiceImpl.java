package com.teachtotech.service.serviceimpl;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachtotech.CategoryInterface;
import com.teachtotech.NotesInterface;
import com.teachtotech.DTOs.TopicDTO;
import com.teachtotech.model.ArticleDTO;
import com.teachtotech.model.Category;
import com.teachtotech.model.CategoryWithTopicDTO;
import com.teachtotech.repository.CategoryRepository;
import com.teachtotech.request.CategoryIdRequest;
import com.teachtotech.request.CategoryTitleRequest;
import com.teachtotech.response.CategoryResponse;
import com.teachtotech.response.CategoryWithArticlesDTO;
import com.teachtotech.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryRepository categoryrepo;
	
	@Autowired
	private CategoryInterface categoryclient;
	
	@Autowired
	private NotesInterface notesinterface;
	
	@Override
	public List<CategoryResponse> getAllCategories() {
		return categoryrepo.findAll().stream()
                .map(c -> new CategoryResponse(c.getId(), c.getTitle()))
                .collect(Collectors.toList());
	}
	@Override
	public List<CategoryWithArticlesDTO> getCategoriesWithArticles() {
		return categoryrepo.findAll().stream()
				.map(category-> {
					CategoryIdRequest request= new CategoryIdRequest();
					request.setCategoryId(category.getId().toString());
					 List<ArticleDTO> articles = categoryclient.getArticleByCategoryId(request);
					return new CategoryWithArticlesDTO(
						category.getId(),
						category.getTitle(),
						
						articles
					);
							
				})
				.collect(Collectors.toList());
		
	}

	
	@Override
	public List<CategoryWithTopicDTO> getCategorieswithTopics() {
		return categoryrepo.findAll().stream()
				.map(category->{
					CategoryIdRequest request=new CategoryIdRequest();
					request.setCategoryId(category.getId().toString());
					List<TopicDTO> topics= notesinterface.getTopicByCategoryId(request);
					return new CategoryWithTopicDTO(
							category.getId(),
							category.getTitle(),
							topics
							);
				})
				.collect(Collectors.toList());
			}
	@Override
	public CategoryResponse addCategory(CategoryTitleRequest request) {
		Category newCategory = new Category();
	    newCategory.setTitle(request.getTitle());

	    Category savedCategory = categoryrepo.save(newCategory);

	    CategoryResponse response = new CategoryResponse();
	    response.setId(savedCategory.getId());
	    response.setTitle(savedCategory.getTitle());

	    return response;
		
	}
	
	
	
	

}
