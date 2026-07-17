# 🏗️ NexusFlow Architecture

This document explains the overall architecture of NexusFlow, the responsibility of each layer, how requests travel through the application, and why each technology has been chosen.

---

# Table of Contents

- High Level Architecture
- Design Principles
- Application Layers
- Request Flow
- Backend Architecture
- Frontend Architecture
- Data Flow
- Security Flow
- Deployment Architecture
- Technology Decisions
- Future Architecture
- Interview Questions

---

# High Level Architecture

```
                        Internet
                             │
                  https://nexusflow.works
                             │
                  Nginx Reverse Proxy
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        │                                         │
Angular 21 SPA                         Spring Boot REST API
 (Frontend)                                (Backend)
        │                                         │
        │              HTTP + JWT                 │
        └────────────────────┬────────────────────┘
                             │
                    Spring Security
                             │
                 JwtAuthenticationFilter
                             │
                     Security Context
                             │
                      REST Controllers
                             │
                     Business Services
                             │
                        MapStruct DTO
                             │
                    Spring Data Repository
                             │
                        Hibernate ORM
                             │
                        PostgreSQL
                             │
      ┌──────────────────────┼────────────────────────┐
      │                      │                        │
   Flyway                Redis Cache           Kafka Events
(Migration)              (Future)               (Future)
```

---

# Architecture Philosophy

NexusFlow follows a layered architecture where every layer has a single responsibility.

Each layer only communicates with the layer immediately below it.

```
Presentation

↓

Business Logic

↓

Persistence

↓

Database
```

This separation makes the application:

- Easy to maintain
- Easy to test
- Easy to scale
- Easier to understand

---

# Frontend Architecture

```
Browser

↓

Angular

↓

Standalone Components

↓

Signals

↓

Reactive Forms

↓

Services

↓

HTTP Client

↓

JWT Interceptor

↓

REST APIs
```

## Responsibilities

### Components

Responsible for:

- Displaying UI
- User interaction
- Binding Signals
- Forms

Components should never contain business logic.

---

### Services

Responsible for

- API calls
- State management
- Business operations
- Reusable logic

Examples

- AuthService
- CustomerService
- InvoiceService

---

### Signals

Signals hold application state.

Example

```
Current User

Token

Customers

Invoices

Loading State
```

Signals automatically update the UI whenever data changes.

---

# Backend Architecture

```
Controller

↓

Service

↓

Repository

↓

Database
```

---

## Controller Layer

Responsibilities

- Receive HTTP Requests
- Validate Input
- Return HTTP Responses
- Call Services

Controllers should remain thin.

---

## Service Layer

This is the heart of the application.

Responsible for:

- Business rules
- Transactions
- Validation
- Communication with repositories
- DTO mapping

Most application logic belongs here.

---

## Repository Layer

Repositories communicate with the database using Spring Data JPA.

Responsibilities

- CRUD
- Pagination
- Searching
- Custom Queries

Business logic should never exist inside repositories.

---

## Database Layer

Current Database

- PostgreSQL

Future additions

- Redis
- Kafka
- Elasticsearch

---

# DTO Architecture

```
Entity

↓

MapStruct

↓

DTO

↓

JSON

↓

Angular
```

Why?

Entities should never be exposed directly.

DTOs

- hide internal fields
- reduce payload size
- improve security
- decouple API from database

---

# Request Flow

```
Browser

↓

Angular Component

↓

Service

↓

HTTP Client

↓

JWT Interceptor

↓

Spring Boot

↓

Security Filter

↓

Controller

↓

Service

↓

Repository

↓

Hibernate

↓

PostgreSQL

↓

Repository

↓

Service

↓

DTO Mapping

↓

JSON

↓

Angular Signal

↓

UI Refresh
```

---

# Security Flow

```
User Login

↓

Username + Password

↓

Authentication

↓

JWT Generated

↓

Angular stores JWT

↓

Interceptor

↓

Authorization Header

↓

Spring Security

↓

JWT Validation

↓

Security Context

↓

Controller Access
```

---

# Deployment Architecture

```
Git Push

↓

GitHub Actions

↓

Build

↓

Docker Image

↓

AWS ECR

↓

AWS EC2

↓

Docker Compose

↓

Nginx

↓

Internet
```

---

# Why These Technologies?

| Technology      | Why                                    |
| --------------- | -------------------------------------- |
| Angular         | Modern reactive frontend               |
| Spring Boot     | Enterprise backend                     |
| Spring Security | Authentication & Authorization         |
| JWT             | Stateless authentication               |
| PostgreSQL      | Reliable relational database           |
| Hibernate       | ORM                                    |
| MapStruct       | Fast DTO mapping                       |
| Flyway          | Version-controlled database migrations |
| Docker          | Consistent runtime environment         |
| Nginx           | Reverse proxy & HTTPS                  |
| AWS             | Cloud hosting                          |
| GitHub Actions  | Automated CI/CD                        |
| Redis           | Caching (planned)                      |
| Kafka           | Asynchronous messaging (planned)       |

---

# Scalability Roadmap

Current

```
Angular

↓

Spring Boot

↓

PostgreSQL
```

Future

```
Internet

↓

Load Balancer

↓

Nginx

↓

Spring Boot Instance 1

↓

Spring Boot Instance 2

↓

Spring Boot Instance 3

↓

Redis

↓

Kafka

↓

PostgreSQL
```

Future improvements include

- Horizontal Scaling
- Redis Cache
- Kafka Messaging
- Microservices
- Monitoring
- Distributed Logging
- Kubernetes

---

# Architecture Decisions

## Why Layered Architecture?

Simple

Maintainable

Easy to understand

---

## Why DTOs?

Avoid exposing database entities.

---

## Why MapStruct?

Compile-time mapping with better performance than reflection-based mappers.

---

## Why JWT?

Stateless authentication allows horizontal scaling without maintaining server-side sessions.

---

## Why Flyway?

Database schema changes become version controlled alongside application code.

---

## Why Docker?

Every developer and deployment environment runs the application consistently.

---

# Key Takeaways

- Thin Controllers
- Fat Services
- Repository only for persistence
- DTOs instead of Entities
- Stateless Authentication
- Layered Architecture
- Infrastructure as Code
- Automated Deployment
- Database Versioning

---

# Interview Questions

### Explain your application architecture.

---

### Why did you choose layered architecture?

---

### Why not expose entities directly?

---

### Why use DTOs?

---

### What happens after login?

---

### Explain JWT authentication.

---

### Why Spring Security?

---

### How would you scale NexusFlow?

---

### Where would Redis fit?

---

### Where would Kafka fit?

---

### What role does Flyway play?

---

### Explain your CI/CD pipeline.

---

# Related Documents

- frontend.md
- spring-security.md
- jwt.md
- request-lifecycle.md
- customer-module.md
- invoice-module.md
- docker.md
- aws.md
