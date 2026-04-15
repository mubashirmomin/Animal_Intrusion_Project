package com.kaif.animalintrusionbackend.service;


public interface MotionService {
    void setMotionDetected();
    boolean isMotionDetected();
    void resetMotion();
}