package com.project.backend.models;

import java.time.LocalDateTime;
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
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Size(max = 255, message = "First name must be below 255 characters long")
  @NotNull(message = "First name on a user cannot be null")
  @Column(name = "first_name")
  private String firstName;

  @Size(max = 255, message = "Last name must be below 255 characters long")
  @NotNull(message = "Last name on a user cannot be null")
  @Column(name = "last_name")
  private String lastName;

  @Size(max = 255, message = "Password must be below 255 characters long")
  @Size(min = 0, message = "Password must be above 8 characters long")
  @NotNull(message = "Password on a user cannot be null")
  @Column(name = "password")
  private String password;

  @Size(max = 255, message = "Email must be below 255 characters long")
  @NotNull(message = "Email on a user cannot be null")
  @Column(name = "email")
  private String emailAddress;

  @NotNull(message = "User must have a role.")
  @Enumerated(EnumType.STRING)
  @Column(name = "role")
  private Role role;

  @OneToMany(mappedBy = "user")
  private List<Order> orders;

  @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", updatable = false)
  private LocalDateTime createdAt;

  public Users(String firstName, String lastName, String password, String emailAddress, Role role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.emailAddress = emailAddress;
    this.role = role;
    this.createdAt = LocalDateTime.now();
  }

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
  }
}
