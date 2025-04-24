package com.teachtotech.request;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.teachtotech.model.UserCredentials;

import lombok.Data;
@Data
public class CoursesRequest implements Serializable{
	private static final long serialVersionUID = 1L;
	private CrCoursesDetailsRequest coursesList;
	private UserCredentials userCredentials;
	private MultipartFile courseImage;
	
	
}