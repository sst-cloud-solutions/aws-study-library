---
title: "Amazon DynamoDB Accelerator (DAX)"
sidebar_label: "Amazon DynamoDB Accelerator (DAX)"
---

# Amazon DynamoDB Accelerator (DAX)

## 1. Overview & Real-World Analogy

**Real-World Analogy:** A convenience store rack right at the checkout counter: instead of walking down the aisles of the warehouse (DynamoDB query), you grab the soda immediately from the cache.

Amazon DynamoDB Accelerator (DAX) is a fully managed, highly available, in-memory cache for Amazon DynamoDB that delivers up to a 10x performance improvement.

---

## 2. Architecture & Flow Diagram

```mermaid
graph LR
    Client[Application Client] -->|API Request| DAX[DAX In-Memory Cache]
    DAX -->|Cache Miss| DynamoDB[DynamoDB Table]
```

---

## 3. Comparison & Decision Guidance

| Metric | DAX Cache | DynamoDB read |
| :--- | :--- | :--- |
| **Latency** | Microsecond reads (&lt;1ms) | Single-digit millisecond reads (~2-5ms) |
| **API compatibility**| Fully API compatible (Drop-in SDK) | Native DynamoDB API |
| **Pricing Model** | Provisioned cache instance sizes | Pay-per-read RCU capacity units |

### When to use
- When designing high-scale, production-ready solutions on AWS.
- To enforce operational excellence and follow security best practices.

### When not to use
- For basic prototyping where native defaults are sufficient.

---

## 4. Key Performance, Cost & Security Considerations

### Performance Impact
Reduces read latency to microseconds for read-heavy workloads, freeing up DynamoDB tables from read load.

### Cost Impact
Billed per hour per node in the DAX cluster. Saves DynamoDB RCU costs by intercepting read hot spots.

### Security Implications
Integrates with KMS for cache data encryption at rest, and manages access via IAM role boundaries.

---

## 5. Exam tips & Traps

:::tip
**Exam Clues:** dax cluster, dynamodb accelerator, microsecond database reads, read hot spots

Use DAX for read-heavy workloads with high hotkey distributions (e.g. popular products in e-commerce).
:::

:::warning
**Common Exam Traps:** DAX is not recommended for write-heavy applications, as cache updates introduce consistency checks and processing overhead.
:::

---

## Prerequisites

- [Amazon DynamoDB](NoSQL Databases/Amazon DynamoDB.md)

## Recommended Next Topics

- [Amazon Keyspaces](NoSQL Databases/Amazon Keyspaces.md)

## Related Topics

- [Amazon Aurora Serverless v2](aurora-serverless.md)
- [Amazon Aurora Fast Database Cloning](aurora-cloning.md)
- [Amazon Aurora Backtracking](aurora-backtracking.md)
