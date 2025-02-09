package com.project.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProductDTO {
  private String id;
  private Long quantity;
}
