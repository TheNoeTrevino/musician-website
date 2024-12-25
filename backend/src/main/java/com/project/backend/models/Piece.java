package com.project.backend.models;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// TODO: add instrumentation
// TODO: add photos -- as binary in db, then process the blob in the frontend
@Data
@Entity
public class Piece {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @NotNull(message = "A piece must have a name")
  @Column(name = "name")
  private String title;

  @NotNull(message = "A piece must have a composer")
  @Column(name = "composer")
  private String composer;

  @NotNull(message = "A piece must have a price")
  @Column(name = "price")
  private Double price;

  @NotNull(message = "A piece must have a date in which it was composed")
  @Column(name = "date_composed")
  private LocalDate dateComposed;

  @ManyToMany
  @JoinTable(
    name = "order_pieces",
    joinColumns = @JoinColumn(name = "order_id"),
    inverseJoinColumns = @JoinColumn(name = "piece_id")
  )
  private Set<Order> orders = new HashSet<>();
}
