package com.kaif.animalintrusionbackend.service.impl;

import com.kaif.animalintrusionbackend.dto.AIDetectionResponse;
import com.kaif.animalintrusionbackend.entity.Detection;
import com.kaif.animalintrusionbackend.repo.DetectionRepository;
import com.kaif.animalintrusionbackend.service.AIService;
import com.kaif.animalintrusionbackend.service.DetectionService;
import com.kaif.animalintrusionbackend.service.TelegramService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DetectionServiceImpl implements DetectionService {

    private final AIService aiService;
    private final DetectionRepository detectionRepository;
    private final TelegramService telegramService;

    public DetectionServiceImpl(AIService aiService,
                                DetectionRepository detectionRepository,
                                TelegramService telegramService) {
        this.aiService = aiService;
        this.detectionRepository = detectionRepository;
        this.telegramService = telegramService;
    }

    @Override
    public AIDetectionResponse processDetection(String imagePath) {

        // 1. Call AI Service
        AIDetectionResponse response = aiService.detectAnimal(imagePath);

        // 2. If animal detected → Save + Alert
        if (response.isDetected()) {

            // Create entity
            Detection detection = new Detection();
            detection.setAnimalType(response.getAnimal());
            detection.setConfidence(response.getConfidence());
            detection.setImagePath(imagePath);
            detection.setDetectedAt(LocalDateTime.now());

            // Save to DB
            detectionRepository.save(detection);

            // Send Telegram alert
            telegramService.sendAlert(
                    response.getAnimal(),
                    response.getConfidence()
            );
        }

        // 3. Return response to controller
        return response;
    }


    @Override
    public List<Detection> getAllDetections() {
        return detectionRepository.findAll();
    }
}