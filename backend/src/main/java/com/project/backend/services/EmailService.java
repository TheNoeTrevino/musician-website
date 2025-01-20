package com.project.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.EmailDTO;
import com.project.backend.DTOs.EmailResponseDTO;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  public EmailResponseDTO sendEmail(EmailDTO email) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo("noetrevino.music@gmail.com");
    message.setFrom(email.getFrom());
    message.setSubject(email.getSubject());
    message.setText(email.getMessage());
    mailSender.send(message);

    EmailResponseDTO response = new EmailResponseDTO();
    response.setSuccessful(true);
    response.setReply("Thanks for sending me an email! I will get back to you as soon as I can.");
    return response;
  }
}
