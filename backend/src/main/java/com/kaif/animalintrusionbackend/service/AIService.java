package com.kaif.animalintrusionbackend.service;

import com.kaif.animalintrusionbackend.dto.AIDetectionResponse;

public interface AIService {

    AIDetectionResponse detect(String imagePath);

}