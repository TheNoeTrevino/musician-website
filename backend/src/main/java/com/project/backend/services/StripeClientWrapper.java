package com.project.backend.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Balance;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class StripeClientWrapper {

  @Value("${STRIPE_SECRET}")
  private String stripeSecret;

  @PostConstruct
  public void init() {
    Stripe.apiKey = stripeSecret;
  }

  public Product retrieveProduct(String id) throws StripeException {
    return Product.retrieve(id);
  }

  public Price retrievePrice(String id) throws StripeException {
    return Price.retrieve(id);
  }

  public Session createSession(SessionCreateParams params) throws StripeException {
    return Session.create(params);
  }

  public Session retrieveSession(String id) throws StripeException {
    return Session.retrieve(id);
  }

  public Balance retrieveBalance() throws StripeException {
    return Balance.retrieve();
  }
}
