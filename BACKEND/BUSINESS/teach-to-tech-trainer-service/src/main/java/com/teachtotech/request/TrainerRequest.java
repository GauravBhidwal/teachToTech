package com.teachtotech.request;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.teachtotech.model.TrainerDetailsRequest;
import com.teachtotech.model.UserCredentials;

import lombok.Data;
@Data
public class TrainerRequest implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private TrainerDetailsRequest trainersList;
	private UserCredentials userCredentials;
	private MultipartFile trainerImage; 
	
}
