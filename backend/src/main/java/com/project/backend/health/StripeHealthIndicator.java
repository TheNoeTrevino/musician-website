package com.project.backend.health;

import com.stripe.Stripe;
import com.stripe.model.Balance;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class StripeHealthIndicator implements HealthIndicator {

    @Value("${STRIPE_SECRET}")
    private String stripeSecret;

    @Override
    public Health health() {
        try {
            Stripe.apiKey = stripeSecret;
            Balance.retrieve();
            return Health.up().withDetail("service", "Stripe API").build();
        } catch (StripeException e) {
            return Health.down(e).withDetail("service", "Stripe API").build();
        }
    }
}
