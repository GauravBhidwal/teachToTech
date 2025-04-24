package com.teachtotech.DTOs;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
