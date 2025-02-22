package com.project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.DTOs.CreateUpdateUserDTO;
import com.project.backend.services.UserService;

import jakarta.validation.Valid;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/users")
public class UserController {
  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  @Autowired
  UserService userService;

  @GetMapping("/user/{id}")
  public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
    logger.info("Searching for user with ID: {}", id);
    return ResponseEntity.ok(userService.getUserById(id));
  }

  @DeleteMapping("/user/{id}")
  public ResponseEntity<UserDTO> deleteUserById(@PathVariable Long id) {
    logger.info("Deleteing user with ID: {}", id);
    return ResponseEntity.ok(userService.deleteUserById(id));
  }

  @GetMapping("/")
  public ResponseEntity<List<UserDTO>> getAllUsers(
      @RequestParam(required = false, defaultValue = "ASC") String sortOrder,
      @RequestParam(required = false, defaultValue = "id") String orderBy) {
    logger.info("Fetching all user");
    return ResponseEntity.ok(userService.getAllUsers(sortOrder, orderBy));
  }
}
