package com.project.backend.health;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class OtelCollectorHealthIndicator implements HealthIndicator {

    @Value("${app.otel-collector-url:http://localhost:4318}")
    private String otelCollectorUrl;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(3))
            .build();

    @Override
    public Health health() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(otelCollectorUrl))
                    .timeout(Duration.ofSeconds(5))
                    .GET()
                    .build();
            HttpResponse<String> response = httpClient.send(request,
                    HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 500) {
                return Health.up()
                        .withDetail("service", "OpenTelemetry Collector")
                        .withDetail("url", otelCollectorUrl)
                        .build();
            }
            return Health.down()
                    .withDetail("service", "OpenTelemetry Collector")
                    .withDetail("statusCode", response.statusCode())
                    .build();
        } catch (Exception e) {
            return Health.down(e)
                    .withDetail("service", "OpenTelemetry Collector")
                    .withDetail("url", otelCollectorUrl)
                    .build();
        }
    }
}
