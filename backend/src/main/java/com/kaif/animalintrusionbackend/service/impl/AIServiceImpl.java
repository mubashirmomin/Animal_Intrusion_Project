package com.kaif.animalintrusionbackend.service.impl;

import com.kaif.animalintrusionbackend.dto.AIDetectionResponse;
import com.kaif.animalintrusionbackend.service.AIService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.file.Files;
import java.util.Base64;

import java.io.File;

@Service
public class AIServiceImpl implements AIService {

    private final RestTemplate restTemplate;

    @Value("${api.key}")
    private String apiKey;

    private final String API_URL =
            "https://serverless.roboflow.com/workflows/momin-mubashib-javed-husain-auto-s-workspace/detect-count-and-visualize-3";

    public AIServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public AIDetectionResponse detect(String imagePath) {

        try {
            File file = new File(imagePath);

            // 🔥 Convert to base64
            byte[] fileBytes = Files.readAllBytes(file.toPath());
            String base64Image = Base64.getEncoder().encodeToString(fileBytes);

            // 🔥 Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);

            HttpEntity<String> request = new HttpEntity<>(base64Image, headers);

            String url = "https://serverless.roboflow.com/animal-intrusion-project/1?api_key=" + apiKey;

            ResponseEntity<String> response =
                    restTemplate.postForEntity(url, request, String.class);

            System.out.println("🤖 Roboflow Raw Response: " + response.getBody());

            // 🔥 PARSE RESPONSE
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());

            JsonNode predictions = root.path("predictions");

            // ✅ If animal detected
            if (predictions.isArray() && predictions.size() > 0) {

                JsonNode first = predictions.get(0);

                String label = first.path("class").asText("unknown");
                double confidence = first.path("confidence").asDouble(0.0);

                return new AIDetectionResponse(label, confidence, true);
            }

            // ❌ No detection
            return new AIDetectionResponse("no animal", 0.0, false);

        } catch (Exception e) {
            e.printStackTrace();
            return new AIDetectionResponse("error", 0.0, false);
        }
    }
}