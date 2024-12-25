package com.project.backend.DTOs;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

// TODO: add the pieces as piece dto here once it is made
@AllArgsConstructor
@Data
public class OrderDTO {
  private long orderId;
  private float price;
  private List<PieceDTO> pieces;
}
