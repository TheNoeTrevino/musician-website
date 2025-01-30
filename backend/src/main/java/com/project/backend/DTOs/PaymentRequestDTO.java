package com.project.backend.DTOs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentRequestDTO {
  private Long amount;
  private Long quantity;
  public String productName;
  public String currency;
}
