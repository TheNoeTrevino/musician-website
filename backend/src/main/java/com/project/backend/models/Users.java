package com.project.backend.models;

import java.util.List;

import com.project.backend.eums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Users {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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

  @NotNull(message = "User must have a role.")
  @Enumerated(EnumType.STRING)
  @Column(name = "role")
  private Role role;

  @OneToMany(mappedBy = "user")
  private List<Order> orders;

  public Users(String firstName, String lastName, String password, String emailAddress, Role role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.emailAddress = emailAddress;
    this.role = role;
  }
}
