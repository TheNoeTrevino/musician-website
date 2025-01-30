package com.project.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.PaymentRequestDTO;
import com.project.backend.DTOs.PaymentResponseDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentService {
  private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

  @Value("${STRIPE_SECRET}")
  private String stripeSecret;

  public PaymentResponseDTO checkoutProducts(PaymentRequestDTO paymentRequest) {
    Stripe.apiKey = stripeSecret;

    SessionCreateParams params = SessionCreateParams.builder()
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl("http://localhost:5173/shop") // TODO: make a success page
        .setCancelUrl("http://localhost:5173/shop") // TODO: make a cancel page
        .build();

    paymentRequest.getProducts().stream().forEach(dto -> {
      Product product;
      try {
        logger.info("Looking for product with id: " + dto.getId());
        product = Product.retrieve(dto.getId());
      } catch (StripeException ex) {
        throw new RuntimeException("Failed to get product");
      }

      Price price;
      try {
        price = Price.retrieve(product.getDefaultPrice());
      } catch (StripeException ex) {
        throw new RuntimeException("Failed to get price");
      }

      SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData
          .builder()
          .setName(product.getName())
          .build();

      SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
          .setCurrency(price.getCurrency()) // FIX: right now will always be USD
          .setUnitAmount(price.getUnitAmount())
          .setProductData(productData)
          .build();

      SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
          .setQuantity(dto.getQuantity())
          .setPriceData(priceData)
          .build();

      params.getLineItems().add(lineItem);
    });

    Session session = null;

    try {
      session = Session.create(params);
    } catch (StripeException exception) {
      logger.error("Payment session creation failed: ", exception.getMessage());
      return PaymentResponseDTO.builder()
          .status("FAILED")
          .message("Payment session creation failed")
          .build();
    }

    return PaymentResponseDTO.builder()
        .status("SUCCESS")
        .message("Payment session created")
        .sessionId(session.getId())
        .checkoutUrl(session.getUrl()) // checkout URL TODO: take them here in the frontend
        .build();
  }
}
