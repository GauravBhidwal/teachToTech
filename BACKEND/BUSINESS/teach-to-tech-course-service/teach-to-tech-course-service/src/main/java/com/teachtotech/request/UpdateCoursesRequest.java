package com.teachtotech.request;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

import com.teachtotech.model.UserCredentials;

import lombok.Data;

@Data
public class UpdateCoursesRequest implements Serializable {
	private static final long serialVersionUID = 1L;
	private CrCoursesDetailsRequest updateCourseDetails;
	private UserCredentials userCredentials;
	private MultipartFile trainerImage;
	private MultipartFile courseImage;
}
