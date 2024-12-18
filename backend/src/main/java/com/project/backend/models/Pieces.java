package com.project.backend.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Pieces {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @NotNull(message = "A piece must have a name")
  @Column(name = "name")
  public String name;

  @NotNull(message = "A piece must have a composer")
  @Column(name = "composer")
  public String composer;

  @NotNull(message = "A piece must have a price")
  @Column(name = "price")
  public float price;

  @NotNull(message = "A piece must have a date in which it was composed")
  @Column(name = "date_composed")
  public LocalDate dateComposed;
}
