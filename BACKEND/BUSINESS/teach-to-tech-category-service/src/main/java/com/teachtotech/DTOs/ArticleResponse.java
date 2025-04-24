package com.teachtotech.DTOs;

import java.util.List;

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
public class ArticleResponse {

    private String message;
    private String status;
    private List<ArticleRespnseDTO> articleList;

    public ArticleResponse(String message, String status, ArticleRespnseDTO article) {
        this.message = message;
        this.status = status;
        this.articleList = List.of(article);  
    }

    public ArticleResponse(String message, String status) {
        this.message = message;
        this.status = status;
    }

   
}