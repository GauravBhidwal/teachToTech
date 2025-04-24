package com.teachtotech.request;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateArticleRequest {
     private Long articleId;
    private String newStatus;
}
