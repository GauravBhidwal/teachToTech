package com.teachtotech.request;

import java.io.Serializable;

import lombok.Data;

@Data
public class Module implements Serializable{
	private static final long serialVersionUID = 1L;
	private String title;
    private String description;
}