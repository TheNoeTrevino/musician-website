package com.project.backend.DTOs;

import com.project.backend.eums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserDTO {
  private long userId;
  private String firstName;
  private String lastName;
  private String emailAddress;
  private Role role;
}
