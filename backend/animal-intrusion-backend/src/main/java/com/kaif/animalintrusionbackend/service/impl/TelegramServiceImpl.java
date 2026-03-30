package com.kaif.animalintrusionbackend.service.impl;

import com.kaif.animalintrusionbackend.service.TelegramService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TelegramServiceImpl implements TelegramService {

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.chat.id}")
    private String chatId;

    private final RestTemplate restTemplate;

    public TelegramServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public void sendAlert(String animal, Double confidence) {

        String message = buildMessage(animal, confidence);

        String url = "https://api.telegram.org/bot" + botToken +
                "/sendMessage?chat_id=" + chatId +
//                Telegram sometimes breaks with spaces ("&text=" + message)
//                → encode message
                "&text=" + UriUtils.encode(message, StandardCharsets.UTF_8);

        try {
            restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            System.out.println("Failed to send Telegram alert");
        }
    }

    private String buildMessage(String animal, Double confidence) {

        String time = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("hh:mm a"));

        return "🚨 Alert!\n" +
                animal + " detected\n" +
                "Confidence: " + Math.round(confidence * 100) + "%\n" +
                "Time: " + time;
    }
}