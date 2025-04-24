package com.teachtotech.response;

import java.util.List;

import com.teachtotech.model.TrainerDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TrainerResponseList {
	 private String message;
	    private String status;
	    private List<TrainerDetails> trainerList;
}
