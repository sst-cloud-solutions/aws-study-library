---
title: "Amazon Managed Streaming for Apache Kafka (MSK)"
sidebar_label: "Amazon Managed Streaming for Apache Kafka (MSK)"
---

# Amazon Managed Streaming for Apache Kafka (MSK)

## 1. Overview & Real-World Analogy

**Real-World Analogy:** A massive multi-lane highway designed for thousands of freight trucks passing through every second: you build dedicated lanes (brokers) to route high-speed stream data.

Amazon MSK is a fully managed service that makes it easy to build and run applications that use Apache Kafka to process streaming data.

---

## 2. Architecture & Flow Diagram

```mermaid
graph LR
    Producer[Clickstream Event Stream] -->|Kafka API| MSK[Amazon MSK Broker Cluster]
    MSK -->|Consume stream| Consumer[Spark / EMR Analytics]
```

---

## 3. Comparison & Decision Guidance

| Parameter | Amazon MSK | Amazon Kinesis Data Streams |
| :--- | :--- | :--- |
| **Eco-System** | Native Apache Kafka API | AWS Native API |
| **Broker Management**| Managed brokers (fixed cluster size) | Serverless shard management |
| **Retention** | Up to unlimited storage limits | 24 hours up to 365 days max |

### When to use
- When designing high-scale, production-ready solutions on AWS.
- To enforce operational excellence and follow security best practices.

### When not to use
- For basic prototyping where native defaults are sufficient.

---

## 4. Key Performance, Cost & Security Considerations

### Performance Impact
Deliver high-throughput data streams, scaling partition counts dynamically to handle massive parallel ingestion rates.

### Cost Impact
Billed based on active broker instance sizes and total storage capacity consumed.

### Security Implications
Supports TLS client certificate authentication, IAM database access control, and KMS encryption of data logs.

---

## 5. Exam tips & Traps

:::tip
**Exam Clues:** amazon msk, apache kafka managed, broker partition sizing, streaming ingestion cluster

Choose Amazon MSK when migrating existing Apache Kafka streaming pipelines to AWS to minimize code alterations.
:::

:::warning
**Common Exam Traps:** Do not ignore cluster disk space metrics; if brokers run out of disk space, the Kafka cluster will lock writes.
:::

---

## Prerequisites

- [Amazon MQ](Messaging & Eventing/Amazon MQ.md)

## Recommended Next Topics

- [Amazon AppFlow](appflow.md)

## Related Topics

- [Amazon AppFlow](appflow.md)
