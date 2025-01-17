package com.project.backend.DTOs;

import java.util.List;

import com.project.backend.eums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserWithOrdersDTO {
  private String firstName;
  private String lastName;
  private String emailAddress;
  private Role role;
  private List<OrderDTO> orders;
}
