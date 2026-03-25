package com.project.backend.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import com.project.backend.DTOs.PaymentRequestDTO;
import com.project.backend.DTOs.PaymentResponseDTO;
import com.project.backend.DTOs.PaymentStatusResponseDTO;
import com.project.backend.DTOs.ProductDTO;
import com.project.backend.DTOs.SessionDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import java.lang.reflect.Field;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

  @Mock private StripeClientWrapper stripeClient;

  @InjectMocks private PaymentService paymentService;

  @BeforeEach
  void setUp() throws Exception {
    setField(paymentService, "baseUrl", "http://localhost:3000");
  }

  @Test
  void checkoutProducts_singleProduct_returnsSuccess() throws StripeException {
    Product product = createMockProduct("prod_123", "Test Song", "price_456");
    Price price = createMockPrice("usd", 999L);
    Session session = createMockSession("sess_789", "https://checkout.stripe.com/pay/sess_789");

    when(stripeClient.retrieveProduct("prod_123")).thenReturn(product);
    when(stripeClient.retrievePrice("price_456")).thenReturn(price);
    when(stripeClient.createSession(any(SessionCreateParams.class))).thenReturn(session);

    PaymentRequestDTO request =
        PaymentRequestDTO.builder()
            .products(List.of(new ProductDTO("prod_123", 1L)))
            .currency("usd")
            .build();

    PaymentResponseDTO response = paymentService.checkoutProducts(request);

    assertThat(response.getStatus()).isEqualTo("SUCCESS");
    assertThat(response.getSessionId()).isEqualTo("sess_789");
    assertThat(response.getCheckoutUrl()).isEqualTo("https://checkout.stripe.com/pay/sess_789");
    assertThat(response.getMessage()).isEqualTo("Payment session created");
  }

  @Test
  void checkoutProducts_multipleProducts_returnsSuccess() throws StripeException {
    Product product1 = createMockProduct("prod_1", "Song A", "price_1");
    Product product2 = createMockProduct("prod_2", "Song B", "price_2");
    Price price1 = createMockPrice("usd", 999L);
    Price price2 = createMockPrice("usd", 1499L);
    Session session = createMockSession("sess_multi", "https://checkout.stripe.com/pay/sess_multi");

    when(stripeClient.retrieveProduct("prod_1")).thenReturn(product1);
    when(stripeClient.retrieveProduct("prod_2")).thenReturn(product2);
    when(stripeClient.retrievePrice("price_1")).thenReturn(price1);
    when(stripeClient.retrievePrice("price_2")).thenReturn(price2);
    when(stripeClient.createSession(any(SessionCreateParams.class))).thenReturn(session);

    PaymentRequestDTO request =
        PaymentRequestDTO.builder()
            .products(List.of(new ProductDTO("prod_1", 1L), new ProductDTO("prod_2", 2L)))
            .currency("usd")
            .build();

    PaymentResponseDTO response = paymentService.checkoutProducts(request);

    assertThat(response.getStatus()).isEqualTo("SUCCESS");
    assertThat(response.getSessionId()).isEqualTo("sess_multi");
  }

  @Test
  void checkoutProducts_productRetrievalFails_throwsRuntimeException() throws StripeException {
    when(stripeClient.retrieveProduct("prod_bad"))
        .thenThrow(new StripeException("Product not found", null, null, 404) {});

    PaymentRequestDTO request =
        PaymentRequestDTO.builder()
            .products(List.of(new ProductDTO("prod_bad", 1L)))
            .currency("usd")
            .build();

    assertThatThrownBy(() -> paymentService.checkoutProducts(request))
        .isInstanceOf(RuntimeException.class)
        .hasMessage("Failed to get product");
  }

  @Test
  void checkoutProducts_priceRetrievalFails_throwsRuntimeException() throws StripeException {
    Product product = createMockProduct("prod_123", "Test Song", "price_bad");
    when(stripeClient.retrieveProduct("prod_123")).thenReturn(product);
    when(stripeClient.retrievePrice("price_bad"))
        .thenThrow(new StripeException("Price not found", null, null, 404) {});

    PaymentRequestDTO request =
        PaymentRequestDTO.builder()
            .products(List.of(new ProductDTO("prod_123", 1L)))
            .currency("usd")
            .build();

    assertThatThrownBy(() -> paymentService.checkoutProducts(request))
        .isInstanceOf(RuntimeException.class)
        .hasMessage("Failed to get price");
  }

  @Test
  void checkoutProducts_sessionCreationFails_returnsFailedResponse() throws StripeException {
    Product product = createMockProduct("prod_123", "Test Song", "price_456");
    Price price = createMockPrice("usd", 999L);

    when(stripeClient.retrieveProduct("prod_123")).thenReturn(product);
    when(stripeClient.retrievePrice("price_456")).thenReturn(price);
    when(stripeClient.createSession(any(SessionCreateParams.class)))
        .thenThrow(new StripeException("Session creation failed", null, null, 500) {});

    PaymentRequestDTO request =
        PaymentRequestDTO.builder()
            .products(List.of(new ProductDTO("prod_123", 1L)))
            .currency("usd")
            .build();

    PaymentResponseDTO response = paymentService.checkoutProducts(request);

    assertThat(response.getStatus()).isEqualTo("FAILED");
    assertThat(response.getMessage()).isEqualTo("Payment session creation failed");
  }

  @Test
  void checkSessionStatus_complete_returnsSuccess() throws StripeException {
    Session session = createMockSessionWithStatus("sess_done", "complete");
    when(stripeClient.retrieveSession("sess_done")).thenReturn(session);

    SessionDTO dto = new SessionDTO();
    dto.setSessionId("sess_done");

    PaymentStatusResponseDTO response = paymentService.checkSessionStatus(dto);

    assertThat(response.getStatus()).isEqualTo("SUCCESS");
    assertThat(response.getMessage()).isEqualTo("Payment completed successfully");
    assertThat(response.getSessionId()).isEqualTo("sess_done");
  }

  @Test
  void checkSessionStatus_pending_returnsPending() throws StripeException {
    Session session = createMockSessionWithStatus("sess_pending", "open");
    when(stripeClient.retrieveSession("sess_pending")).thenReturn(session);

    SessionDTO dto = new SessionDTO();
    dto.setSessionId("sess_pending");

    PaymentStatusResponseDTO response = paymentService.checkSessionStatus(dto);

    assertThat(response.getStatus()).isEqualTo("PENDING");
    assertThat(response.getMessage()).isEqualTo("Payment is still processing");
    assertThat(response.getSessionId()).isEqualTo("sess_pending");
  }

  @Test
  void checkSessionStatus_stripeException_returnsError() throws StripeException {
    when(stripeClient.retrieveSession("sess_invalid"))
        .thenThrow(new StripeException("No such session", null, null, 404) {});

    SessionDTO dto = new SessionDTO();
    dto.setSessionId("sess_invalid");

    PaymentStatusResponseDTO response = paymentService.checkSessionStatus(dto);

    assertThat(response.getStatus()).isEqualTo("ERROR");
    assertThat(response.getMessage()).isEqualTo("Failed to retrieve payment info");
    assertThat(response.getSessionId()).isEqualTo("invalid session");
  }

  // -- Helper methods --

  private Product createMockProduct(String id, String name, String defaultPrice) {
    Product product = new Product();
    product.setId(id);
    product.setName(name);
    product.setDefaultPrice(defaultPrice);
    return product;
  }

  private Price createMockPrice(String currency, Long unitAmount) {
    Price price = new Price();
    price.setCurrency(currency);
    price.setUnitAmount(unitAmount);
    return price;
  }

  private Session createMockSession(String id, String url) {
    Session session = new Session();
    session.setId(id);
    session.setUrl(url);
    return session;
  }

  private Session createMockSessionWithStatus(String id, String status) {
    Session session = new Session();
    session.setId(id);
    session.setStatus(status);
    return session;
  }

  private void setField(Object target, String fieldName, Object value) throws Exception {
    Field field = target.getClass().getDeclaredField(fieldName);
    field.setAccessible(true);
    field.set(target, value);
  }
}
