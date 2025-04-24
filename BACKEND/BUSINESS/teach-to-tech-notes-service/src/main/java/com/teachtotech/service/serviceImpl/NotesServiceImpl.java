
package com.teachtotech.service.serviceImpl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachtotech.model.NotesDetailRequest;
import com.teachtotech.model.NotesDetails;
import com.teachtotech.model.NotesUpdateDto;
import com.teachtotech.model.Topic;
import com.teachtotech.model.TopicIdRequest;
import com.teachtotech.repository.NotesRepository;
import com.teachtotech.repository.TopicRepository;
import com.teachtotech.request.NotesIdRequest;
import com.teachtotech.request.NotesRequest;
import com.teachtotech.response.NotesResponse;
import com.teachtotech.service.NotesService;

@Service
public class NotesServiceImpl implements NotesService {
    private static final Logger logger = LoggerFactory.getLogger(NotesServiceImpl.class);

    @Autowired
	private NotesRepository notesRepository;
    
    @Autowired
    private TopicRepository topicRepository;

	@Override
	public NotesResponse getAllNotes() {
		logger.info("Fetching all notes from the database...");

		List<NotesDetails> notesList = notesRepository.findAllByRecStatus("A");
		logger.info("Fetched {} notes successfully", notesList.size());

		NotesResponse response = new NotesResponse();
		response.setNotesList(notesList);
		response.setMessage("Notes fetched successfully");
		response.setStatus("SUCCESS");

		return response;
	}

	@Override
	public NotesResponse createNotes(NotesRequest notesRequest) {
	    List<NotesDetailRequest> notesList = notesRequest.getNotesList();
	    NotesResponse response = new NotesResponse();

	    if (notesList != null && !notesList.isEmpty()) {
	        List<NotesDetails> savedNotes = new ArrayList<>();

	        for (NotesDetailRequest noteReq : notesList) {
	            if (noteReq != null) {
	                NotesDetails note = new NotesDetails();
	                note.setUserId(noteReq.getUserId());

	                Long topicId = Long.parseLong(noteReq.getTopic());
	                Topic topic = topicRepository.findById(topicId)
	                        .orElseThrow(() -> new RuntimeException("Topic with ID " + topicId + " not found"));
	                note.setTopic(topic);
	                note.setContent(noteReq.getContent());

	                NotesDetails savedNote = notesRepository.save(note);
	                savedNotes.add(savedNote);
	            }
	        }

	        response.setNotesList(savedNotes); // return actual saved objects with IDs
	        response.setMessage("Notes added successfully");
	        response.setStatus("SUCCESS");
	    } else {
	        response.setMessage("No notes to save");
	        response.setStatus("FAILED");
	    }

	    return response;
	}

	
	@Override
	public NotesResponse updateNote(NotesUpdateDto request) {
	    NotesResponse response = new NotesResponse();

	    Long noteId = request.getNoteId();

	    NotesDetails existingNote = notesRepository.findById(noteId)
	        .orElse(null);

	    if (existingNote != null) {
	        existingNote.setContent(request.getContent());
	        existingNote.setUserId(request.getUserId());

	        Long topicId = Long.parseLong(request.getTopic());
	        Topic topic = topicRepository.findById(topicId)
	            .orElseThrow(() -> new RuntimeException("Topic not found with ID " + topicId));
	        existingNote.setTopic(topic);

	        NotesDetails updatedNote = notesRepository.save(existingNote);

	        response.setNotesList(List.of(updatedNote));
	        response.setMessage("Note updated successfully");
	        response.setStatus("SUCCESS");

	        logger.info("Updated note with ID {}", noteId);
	    } else {
	        response.setMessage("Note not found");
	        response.setStatus("FAILURE");
	        logger.warn("Attempted to update non-existent note with ID {}", noteId);
	    }

	    return response;
	}


	@Override
	public NotesResponse deleteNote(NotesIdRequest request) {
		 NotesResponse response = new NotesResponse();
		    Long noteId=request.getNoteId();	
		    if (notesRepository.existsById(noteId)) {
		        NotesDetails note = notesRepository.findById(noteId).get();
		        note.setRecStatus("X");
		        
		        logger.info("Deleted note with ID {}", noteId);
		        response.setMessage("Note deleted successfully");
		        response.setStatus("SUCCESS");
		    } else {
		        logger.warn("Note with ID {} not found", noteId);
		        response.setMessage("Note not found");
		        response.setStatus("FAILURE");
		    }
		    
		    return response;
	}

	@Override
	public NotesDetails getNoteByTopicId(TopicIdRequest request) {
		 Long topicId = Long.parseLong(request.getTopicId());

		    Topic topic = topicRepository.findById(topicId)
		                    .orElseThrow(() -> new RuntimeException("Topic" + topicId + " not found"));
		    NotesDetails note= notesRepository.findByTopicAndRecStatus(topic);

		    return note;
		
	}


}
