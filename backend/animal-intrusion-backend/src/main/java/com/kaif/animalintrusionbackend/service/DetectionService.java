package com.kaif.animalintrusionbackend.service;

import com.kaif.animalintrusionbackend.dto.AIDetectionResponse;

public interface DetectionService {

    AIDetectionResponse processDetection(String imagePath);

}