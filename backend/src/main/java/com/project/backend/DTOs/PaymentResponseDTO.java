package com.project.backend.DTOs;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponseDTO {
  public String status;
  public String message;
  public String sessionId;
  public String paymentIntent;
  public String checkoutUrl;
  public String paymentId;
  public List<String> products;
}
