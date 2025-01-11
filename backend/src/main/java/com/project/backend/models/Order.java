package com.project.backend.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

  @Size(min = 1, message = "An order must have at lease one piece") 
  @ManyToMany(mappedBy = "orders")
  private List<Piece> pieces;

  @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", updatable = false)
  private LocalDateTime createdAt;

  public Order(Double price, Users user, List<Piece> pieces) {
    this.price = price;
    this.user = user;
    this.pieces = pieces;
    this.createdAt = LocalDateTime.now();
  }

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
  }
}
