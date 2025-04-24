package com.teachtotech.service.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachtotech.model.Article;
import com.teachtotech.model.ArticleDTO;
import com.teachtotech.model.ArticleRespnseDTO;
import com.teachtotech.model.Comment;
import com.teachtotech.model.CommentDTO;
import com.teachtotech.repository.ArticleRepository;
import com.teachtotech.repository.CommentRepository;
import com.teachtotech.request.ArticleIdRequest;
import com.teachtotech.request.ArticleRequest;
import com.teachtotech.request.ArticleUpdateRequest;
import com.teachtotech.request.CategoryIdRequest;
import com.teachtotech.request.CommentCreateRequest;
import com.teachtotech.request.UpdateArticleRequest;
import com.teachtotech.response.ArticleResponse;
import com.teachtotech.service.ArticleService;

import jakarta.transaction.Transactional;

@Service
public class ArticleServiceImpl implements ArticleService {
    
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private CommentRepository commentRepo;

    @Transactional
    @Override
    public ArticleResponse createArticle(ArticleRequest articleRequest) {
        Article article = new Article();
        article.setTitle(articleRequest.getTitle());
        article.setContent(articleRequest.getContent());
        article.setCategoryId(articleRequest.getCategoryId());
        article.setUserId(articleRequest.getUserId());
    
        Article savedArticle = articleRepository.save(article);
        ArticleRespnseDTO articleDTO=mapToDTO(savedArticle);
            return new ArticleResponse("Article created successfully", "SUCCESS", articleDTO);
    }

    @Override
    public ArticleResponse getAllArticles() {
        List<Article> articles = articleRepository.findAllByRecStatus("A");
        List<ArticleRespnseDTO> articleDTOs=articles.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

         return new ArticleResponse("Articles fetched successfuly", "SUCCESS", articleDTOs);
    }

    @Override
    public ArticleResponse getArticleById(ArticleIdRequest request) {
        Optional<Article> articleoptional = articleRepository.findById(request.getId());
        if(!articleoptional.isPresent()){
            return new ArticleResponse("Article with id does not extst","NOT PRESENT");
          
        }
        Article article = articleoptional.get();
        List<CommentDTO> comments=fetchCommentsForArticle(request.getId());
        
        ArticleRespnseDTO response = mapToDTO(article);
        response.setComment(comments);
        return new ArticleResponse("Article with Id fetched successfully", "SUCCESS", response);
    }

    @Transactional
    @Override
    public ArticleResponse deleteArticle(ArticleIdRequest request) {
        Optional<Article> articleOpt = articleRepository.findById(request.getId());
        if (articleOpt.isPresent()) {
            Article article=articleOpt.get();
            article.setRecStatus("X");
            articleRepository.save(article);
            return new ArticleResponse("Article deleted successfully", "SUCCESS");
        } else {
            return new ArticleResponse("Article not found", "FAILURE");
        }
    }

   
    private ArticleRespnseDTO mapToDTO(Article article) {
        List<CommentDTO> commentDTOs = fetchCommentsForArticle(article.getId()); 
    return new ArticleRespnseDTO(
        article.getId(),
        article.getTitle(),
        article.getContent(),
        article.getCategoryId(),
        article.getUserId(),
        article.getStatus(),
        commentDTOs,article.getDate()
    );
}

   
    private List<CommentDTO> fetchCommentsForArticle(Long articleId) {
        return commentRepo.findByArticleId(articleId)
        .stream()
        .map(comment -> new CommentDTO(
            comment.getId(),
            comment.getUserId(),
            comment.getContent(),
            comment.getCreatedAt()
        ))
        .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public ArticleResponse addComment(CommentCreateRequest request) {
        Article article= articleRepository.findById(request.getArticleId())
                            .orElseThrow(()-> new RuntimeException("Article not found"));
                            Comment comment = new Comment();
                            comment.setUserId(request.getUserId());
                            comment.setContent(request.getContent());
                            comment.setArticle(article);
                            // commentRepo.save(comment);
         if (article.getComments() == null) {
        article.setComments(new ArrayList<>()); 
         }
    article.getComments().add(comment);
    articleRepository.save(article);
        return new ArticleResponse("Comment added in Article", "SUCCESS");
    }
    
    @Transactional
    @Override
    public ArticleResponse updateArticleStatus(UpdateArticleRequest request) {
        Article article = articleRepository.findById(request.getArticleId())
                .orElseThrow(() -> new RuntimeException("Article not found"));
        
        article.setStatus(request.getNewStatus());;
        articleRepository.save(article);

        return new ArticleResponse("Article status updated successfully", "SUCCESS");
    }

    @Override
    public List<ArticleDTO> getAllarticlesBycategoryId(CategoryIdRequest request) {
       return articleRepository.findAllByCategoryId(request.getCategoryId()).stream()
                .map(article-> new ArticleDTO (
                        article.getId(),
                        article.getTitle()
                ))
                .collect(Collectors.toList());
    }

	@Override
	public ArticleResponse updateArticle(ArticleUpdateRequest articleRequest) {
		Optional<Article> articleopt=articleRepository.findById(articleRequest.getArticleId());
		if(!articleopt.isPresent()) {
			throw new RuntimeException("article with id not founf");
		}
		else {
	        Article article = articleopt.get();
	        
	       
	        if(articleRequest.getTitle() != null) {
	            article.setTitle(articleRequest.getTitle());
	        }
	        if(articleRequest.getContent() != null) {
	            article.setContent(articleRequest.getContent());
	        }
	        if(articleRequest.getCategoryId() != null) {
	            article.setCategoryId(articleRequest.getCategoryId());
	        }
	        if(articleRequest.getUserId()!=null) {
	        	article.setUserId(articleRequest.getUserId());
	        }
	        
	        Article updatedArticle = articleRepository.save(article);

	        ArticleRespnseDTO articleDTO = mapToDTO(updatedArticle);
	        return new ArticleResponse("Article updated successfully", "SUCCESS", articleDTO);
	    }
	}
 

}
