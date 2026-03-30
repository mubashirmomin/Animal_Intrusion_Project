package com.kaif.animalintrusionbackend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AIDetectionResponse {

    private String animal;
    private Double confidence;
    private boolean detected;
}