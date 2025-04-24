package com.teachtotech.response;

import java.util.List;

import com.teachtotech.model.NotesDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotesResponse {
    private String message;
    private String status;
    private List<NotesDetails> notesList;
}
