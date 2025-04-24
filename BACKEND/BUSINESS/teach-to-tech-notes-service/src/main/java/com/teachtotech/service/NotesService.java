package com.teachtotech.service;

import com.teachtotech.model.NotesDetailRequest;
import com.teachtotech.model.NotesDetails;
import com.teachtotech.model.NotesUpdateDto;
import com.teachtotech.model.TopicIdRequest;
import com.teachtotech.request.NotesIdRequest;
import com.teachtotech.request.NotesRequest;
import com.teachtotech.response.NotesResponse;

public interface NotesService {
   
    NotesResponse getAllNotes();

	NotesResponse createNotes(NotesRequest notesRequest);

	NotesResponse updateNote(NotesUpdateDto request);
	
	NotesResponse deleteNote(NotesIdRequest request);

	NotesDetails getNoteByTopicId(TopicIdRequest request);

}
