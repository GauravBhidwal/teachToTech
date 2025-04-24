package com.teachtotech.service;

import java.util.List;

import com.teachtotech.model.ArticleDTO;
import com.teachtotech.request.ArticleIdRequest;
import com.teachtotech.request.ArticleRequest;
import com.teachtotech.request.ArticleUpdateRequest;
import com.teachtotech.request.CategoryIdRequest;
import com.teachtotech.request.CommentCreateRequest;
import com.teachtotech.request.UpdateArticleRequest;
import com.teachtotech.response.ArticleResponse;




public interface ArticleService {
	

	ArticleResponse createArticle(ArticleRequest articleRequest);
    ArticleResponse getAllArticles();
    ArticleResponse getArticleById(ArticleIdRequest request);
    ArticleResponse deleteArticle(ArticleIdRequest request);
    ArticleResponse addComment(CommentCreateRequest request);
	ArticleResponse updateArticleStatus(UpdateArticleRequest request);
    List<ArticleDTO> getAllarticlesBycategoryId(CategoryIdRequest request);
	ArticleResponse updateArticle(ArticleUpdateRequest articleRequest);
}
