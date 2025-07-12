package com.project.backend.services;

import com.project.backend.DTOs.PaymentRequestDTO;
import com.project.backend.DTOs.PaymentResponseDTO;
import com.project.backend.DTOs.PaymentStatusResponseDTO;
import com.project.backend.DTOs.SessionDTO;
import com.project.backend.repositories.PiecesRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
  private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

  @Value("${STRIPE_SECRET}")
  private String stripeSecret;

  @Value("${FRONTEND_URL}")
  private String baseUrl;

  @Autowired PiecesRepository piecesRepository;

  public PaymentResponseDTO checkoutProducts(PaymentRequestDTO paymentRequest) {
    Stripe.apiKey = stripeSecret;

    List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

    paymentRequest.getProducts().stream()
        .forEach(
            dto -> {
              Product product;
              try {
                logger.info("Looking for product with id: {}" + dto.getId());
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

              SessionCreateParams.LineItem.PriceData.ProductData productData =
                  SessionCreateParams.LineItem.PriceData.ProductData.builder()
                      .setName(product.getName())
                      .build();

              SessionCreateParams.LineItem.PriceData priceData =
                  SessionCreateParams.LineItem.PriceData.builder()
                      .setCurrency(price.getCurrency()) // FIX: right now will always be USD
                      .setUnitAmount(price.getUnitAmount())
                      .setProductData(productData)
                      .build();

              SessionCreateParams.LineItem lineItem =
                  SessionCreateParams.LineItem.builder()
                      .setQuantity(dto.getQuantity())
                      .setPriceData(priceData)
                      .build();

              lineItems.add(lineItem);
            });

    SessionCreateParams params =
        SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(baseUrl + "/success")
            .setCancelUrl(baseUrl + "/cancel")
            .addAllLineItem(lineItems)
            .build();

    Session session = null;

    try {
      session = Session.create(params);
    } catch (StripeException exception) {
      logger.error("Payment session creation failed: {}", exception.getMessage());
      return PaymentResponseDTO.builder()
          .status("FAILED")
          .message("Payment session creation failed")
          .build();
    }

    logger.info("Payment session created with ID: {}", session.getId());
    return PaymentResponseDTO.builder()
        .status("SUCCESS")
        .message("Payment session created")
        .sessionId(session.getId())
        .checkoutUrl(session.getUrl())
        .build();
  }

  public PaymentStatusResponseDTO checkSessionStatus(SessionDTO dto) {
    Stripe.apiKey = stripeSecret;

    logger.info("Looking for session: {}", dto.getSessionId());
    try {
      Session session = Session.retrieve(dto.getSessionId());

      if (!session.getStatus().equals("complete")) {
        return new PaymentStatusResponseDTO(
            "PENDING", "Payment is still processing", dto.getSessionId());
      }

      return new PaymentStatusResponseDTO(
          "SUCCESS", "Payment completed successfully", session.getId());

    } catch (StripeException e) {
      logger.error("Stripe error checking session status: {}", e.getMessage());
      return new PaymentStatusResponseDTO(
          "ERROR", "Failed to retrieve payment info", "invalid session");
    }
  }
}
