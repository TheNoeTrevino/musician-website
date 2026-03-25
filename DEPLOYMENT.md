# Deployment

## Architecture

```
                 DigitalOcean Droplet              Raspberry Pi (self-hosted runner)
                ┌───────────────────┐          ┌──────────────────────────────────┐
                │   Reverse Proxy   │          │  /opt/sebastian/prod  (main)     │
   User ──────► │   (Caddy/Nginx)   │ ───────► │    sebastian-api-prod  :38741    │
                │                   │          │                                  │
                │ /var/www/sebastian│          │  /opt/sebastian/qa    (qa)       │
                │   (static files)  │          │    sebastian-api-qa   :38742     │
                └───────────────────┘          │                                  │
                  hostname: reverse-proxy      │  PostgreSQL :5432                │
                                               │  OTEL Collector :4317/4318       │
                                               └──────────────────────────────────┘
```

- **Frontend**: Built static files are rsynced to the reverse proxy droplet at `/var/www/sebastian/`
- **Backend**: Spring Boot JAR running as a systemd service on the Pi
- **Database**: PostgreSQL on the Pi (`localhost:5432`)
- **Observability**: OpenTelemetry collector on the Pi, Tempo/Grafana for tracing

## Environments

| | Prod | QA |
|---|---|---|
| Branch | `main` | `qa` |
| Directory | `/opt/sebastian/prod` | `/opt/sebastian/qa` |
| Systemd service | `sebastian-api-prod` | `sebastian-api-qa` |
| Port | `38741` | `38742` |
| Workflow | `deploy-prod.yml` | `deploy-qa.yml` |

Both environments run on the same Raspberry Pi. Each has its own `.env`, service file, and checkout directory.

## CI/CD

GitHub Actions with a self-hosted runner on the Pi. Workflows trigger on push to their respective branches.

**Pipeline steps** (same for both environments):
1. `git fetch && git reset --hard` to pull latest code
2. Build frontend: `npm ci && npm run build`
3. Build backend: `./gradlew bootJar`
4. `sudo systemctl restart sebastian-api-{env}`
5. `rsync` frontend dist to reverse proxy droplet
6. Health check against `/api/health`

## Systemd Services

Service files live at `/etc/systemd/system/sebastian-api-{prod,qa}.service`.

```ini
[Unit]
Description=Sebastian Website API
After=network.target postgresql.service

[Service]
Type=simple
User=noetrevino
WorkingDirectory=/opt/sebastian/{env}
EnvironmentFile=/opt/sebastian/{env}/.env
ExecStart=/usr/bin/java -jar /opt/sebastian/{env}/backend/build/libs/sebastian-api.jar
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

After modifying a service file:
```bash
sudo systemctl daemon-reload
sudo systemctl restart sebastian-api-{env}
```

## Sudoers

The GitHub Actions runner needs passwordless sudo for service restarts. Add via `sudo visudo -f /etc/sudoers.d/sebastian-deploy`:

```
noetrevino ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart sebastian-api-prod, /usr/bin/systemctl restart sebastian-api-qa
```

## Environment Variables

Each environment has its own `.env` file at `/opt/sebastian/{env}/.env`. See `.env.example` for the template.

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL JDBC connection string |
| `DATABASE_USER` | Database username |
| `DATABASE_PW` | Database password |
| `DEFAULT_SCHEMA` | PostgreSQL schema name |
| `BACKEND_PORT` | API server port (38741 prod, 38742 qa) |
| `EMAIL_USER` | SMTP username (Gmail) |
| `EMAIL_PW` | SMTP app password |
| `FRONTEND_URL` | Public frontend URL |
| `JWT_SECRET` | JWT signing key |
| `STRIPE_PUBLISHABLE` | Stripe publishable key |
| `STRIPE_SECRET` | Stripe secret key |
| `VITE_BACKEND_URL` | Backend URL used by frontend build |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OpenTelemetry collector endpoint |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | OTLP protocol (`grpc`) |
| `OTEL_LOGS_EXPORTER` | Logs exporter config |

QA should use Stripe **test** keys, a separate database/schema, and its own JWT secret.

## Setting Up a New Environment

1. Clone the repo to `/opt/sebastian/{env}`
2. Copy `.env.example` to `.env` and fill in values
3. Create the systemd service file (use prod as a template, change paths and description)
4. Enable the service: `sudo systemctl enable sebastian-api-{env}`
5. Add the sudoers entry for the new service
6. Build and start:
   ```bash
   cd /opt/sebastian/{env}/frontend && npm ci && npm run build
   cd /opt/sebastian/{env}/backend && ./gradlew bootJar
   sudo systemctl start sebastian-api-{env}
   ```

## Health Check

```bash
curl http://localhost:38741/api/health   # prod
curl http://localhost:38742/api/health   # qa
```

Reports status of: database, Stripe, SMTP, and OpenTelemetry collector.
