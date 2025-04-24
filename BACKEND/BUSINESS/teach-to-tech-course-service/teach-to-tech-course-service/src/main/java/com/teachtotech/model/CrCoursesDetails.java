package com.teachtotech.model;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cr_courses_dtl", indexes = { @Index(name = "idx_category_id", columnList = "category_id"),
		@Index(name = "idx_course_name", columnList = "course_name"),
		@Index(name = "idx_created_at", columnList = "created_at") })
@Getter
@Setter
public class CrCoursesDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String duration;

	@Column(nullable = false)
	private String price;

	@Column(name = "category_id", nullable = false)
	private String categoryId;

	@Column(nullable = false)
	private String image;

	@Column(nullable = false)
	private String modules;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private CourseStatus status;

	@Column(name = "course_name", nullable = false)
	private String courseName;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;

	@Column(name = "rejection_comment")
	private String rejectionComment;

	@Column(name = "user_id")
	private String userId;

	@Column(name = "created_at", updatable = false)
	@CreationTimestamp
	private Timestamp createdAt;

	@Column(name = "trainer_id")
	private String trainerId;
	

	@Column(name = "video_url", columnDefinition = "TEXT")
	private String videoUrl;

	@Column(name = "schedule")
	private String schedule;

	@Column(name = "timings")
	private String timings;
	
	@Column(name="rec_status")
	private String recStatus;
	
}
