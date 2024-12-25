package com.project.backend.DTOs;

import com.project.backend.eums.Role;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateUpdateUserDTO {
  @NotNull(message = "First name on a user cannot be null")
  private String firstName;

  @NotNull(message = "Last name on a user cannot be null")
  private String lastName;

  @NotNull(message = "Password on a user cannot be null")
  private String password;

  @NotNull(message = "Email on a user cannot be null")
  private String emailAddress;

  @NotNull(message = "User must have a role.")
  @Enumerated(EnumType.STRING)
  private Role role;
}
