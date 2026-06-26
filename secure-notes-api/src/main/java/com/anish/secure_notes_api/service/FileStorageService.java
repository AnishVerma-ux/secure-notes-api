package com.anish.secure_notes_api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Store uploaded file
    public String storeFile(MultipartFile file) {

        try {

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFileName =
                    StringUtils.cleanPath(file.getOriginalFilename());

            String extension = "";

            int index = originalFileName.lastIndexOf(".");

            if (index > 0) {
                extension = originalFileName.substring(index);
            }

            String storedFileName =
                    UUID.randomUUID().toString() + extension;

            Path targetLocation =
                    uploadPath.resolve(storedFileName);

            Files.copy(file.getInputStream(),
                    targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);

            return storedFileName;

        } catch (IOException e) {
            throw new RuntimeException("Could not store file", e);
        }
    }

    // Load file for download
    public Resource loadFile(String fileName) {

        try {

            Path filePath = Paths.get(uploadDir)
                    .resolve(fileName)
                    .normalize();

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return resource;
            }

            throw new RuntimeException("File not found");

        } catch (Exception e) {
            throw new RuntimeException("File not found", e);
        }
    }
}