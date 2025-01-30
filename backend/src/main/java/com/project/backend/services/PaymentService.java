package com.project.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.PaymentRequestDTO;
import com.project.backend.DTOs.PaymentResponseDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentService {
  private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

  @Value("${STRIPE_SECRET}")
  private String stripeSecret;

  public PaymentResponseDTO checkoutProducts(PaymentRequestDTO paymentRequest) {
    Stripe.apiKey = stripeSecret;
    SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData
        .builder()
        .setName(paymentRequest.getProductName())
        .build();

    SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
        .setCurrency(paymentRequest.getCurrency() == null ? "USD" : paymentRequest.getCurrency())
        .setUnitAmount(paymentRequest.getAmount())
        .setProductData(productData)
        .build();

    SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
        .setQuantity(paymentRequest.getQuantity())
        .setPriceData(priceData)
        .build();

    SessionCreateParams params = SessionCreateParams.builder()
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl("http://localhost:5173/shop")
        .setCancelUrl("http://localhost:5173/shop")
        .addLineItem(lineItem)
        .build();

    Session session = null;

    try {
      session = Session.create(params);
    } catch (StripeException exception) {
      // TODO: return a failed stripe response
      logger.error("Payment failed: ", exception.getMessage());
    }

    // TODO: take care of not null here
    return PaymentResponseDTO.builder()
        .status("SUCCESS")
        .message("Payment session created")
        .sessionId(session.getId())
        .checkoutUrl(session.getSuccessUrl())
        .build();
  }
}
