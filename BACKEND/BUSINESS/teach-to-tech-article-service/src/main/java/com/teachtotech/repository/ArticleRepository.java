package com.teachtotech.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teachtotech.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article,Long>{

	List<Article> findByStatus(String status);

	List<Article> findByTitleContainingIgnoreCase(String title);

    Collection<Article> findAllByCategoryId(String categoryId);

	List<Article> findAllByRecStatus(String string);

	


}
