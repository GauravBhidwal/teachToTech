package com.teachtotech.model;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class TrainerDetailsRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long trainerId;
    private String trainerName;
    private String trainerDescription;
    private String trainerQualification;
    private String linkedin;
	private String userId;
}
