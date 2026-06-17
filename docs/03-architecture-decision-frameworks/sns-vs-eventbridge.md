---
title: "Amazon SNS vs Amazon EventBridge Decision Matrix"
sidebar_label: "Amazon SNS vs Amazon EventBridge"
---

# Amazon SNS vs Amazon EventBridge Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

| Feature | Amazon SNS | Amazon EventBridge |
| :--- | :--- | :--- |
| **Payload Routing** | Simple message attributes matching | Rich JSON pattern matching schema |
| **Target Types** | HTTP, SQS, SMS, Email, Lambda | 20+ AWS services, API destinations |
| **Latency** | Sub-10ms (Real-time pub/sub) | Typically sub-second (usually ~100-200ms) |
| **Schema Registry** | No | Yes (Auto-detects payload shapes) |

## Decision Guidance

- **Amazon SNS:** Use when you need low-latency, real-time message fanout to SQS queues, HTTP endpoints, or mobile notifications (SMS/Push).
- **Amazon EventBridge:** Use when building modern event-driven microservices requiring rich JSON payload filtering, third-party SaaS integrations (SaaS event buses), or scheduled cron triggers.

- **SNS:** Do not use when target subscribers need to filter messages based on deep content patterns in the JSON body payload.
- **EventBridge:** Do not use for real-time high-frequency streaming applications where sub-10ms latency is a hard constraint.

---

## Key Performance, Cost & Security Considerations

### Performance Impact
SNS delivers message fanout with near-instantaneous latency. EventBridge has slightly higher latency due to JSON rule matching operations.

### Cost Impact
SNS is billed per million requests published. EventBridge custom events are billed per million events published. AWS service events (e.g. EC2 state change) in EventBridge are free, making it cost-effective for AWS system automation.

### Security Implications
Both integrate with KMS keys for message encryption, and support resource-based policies to control who can publish events.

---

## Exam tips & Traps

:::tip
**Exam Clues:** Use SNS for raw throughput, fast message fanout, SMS/Email, and low latency. Use EventBridge for JSON content filtering, SaaS integrations, cron rules, API destinations, and event replay.
:::

:::warning
**Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
:::

---

## Prerequisites

- [Amazon EFS vs Amazon FSx Decision Matrix](efs-vs-fsx.md)

## Recommended Next Topics

- [Amazon SQS vs Amazon MQ Decision Matrix](sqs-vs-mq.md)

## Related Topics

- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)
