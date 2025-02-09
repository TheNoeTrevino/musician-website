package com.project.backend.DTOs;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentRequestDTO {
  private List<ProductDTO> products;
  private String currency;
}
