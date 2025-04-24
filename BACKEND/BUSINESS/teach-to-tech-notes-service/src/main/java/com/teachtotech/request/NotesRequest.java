package com.teachtotech.request;

import java.util.List;

import com.teachtotech.model.NotesDetailRequest;
import com.teachtotech.model.UserCredentials;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotesRequest {
	private List<NotesDetailRequest> notesList;
	private UserCredentials userCredentials;
}
