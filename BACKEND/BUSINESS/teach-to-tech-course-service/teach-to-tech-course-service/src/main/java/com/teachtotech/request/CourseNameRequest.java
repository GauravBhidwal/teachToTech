package com.teachtotech.request;

import java.io.Serializable;

import com.teachtotech.model.UserCredentials;

import lombok.Data;

@Data
public class CourseNameRequest implements Serializable {
	private static final long serialVersionUID = 1L;
	private String courseName;
	private UserCredentials userCredentials;
}
