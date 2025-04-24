package com.teachtotech.model;

import java.time.LocalDateTime;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDTO {
   
    private Long id;
    private String userId;
    private String content;
    // private Long articleId; 
    private LocalDateTime createdAt;
}
