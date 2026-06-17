---
sidebar_position: 4
---

# Amazon Verified Permissions

Amazon Verified Permissions is a scalable, fine-grained permissions management and authorization service for custom applications. It centralizes permissions management, making it easier for developers to build secure applications and for admins to manage access.

## Key Features

- **Centralized Authorization:** Decouple authorization logic from application code.
- **Cedar Policy Language:** Use a powerful, easy-to-read language to define fine-grained permissions (RBAC and ABAC).
- **Fast Evaluation:** Millisecond-level authorization decisions.
- **Auditability:** Track changes to permissions and audit authorization decisions.
- **Integration:** Works with identity providers like Amazon Cognito and IAM Identity Center.

## Core Concepts

- **Policy Store:** A container for your policies and schema.
- **Policy:** A statement that allows or forbids an action on a resource.
- **Schema:** Defines the types of principals, resources, and actions that your application supports.
- **Authorization Request:** A request from your application to Verified Permissions to check if a principal is allowed to perform an action on a resource.

## Use Cases

- **SaaS Applications:** Manage complex permissions for different tenants and users.
- **Internal Tools:** Define who can view, edit, or delete specific data within an organization.
- **Microservices:** Implement consistent authorization across multiple services.

## Exam Tips (SAP-C02)

- **Application Authorization:** Unlike IAM (which is for AWS resources), Verified Permissions is for **custom application-level** authorization.
- **Cedar:** Remember the name of the policy language.
- **Scaling:** Designed to handle millions of authorization requests per second.
- **Comparison with Cognito:** Cognito handles *authentication* (who are you?), while Verified Permissions handles *authorization* (what can you do?).

---

## Prerequisites

- [AWS Identity and Access Management (IAM)](AWS Identity and Access Management.md)

## Recommended Next Topics

- [AWS Verified Access](AWS Verified Access.md)

## Related Topics

- [Amazon Cognito](Amazon Cognito.md)
- [AWS Directory Services](AWS Directory Services.md)
- [AWS IAM Identity Center](AWS IAM Identity Center.md)
