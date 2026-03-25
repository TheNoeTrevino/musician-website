package com.project.backend.health;

import com.project.backend.services.StripeClientWrapper;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class StripeHealthIndicator implements HealthIndicator {

    @Autowired
    private StripeClientWrapper stripeClient;

    @Override
    public Health health() {
        try {
            stripeClient.retrieveBalance();
            return Health.up().withDetail("service", "Stripe API").build();
        } catch (StripeException e) {
            return Health.down(e).withDetail("service", "Stripe API").build();
        }
    }
}
