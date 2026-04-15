package com.kaif.animalintrusionbackend.service.impl;


import com.kaif.animalintrusionbackend.service.MotionService;
import org.springframework.stereotype.Service;

@Service
public class MotionServiceImpl implements MotionService {

    private boolean motionDetected = false;

    @Override
    public void setMotionDetected() {
        this.motionDetected = true;
    }

    @Override
    public boolean isMotionDetected() {
        return motionDetected;
    }

    @Override
    public void resetMotion() {
        this.motionDetected = false;
    }
}
