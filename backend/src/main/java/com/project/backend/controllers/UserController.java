package com.project.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.UserDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/members")
public class UserController {
  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  @GetMapping("/{id}")
  public UserDTO getUserById(@PathVariable Long id) {
    logger.info("Searching for member with ID: {}", id);
    return UserService.getUserById();
  }
}
