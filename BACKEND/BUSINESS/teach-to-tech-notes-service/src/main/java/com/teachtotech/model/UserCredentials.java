package com.teachtotech.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class UserCredentials implements Serializable{
	private static final long serialVersionUID = 1L;
	private String userId;
	
}

