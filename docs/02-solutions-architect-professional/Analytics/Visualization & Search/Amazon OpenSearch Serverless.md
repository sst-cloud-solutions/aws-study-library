---
sidebar_position: 2
---

# Amazon OpenSearch Serverless

Amazon OpenSearch Serverless is an on-demand, serverless configuration for Amazon OpenSearch Service. It simplifies the process of running large-scale search and analytics workloads by automatically scaling resources to meet demand, without the need to manage clusters, instances, or storage.

## Key Features

- **No Cluster Management:** You don't need to choose instance types, count nodes, or manage storage.
- **Automatic Scaling:** Automatically scales compute and storage resources up and down based on the workload.
- **Decoupled Compute and Storage:** Compute and storage scale independently, providing better cost efficiency.
- **Support for Search and Vector Engine:** Offers specialized collection types for different use cases:
    - **Search:** For log analytics and application search.
    - **Vector Search:** For building generative AI applications using vector embeddings.
- **High Availability:** Data is automatically replicated across Availability Zones for durability and availability.

## Core Concepts

- **Collection:** A logical grouping of one or more indexes that represent a workload.
- **OpenSearch Compute Units (OCUs):** The unit of scale for compute resources.
- **Data Access Policy:** Controls which users and roles have access to specific collections and indexes.
- **Network Access Policy:** Controls whether the collection is accessible over the public internet or via a VPC endpoint.

## Use Cases

- **Log Analytics:** Analyze large volumes of logs without managing the underlying search cluster.
- **Application Search:** Provide fast, scalable search functionality for your web or mobile apps.
- **Generative AI:** Store and query vector embeddings to power RAG (Retrieval-Augmented Generation) applications.

## Exam Tips (SAP-C02)

- **Operational Overhead:** If the requirement is to reduce the operational overhead of managing OpenSearch clusters, OpenSearch Serverless is the preferred choice.
- **Vector Database:** OpenSearch Serverless (Vector Search collection) is a common architectural component for storing embeddings in generative AI solutions.
- **Scaling:** It handles unpredictable spikes in traffic automatically, making it ideal for variable workloads.
- **Comparison:** Unlike the provisioned version, you don't have to worry about sharding or index management as much.

---

## Prerequisites

- [Amazon OpenSearch Service](../opensearch.md)

## Recommended Next Topics

- [Amazon QuickSight](Amazon QuickSight.md)

## Related Topics

- [Amazon QuickSight](Amazon QuickSight.md)
- [Amazon OpenSearch](Amazon OpenSearch.md)
