//package com.lcwd.gateway.config;
//
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class Config {
//
//	@Bean
//	RouteLocator routes(RouteLocatorBuilder builder) {
//		return builder.routes()
//				.route("TEACH-TO-TECH-COURSE-SERVICE",
//						route -> route.path("/teach-to-tech-course-service/**").uri("lb://TEACH-TO-TECH-COURSE-SERVICE"))
//				.route("TEACH-TO-TECH-ARTICLE-SERVICE",
//						route -> route.path("/TEACH-TO-TECH-ARTICLE-SERVICE/**").uri("lb://TEACH-TO-TECH-ARTICLE-SERVICE"))
//				.route("TEACH-TO-TECH-NOTES-SERVICE",
//						route -> route.path("/teach-to-tech-notes-service/**").uri("lb://TEACH-TO-TECH-NOTES-SERVICE"))
//				.route("TEACH-TO-TECH-TRAINER-SERVICE",
//						route -> route.path("/teach-to-tech-trainer-service/**").uri("lb://TEACH-TO-TECH-TRAINER-SERVICE"))
//				.route("TEACH-TO-TECH-TRAINER-SERVICE",
//						route -> route.path("/TEACH-TO-TECH-CATEGORY-SERVICE/**").uri("lb://TEACH-TO-TECH-CATEGORY-SERVICE"))
//				
//				.build();
//	}
//}
