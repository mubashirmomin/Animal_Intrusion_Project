package com.kaif.animalintrusionbackend.service;

public interface TelegramService {

    void sendAlert(String animal, Double confidence);

}