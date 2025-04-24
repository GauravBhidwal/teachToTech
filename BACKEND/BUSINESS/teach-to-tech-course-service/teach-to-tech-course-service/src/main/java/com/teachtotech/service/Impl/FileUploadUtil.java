package com.teachtotech.service.Impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadUtil {

    // Base folder (inside service directory)
    @Value("${file.upload-dir:uploads/}")
    private String uploadDir;

    // Add service prefix
    private final String servicePrefix = "course"; // hardcoded, or you can inject this too

    public String uploadImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be null or empty");
        }

        String originalFilename = StringUtils.cleanPath(
            Objects.requireNonNull(file.getOriginalFilename())
        );

        if (originalFilename.contains("..")) {
            throw new SecurityException("Filename contains invalid path sequence: " + originalFilename);
        }

        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID() + fileExtension;

        // 👇 Update to include service-specific path
        Path uploadPath = Paths.get(servicePrefix, uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        Path targetPath = uploadPath.resolve(uniqueFilename);
        file.transferTo(targetPath.toFile());

        // 👇 Return a relative path that Gateway understands
        return "/" + servicePrefix + "/" + uploadDir + uniqueFilename;
    }
}
