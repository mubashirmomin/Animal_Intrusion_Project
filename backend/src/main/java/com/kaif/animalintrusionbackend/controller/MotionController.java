package com.kaif.animalintrusionbackend.controller;

import com.kaif.animalintrusionbackend.service.MotionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/motion")
public class MotionController {

    private final MotionService motionService;

    public MotionController(MotionService motionService) {
        this.motionService = motionService;
    }

    // ESP32 hits this
    @PostMapping
    public ResponseEntity<String> detectMotion() {
        motionService.setMotionDetected();
        return ResponseEntity.ok("Motion detected");
    }

    // Frontend polls this
    @GetMapping("/status")
    public ResponseEntity<Boolean> getStatus() {
        return ResponseEntity.ok(motionService.isMotionDetected());
    }

    // Reset after capture
    @PostMapping("/reset")
    public ResponseEntity<Void> reset() {
        motionService.resetMotion();
        return ResponseEntity.ok().build();
    }
}
