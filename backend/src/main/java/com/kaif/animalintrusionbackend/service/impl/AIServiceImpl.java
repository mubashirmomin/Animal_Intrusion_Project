package com.kaif.animalintrusionbackend.service.impl;

import com.kaif.animalintrusionbackend.dto.AIDetectionResponse;
import com.kaif.animalintrusionbackend.service.AIService;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AIServiceImpl implements AIService {

    private final Random random = new Random();

    private static final String[] ANIMALS = {
            "Elephant", "Leopard", "Wild Boar", "Tiger", "Deer"
    };

    @Override
    public AIDetectionResponse detectAnimal(String imagePath) {

        // 70% chance animal detected
        boolean detected = random.nextInt(100) < 70;

        if (!detected) {
            return new AIDetectionResponse(null, 0.0, false);
        }

        // Pick random animal
        String animal = ANIMALS[random.nextInt(ANIMALS.length)];

        // Random confidence between 0.7 - 0.99
        double confidence = 0.7 + (0.3 * random.nextDouble());

        return new AIDetectionResponse(animal, confidence, true);
    }
}