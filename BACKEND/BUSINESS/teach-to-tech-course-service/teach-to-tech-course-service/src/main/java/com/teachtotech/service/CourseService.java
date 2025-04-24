package com.teachtotech.service;

import com.teachtotech.model.CourseStatus;
import com.teachtotech.request.CategoryDeleteRequest;
import com.teachtotech.request.CourseIdRequest;
import com.teachtotech.request.CoursesRequest;
import com.teachtotech.request.UpdateCoursesRequest;
import com.teachtotech.response.CoursesResponse;

public interface CourseService {

	CoursesResponse getAllCourses();

	CoursesResponse createCourses(CoursesRequest crCoursesDetails);

	CoursesResponse deleteCourseById(CourseIdRequest request);

	CoursesResponse findByStatus(CourseStatus approved);

	CoursesResponse findByCourseName(String courseName);

	CoursesResponse updateCourses(UpdateCoursesRequest request);

	CoursesResponse findCourseByCategoryId(CategoryDeleteRequest request);

	CoursesResponse getCourseById(CourseIdRequest request);

}
