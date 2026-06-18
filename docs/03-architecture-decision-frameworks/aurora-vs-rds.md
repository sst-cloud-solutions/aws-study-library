---
title: "Amazon Aurora vs Amazon RDS Decision Matrix"
sidebar_label: "Amazon Aurora vs Amazon RDS"
---

# Amazon Aurora vs Amazon RDS Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

| Feature | Amazon Aurora | Amazon RDS (Standard) |
| :--- | :--- | :--- |
| **Storage Engine** | Distributed, auto-scaling storage | Fixed EBS volumes (gp3, io1) |
| **Replication** | Shared storage replication (6-way copy) | Master-to-Replica block replication |
| **Failover time** | Sub-30 seconds (Shared storage) | ~30-60 seconds (Requires DNS change) |
| **Max Storage** | Up to 128 TiB | Up to 64 TiB (depends on DB engine) |

## Decision Guidance

- **Amazon Aurora:** Use for high-scale enterprise applications requiring automatic scaling storage, ultra-fast Multi-AZ failovers, and write-forwarding read replicas.
- **Amazon RDS:** Use when database requirements fit standard scaling bounds, or when using database engines not supported by Aurora (such as SQL Server, Oracle, or MariaDB).

- **Aurora:** Do not use for small databases with minimal traffic, as the minimum cluster size has higher entry cost points.
- **RDS:** Do not use when applications require high write throughput and zero read replica lag, or when storage must scale dynamically without manual resizing configurations.

---

## Key Performance, Cost & Security Considerations

### Performance Impact
Aurora provides up to 5x the throughput of standard MySQL and 3x of standard PostgreSQL. Read replicas share the storage plane, eliminating replication lag.

### Cost Impact
Aurora instances are typically 20% more expensive than standard RDS equivalents. However, Aurora storage automatically scales down, saving storage capacity fees when data is deleted. Standard RDS volumes only scale up and require manual intervention.

### Security Implications
Both support KMS storage encryption, IAM database authentication, SSL/TLS connections, and RDS Proxy integration.

---

## Exam tips & Traps

:::tip
**Exam Clues:** Use Aurora for high performance, sub-30 sec failover, auto-scaling storage to 128 TiB, and zero replication lag. Use RDS for SQL Server, Oracle, MariaDB, or standard budget-constrained setups.
:::

:::warning
**Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
:::

---

## Prerequisites

- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)

## Recommended Next Topics

- [Amazon CloudFront vs AWS Global Accelerator Decision Matrix](cloudfront-vs-global-accelerator.md)

## Related Topics

- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [Amazon CloudFront vs AWS Global Accelerator Decision Matrix](cloudfront-vs-global-accelerator.md)
- [AWS DMS vs AWS Application Migration Service (MGN) Decision Matrix](dms-vs-mgn.md)
