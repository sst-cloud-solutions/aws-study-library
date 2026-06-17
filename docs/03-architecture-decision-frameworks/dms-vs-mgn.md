---
title: "AWS DMS vs AWS Application Migration Service (MGN) Decision Matrix"
sidebar_label: "AWS DMS vs AWS Application Migration Service (MGN)"
---

# AWS DMS vs AWS Application Migration Service (MGN) Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

| Feature | AWS Database Migration Service (DMS) | AWS Application Migration Service (MGN) |
| :--- | :--- | :--- |
| **Scope** | Database-level data replication | Server block-level replication (OS + Disk) |
| **Source Type** | SQL, NoSQL databases | Any physical server or VM (Windows/Linux) |
| **Target Type** | RDS, Aurora, DynamoDB, S3 | EC2 Instance VMs |
| **Method** | Continuous database transactional replication | Block-level continuous background replication |

## Decision Guidance

- **AWS DMS:** Use when migrating database tables, when you need to perform heterogeneous conversions (using SCT, e.g. Oracle to Aurora PostgreSQL), or to sync databases continuously.
- **AWS MGN:** Use to lift-and-shift physical or virtual servers (OS, configuration, application files, database files) directly into EC2 VMs with minimal downtime.

- **DMS:** Do not use for migrating whole operating systems or non-database files.
- **MGN:** Do not use when refactoring applications to serverless architectures, or when doing heterogeneous database migrations.

---

## Key Performance, Cost & Security Considerations

### Performance Impact
DMS replication requires resources on the source database to read transaction logs. MGN runs an agent that copies disk blocks, optimizing host performance impacts.

### Cost Impact
DMS replication instances are billed hourly. AWS MGN is free to use for the first 90 days per server migrated. Standard EC2 staging and EBS replication storage charges apply during replication.

### Security Implications
Both support secure TLS tunnels and KMS disk encryption to protect migration data.

---

## Exam tips & Traps

:::tip
**Exam Clues:** Use DMS for database-only migrations, schema changes (SCT), and continuous DB sync. Use MGN for lift-and-shift server migrations, OS level copy, and physical/virtual to EC2 replication.
:::

:::warning
**Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
:::

---

## Prerequisites

- [Amazon CloudFront vs AWS Global Accelerator Decision Matrix](cloudfront-vs-global-accelerator.md)

## Recommended Next Topics

- [ECS vs EKS Decision Matrix](ecs-vs-eks.md)

## Related Topics

- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)
