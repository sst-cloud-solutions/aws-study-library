---
title: "Amazon MemoryDB for Redis"
sidebar_label: "Amazon MemoryDB for Redis"
---

# Amazon MemoryDB for Redis

## 1. Overview & Real-World Analogy

**Real-World Analogy:** A cash register drawer that keeps transactions in immediate memory (Redis cache speed) but write-protects them on a receipt roll (Multi-AZ transaction log) before dispensing change.

Amazon MemoryDB for Redis is a Redis-compatible, durable, in-memory database service that delivers ultra-fast performance with high durability.

---

## 2. Architecture & Flow Diagram

```mermaid
graph LR
    App[Application client] -->|Redis API| MemoryDB[MemoryDB Cluster]
    MemoryDB -->|Durable Write| Log[Multi-AZ Transaction Log]
```

---

## 3. Comparison & Decision Guidance

| Feature | MemoryDB for Redis | ElastiCache for Redis |
| :--- | :--- | :--- |
| **Primary Goal** | Primary Database (In-memory + Durable) | Caching layer (Non-durable, ephemeral) |
| **Data Durability** | Yes (Writes committed to log) | No (Data can be lost on node crash) |
| **Read Latency** | Microseconds | Microseconds |

### When to use
- When designing high-scale, production-ready solutions on AWS.
- To enforce operational excellence and follow security best practices.

### When not to use
- For basic prototyping where native defaults are sufficient.

---

## 4. Key Performance, Cost & Security Considerations

### Performance Impact
Combines microsecond read latencies and single-digit millisecond write latencies with multi-AZ transaction logging.

### Cost Impact
Billed based on database node size, transaction log volume, and total storage size.

### Security Implications
Supports Redis ACL access control, KMS encryption at rest, and TLS client connections.

---

## 5. Exam tips & Traps

:::tip
**Exam Clues:** memorydb, redis database, in-memory database, durable transaction log Redis

Choose MemoryDB when you need a fast in-memory Redis database that cannot afford data loss during node restarts.
:::

:::warning
**Common Exam Traps:** MemoryDB is more expensive than ElastiCache due to transaction durability; do not use it as a simple cache.
:::

---

## Prerequisites

- [Amazon Timestream](Specialized & In-Memory/Amazon Timestream.md)

## Recommended Next Topics

- [AWS AppSync](../Application Integration/API & Workflow Integration/AWS AppSync.md)

## Related Topics

- [Amazon Aurora Serverless v2](aurora-serverless.md)
- [Amazon Aurora Fast Database Cloning](aurora-cloning.md)
- [Amazon Aurora Backtracking](aurora-backtracking.md)
