package com.teachtotech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teachtotech.model.TrainerDetails;

@Repository
public interface TrainerRepository extends JpaRepository<TrainerDetails,Long> {
	List<TrainerDetails> findAllByRecStatus(String string);
}
