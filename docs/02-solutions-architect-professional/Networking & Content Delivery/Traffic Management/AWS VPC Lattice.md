---
sidebar_position: 6
---

# AWS VPC Lattice

AWS VPC Lattice is a fully managed application networking service that simplifies connecting, securing, and monitoring services across multiple VPCs and accounts. It abstracts away the complexity of managing network connectivity, load balancing, and service-to-service communication.

## Key Concepts

- **Service:** A logical unit of software that performs a specific task.
- **Service Directory:** A central registry of all services you own or have access to.
- **Service Network:** A logical boundary used to group services together. You associate VPCs with a Service Network to enable connectivity.
- **Target Group:** A collection of targets (e.g., EC2, Lambda, IP addresses, ALBs) that perform the work for a service.
- **Listener:** A process that checks for connection requests.

## Key Benefits

- **Simplify Multi-VPC Connectivity:** Connect services across different VPCs and accounts without managing complex VPC peering or Transit Gateway routing.
- **Support for Overlapping IP Addresses:** Since Lattice handles communication at the application layer, it can connect services even if their VPCs have overlapping CIDR blocks.
- **Built-in Security:** Implement fine-grained access control using IAM and Service Network policies. Supports mutual TLS (mTLS).
- **Traffic Management:** Easily implement blue/green deployments, canary releases, and weighted routing.
- **Observability:** Provides detailed metrics and logs for service-to-service communication.

## Architecture

1. **Associate VPCs** with a Service Network.
2. **Register Services** with the Service Network.
3. **Configure Listeners and Rules** to route traffic to Target Groups.
4. **Define Policies** to control which services can communicate with each other.

## Exam Tips (SAP-C02)

- **Overlapping IPs:** If the exam mentions connecting services with overlapping CIDRs, VPC Lattice is often the most modern and efficient solution.
- **Multi-Account/Multi-VPC:** Lattice simplifies the "service mesh" experience without requiring sidecars or complex agent installations.
- **Protocol Support:** Supports HTTP/1.1, HTTP/2, and gRPC.
- **Security:** Use Lattice to enforce a "Zero Trust" architecture within your AWS environment.

---

## Prerequisites

- [AWS Elastic Load Balancing](AWS Elastic Load Balancing.md)

## Recommended Next Topics

- [Gateway Load Balancer](../gateway-load-balancer.md)

## Related Topics

- [AWS Elastic Load Balancing](AWS Elastic Load Balancing.md)
