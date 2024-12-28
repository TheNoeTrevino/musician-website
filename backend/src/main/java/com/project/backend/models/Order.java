package com.project.backend.models;

import java.util.List;

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
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@NoArgsConstructor
@Entity
@Data
@Table(name = "orders") // NOTE: order gets canned as a reserve keyword
@Accessors(chain = true)
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull(message = "An order must have a total price")
  @Column(name = "price")
  private Double price;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  @ManyToMany(mappedBy = "orders")
  private List<Piece> pieces;

  public Order(Double price, Users user, List<Piece> pieces) {
    this.price = price;
    this.user = user;
    this.pieces = pieces;
  }
}
