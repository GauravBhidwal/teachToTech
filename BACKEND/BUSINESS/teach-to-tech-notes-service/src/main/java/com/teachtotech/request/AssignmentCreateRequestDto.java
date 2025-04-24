package com.teachtotech.request;

import java.util.List;

import org.antlr.v4.runtime.misc.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentCreateRequestDto {

	private String topicId;
	private String qa;
	private String userId;
}
