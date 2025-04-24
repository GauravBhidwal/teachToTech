package com.teachtotech.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teachtotech.model.NotesDetailRequest;
import com.teachtotech.model.NotesDetails;
import com.teachtotech.model.NotesUpdateDto;
import com.teachtotech.model.TopicIdRequest;
import com.teachtotech.request.NotesIdRequest;
import com.teachtotech.request.NotesRequest;
import com.teachtotech.response.NotesResponse;
import com.teachtotech.service.NotesService;


@RestController
@RequestMapping("/notes")
public class NotesController {

    private static final Logger logger = LoggerFactory.getLogger(NotesController.class);

    @Autowired
    private NotesService notesService;

    @PostMapping("/getAllNotes")
    public NotesResponse getAllNotes() {
        logger.info("Received request to fetch all courses.");
        return notesService.getAllNotes();
    }

    @PostMapping("/createNotes")
    public ResponseEntity<NotesResponse> createCourses(@RequestBody NotesRequest notesRequest) {
        logger.info("Received request to create Courses as List.");
        NotesResponse response = notesService.createNotes(notesRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PostMapping("/updatenotes")
    public ResponseEntity<NotesResponse> updateNote(@RequestBody NotesUpdateDto request) {
        NotesResponse response = notesService.updateNote(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PostMapping("/deletenotes")
    public ResponseEntity<NotesResponse> deleteNotebyid(@RequestBody NotesIdRequest request){
    	NotesResponse response=notesService.deleteNote(request);
    	return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }    
    
    @PostMapping("/getNotesByTopic")
    public ResponseEntity<NotesDetails> getNoteByTopicId(@RequestBody TopicIdRequest request){
    	NotesDetails response= notesService.getNoteByTopicId(request);
    	return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    
    
    
    
}
