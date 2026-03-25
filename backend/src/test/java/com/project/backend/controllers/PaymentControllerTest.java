package com.project.backend.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.DTOs.PaymentRequestDTO;
import com.project.backend.DTOs.PaymentResponseDTO;
import com.project.backend.DTOs.PaymentStatusResponseDTO;
import com.project.backend.DTOs.ProductDTO;
import com.project.backend.DTOs.SessionDTO;
import com.project.backend.services.PaymentService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.bean.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(
    controllers = PaymentController.class,
    excludeAutoConfiguration = SecurityAutoConfiguration.class)
class PaymentControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockBean private PaymentService paymentService;

  @Test
  void checkout_validRequest_returns200WithSuccess() throws Exception {
    PaymentResponseDTO response =
        PaymentResponseDTO.builder()
            .status("SUCCESS")
            .message("Payment session created")
            .sessionId("sess_123")
            .checkoutUrl("https://checkout.stripe.com/pay/sess_123")
            .build();

    when(paymentService.checkoutProducts(any(PaymentRequestDTO.class))).thenReturn(response);

    PaymentRequestDTO request =
        PaymentRequestDTO.builder()
            .products(List.of(new ProductDTO("prod_1", 1L)))
            .currency("usd")
            .build();

    mockMvc
        .perform(
            post("/payment/checkout")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("SUCCESS"))
        .andExpect(jsonPath("$.sessionId").value("sess_123"))
        .andExpect(jsonPath("$.checkoutUrl").value("https://checkout.stripe.com/pay/sess_123"))
        .andExpect(jsonPath("$.message").value("Payment session created"));
  }

  @Test
  void checkout_serviceFails_returns200WithFailedStatus() throws Exception {
    PaymentResponseDTO response =
        PaymentResponseDTO.builder()
            .status("FAILED")
            .message("Payment session creation failed")
            .build();

    when(paymentService.checkoutProducts(any(PaymentRequestDTO.class))).thenReturn(response);

    PaymentRequestDTO request =
        PaymentRequestDTO.builder()
            .products(List.of(new ProductDTO("prod_1", 1L)))
            .currency("usd")
            .build();

    mockMvc
        .perform(
            post("/payment/checkout")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("FAILED"))
        .andExpect(jsonPath("$.message").value("Payment session creation failed"));
  }

  @Test
  void status_completeSession_returns200WithSuccess() throws Exception {
    PaymentStatusResponseDTO response =
        new PaymentStatusResponseDTO("SUCCESS", "Payment completed successfully", "sess_done");

    when(paymentService.checkSessionStatus(any(SessionDTO.class))).thenReturn(response);

    SessionDTO dto = new SessionDTO();
    dto.setSessionId("sess_done");

    mockMvc
        .perform(
            post("/payment/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("SUCCESS"))
        .andExpect(jsonPath("$.message").value("Payment completed successfully"))
        .andExpect(jsonPath("$.sessionId").value("sess_done"));
  }

  @Test
  void status_pendingSession_returns200WithPending() throws Exception {
    PaymentStatusResponseDTO response =
        new PaymentStatusResponseDTO("PENDING", "Payment is still processing", "sess_pending");

    when(paymentService.checkSessionStatus(any(SessionDTO.class))).thenReturn(response);

    SessionDTO dto = new SessionDTO();
    dto.setSessionId("sess_pending");

    mockMvc
        .perform(
            post("/payment/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("PENDING"))
        .andExpect(jsonPath("$.message").value("Payment is still processing"));
  }

  @Test
  void status_invalidSession_returns200WithError() throws Exception {
    PaymentStatusResponseDTO response =
        new PaymentStatusResponseDTO("ERROR", "Failed to retrieve payment info", "invalid session");

    when(paymentService.checkSessionStatus(any(SessionDTO.class))).thenReturn(response);

    SessionDTO dto = new SessionDTO();
    dto.setSessionId("sess_invalid");

    mockMvc
        .perform(
            post("/payment/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("ERROR"))
        .andExpect(jsonPath("$.message").value("Failed to retrieve payment info"));
  }
}
