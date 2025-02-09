package com.project.backend.DTOs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponseDTO {
  public String status;
  public String message;
  public String sessionId;
  public String checkoutUrl;
}
