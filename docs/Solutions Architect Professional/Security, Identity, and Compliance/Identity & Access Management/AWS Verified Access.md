---
sidebar_position: 5
---

# AWS Verified Access

AWS Verified Access provides secure, VPN-less access to corporate applications. Built using AWS Zero Trust principles, it evaluates each access request in real-time based on user identity and device posture, ensuring that only authorized users can access specific applications.

## Key Components

- **Verified Access Endpoint:** The entry point for your application (e.g., Load Balancer, ENI).
- **Verified Access Group:** A grouping of applications with similar security requirements.
- **Trust Provider:** An identity provider (IdP) or device management system that provides information about the user or device (e.g., IAM Identity Center, Okta, CrowdStrike).
- **Verified Access Policy:** A set of rules (written in Cedar policy language) that define who can access the application under what conditions.

## Benefits

- **VPN-less Experience:** Users can access internal applications from anywhere without needing a VPN client.
- **Zero Trust Security:** Every request is verified, moving away from "perimeter-based" security.
- **Improved User Experience:** Simplifies access for employees and reduces IT overhead.
- **Centralized Management:** Manage access policies for multiple applications from a single location.

## How it Works

1. A user attempts to access an internal application.
2. Verified Access intercepts the request and evaluates it against the defined policy.
3. It checks user identity from the Trust Provider and device posture from the device management system.
4. If the conditions are met, the request is forwarded to the application endpoint.

## Exam Tips (SAP-C02)

- **VPN Replacement:** If the requirement is to provide secure access to internal apps without the complexity of a VPN, Verified Access is the answer.
- **Zero Trust:** Often associated with scenarios requiring real-time verification of both user and device state.
- **Policy Language:** Uses **Cedar**, which is also used by Amazon Verified Permissions.
- **Compliance:** Helps in meeting compliance requirements by providing detailed logs of all access requests.
