package com.kaif.animalintrusionbackend.repo;

import com.kaif.animalintrusionbackend.entity.Detection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetectionRepository extends JpaRepository<Detection, Long> {
}