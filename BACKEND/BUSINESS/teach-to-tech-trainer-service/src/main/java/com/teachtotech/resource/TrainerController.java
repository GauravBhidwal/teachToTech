package com.teachtotech.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teachtotech.model.TrainerDetailsRequest;
import com.teachtotech.request.TrainerIdRequest;
import com.teachtotech.request.TrainerRequest;
import com.teachtotech.response.TrainerResponse;
import com.teachtotech.response.TrainerResponseList;
import com.teachtotech.service.serviceImpl.TrainerServiceImpl;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/trainer")
public class TrainerController {
    
    @Autowired
    private TrainerServiceImpl trainerServiceImpl;

    @PostMapping("/getAlltrainers") 
    public TrainerResponseList getAllCourses() {
    	
        return trainerServiceImpl.getAllTrainers();
    }
     
    @PostMapping(value="/createTrainers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createCourses(@ModelAttribute TrainerRequest trainerRequest) {  
         TrainerResponse response = trainerServiceImpl.createTrainers(trainerRequest);   
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PostMapping("/deleteTrainer")
    public ResponseEntity<TrainerResponse> deleteTrainerBytrainerId(@RequestBody TrainerIdRequest trainerIdrequest){
    	TrainerResponse response=trainerServiceImpl.deleteTrainer(trainerIdrequest);
    	return new  ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PostMapping("/EditTrainer")
    public ResponseEntity<TrainerResponse> editTrainer(@RequestBody TrainerDetailsRequest request ){
    	TrainerResponse response = trainerServiceImpl.editTrainer(request);
    	return new ResponseEntity<TrainerResponse>(response,HttpStatus.OK);
    }
    
    
    
    
}
