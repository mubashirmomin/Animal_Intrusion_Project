package com.kaif.animalintrusionbackend.service.impl;

import com.kaif.animalintrusionbackend.service.TelegramService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

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

        String url = "https://api.telegram.org/bot" + botToken + "/sendMessage";

        String message = buildMessage(animal, confidence);

        Map<String, String> body = new HashMap<>();
        body.put("chat_id", chatId);
        body.put("text", message);
        body.put("parse_mode", "Markdown");

        try {
            restTemplate.postForObject(url, body, String.class);
        } catch (Exception e) {
            System.out.println("Failed to send Telegram alert");
        }
    }

    private String buildMessage(String animal, Double confidence) {

        String time = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("hh:mm a"));

        return "🚨 *Animal Alert!*\n\n" +
                "🐾 Animal: *" + animal + "*\n" +
                "📊 Confidence: *" + Math.round(confidence * 100) + "%*\n" +
                "⏰ Time: " + time;
    }
}