package com.project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.LoginDTO;
import com.project.backend.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  UserService userService;

  @PostMapping("/login")
  public String login(@RequestBody LoginDTO loginDTO) {
    return userService.verify(loginDTO);
  }
}
