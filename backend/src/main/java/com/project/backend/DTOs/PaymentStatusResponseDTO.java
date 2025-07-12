package com.project.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;

@Getter
@AllArgsConstructor
public class PaymentStatusResponseDTO {
  @NonNull private String status;
  @NonNull private String message;
  @NonNull private String sessionId;
}
