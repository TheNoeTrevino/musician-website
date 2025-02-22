package com.project.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginAndSignupResponseDTO {
  private String jwtToken;
  private String message;
  private boolean successful;
}
