---
title: "AWS Certification 05-exam-strategy"
sidebar_label: "Overview"
---

# AWS Certification 05-exam-strategy

Preparing for professional-level AWS certifications like the **02-solutions-architect-professional (SAP-C02)** or the **01-developer-associate (DVA-C02)** requires more than just memorizing AWS service names. It requires a systematic approach to reading scenarios, recognizing key indicators, managing exam time, and using structural elimination rules.

---

## 1. Question Decomposition Methodology

When presented with a long scenario question (especially in the SAP exam, which can contain 10-15 line questions), follow this four-step decomposition method:

```
[ Read Target Constraint ] → [ Identify Core Technical Problem ] → [ Filter Out Unrelated Services ] → [ Select Highest Value Option ]
```

1.  **Read the Last Line First:** The final line of the question contains the target metric. Is the customer asking for the *lowest cost*, *minimal administrative overhead*, *maximum resilience*, or *fastest operational rollout*? This target constraint will determine which of two technically valid architectures is correct.
2.  **Scan for Keywords:** Look for indicators like "shared storage", "real-time updates", "legacy migration", or "Anycast IPs". These map directly to specific AWS services.
3.  **Cross-Reference the Account Structure:** Note if the scenario describes a multi-account organization or a single VPC structure. Multi-account requirements instantly prioritize solutions like Control Tower, Config Aggregators, and organizations-level SCPs.
4.  **Eliminate the Obviously Incorrect:** Cross out options that require custom coding when a managed AWS service is available, or that violate basic routing principles (e.g. routing ALB to database nodes directly without security group interfaces).

---

## 2. Technical Keyword Lookup Table

Learn to recognize these exam clues, which map directly to target architectural services:

| Technical Constraint / Keyword | Immediate AWS Service Match | Why? |
| :--- | :--- | :--- |
| **Lowest latency shared Linux storage** | Amazon EFS (Elastic/Provisioned) | NFSv4 compatible, fast shared Linux directory |
| **SMB compatible shared Windows storage** | FSx for Windows File Server | Built on Windows Server, integrates with Active Directory |
| **HPC / Machine Learning data link to S3** | FSx for Lustre | Sub-millisecond scratch/persistent links |
| **Multi-protocol (NFS/SMB/iSCSI) NetApp** | FSx for NetApp ONTAP | Deduplication, compression, and SVM capabilities |
| **Anycast IP routing for global users** | AWS Global Accelerator | Two static Anycast IPs route packets over AWS fiber |
| **Inline third-party firewall inspection** | AWS Gateway Load Balancer (GWLB) | Transparent Layer 3 inspection via GENEVE on port 6081 |
| **Centrally managed baselines for OUs** | AWS Control Tower | Landing Zone, preventative SCPs, and account factory |
| **Secure VPN-less zero-trust app access** | AWS Verified Access | Checks device health and Okta/OIDC auth per connection |
| **Volumetric DDoS protection with bill refund**| AWS Shield Advanced | Border network mitigation, SRT support, cost protection |
| **VPC-less microservices API routing** | Amazon VPC Lattice | HTTP/gRPC Layer 7 routing bypassing IP routing layers |

---

## 3. Architecture Decision Patterns

### Administrative Overhead vs Cost
*   If a question asks for **minimal administrative overhead** (or "least operational effort"), always choose **serverless/fully managed** options (e.g., SQS instead of Active MQ on EC2, Fargate instead of managing self-hosted Kubernetes node groups, DynamoDB instead of self-hosted Mongo databases).
*   If a question asks for **lowest cost** (or "cost optimization"), look closely at the compute runtime. Spot instances, Aurora Serverless v2, S3 Glacier IA tiers, and single-AZ configurations are preferred, provided they meet availability requirements.

### Database Failover & Replication
*   For **sub-30 second database failover**, choose **Amazon Aurora** (fails over to shared storage replicas instantly without DNS propagation delays).
*   For **cross-region database replication with local write capabilities**, choose **DynamoDB Global Tables** (active-active multi-region writes with conflict resolution) or **Aurora Global Databases** (with write forwarding enabled).

---

## 4. Elimination Techniques

*   **Rule of Custom Code:** If an option requires writing a "custom synchronization script running on cron in an EC2 instance", it is almost always **INCORRECT**. AWS prefers native, managed tools (like AWS DataSync or Storage Gateway).
*   **Rule of Explicit Deny:** An explicit deny in any policy overrides all allows. If an option attempts to allow access to a user who has a permission boundary or SCP explicitly blocking the action, it will fail.
*   **Rule of Clock Drift:** If an API client receives signatures version 4 verification errors but credentials are valid, check the client clock synchronization (must be within 5 minutes of AWS NTP servers).

---

## 5. Time Management & Strategy

The 02-solutions-architect-professional exam gives you 180 minutes to answer 75 questions (~2.4 minutes per question).
1.  **Skip and Flag:** If a scenario is half a page long and takes you more than 1 minute to parse, flag it, write down your initial instinct, and skip. Return to it after answering the shorter, direct questions.
2.  **Pace Tracking:** Aim to be at question 25 by minute 50, question 50 by minute 100, and question 75 by minute 150. This leaves 30 minutes for reviewing flagged items.
3.  **Drafting Diagrams:** Draw simplified layouts of VPC boxes, load balancers, and databases on your scratch pad to map multi-account routing scenarios.

---

## Prerequisites

- [SAP-C02 Practice Mock Exams](../02-solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam.md)

## Recommended Next Topics

- [SAP-C02 Full Mock Exam - Part 1 (Questions 1-25)](../02-solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam - Part 1.md)

## Related Topics

- [Beginner Study Roadmap](../00-it-foundation/beginner-roadmap.md)
- [Phase 0: Foundation Bridge Overview](../00-it-foundation/0-intro.md)
- [Module 1: How Computers Actually Work](../00-it-foundation/1-how-computers-work.md)
