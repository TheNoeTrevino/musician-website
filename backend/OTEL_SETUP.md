# OpenTelemetry Setup for Sebastian API

Your backend is now configured to send distributed traces to Tempo via OpenTelemetry.

## What's Been Added

- **Dependency**: `opentelemetry-spring-boot-starter` in `build.gradle.kts`
- **Configuration**: OpenTelemetry settings in `application.properties`
  - Service name: `sebastian-api`
  - Exporter: gRPC to `http://localhost:4317`

## How to Run

### 1. Start the monitoring stack (Tempo + OpenTelemetry Collector)

In the `/monitoring` directory:

```bash
docker-compose up -d
```

This starts:
- Grafana (http://localhost:3001)
- Prometheus (http://localhost:9090)
- Tempo (http://localhost:3200)
- OpenTelemetry Collector (http://localhost:4317)

### 2. Run the backend

```bash
cd backend
./gradlew bootRun
```

Or with Java 21:

```bash
java -jar build/libs/sebastian-api.jar
```

## Automatic Instrumentations

The OpenTelemetry starter automatically instruments:
- ✅ Spring Web (HTTP requests, REST controllers)
- ✅ Spring Data JPA (database queries)
- ✅ PostgreSQL JDBC
- ✅ RestTemplate calls
- ✅ Mail sending
- ✅ Security (auth/authorization)

## View Traces in Grafana

1. Open http://localhost:3001
2. Go to **Explore** tab
3. Select **Tempo** data source
4. Search by service name: `sebastian-api`
5. Click any trace to see the full trace details

## Adding Custom Spans

If you want to trace custom operations:

```java
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.GlobalOpenTelemetry;

@Service
public class MyService {
    private final Tracer tracer = GlobalOpenTelemetry.getTracer("sebastian-api");

    public void myBusinessLogic() {
        try (var scope = tracer.spanBuilder("process-payment").startAndMakeActive()) {
            // Your code here - automatically traced
        }
    }
}
```

## Configuration for Production

In production, set via environment variables:

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://tempo.production.com
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_RESOURCE_ATTRIBUTES=service.name=sebastian-api,environment=production
```

## Troubleshooting

**Traces not appearing?**
- Verify OpenTelemetry Collector is running: `docker ps | grep otel-collector`
- Check application logs for connection issues
- Ensure `otel.sdk.disabled=false` in `application.properties`

**Can't connect to collector?**
- If running locally: use `http://localhost:4317`
- If in Docker: use `http://otel-collector:4317`

**Performance concerns?**
- Check sampling in `application.properties` or environment variables
- Increase batch processor timeout
