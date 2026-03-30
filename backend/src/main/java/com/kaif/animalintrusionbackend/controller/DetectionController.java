package com.kaif.animalintrusionbackend.controller;

import com.kaif.animalintrusionbackend.dto.AIDetectionResponse;
import com.kaif.animalintrusionbackend.service.DetectionService;
import com.kaif.animalintrusionbackend.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/detection")
public class DetectionController {

    private final FileService fileService;
    private final DetectionService detectionService;

    public DetectionController(FileService fileService,
                               DetectionService detectionService) {
        this.fileService = fileService;
        this.detectionService = detectionService;
    }

    // 🔥 MAIN API (Raspberry Pi / Postman will hit this)
    @PostMapping
    public ResponseEntity<AIDetectionResponse> detect(
            @RequestParam("file") MultipartFile file) {

        // 1. Basic validation
        if (file.isEmpty()) {
            throw new RuntimeException("File cannot be empty");
        }

        // 2. Save file
        String fileName = fileService.saveFile(file);
        String imagePath = "uploads/" + fileName;

        // 3. Process detection (CORE LOGIC)
        AIDetectionResponse response =
                detectionService.processDetection(imagePath);

        return ResponseEntity.ok(response);
    }


    @GetMapping
    public ResponseEntity<?> getAllDetections() {
        return ResponseEntity.ok(detectionService.getAllDetections());
    }
}