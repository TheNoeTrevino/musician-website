package com.project.backend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.PaymentRequestDTO;
import com.project.backend.DTOs.PaymentResponseDTO;
import com.project.backend.services.PaymentService;

@RestController
@RequestMapping("/payment")
public class PaymentController {
  private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

  @Autowired
  PaymentService paymentService;

  @PostMapping("/checkout")
  public ResponseEntity<PaymentResponseDTO> checkoutProducts(@RequestBody PaymentRequestDTO request) {
    return ResponseEntity.ok(paymentService.checkoutProducts(request));
  }

}
