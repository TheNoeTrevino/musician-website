package com.project.backend.health;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.project.backend.services.StripeClientWrapper;
import com.stripe.exception.StripeException;
import com.stripe.model.Balance;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.Status;

@ExtendWith(MockitoExtension.class)
class StripeHealthIndicatorTest {

  @Mock private StripeClientWrapper stripeClient;

  @InjectMocks private StripeHealthIndicator stripeHealthIndicator;

  @Test
  void health_stripeUp_returnsUp() throws StripeException {
    when(stripeClient.retrieveBalance()).thenReturn(new Balance());

    Health health = stripeHealthIndicator.health();

    assertThat(health.getStatus()).isEqualTo(Status.UP);
    assertThat(health.getDetails()).containsEntry("service", "Stripe API");
  }

  @Test
  void health_stripeDown_returnsDown() throws StripeException {
    when(stripeClient.retrieveBalance())
        .thenThrow(new StripeException("Authentication failed", null, null, 401) {});

    Health health = stripeHealthIndicator.health();

    assertThat(health.getStatus()).isEqualTo(Status.DOWN);
    assertThat(health.getDetails()).containsEntry("service", "Stripe API");
  }
}
