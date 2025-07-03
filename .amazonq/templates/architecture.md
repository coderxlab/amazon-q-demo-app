# 🏗️ Architecture: [Project Name]

**Status**: 🟠 DRAFT  
**Last Updated**: [Current updated dated in the format of YYYY-MM-DD (DO NOT makeup, just use bash command to get today date)]
**Author(s)**: [Name of User (if the user not provides their name, use their github username)]

---

## 📚 Technical Summary

- Microservice-based architecture for dynamic service registration and tool execution
- Built using React, FastAPI, PostgreSQL, and AWS infrastructure
- Dynamically generates OpenAPI endpoints based on external AI tools
- Designed for modular expansion and high performance under 500 RPS
- Supports flexible backend types (stdio, SSE, streamable HTTP)

---

## 🧰 Technology Stack

| Layer         | Technology         | Purpose              | Version/Notes            |
|---------------|--------------------|-----------------------|---------------------------|
| **Frontend**  | ReactJS            | Web UI                | Latest Stable             |
|               | TypeScript         | Type Safety           | v5.x                      |
| **Backend**   | Python             | Server Runtime        | 3.11+                     |
|               | FastAPI            | API Framework         | Async + typed             |
|               | Pydantic v2        | Data Validation       | Used for input/output     |
| **Database**  | PostgreSQL         | Relational DB         | v15.x on RDS              |
| **Infra**     | AWS API Gateway    | API Routing           | REST mode                 |
|               | AWS ECS/Fargate    | App Container Hosting | + ALB                     |
| **Monitoring**| CloudWatch         | Logs & Metrics        | Custom dashboards         |
| **CI/CD**     | GitHub Actions     | Build & Deployment    | Multi-stage workflows     |

---

## 🌐 High-Level System Architecture

```mermaid
flowchart LR
  FE[Frontend UI] --> APIGW[AWS API Gateway]
  APIGW --> FastAPI[FastAPI Service]
  FastAPI --> DB[(PostgreSQL)]
  FastAPI --> ToolServer[External AI Tool Server]
  FastAPI --> S3[Tool Configuration Storage]
```

---

## 🧩 Core Business Flow: Service Registration

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant DevPortal
    participant MCPO
    participant MCPServer
    participant DB
    participant Gateway

    Dev->>DevPortal: Submit service config
    DevPortal->>MCPO: POST /api/v1/mcpo/services
    MCPO->>MCPServer: session.initialize()
    MCPServer-->>MCPO: Server info
    MCPO->>MCPServer: session.list_tools()
    MCPServer-->>MCPO: Tools + schemas
    MCPO->>DB: Save service metadata
    MCPO->>Gateway: Update OpenAPI
    MCPO-->>DevPortal: Return tool endpoints
    DevPortal-->>Dev: Confirmation
```

---

## 🧱 Detailed Module Architecture

```mermaid
graph TD
  UI[React UI] -->|API Calls| FastAPI
  FastAPI --> Routers[Route Handlers]
  Routers --> Services[Service Logic]
  Services --> DB[(PostgreSQL)]
  Services --> External[Tool Servers]
```

---

## 🗃️ Data Models

```mermaid
erDiagram
    MCPService ||--o{ Tool : has
    Tool }o--|| Schema : validates
    MCPService {
        string id PK
        string name
        string status
        json config
    }
    Tool {
        string id PK
        string name
        string endpoint
    }
    Schema {
        string id PK
        string type
        json inputSchema
        json outputSchema
    }
```

---

## 🔐 Security Architecture

```mermaid
flowchart TD
  FE --> Auth0[OAuth Provider]
  Auth0 --> Token[JWT Token]
  Token --> APIGW
  APIGW --> FastAPI
  FastAPI --> RBAC[Role Policy Check]
```

* **Authentication**: OAuth2 with Auth0
* **Authorization**: Role-based via JWT claims
* **Token Expiry**: 15 minutes
* **Refresh Strategy**: Silent re-authentication on frontend

---

## 🚀 Deployment Architecture

```mermaid
graph TD
  GitHub -->|CI| GH-Actions
  GH-Actions -->|Lint, Test, Build| Docker
  Docker -->|Push| ECR
  GH-Actions --> ECS[Fargate Service]
  ECS --> APIGW
```

### Environments

1. **Development** – Debugging enabled, feature flags on
2. **Staging** – Full-scale mock of production
3. **Production** – Scaled environment with monitoring, alerts

---

## 🔁 CI/CD Pipeline

* **CI Steps**

  * Lint → Typecheck → Unit Tests → Build Artifact
* **CD Steps**

  * Docker image pushed to ECR
  * Auto-deploy to ECS (dev/staging)
  * Manual promotion to production with rollback plan

---

## 📈 Monitoring & Observability

### Metrics to Track

* API error rates (4xx, 5xx)
* Response latency (p95)
* DB connection pool usage
* Task execution failures
* Tool connection success rate

### Alerts

* 5xx error rate > 2% (5 min window)
* DB pool usage > 90%
* Tool registration failures
* S3 upload failures

### Dashboards

* CloudWatch Dashboards: Latency, CPU, Memory, Errors
* Log Insights: JSON structured logs with request ID correlation

---

## 📐 Development Guidelines

### Folder Structure

```plaintext
/backend
  ├── routers/
  ├── services/
  ├── schemas/
  ├── models/
  └── utils/

/frontend
  ├── pages/
  ├── components/
  ├── hooks/
  └── lib/
```

---

### Request Lifecycle

```mermaid
sequenceDiagram
  Client->>API Gateway: HTTP Request
  API Gateway->>FastAPI: Forward request
  FastAPI->>Service Layer: Business logic
  Service Layer->>DB: Query/update
  DB-->>Service Layer: Result
  Service Layer-->>FastAPI: Response
  FastAPI-->>Client: HTTP 200 OK
```

---

## 🧪 Testing Strategy

### Frameworks

| Type        | Tool                    |
| ----------- | ----------------------- |
| Unit Tests  | `pytest`, `jest`        |
| Integration | `pytest`, `supertest`   |
| End-to-End  | `Playwright`, `Cypress` |

### Test Structure

```plaintext
/tests
  ├── unit/
  ├── integration/
  └── e2e/
```

### Testing Best Practices

1. **Unit Tests**

   * Cover service methods in isolation
   * No external DB or API calls

2. **Integration Tests**

   * Use in-memory DB (e.g. SQLite)
   * Assert API + DB interaction

3. **E2E Tests**

   * Simulate real user flows
   * Run against staging

---

## 📌 Appendix

* [OpenAPI Specification](#)
* [Confluence Design Doc](#)
* [Glossary of Terms](#)

```
