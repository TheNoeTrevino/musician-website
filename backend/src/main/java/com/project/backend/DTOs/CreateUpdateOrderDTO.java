package com.project.backend.DTOs;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateUpdateOrderDTO {

  public float price;

  @NotNull(message = "an order must have the user id with it.")
  private Long userId;

  @NotNull(message = "The order must have the pieces Ids with it")
  private List<Long> pieceIds;
}
