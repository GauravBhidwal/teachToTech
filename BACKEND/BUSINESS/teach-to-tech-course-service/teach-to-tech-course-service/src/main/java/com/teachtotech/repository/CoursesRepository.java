package com.teachtotech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.teachtotech.model.CourseStatus;
import com.teachtotech.model.CrCoursesDetails;

@Repository
public interface CoursesRepository extends JpaRepository<CrCoursesDetails, Long> {
	boolean existsByCategoryId(String categoryId);

	void deleteByCategoryId(String categoryId);

	List<CrCoursesDetails> findByStatus(CourseStatus status);
	
	List<CrCoursesDetails> findByCategoryId(String categoryName);

	List<CrCoursesDetails> findByCourseName(String courseName); 
	
	@Query(value = "SELECT * FROM cr_courses_dtl WHERE rec_status<>'X' ", nativeQuery = true)
	public List<CrCoursesDetails> getAllCoursesData();

	@Modifying
	@Query(value = "UPDATE cr_courses_dtl SET rec_status='X' WHERE category_id=:categoryId", nativeQuery = true)
	void deleteCoursesData(@Param("categoryId") String categoryId);
}
