package com.project.backend.DTOs;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserDTO {
  private String firstName;
  private String lastName;
  private String emailAddress;
  private SimpleGrantedAuthority authority;
}
