---
title: "Amazon CloudFront vs AWS Global Accelerator Decision Matrix"
sidebar_label: "Amazon CloudFront vs AWS Global Accelerator"
---

# Amazon CloudFront vs AWS Global Accelerator Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

| Feature | Amazon CloudFront | AWS Global Accelerator |
| :--- | :--- | :--- |
| **Caching** | Caches static/dynamic content at edge | No content caching (packet proxy only) |
| **Target Content** | HTTP/HTTPS workloads | TCP and UDP (HTTP, gaming, voice) |
| **IP addresses** | Dynamic DNS names | Two static Anycast IPs |
| **Protocol** | Layer 7 only | Layer 4 and Layer 3 routing |

## Decision Guidance

- **Amazon CloudFront:** Use for caching web content, images, videos, static websites, and dynamic API endpoints using HTTP/HTTPS.
- **AWS Global Accelerator:** Use when you need to route non-HTTP protocols (gaming, VOIP, database connections), require static Anycast IPs for client firewall rules, or need fast failover between regional endpoints.

- **CloudFront:** Do not use for raw TCP/UDP workloads (like gaming protocols or SSH connections).
- **Global Accelerator:** Do not use for static web page hosting or file download acceleration where edge caching is required to reduce origin load.

---

## Key Performance, Cost & Security Considerations

### Performance Impact
CloudFront caches content at 400+ Edge locations, reducing origin round-trips. Global Accelerator routes IP packets over the private AWS global fiber network, reducing jitter and latency.

### Cost Impact
CloudFront bills for data transfer output and requests. Global Accelerator charges a daily flat base fee plus a data transfer markup fee (DT-Premium) based on the destination region.

### Security Implications
CloudFront integrates with WAF and terminates SSL/TLS at the edge. Global Accelerator routes TCP/UDP traffic directly to regional targets, allowing security group enforcement at the origin.

---

## Exam tips & Traps

:::tip
**Exam Clues:** Use CloudFront for HTTP/HTTPS caching, media streaming, static sites, and WAF integration. Use Global Accelerator for Anycast static IPs, non-HTTP (TCP/UDP), gaming, voice, and fast cross-region failover.
:::

:::warning
**Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
:::

---

## Prerequisites

- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)

## Recommended Next Topics

- [AWS DMS vs AWS Application Migration Service (MGN) Decision Matrix](dms-vs-mgn.md)

## Related Topics

- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)
