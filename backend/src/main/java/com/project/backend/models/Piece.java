package com.project.backend.models;

import java.time.Duration;
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
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

// TODO: add instrumentation
// TODO: add photos -- as binary in db, then process the blob in the frontend
@Data
@Entity
@Accessors(chain = true)
@NoArgsConstructor
public class Piece {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Size(max = 255, message = "Title must be under 255 characters")
  @NotNull(message = "A piece must have a name")
  @Column(name = "name", unique = true)
  private String title;

  @Size(max = 255, message = "Composer must be under 255 characters")
  @NotNull(message = "A piece must have a composer")
  @Column(name = "composer")
  private String composer;

  @NotNull(message = "A piece must have a price")
  @Column(name = "price")
  private Double price;

  // this is just a year, not a whole date
  @PastOrPresent(message = "The year composed must be in either the past or present")
  @NotNull(message = "A piece must have a date in which it was composed")
  @Column(name = "date_composed")
  private Integer yearComposed;

  @Column(name = "has_electronics")
  private boolean hasElectronics;

  @NotNull(message = "We must know the number of players in a piece")
  @Column(name = "num_of_players")
  private Integer numOfPlayers;

  // this is a UIL way to claffisy pieces. Basically from 1-6
  @Max(value = 6, message = "difficulty must be from 1-6")
  @Min(value = 1, message = "difficulty must be from 1-6")
  @Column(name = "difficulty_grade")
  private Integer difficultyGrade;

  @NotNull(message = "A piece must have a length in time")
  @Column(name = "time_length")
  private Duration timeLength;

  @ManyToMany
  @JoinTable(
    name = "order_pieces",
    joinColumns = @JoinColumn(name = "order_id"),
    inverseJoinColumns = @JoinColumn(name = "piece_id")
  )
  private Set<Order> orders = new HashSet<>();

  public Piece(String title, String composer, Double price, Integer yearComposed, 
                boolean hasElectronics, Integer numOfPlayers, Integer difficultyGrade, Duration timeLength) {
      this.title = title;
      this.composer = composer;
      this.price = price;
      this.yearComposed = yearComposed;
      this.hasElectronics = hasElectronics;
      this.numOfPlayers = numOfPlayers;
      this.difficultyGrade = difficultyGrade;
      this.timeLength = timeLength;
  }
}
