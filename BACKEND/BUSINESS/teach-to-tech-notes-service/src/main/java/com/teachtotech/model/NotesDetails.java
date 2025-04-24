package com.teachtotech.model;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "notes_dtl", indexes = {
        @Index(name = "idx_note_id", columnList = "note_id")
    })
@Getter
@Setter
public class NotesDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long noteId;

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = true)
    @JsonBackReference
    private Topic topic; // Reference to Topic

    @Column(name = "content",columnDefinition = "TEXT")
    private String content;

    @Column(name = "user_id")
	private String userId;
	
	@Column(name = "created_at", updatable = false)
	@CreationTimestamp
	private Timestamp createdAt;
	
	 @Column(name="rec_status")
	private String recStatus="A";

	

}
