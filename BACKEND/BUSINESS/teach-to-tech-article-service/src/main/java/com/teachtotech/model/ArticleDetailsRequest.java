package com.teachtotech.model;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleDetailsRequest implements Serializable{
    private static final long serialVersionUID = 1L;
    private String title;
    private String content;
    private String categoryId;
    private String userId;
    private String status;
}
