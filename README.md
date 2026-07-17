# NexusFlow

> A modern, production-style CRM platform built using Angular, Spring Boot, PostgreSQL and AWS.

---

## Overview

NexusFlow is a full-stack business operations platform designed to streamline how organizations manage customers, invoices, and business workflows.

Rather than being a CRUD demonstration project, NexusFlow is being developed as an enterprise-grade application that closely resembles how modern SaaS products are designed and deployed.

The primary objective of this project is to gain hands-on experience with production-ready architecture, clean code principles, scalable backend development, modern frontend engineering, cloud deployment, and DevOps practices.

---

## The Problem

Many small and medium-sized businesses still rely on spreadsheets, emails, and disconnected tools to manage customer information and invoice tracking.

This creates several challenges:

- Customer information scattered across multiple sources
- Manual invoice generation
- Poor visibility into customer history
- Difficult reporting
- Lack of centralized workflow
- No auditability
- Time-consuming administrative work

NexusFlow aims to provide a single platform where these business operations can be managed efficiently.

---

## Vision

The long-term vision of NexusFlow is to evolve into a modular SaaS platform capable of handling:

- Customer Relationship Management (CRM)
- Invoice Management
- User & Role Management
- Authentication & Authorization
- Reporting & Analytics
- Notifications
- Workflow Automation
- Document Generation
- File Management
- Team Collaboration

---

## Project Goals

This project has two primary goals.

### 1. Build an Enterprise Grade Application

Learn how real-world applications are architected using modern technologies and industry best practices.

### 2. Become a Better Software Engineer

Instead of simply learning frameworks individually, NexusFlow focuses on understanding how technologies work together in a complete software ecosystem.

---

# High Level Architecture

```
                Browser
                    │
            Angular 21 SPA
                    │
          REST API + JWT
                    │
          Spring Boot Backend
                    │
         Spring Security Layer
                    │
          Business Services
                    │
             MapStruct DTOs
                    │
         Spring Data JPA
                    │
             Hibernate ORM
                    │
              PostgreSQL
```

---

# Technology Stack

## Frontend

- Angular 21
- TypeScript
- Standalone Components
- Angular Signals
- Reactive Forms
- Bootstrap 5
- Bootstrap Icons

---

## Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MapStruct
- Bean Validation
- OpenPDF

---

## Database

- PostgreSQL
- Flyway Database Migration

---

## Infrastructure

- Docker
- Docker Compose
- Nginx
- AWS EC2
- AWS ECR
- GitHub Actions
- HTTPS (Let's Encrypt)

---

## Planned Technologies

The following technologies are planned as the project evolves.

- Redis
- Apache Kafka
- Kubernetes
- Microservices
- Prometheus
- Grafana
- Elasticsearch
- OpenTelemetry

---

# Current Modules

- Authentication
- User Management
- Customer Management
- Invoice Management
- Dashboard
- PDF Invoice Generation

---

# Future Modules

- Email Notifications
- Audit Logs
- Activity Timeline
- File Uploads
- Search
- Team Management
- Reports
- Analytics
- Workflow Engine
- Calendar
- Payment Integration

---

# Learning Objectives

NexusFlow is intentionally designed to explore several areas of software engineering.

- Clean Architecture
- REST API Design
- Authentication & Authorization
- Spring Security
- DTO Mapping
- Database Design
- ORM
- Docker
- CI/CD
- AWS Deployment
- Caching
- Event Driven Architecture
- System Design

---

# Repository Structure

```
src/
docs/
docker/
.github/
```

Detailed documentation is available inside the **docs** directory.

---

# Documentation

The project documentation is organized separately for easier learning and revision.

- Architecture
- Frontend
- Backend
- Spring Security
- JWT
- Docker
- AWS
- Redis
- Kafka
- CI/CD
- Interview Notes

---

# Why This Project Exists

NexusFlow is not intended to be just another portfolio application.

It serves as a long-term engineering playground where new technologies, architectural patterns, and infrastructure concepts can be implemented incrementally while keeping the codebase production-oriented.

Every new feature is an opportunity to learn how enterprise software is built, tested, deployed, monitored, and maintained.

---

# Roadmap

- Authentication
- Customer Module
- Invoice Module
- Dashboard
- PDF Generation
- Dockerization
- AWS Deployment
- Redis Integration
- Kafka Messaging
- Email Service
- Monitoring
- Microservices Migration

---

# License

This project is developed for educational purposes and continuous learning.
