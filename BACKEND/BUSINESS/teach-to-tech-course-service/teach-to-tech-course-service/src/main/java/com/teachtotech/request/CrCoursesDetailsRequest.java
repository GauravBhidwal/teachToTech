package com.teachtotech.request;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.teachtotech.model.CourseStatus;

import lombok.Data;

@Data
public class CrCoursesDetailsRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String courseName;
    private String category;
    private String description;
    private String duration;
    private List<Module> modules;
    private String videoUrl;
    private String imageurl;
    private String schedule;
    private String timings;
    private String price;
    private String trainerId;
    private String categoryId;
    private CourseStatus status;
    private String rejectionComment;
    private String userId;
    private String recStatus;
}
