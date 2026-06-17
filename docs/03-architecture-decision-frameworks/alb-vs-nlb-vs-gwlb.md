---
title: "ALB vs NLB vs GWLB Decision Matrix"
sidebar_label: "ALB vs NLB vs GWLB"
---

# ALB vs NLB vs GWLB Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

| Feature | Application Load Balancer (ALB) | Network Load Balancer (NLB) | Gateway Load Balancer (GWLB) |
| :--- | :--- | :--- | :--- |
| **Layer** | Layer 7 (HTTP/HTTPS/HTTP2/gRPC) | Layer 4 (TCP/UDP/TLS) | Layer 3 (IP Packets) |
| **Routing Protocol**| Path/Host/Header-based routing | IP/Port-based routing | Route redirection (GENEVE 6081) |
| **Target Latency** | Millisecond range (~5-10ms) | Microsecond range (&lt;1ms) | Millisecond range (hop latency) |
| **Static IPs?** | No (Uses dynamically scaling IPs) | Yes (One Elastic IP per AZ) | No |

## Decision Guidance

- **Application Load Balancer (ALB):** Use for standard web applications, microservices (ECS/EKS) requiring path-based or host-based routing, and SSL termination at the edge.
- **Network Load Balancer (NLB):** Use for high-performance TCP/UDP workloads, gaming servers, financial applications requiring ultra-low latency, and when you need static/Elastic IPs for client allowlists.
- **Gateway Load Balancer (GWLB):** Use when inserting third-party virtual security firewalls or IDS/IPS appliances inline into the VPC network flow.

- **ALB:** Do not use for non-HTTP applications, or workloads that need to handle millions of connections per second instantly (ALB requires scaling time).
- **NLB:** Do not use when you need advanced Layer 7 routing logic, cookie-based sticky sessions, or HTTP header injection.
- **GWLB:** Do not use for standard application traffic load balancing; it is strictly a network appliance interceptor.

---

## Key Performance, Cost & Security Considerations

### Performance Impact
NLB offers the highest performance, scaling instantly to handle millions of requests/second. ALB adds small Layer 7 header parsing latency. GWLB adds a hop latency for GENEVE encapsulation and firewall processing.

### Cost Impact
ALB and NLB are billed per hour plus Load Balancer Capacity Units (LCUs). NLB LCUs cover higher bandwidth and connections. GWLB is billed per GWLB endpoint hour and data processing. Centralizing firewalls in a shared transit VPC using GWLB saves firewall software licensing costs.

### Security Implications
ALB integrates with AWS WAF for HTTP rule scanning. NLB does not support WAF. GWLB routes all traffic through security appliances, ensuring deep packet inspection.

---

## Exam tips & Traps

:::tip
**Exam Clues:** Use ALB for Layer 7 microservices, container routing, and WAF integration. Use NLB for Layer 4, static IP allowlists, ultra-low latency, and TCP traffic. Use GWLB for inline firewall appliances, GENEVE encapsulation, and port 6081.
:::

:::warning
**Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
:::

---

## Prerequisites

- [Workshop 4](../04-architecture-workshops/multi-region-dr.md)

## Recommended Next Topics

- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)

## Related Topics

- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)
- [Amazon CloudFront vs AWS Global Accelerator Decision Matrix](cloudfront-vs-global-accelerator.md)
- [AWS DMS vs AWS Application Migration Service (MGN) Decision Matrix](dms-vs-mgn.md)
