package com.project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.services.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/members")
public class UserController {
  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  @Autowired
  UserService userService;

  @GetMapping("/{id}")
  public UserDTO getUserById(@PathVariable Long id) {
    logger.info("Searching for user with ID: {}", id);
    return userService.getUserById(id);
  }

  @DeleteMapping("/{id}")
  public UserDTO deleteUserById(@PathVariable Long id) {
    logger.info("Deleteing user with ID: {}", id);
    return userService.deleteUserById(id);
  }
}
