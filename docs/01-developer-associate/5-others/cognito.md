---
title: "AWS Cognito Integration"
sidebar_label: "AWS Cognito Integration"
---

# AWS Cognito Integration

## 1. Overview & Real-World Analogy

**Real-World Analogy:** A festival gateway: User Pools checks your ID ticket at the entrance gate (Authentication), and Identity Pools exchanges it for a staff badge with keys to the supply closets (Authorization).

AWS Cognito provides authentication, authorization, and user management for web and mobile applications. It separates identity directories from temporary credentials.

---

## 2. Architecture & Flow Diagram

```mermaid
graph TD
    Client[Mobile/Web App] -->|Login| CUP[Cognito User Pool]
    CUP -->>Client[JWT ID / Access Token]
    Client -->|Present JWT| CIP[Cognito Identity Pool]
    CIP -->|Request Temp Role| STS[AWS STS]
    STS -->>CIP[Temporary IAM Credentials]
    CIP -->>Client[Access S3/DynamoDB directly]
```

---

## 3. Comparison & Decision Guidance

| Parameter | Cognito User Pools (CUP) | Cognito Identity Pools (CIP) |
| :--- | :--- | :--- |
| **Primary Output** | JSON Web Tokens (JWT) | Temporary AWS IAM Credentials |
| **Function** | User signup/login directory | Authorizes access to AWS resources |
| **Integrations** | API Gateway, ALB | S3, DynamoDB, STS |

### When to use
- When designing high-scale, production-ready solutions on AWS.
- To enforce operational excellence and follow security best practices.

### When not to use
- For basic prototyping where native defaults are sufficient.

---

## 4. Key Performance, Cost & Security Considerations

### Performance Impact
JWT verification is done locally by APIs using public keys, saving a round-trip network call to Cognito.

### Cost Impact
Billed per Monthly Active Users (MAUs), featuring a generous free tier of 50,000 MAUs.

### Security Implications
Configure Advanced Security features in CUP to enable adaptive risk-based authentication and compromised credential detection.

---

## 5. Exam tips & Traps

:::tip
**Exam Clues:** User Directory database, User Pools vs Federated Identity Pools, JWT verification, Lambda auth triggers.

Use Lambda triggers to customize JWT claims, validate registration fields, or migrate users from legacy databases during login.
:::

:::warning
**Common Exam Traps:** Never expose raw IAM credentials on client applications. Always use Cognito Identity Pools to exchange login tokens for temporary session roles.
:::

---

## Prerequisites

- [Secret Manager and System Parameters](secret-manager.md)

## Recommended Next Topics

- [JWT and Authentication](jwt-and-authentication.md)

## Related Topics

- [KMS](kms.md)
- [Secret Manager and System Parameters](secret-manager.md)
- [JWT and Authentication](jwt-and-authentication.md)
