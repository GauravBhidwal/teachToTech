package com.teachtotech.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ArticleRespnseDTO implements Serializable{
     private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String content;
    private String categoryId;
    private String userId;
    private String status;
    private List<CommentDTO> comment;
    private LocalDateTime date;
}
