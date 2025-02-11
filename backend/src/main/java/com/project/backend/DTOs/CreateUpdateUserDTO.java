package com.project.backend.DTOs;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUpdateUserDTO {
  @Size(max = 255, message = "Username must be below 255 characters long")
  @Size(min = 0, message = "Username must be above 8 characters long")
  private String username;

  @Size(max = 255, message = "First name must be below 255 characters long")
  @NotNull(message = "First name on a user cannot be null")
  private String firstName;

  @Size(max = 255, message = "Last name must be below 255 characters long")
  @NotNull(message = "Last name on a user cannot be null")
  private String lastName;

  @Size(max = 255, message = "Password must be below 255 characters long")
  @Size(min = 0, message = "Password must be above 8 characters long")
  @NotNull(message = "Password on a user cannot be null")
  private String password;

  @Size(max = 255, message = "Email must be below 255 characters long")
  @NotNull(message = "Email on a user cannot be null")
  private String emailAddress;

  @NotNull(message = "User must have an assigned authority.")
  private SimpleGrantedAuthority authority;
}
