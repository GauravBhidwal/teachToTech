package com.teachtotech.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.teachtotech.model.ArticleDTO;
import com.teachtotech.model.CommentDTO;
import com.teachtotech.request.ArticleIdRequest;
import com.teachtotech.request.ArticleRequest;
import com.teachtotech.request.ArticleUpdateRequest;
import com.teachtotech.request.CategoryIdRequest;
import com.teachtotech.request.CommentCreateRequest;
import com.teachtotech.request.UpdateArticleRequest;
import com.teachtotech.response.ArticleResponse;
import com.teachtotech.service.ArticleService;



@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping("/createarticle")
    public ResponseEntity<ArticleResponse> createArticle(@RequestBody ArticleRequest articleRequest) {
        ArticleResponse createdArticle = articleService.createArticle(articleRequest);
        return new ResponseEntity<>(createdArticle, HttpStatus.CREATED);
    }

    
    @PostMapping("/getallarticles")
    public ResponseEntity<ArticleResponse> getAllArticles() {
        ArticleResponse articles = articleService.getAllArticles();
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }
    @PostMapping("/getarticlebyid")
    public ResponseEntity<ArticleResponse> getArticleById(@RequestBody ArticleIdRequest request) {
        ArticleResponse articleResponse = articleService.getArticleById(request);
        return new ResponseEntity<>(articleResponse, HttpStatus.OK);
    }

    @DeleteMapping("/deletearticlebyid")
    public ResponseEntity<ArticleResponse> deleteArticle(@RequestBody ArticleIdRequest request) {
        ArticleResponse response = articleService.deleteArticle(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/addcomment")
    public ResponseEntity<ArticleResponse> paddCommentToArticle(@RequestBody CommentCreateRequest request) {
        ArticleResponse response = articleService.addComment(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/updatearticlestatus")
    public ResponseEntity<ArticleResponse> updateArticlestatus(@RequestBody UpdateArticleRequest request) {
        ArticleResponse response=articleService.updateArticleStatus(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PostMapping("/getarticlebycategoryid")
	List<ArticleDTO> getArticleByCategoryId(@RequestBody CategoryIdRequest request){
        return articleService.getAllarticlesBycategoryId(request);
    }
    
    @PostMapping("/updatearticle")
    public ResponseEntity<ArticleResponse> createArticle(@RequestBody ArticleUpdateRequest articleRequest) {
        ArticleResponse createdArticle = articleService.updateArticle(articleRequest);
        return new ResponseEntity<>(createdArticle, HttpStatus.CREATED);
    }
}
