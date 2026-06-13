---
sidebar_position: 5
---

# Migration Strategies (The 6R's)

When migrating workloads to AWS, it's essential to categorize them into one of the six common strategies. This helps in planning, budgeting, and setting expectations for the migration outcome.

## The 6R Strategies

| Strategy | Description | Effort | Benefit |
| :--- | :--- | :--- | :--- |
| **Rehosting** | "Lift and Shift" - Move as-is to EC2. | Low | Low (fastest) |
| **Replatforming** | "Lift and Reshape" - Move to managed services (e.g., RDS). | Medium | Medium |
| **Repurchasing** | "Drop and Shop" - Switch to a SaaS version (e.g., Salesforce). | Low/Med | High |
| **Refactoring** | "Re-architect" - Adopt cloud-native (e.g., Serverless). | High | Maximum |
| **Retire** | Decommission applications no longer needed. | Minimal | Cost Savings |
| **Retain** | Keep on-premises for now (e.g., legacy, complex). | None | None |

## 1. Rehosting (Lift and Shift)
- **Goal:** Quickly move applications to the cloud with minimal changes.
- **Tools:** AWS Application Migration Service (MGN), VM Import/Export.
- **Best For:** Large-scale migrations where speed is critical, or legacy apps that are hard to modify.

## 2. Replatforming (Lift and Reshape)
- **Goal:** Minor optimizations to reduce operational overhead without changing the core architecture.
- **Example:** Moving a self-managed SQL Server to Amazon RDS, or moving a web app to Elastic Beanstalk.
- **Benefit:** Reduces administrative burden while maintaining application compatibility.

## 3. Repurchasing (Drop and Shop)
- **Goal:** Moving to a completely different product, typically a SaaS platform.
- **Example:** Replacing a self-managed CRM with Salesforce, or an on-premises email server with Microsoft 365 or Amazon WorkMail.

## 4. Refactoring / Re-architecting
- **Goal:** Fully re-imagining the application using cloud-native features.
- **Example:** Breaking a monolith into microservices using Lambda, ECS, and SQS.
- **Benefit:** Highest ROI, better scalability, and lower long-term costs, but requires the most effort.

## 5. Retire
- **Goal:** Identifying and decommissioning applications that are no longer useful.
- **Action:** Up to 10-20% of an enterprise IT portfolio is often no longer needed and can be turned off.

## 6. Retain
- **Goal:** Keep the application on-premises.
- **Reasons:** High complexity, strict compliance, or the app is scheduled for retirement soon.

## 7. Discovery & Planning: AWS Application Discovery Service (ADS)
Before starting a migration, you must discover assets and map dependencies.
- **AWS Agentless Discovery Connector:**
    - Deployed as a VMware virtual appliance (OVA) in vCenter.
    - Captures configuration (CPU, RAM, disk) and utilization metrics.
    - **No software installed on host VMs.**
- **AWS Application Discovery Agent:**
    - Installed directly on host operating systems (Linux/Windows).
    - In addition to configuration and utilization, it maps **network dependencies** (inbound/outbound connections) and active processes.
    - **Required for detailed dependency mapping.**
- **AWS Migration Hub:** Centralized console to track the status of migration portfolios across multiple tools (e.g., MGN, DMS).

## 8. Server Migration: AWS Application Migration Service (MGN)
AWS MGN is the primary lift-and-shift (rehost) service, replacing SMS (Server Migration Service).
- **How It Works:**
    1. Install the **AWS replication agent** on the source server (physical or VM).
    2. The agent continuously replicates data at the block level (TCP port 1500) to a lightweight **Staging Area** in the target AWS account.
    3. During testing or cutover, MGN automatically launches target EC2 instances based on a defined **Launch Template**.
- **Post-Launch Actions:** Integrate SSM documents to automatically install drivers, perform configurations, or execute verification tests.
- **Networking Tip:** Ensure the replication network has sufficient bandwidth to handle the write rate (delta replication) of the source servers.

## 9. Database Migration: AWS DMS & Schema Conversion Tool (SCT)
- **AWS Schema Conversion Tool (SCT):**
    - Used for **heterogeneous migrations** (e.g., Oracle to Aurora PostgreSQL) to convert database schemas, views, triggers, and procedures.
    - Not needed for **homogeneous migrations** (e.g., MySQL to Aurora MySQL).
- **AWS Database Migration Service (DMS):**
    - Deploys a replication instance that connects to the source and target databases.
    - **Replication Tasks:**
        - *Full Load:* Migrates a snapshot of the database.
        - *Full Load + CDC:* Migrates the snapshot and continues replicating changes using Change Data Capture (CDC).
        - *CDC Only:* Replicates changes starting from a specific point.
- **DMS Serverless:** Automatically provisions, manages, and scales replication capacity, removing the need to manage replication instances. Highly recommended for workloads with variable throughput.

## 10. Production Migration Considerations
- **DNS Cutover (Route 53):** Use weighted routing or active-passive failover policies to gradually shift users from on-premises to the migrated cloud workload. Keep TTLs low (e.g., 60 seconds) during the cutover window to enable rapid rollback.
- **Data Integrity Validation:** Use DMS built-in validation or execute checksum/CRC calculations between the source and target datasets post-migration.
- **Rollback Strategy:** Maintain delta replication backwards (AWS to on-premises) using DMS CDC or custom database synchronization if a rollback becomes necessary after traffic cutover.

## 11. Well-Architected Framework: Reliability and Performance
- **Migration Readiness Assessment (MRA):** Evaluate organizational capability against the AWS Cloud Adoption Framework (CAF) pillars.
- **Landing Zone Setup:** Use AWS Control Tower to deploy a multi-account environment adhering to security best practices prior to starting migration.
- **Right-Sizing:** Review AWS Compute Optimizer suggestions during the test phase to downsize over-provisioned source instances before cutting over.

