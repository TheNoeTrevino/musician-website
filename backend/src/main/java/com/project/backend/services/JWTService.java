package com.project.backend.services;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@Component("jwtService")
@RequiredArgsConstructor
public class JWTService {
  public String generateToken() {
    return "token generated";
  }
}
