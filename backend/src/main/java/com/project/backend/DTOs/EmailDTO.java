package com.project.backend.DTOs;

import lombok.Data;

@Data
public class EmailDTO {
  String firstName;
  String lastName;
  String from;
  String subject;
  String message;
}
