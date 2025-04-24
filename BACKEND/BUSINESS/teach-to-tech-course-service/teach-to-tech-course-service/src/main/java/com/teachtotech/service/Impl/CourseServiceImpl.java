package com.teachtotech.service.Impl;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teachtotech.model.CourseStatus;
import com.teachtotech.model.CrCoursesDetails;
import com.teachtotech.repository.CoursesRepository;
import com.teachtotech.request.CategoryDeleteRequest;
import com.teachtotech.request.CourseIdRequest;
import com.teachtotech.request.CoursesRequest;
import com.teachtotech.request.CrCoursesDetailsRequest;
import com.teachtotech.request.UpdateCoursesRequest;
import com.teachtotech.response.CoursesResponse;
import com.teachtotech.service.CourseService;

import jakarta.transaction.Transactional;

@Service
public class CourseServiceImpl implements CourseService {
	private static final Logger logger = LoggerFactory.getLogger(CourseServiceImpl.class);

	@Autowired
	private CoursesRepository courseRepository;
	
	@Autowired
	private FileUploadUtil fileUploadUtil;

	@Override
	public CoursesResponse getAllCourses() {
	 logger.info("Fetching all courses from the database...");

		List<CrCoursesDetails> courseList = courseRepository.getAllCoursesData();

		CoursesResponse response = new CoursesResponse();
		response.setCoursesList(courseList);
		response.setMessage("Courses fetched successfully");
		response.setStatus("SUCCESS");

		return response;
	}
	
	@Transactional
	@Override
	public CoursesResponse createCourses(CoursesRequest coursesRequest) {
	    // Validate input
	    if (coursesRequest == null || coursesRequest.getCoursesList() == null) {
	        logger.warn("Invalid course creation request - request or course details is null");
	        return buildErrorResponse("Invalid course data provided");
	    }

	    CoursesResponse response = new CoursesResponse();
	    List<CrCoursesDetails> savedCourses = new ArrayList<>();
	    CrCoursesDetailsRequest courseDetails = coursesRequest.getCoursesList();

	    try {
	        // Convert and save course
	        CrCoursesDetails crCoursesDetails = convertToEntity(courseDetails);
	        
	        // Handle image upload if present (now from the root request, not nested)
	        if (coursesRequest.getCourseImage() != null && !coursesRequest.getCourseImage().isEmpty()) {
	            String uploadedFilePath = fileUploadUtil.uploadImage(coursesRequest.getCourseImage());
	            crCoursesDetails.setImage(uploadedFilePath);
	        }

	        CrCoursesDetails savedCourse = courseRepository.save(crCoursesDetails);
	        savedCourses.add(savedCourse);

	        // Prepare response
	        response.setCoursesList(Collections.singletonList(convertToDto(savedCourse)));
	        response.setMessage("Course created successfully");
	        response.setStatus("SUCCESS");
	        logger.info("Course created successfully with ID: {}", savedCourse.getId());

	    } catch (IOException e) {
	        logger.error("Image upload failed: {}", e.getMessage());
	        throw new RuntimeException("Failed to upload course image", e);
	    } catch (Exception e) {
	        logger.error("Course creation failed: {}", e.getMessage(), e);
	        throw new RuntimeException("Failed to create course", e);
	    }

	    return response;
	}

	// Helper method to convert request to entity
	private CrCoursesDetails convertToEntity(CrCoursesDetailsRequest request) {
	    CrCoursesDetails entity = new CrCoursesDetails();
	    
	    // Set basic fields
	    entity.setUserId(request.getUserId());
	    entity.setDuration(request.getDuration());
	    entity.setPrice(request.getPrice());
	    entity.setCategoryId(request.getCategoryId());
	    entity.setStatus(request.getStatus());
	    entity.setCourseName(request.getCourseName());
	    entity.setDescription(request.getDescription());
	    entity.setRejectionComment(request.getRejectionComment());
	    entity.setVideoUrl(request.getVideoUrl());
	    entity.setSchedule(request.getSchedule());
	    entity.setTimings(request.getTimings());
	    entity.setRecStatus(request.getRecStatus());
	    
	   
	    try {
	        if (request.getModules() != null) {
	            entity.setModules(JavaObjAsJsonString(request.getModules()));
	        }
	    } catch (Exception e) {
	        logger.error("Failed to serialize modules to JSON", e);
	        throw new RuntimeException("Invalid modules data", e);
	    }
	    
	    return entity;
	}

	// Helper method to convert entity to DTO
	private CrCoursesDetails convertToDto(CrCoursesDetails entity) {
	    CrCoursesDetails dto = new CrCoursesDetails();
	    // Copy all necessary fields
	    dto.setId(entity.getId());
	    dto.setCourseName(entity.getCourseName());
	    dto.setDuration(entity.getDuration());
	    dto.setPrice(entity.getPrice());
	    dto.setCategoryId(entity.getCategoryId());
	    dto.setImage(entity.getImage());
	    dto.setModules(entity.getModules());
	    dto.setStatus(entity.getStatus());
	    dto.setDescription(entity.getDescription());
	    dto.setRejectionComment(entity.getRejectionComment());
	    dto.setUserId(entity.getUserId());
	    dto.setCreatedAt(entity.getCreatedAt());
	    dto.setVideoUrl(entity.getVideoUrl());
	    dto.setSchedule(entity.getSchedule());
	    dto.setTimings(entity.getTimings());
	    dto.setRecStatus(entity.getRecStatus());
	    return dto;
	}

	private CoursesResponse buildErrorResponse(String message) {
	    CoursesResponse response = new CoursesResponse();
	    response.setStatus("FAILURE");
	    response.setMessage(message);
	    return response;
	}
//	@Transactional
//	@Override
//	public CoursesResponse createCourses(CoursesRequest coursesRequest) {
//		CrCoursesDetailsRequest courseDetails= coursesRequest.getCoursesList();
//		CoursesResponse response = new CoursesResponse();
//
//			
//				if (courseDetails!= null) {
//					CrCoursesDetails crCoursesDetails = new CrCoursesDetails();
//					crCoursesDetails.setUserId(courseDetails.getUserId());
//					crCoursesDetails.setDuration(courseDetails.getDuration());
//					crCoursesDetails.setPrice(courseDetails.getPrice());
//					crCoursesDetails.setCategoryId(courseDetails.getCategoryId());
//					try {
//						String modulesJson = JavaObjAsJsonString(courseDetails.getModules());
//						crCoursesDetails.setModules(modulesJson);
//					} catch (Exception e) {
//						logger.error("Error converting modules to JSON: {}", e.getMessage(), e);
//					}
//
//					crCoursesDetails.setStatus(courseDetails.getStatus());
//					crCoursesDetails.setCourseName(courseDetails.getCourseName());
//					crCoursesDetails.setDescription(courseDetails.getDescription());
//					crCoursesDetails.setRejectionComment(courseDetails.getRejectionComment());
//
//		
//					 try {
//				            if (courseDetails.getCourseImage()!=null && !courseDetails.getCourseImage().isEmpty()) {
//				                String uploadedFilePath = fileUploadUtil.uploadImage(courseDetails.getCourseImage());
//				                crCoursesDetails.setImage(uploadedFilePath);
//				            }
//				        } catch (IOException e) {
//				            throw new RuntimeException("Image upload failed: " + e.getMessage());
//				        }
//					crCoursesDetails.setVideoUrl(courseDetails.getVideoUrl());
//					crCoursesDetails.setSchedule(courseDetails.getSchedule());
//					crCoursesDetails.setTimings(courseDetails.getTimings());
//					crCoursesDetails.setRecStatus(courseDetails.getRecStatus());
//
//					CrCoursesDetails savedCourse = courseRepository.save(crCoursesDetails);
//					savedCourses.add(savedCourse);
//				}
//			
//
//			List<CrCoursesDetails> courseDataList = savedCourses.stream().map(course -> {
//				CrCoursesDetails courseData = new CrCoursesDetails();
//				courseData.setCourseName(course.getCourseName());
//				courseData.setDuration(course.getDuration());
//				courseData.setPrice(course.getPrice());
//				courseData.setCategoryId(course.getCategoryId());
//				courseData.setImage(course.getImage());
//				courseData.setModules(course.getModules());
//				courseData.setStatus(course.getStatus());
//				courseData.setDescription(course.getDescription());
//				courseData.setRejectionComment(course.getRejectionComment());
//				courseData.setUserId(course.getUserId());
//				courseData.setCreatedAt(Timestamp.from(Instant.now()));
//				courseData.setVideoUrl(course.getVideoUrl());
//				courseData.setSchedule(course.getSchedule());
//				courseData.setTimings(course.getTimings());
//				courseData.setRecStatus(course.getRecStatus());
//
//				return courseData;
//			}).collect(Collectors.toList());
//
//			response.setCoursesList(courseDataList);
//			response.setMessage("Courses added successfully");
//			response.setStatus("SUCCESS");
//
//			logger.info("{} courses added successfully", savedCourses.size());
//
//			return response;
//		} else {
//			logger.warn("No courses to add. The provided list is empty or null.");
//			response.setMessage("No courses to add");
//			response.setStatus("FAILURE");
//			return response;
//		}
//	}


	@Override
	public CoursesResponse findByStatus(CourseStatus status) {
		List<CrCoursesDetails> courses = courseRepository.findByStatus(status);
		CoursesResponse response = new CoursesResponse();
		if (courses.isEmpty()) {
			return response;
		}
		response.setCoursesList(courses);

		return response;
	}

	@Override
	public CoursesResponse findByCourseName(String courseName) {
	    CoursesResponse response = new CoursesResponse();
	    
	    List<CrCoursesDetails> courseData = courseRepository.findByCourseName(courseName);
	    if (courseData != null) {
	        response.setCoursesList(courseData);
	    }
	    
	    return response;
	}


	public static String JavaObjAsJsonString(Object ob) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(ob);
		return json;
	}

	@Override
	public CoursesResponse updateCourses(UpdateCoursesRequest request) {
		CrCoursesDetails course = new CrCoursesDetails();
		CoursesResponse response = new CoursesResponse();
		int isError=0;
		String courseId=request.getUpdateCourseDetails().getId().toString();
		if (isError == 0 && courseId.isEmpty())  {
				isError = 1;
				response.setMessage("Course id is blank");
				response.setStatus("FAIL");
				return response;
		
		}
		if(isError==0) {
			course.setCategoryId(request.getUpdateCourseDetails().getCategoryId());
			course.setCourseName(request.getUpdateCourseDetails().getCourseName());
			course.setDescription(request.getUpdateCourseDetails().getDescription());
			course.setDuration(request.getUpdateCourseDetails().getDuration());
			 try {
		            if (request.getCourseImage()!= null && !request.getCourseImage().isEmpty()) {
		                String uploadedFileName = fileUploadUtil.uploadImage(request.getCourseImage());
		                course.setImage(uploadedFileName);
		            }
		        } catch (IOException e) {
		            throw new RuntimeException("Image upload failed: " + e.getMessage());
		        }
			//course.setModules(request.getUpdateCourseDetails().getModules());
			try {
				String modulesJson = JavaObjAsJsonString(request.getUpdateCourseDetails().getModules());
				course.setModules(modulesJson);
			} catch (Exception e) {
				logger.error("Error converting modules to JSON: {}", e.getMessage(), e);
			}
			course.setPrice(request.getUpdateCourseDetails().getPrice());
			course.setRejectionComment(request.getUpdateCourseDetails().getRejectionComment());
			course.setSchedule(request.getUpdateCourseDetails().getSchedule());
			course.setStatus(request.getUpdateCourseDetails().getStatus());
			course.setTimings(request.getUpdateCourseDetails().getTimings());
		
			course.setUserId(request.getUpdateCourseDetails().getUserId());
			course.setVideoUrl(request.getUpdateCourseDetails().getVideoUrl());
			courseRepository.save(course);
			response.setMessage("Successful");
			response.setStatus("SUCCESS");
			response.setCoursesList(Collections.singletonList(course));

			
			
		}
		
		return response;
			
	}

	@Override
	public CoursesResponse findCourseByCategoryId(CategoryDeleteRequest request) {
		 List<CrCoursesDetails> courses = courseRepository.findByCategoryId(request.getCategoryId());
			    
			    CoursesResponse response = new CoursesResponse();
			    response.setStatus("SUCCESS");
			    response.setMessage("Courses fetched by category Id");
			    response.setCoursesList(courses);

			    return response;
	}

	@Override
	public CoursesResponse getCourseById(CourseIdRequest request) {
		 Optional<CrCoursesDetails> courseopt = courseRepository.findById(request.getCourseId());
		 if (courseopt.isPresent()) {
		        CrCoursesDetails course = courseopt.get();
		        CoursesResponse response = new CoursesResponse(
		            "Successful",
		            "Course with ID found",
		            Collections.singletonList(course)
		        );
		        return response;
		    } else {
		        return new CoursesResponse(
		            "Failed",
		            "No course found with the given ID",
		            Collections.emptyList()
		        );
		    }
	}

	@Override
	public CoursesResponse deleteCourseById(CourseIdRequest request) {
		Optional<CrCoursesDetails> optcourse = courseRepository.findById(request.getCourseId());
		if(!optcourse.isPresent()) {
			return new CoursesResponse("Course does not exist with that Id","SUCESSFUL",null);
		}
		
		CrCoursesDetails course=optcourse.get();
		course.setRecStatus("X");
		CoursesResponse response =new CoursesResponse();
		response.setMessage("Course deleted successfully");
		response.setStatus("SUCCESS");
		return response;
	}

	

}
