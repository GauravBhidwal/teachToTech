package com.teachtotech.request;

import java.io.Serializable;

import com.teachtotech.model.UserCredentials;

import lombok.Data;

@Data
public class CategoryDeleteRequest implements Serializable{
    private static final long serialVersionUID = 1L;
	private String categoryId;
    private UserCredentials userCredentials;
}
