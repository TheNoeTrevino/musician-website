package com.project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.CreateUpdateUserDTO;
import com.project.backend.DTOs.LoginDTO;
import com.project.backend.DTOs.LoginAndSignupResponseDTO;
import com.project.backend.services.UserService;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

  @Autowired
  UserService userService;

  @PostMapping("/login")
  public ResponseEntity<LoginAndSignupResponseDTO> login(@RequestBody LoginDTO loginDTO) {
    logger.info("Login endpoint called for username: {}", loginDTO.getUsername());
    LoginAndSignupResponseDTO response = userService.login(loginDTO);
    if (response.isSuccessful()) {
      logger.info("Login successful for user: {}", loginDTO.getUsername());
    } else {
      logger.warn("Login failed for user: {}", loginDTO.getUsername());
    }
    return ResponseEntity.ok(response);
  }

  @PostMapping("/register")
  public ResponseEntity<LoginAndSignupResponseDTO> createUser(@Valid @RequestBody CreateUpdateUserDTO user) {
    logger.info("Registration endpoint called for username: {}", user.getUsername());
    LoginAndSignupResponseDTO response = userService.createUser(user);
    if (response.isSuccessful()) {
      logger.info("User registration successful: {}", user.getUsername());
    } else {
      logger.warn("User registration failed for: {}", user.getUsername());
    }
    return ResponseEntity.ok(response);
  }
}
