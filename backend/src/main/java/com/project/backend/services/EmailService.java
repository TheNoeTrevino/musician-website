package com.project.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendEmail(String toEmail, String subject, String body) {
    SimpleMailSender message = new SimpleMailMessage();
    message.setFrom("");
  }
}
