package com.teachtotech.service.serviceImpl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teachtotech.model.TrainerDetails;
import com.teachtotech.model.TrainerDetailsRequest;
import com.teachtotech.repository.TrainerRepository;
import com.teachtotech.request.TrainerIdRequest;
import com.teachtotech.request.TrainerRequest;
import com.teachtotech.response.TrainerResponse;
import com.teachtotech.response.TrainerResponseList;
import com.teachtotech.service.TrainerService;

@Service
public class TrainerServiceImpl implements TrainerService {
    private static final Logger logger = LoggerFactory.getLogger(TrainerServiceImpl.class);

	@Autowired
	private TrainerRepository trainerRepository;
	
	@Autowired
	private FileUploadUtil fileUploadUtil;

	@Override
	public TrainerResponseList getAllTrainers() {
		

		List<TrainerDetails> trainerList = trainerRepository.findAllByRecStatus("A");
		

		TrainerResponseList response = new TrainerResponseList();
		response.setTrainerList(trainerList);
		response.setMessage("Trainers fetched successfully");
		response.setStatus("SUCCESS");

		return response;
	}

	@Override
	public TrainerResponse createTrainers(TrainerRequest trainerRequest) {
		 TrainerDetailsRequest trainerDetails = trainerRequest.getTrainersList();
		    TrainerResponse response = new TrainerResponse();

		    if (trainerDetails != null) {
		        TrainerDetails trainerDetailsObj = new TrainerDetails();
		        trainerDetailsObj.setTrainerId(trainerDetails.getTrainerId());
		        trainerDetailsObj.setUserId(trainerDetails.getUserId());
		        trainerDetailsObj.setTrainerName(trainerDetails.getTrainerName());
		        trainerDetailsObj.setLinkedin(trainerDetails.getLinkedin());
		        trainerDetailsObj.setTrainerDescription(trainerDetails.getTrainerDescription());
		        trainerDetailsObj.setTrainerQualification(trainerDetails.getTrainerQualification());
		        try {
		            if (trainerRequest.getTrainerImage() != null && !trainerRequest.getTrainerImage().isEmpty()) {
		                String uploadedFileName = fileUploadUtil.uploadImage(trainerRequest.getTrainerImage());
		                trainerDetailsObj.setTrainerImage(uploadedFileName);
		            }
		        } catch (IOException e) {
		            throw new RuntimeException("Image upload failed: " + e.getMessage());
		        }

		        
		        TrainerDetails savedTrainer = trainerRepository.save(trainerDetailsObj);
		        
		       response.setMessage("SUCCESSFULLY ssaved the trainer");
		       response.setStatus("Success");
		       response.setTrainerList(savedTrainer);
		    }

		    return response;
		}

	public TrainerResponse deleteTrainer(TrainerIdRequest trainerIdrequest) {
		Optional<TrainerDetails> opttrainer=trainerRepository.findById(trainerIdrequest.getTrainerId());
		if(!opttrainer.isPresent()) {
			return new TrainerResponse("No trainer found with that id","SUCCESS",null);
		}
		TrainerDetails trainer=opttrainer.get();
		trainer.setRecStatus("X");
		trainerRepository.save(trainer);
		TrainerResponse response= new TrainerResponse();
		response.setMessage("Trainer delete successfully");
		response.setStatus("SUCCESS");
		return response;
	}

	public TrainerResponse editTrainer(TrainerDetailsRequest request) {
		Optional<TrainerDetails> opttrainer = trainerRepository.findById(request.getTrainerId());
		if(!opttrainer.isPresent()) {
			return new TrainerResponse("No trainer found with that id","SUCCESS",null);
		}
		TrainerDetails trainer= opttrainer.get();
		trainer.setTrainerDescription(request.getTrainerDescription());
		trainer.setTrainerName(request.getTrainerName());
		trainer.setTrainerQualification(request.getTrainerQualification());
		trainer.setLinkedin(request.getLinkedin());
		trainerRepository.save(trainer);
		TrainerResponse response= new TrainerResponse();
		response.setMessage("Trainer delete successfully");
		response.setStatus("SUCCESS");
		response.setTrainerList(trainer);
		
		return response;
		
	}
}
