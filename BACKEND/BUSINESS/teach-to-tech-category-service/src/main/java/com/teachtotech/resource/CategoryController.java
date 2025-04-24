package com.teachtotech.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.teachtotech.model.Category;
import com.teachtotech.model.CategoryWithTopicDTO;
import com.teachtotech.request.CategoryTitleRequest;
import com.teachtotech.response.CategoryResponse;
import com.teachtotech.response.CategoryWithArticlesDTO;
import com.teachtotech.service.CategoryService;

@Controller
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryservice;
	
	@PostMapping("/getallcategories")
	public ResponseEntity<List<CategoryResponse>> getAllCategories(){
		return ResponseEntity.ok(categoryservice.getAllCategories());
	}

	@PostMapping("/with-articles")
	public ResponseEntity<List<CategoryWithArticlesDTO>> getCategoriesWithArticles() {
		return ResponseEntity.ok(categoryservice.getCategoriesWithArticles());
	}
	
	@PostMapping("/withTopics")
	public ResponseEntity<List<CategoryWithTopicDTO>> getCategoriesWithTopics(){
		return ResponseEntity.ok(categoryservice.getCategorieswithTopics());
	}
	
	@PostMapping("/addcategory")
	public ResponseEntity<CategoryResponse> addCategory(@RequestBody CategoryTitleRequest request){
		return ResponseEntity.ok(categoryservice.addCategory(request));
	}
	
}
