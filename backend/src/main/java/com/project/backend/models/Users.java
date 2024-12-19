package com.project.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Users {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @NotNull(message = "First name on a user cannot be null")
  @Column(name = "first_name")
  private String firstName;

  @NotNull(message = "Last name on a user cannot be null")
  @Column(name = "last_name")
  private String lastName;

  @NotNull(message = "Password on a user cannot be null")
  @Column(name = "password")
  private String password;

  @NotNull(message = "Email on a user cannot be null")
  @Column(name = "email")
  private String emailAddress;
}
