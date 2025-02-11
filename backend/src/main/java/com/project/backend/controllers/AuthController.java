package com.project.backend.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.LoginDTO;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @PostMapping("/login")
  public String login(@RequestBody LoginDTO loginDTO) {
    return "success";
  }

}
