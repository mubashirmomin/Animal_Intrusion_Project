package com.kaif.animalintrusionbackend.service;

import com.kaif.animalintrusionbackend.dto.AIDetectionResponse;
import com.kaif.animalintrusionbackend.entity.Detection;

import java.util.List;

public interface DetectionService {

    AIDetectionResponse processDetection(String imagePath);

    List<Detection> getAllDetections();

}