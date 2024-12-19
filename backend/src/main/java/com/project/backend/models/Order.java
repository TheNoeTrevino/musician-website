package com.project.backend.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "orders") // NOTE: order gets canned as a reserve keyword
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull(message = "An order must have a total price")
  @Column(name = "price")
  public float price;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  @ManyToMany(mappedBy = "orders")
  private Set<Piece> pieces = new HashSet<>();
}
