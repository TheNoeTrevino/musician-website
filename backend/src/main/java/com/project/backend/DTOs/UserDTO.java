package com.project.backend.DTOs;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserDTO {
  private long userId;
  private String firstName;
  private String lastName;
  private String emailAddress;
}
