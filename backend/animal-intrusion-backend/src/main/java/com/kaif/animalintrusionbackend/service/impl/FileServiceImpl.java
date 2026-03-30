package com.kaif.animalintrusionbackend.service.impl;

import com.kaif.animalintrusionbackend.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @Override
    public String saveFile(MultipartFile file) {

        // 1. Create uploads folder if not exists
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 2. Generate unique file name
        String originalFileName = file.getOriginalFilename();
        String extension = "";

        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String fileName = UUID.randomUUID() + extension;

        // 3. Save file
        File destination = new File(UPLOAD_DIR + fileName);

        try {
            file.transferTo(destination);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }

        // 4. Return saved file name
        return fileName;
    }
}