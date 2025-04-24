package com.teachtotech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class TeachToTechCourseServiceApplication extends SpringBootServletInitializer{
	
	@Override
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){
	    return builder.sources(TeachToTechCourseServiceApplication.class);
	  }

	public static void main(String[] args) {
		SpringApplication.run(TeachToTechCourseServiceApplication.class, args);
	}

}
