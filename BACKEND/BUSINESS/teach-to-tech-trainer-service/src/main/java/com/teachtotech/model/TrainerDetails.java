package com.teachtotech.model;


import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrainerDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerId;

    @NotNull
    private String trainerName;

    @NotNull
    private String trainerDescription;

    @NotNull
    private String trainerImage; 

    @NotNull
    private String trainerQualification;

    @NotNull
    private String linkedin; // LinkedIn profile URL of the trainer
 
    @Column(name = "user_id")
	private String userId;

    @Column(name = "created_at", updatable = false)
	@CreationTimestamp
	private Timestamp createdAt;
 
    @Column(name="rec_status")
	private String recStatus="A";

}

