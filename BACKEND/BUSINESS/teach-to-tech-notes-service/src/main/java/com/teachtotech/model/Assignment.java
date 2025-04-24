package com.teachtotech.model;



import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Assignment {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long AssignemntId;

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = true)
    @JsonBackReference
    private Topic topic; // Reference to Topic

    
    @Column(name = "qa",columnDefinition = "TEXT")
    private String qa;

    @Column(name = "user_id")
	private String userId;
	
	@Column(name = "created_at", updatable = false)
	@CreationTimestamp
	private Timestamp createdAt;
	
	@Column(name="rec_status")
	private String recStatus="A";
	
}
