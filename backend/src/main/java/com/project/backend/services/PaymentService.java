package com.project.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.PaymentRequestDTO;
import com.project.backend.DTOs.PaymentResponseDTO;
import com.project.backend.DTOs.ProductDTO;
import com.project.backend.exceptions.NotFoundException;
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

    paymentRequest.getProducts().stream().forEach(dto -> {
      Product product;
      try {
        product = Product.retrieve(dto.getId());
      } catch {
      }
    }
    );

    try {
      product = Product.retrieve(paymentRequest.getProductId());
    } catch (StripeException ex) {
      logger.error("Product retrieval failed: ", ex.getMessage());
      return PaymentResponseDTO.builder()
          .status("FAILED")
          .message("Product not found")
          .build();
    }

    Price price = null;
    try {
      price = Price.retrieve(product.getDefaultPrice());
    } catch (StripeException ex) {
      logger.error("Price retrieval failed: ", ex.getMessage());
      return PaymentResponseDTO.builder()
          .status("FAILED")
          .message("Price not found")
          .build();
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
        .setQuantity(paymentRequest.getQuantity())
        .setPriceData(priceData)
        .build();

    SessionCreateParams params = SessionCreateParams.builder()
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl("http://localhost:5173/shop") // TODO: make a success page
        .setCancelUrl("http://localhost:5173/shop") // TODO: make a cancel page
        .addLineItem(lineItem)
        .build();

    Session session = null;

    try {
      session = Session.create(params);
    } catch (StripeException exception) {
      // TODO: return a failed stripe response
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
        .checkoutUrl(session.getUrl()) // checkout URL
        .build();
  }

  public String getProductById() {
    Stripe.apiKey = stripeSecret;

    Product product = null;
    try {
      product = Product.retrieve("prod_RgMaQVCpahAW2z");
    } catch (StripeException ex) {
      logger.error("Payment failed: ", ex.getMessage());
      throw new NotFoundException(ex.getMessage(), (long) 2);
    }

    String price;

    try {
      price = Price.retrieve(product.getDefaultPrice()).toString();
    } catch (StripeException ex) {
      logger.error("Payment failed: ", ex.getMessage());
      throw new NotFoundException(ex.getMessage(), (long) 2);
    }

    return product.getName() + "\n" + price;
  }
}
