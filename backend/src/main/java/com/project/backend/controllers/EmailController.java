package com.project.backend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.EmailDTO;
import com.project.backend.DTOs.EmailResponseDTO;
import com.project.backend.services.EmailService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/email")
public class EmailController {
  private static final Logger logger = LoggerFactory.getLogger(EmailController.class);

  @Autowired
  EmailService emailService;

  @PostMapping("/send")
  private ResponseEntity<EmailResponseDTO> sendEmail(
      @Valid @RequestBody EmailDTO email) {
    logger.info("Email send request from: {} with subject: {}", email.getFrom(), email.getSubject());
    EmailResponseDTO response = emailService.sendEmail(email);
    if (response.isSuccessful()) {
      logger.info("Email sent successfully from: {}", email.getFrom());
    } else {
      logger.warn("Email send failed from: {}", email.getFrom());
    }
    return ResponseEntity.ok(response);
  }
}
