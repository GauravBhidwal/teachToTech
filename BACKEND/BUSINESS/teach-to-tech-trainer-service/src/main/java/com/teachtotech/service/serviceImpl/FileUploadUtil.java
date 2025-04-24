package com.teachtotech.service.serviceImpl;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;


@Component
public class FileUploadUtil {
	 private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

	    public String uploadImage(MultipartFile file) throws IOException {
	        if (file.isEmpty()) {
	            throw new IOException("File is empty");
	        }

	        // Create upload directory if not exists
	        Files.createDirectories(Paths.get(UPLOAD_DIR));

	        // Generate a unique file name
	        String fileName =file.getOriginalFilename();
	        String filePath = UPLOAD_DIR + fileName;

	        // Save file
	        file.transferTo(new File(filePath));

	        return fileName; // or return full path if needed
	    }
}
