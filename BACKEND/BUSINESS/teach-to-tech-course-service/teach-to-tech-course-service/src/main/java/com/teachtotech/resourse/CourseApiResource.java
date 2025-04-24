package com.teachtotech.resourse; // Corrected package name

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.teachtotech.model.CourseStatus;
import com.teachtotech.model.UserCredentials;
import com.teachtotech.request.CategoryDeleteRequest;
import com.teachtotech.request.CourseIdRequest;
import com.teachtotech.request.CourseNameRequest;
import com.teachtotech.request.CoursesRequest;
import com.teachtotech.request.CrCoursesDetailsRequest;
import com.teachtotech.request.UpdateCoursesRequest;
import com.teachtotech.response.CoursesResponse;
import com.teachtotech.service.CourseService;


@RestController
@RequestMapping("/courses")
public class CourseApiResource {
    
    private static final Logger logger = LoggerFactory.getLogger(CourseApiResource.class);

    @Autowired
    private CourseService courseService;

    @PostMapping("/getAllCourses") 
    public CoursesResponse getAllCourses() {
        logger.info("Received request to fetch all courses.");
        return courseService.getAllCourses();
    }
    
    @PostMapping(path = "/createCourses", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CoursesResponse> createCourses(
        @RequestPart("coursesList") String coursesListStr,
        @RequestPart("userCredentials") String userCredentialsStr,
        @RequestPart(value = "courseImage", required = false) MultipartFile courseImage) {
        
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        
        try {
            // Parse JSON strings to objects
            CrCoursesDetailsRequest coursesList = objectMapper.readValue(coursesListStr, CrCoursesDetailsRequest.class);
            UserCredentials userCredentials = objectMapper.readValue(userCredentialsStr, UserCredentials.class);
            
            // Build request object
            CoursesRequest request = new CoursesRequest();
            request.setCoursesList(coursesList);
            request.setUserCredentials(userCredentials);
            request.setCourseImage(courseImage);
            
            // Process request
            CoursesResponse response = courseService.createCourses(request);
            return ResponseEntity.ok(response);
            
        } catch (JsonProcessingException e) {
            logger.error("JSON parsing error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new CoursesResponse("FAILURE", "Invalid JSON format",null));
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(new CoursesResponse("FAILURE", "Server error",null));
        }
    }
    
//    @PostMapping(path="/createCourses", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<CoursesResponse> createCourses( @RequestPart("coursesList") String coursesListStr,
//    	    @RequestPart("userCredentials") String userCredentialsStr,
//    	    @RequestPart("courseImage") MultipartFile courseImage) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            CrCoursesDetailsRequest coursesList = objectMapper.readValue(coursesListStr, CrCoursesDetailsRequest.class);
//            UserCredentials userCredentials = objectMapper.readValue(userCredentialsStr, UserCredentials.class);
//            
//            // Create your request object
//            CoursesRequest request = new CoursesRequest();
//            request.setCoursesList(coursesList);
//            request.setUserCredentials(userCredentials);
//            request.setCourseImage(courseImage);
//            
//            // Process the request
//            CoursesResponse response = courseService.createCourses(request);
//            return new ResponseEntity<>(response, HttpStatus.CREATED);
//            
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException("Invalid JSON format", e);
//        }
//    }
    
//    @PostMapping(path = "/createCourses", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<CoursesResponse> createCourses(
//        @RequestPart(value="requestData",required=false) String requestDataJson,
//        @RequestPart("courseImages") MultipartFile courseImages) throws JsonProcessingException {
//        
//        logger.info("Received request to create Courses as List.");
//        
//        // Parse JSON to object
//        ObjectMapper objectMapper = new ObjectMapper();
//        CoursesRequest request = objectMapper.readValue(requestDataJson, CoursesRequest.class);
//        
//        CoursesResponse response = courseService.createCourses(request);
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }
    
    @PostMapping("/deleteCourseById")
    public ResponseEntity<CoursesResponse> deleteCourse(@RequestBody CourseIdRequest request) {
        CoursesResponse response = courseService.deleteCourseById(request);
        if ("SUCCESS".equals(response.getStatus())) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/getPendingCourse")
    public CoursesResponse getPendingCourse() {
        return courseService.findByStatus(CourseStatus.PENDING);
     }

    @PostMapping("/getActiveCourses")
    public CoursesResponse getApprovedCourses() {
        return courseService.findByStatus(CourseStatus.ACTIVE);
    }
    
    @PostMapping("/getInActiveCourses")
    public CoursesResponse getInActiveCourses() {
        return courseService.findByStatus(CourseStatus.INACTIVE);
    }
    
    @PostMapping("/getRejectedCourses")
    public CoursesResponse getRejectedCourses() {
        return courseService.findByStatus(CourseStatus.REJECTED);
    }

    @PostMapping("/findByCourseName")
    public CoursesResponse findByCourseName(@RequestBody CourseNameRequest request) {
        return courseService.findByCourseName(request.getCourseName());
    }
    
    @PostMapping("/editCoursesData")
    public CoursesResponse editCoursesById(@RequestBody UpdateCoursesRequest request) {
        return courseService.updateCourses(request);
    }
    
    @PostMapping("/getcourseByCategoryId")
    public CoursesResponse getCoursesBycategoryId(@RequestBody CategoryDeleteRequest request) {
        return courseService.findCourseByCategoryId(request);
    }
    
    @PostMapping("/getCourseById")
    public CoursesResponse getCoursesOfId(@RequestBody CourseIdRequest request) {
    	return courseService.getCourseById(request);
    }
}
