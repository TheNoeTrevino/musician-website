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
    logger.info("Logging in user with username: {}", loginDTO.getUsername());
    return ResponseEntity.ok(userService.login(loginDTO));
  }

  @PostMapping("/register")
  public ResponseEntity<LoginAndSignupResponseDTO> createUser(@Valid @RequestBody CreateUpdateUserDTO user) {
    logger.info("Creating user with username: {}", user.getUsername());
    return ResponseEntity.ok(userService.createUser(user));
  }
}
