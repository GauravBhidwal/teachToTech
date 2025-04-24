package com.teachtotech.service;

import com.teachtotech.request.TrainerRequest;
import com.teachtotech.response.TrainerResponse;
import com.teachtotech.response.TrainerResponseList;

public interface TrainerService {
    
    TrainerResponseList getAllTrainers();

	TrainerResponse createTrainers(TrainerRequest crCoursesDetails);

	// TrainerResponse findByCategoryName(String categoryName);

}
