---
sidebar_label: Part 3 (Questions 51-75)
---

﻿---
sidebar_position: 7
---

# SAP-C02 Full Mock Exam 2 - Part 3 (Questions 51-75)

This is Part 3 of the second full-length, 75-question AWS Certified Solutions Architect - Professional (SAP-C02) Practice Mock Exam. This part covers Domain 3 (Continuous Improvement) and Domain 4 (Migrations).

---

## Question 51: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A database administrator needs to rotate database credentials without exposing them in cleartext or causing connection drops. Which service combination provides secure, automated rotation?

### Options
*   A. AWS Secrets Manager with KMS encryption and Lambda rotation.
*   B. Systems Manager Parameter Store.
*   C. AWS Backup.
*   D. Systems Manager OpsCenter.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS Secrets Manager uses KMS to encrypt secrets and can trigger a Lambda function to rotate credentials automatically, updating both the database and the secret record securely.
</details>

---

## Question 52: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to analyze VPC traffic to identify malicious patterns or unauthorized scanning from internal instances. Which security monitoring service should they enable?

### Options
*   A. Amazon Inspector.
*   B. Amazon GuardDuty.
*   C. AWS Shield.
*   D. AWS WAF.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon GuardDuty is a threat detection service that continuously monitors VPC Flow Logs, DNS logs, and CloudTrail events to identify suspicious activity (like mining, malware, or scanning).
</details>

---

## Question 53: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company is migrating standard regional KMS Customer Managed Keys to Multi-Region KMS keys. Why would an architect recommend this migration?

### Options
*   A. To save costs since Multi-Region keys are cheaper.
*   B. To allow databases encrypted in Region A to be decrypted in Region B without re-encrypting the database volumes.
*   C. To improve encryption performance.
*   D. Multi-Region keys are required for AWS Backup.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
KMS Multi-Region keys share the same Key ID and key material. This allows databases replicated to secondary regions (for DR) to immediately decrypt data volumes without performing decryption and re-encryption workflows.
</details>

---

## Question 54: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to store application logs in S3. The logs must be queryable using SQL, but the cost of storing older logs must be minimized. What design is most effective?

### Options
*   A. Store logs in S3 and use Athena. Configure an S3 Lifecycle policy to transition logs to S3 Standard-IA after 30 days, and to Glacier Flexible Retrieval after 90 days (restoring via SQL query as needed).
*   B. Copy logs to DynamoDB.
*   C. Store logs in EBS volumes.
*   D. Compress logs on EC2 instances and do not use S3.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
Storing logs in S3 and querying them with Athena is cost-effective. S3 Lifecycle policies reduce storage costs by moving older logs to colder storage classes (like Standard-IA and Glacier) over time.
</details>

---

## Question 55: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to protect its web application from application-layer vulnerability attacks (OWASP Top 10). The application is deployed behind an ALB. Which service should they attach?

### Options
*   A. AWS Shield Standard.
*   B. AWS WAF.
*   C. AWS Firewall Manager.
*   D. Amazon GuardDuty.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS WAF filters web traffic at Layer 7 (application layer). Attaching it to the ALB allows blocking exploits like SQL injection, cross-site scripting (XSS), and custom request manipulation.
</details>

---

## Question 56: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to implement a cost monitoring strategy. They need to alert administrators when their projected monthly AWS bill exceeds a specific budget threshold. Which service should they configure?

### Options
*   A. Cost Explorer.
*   B. AWS Budgets.
*   C. AWS Trusted Advisor.
*   D. AWS Billing Conductor.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Budgets allows you to set custom budgets that monitor your costs or usage. It can alert you via email or SNS when your forecasted costs exceed your defined budget limit.
</details>

---

## Question 57: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
An auditor needs to verify that all S3 buckets in an AWS account are encrypted and not publicly accessible. Which AWS tool provides a compliance report for these requirements?

### Options
*   A. AWS Artifact.
*   B. AWS Security Hub with the AWS Foundational Security Best Practices standard enabled.
*   C. Amazon GuardDuty.
*   D. AWS WAF.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Security Hub evaluates compliance against security standards. Enabling the AWS Foundational Security Best Practices standard automatically checks S3 configurations and flags non-compliant buckets.
</details>

---

## Question 58: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to perform a non-disruptive disaster recovery drill for their on-premises physical servers. Which service handles this migration testing natively?

### Options
*   A. AWS Elastic Disaster Recovery (DRS).
*   B. AWS Application Migration Service (MGN).
*   C. AWS DataSync.
*   D. AWS Migration Hub.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS DRS replicates source servers to a staging area. You can launch recovery instances for testing (DR drills) in a segregated subnet without stopping replication or affecting production servers.
</details>

---

## Question 59: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to optimize the costs of their Amazon EBS volumes. They want to automatically identify volumes that are not attached to any EC2 instance. Which tool should they check?

### Options
*   A. Cost Explorer.
*   B. AWS Trusted Advisor.
*   C. AWS Systems Manager.
*   D. AWS Compute Optimizer.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Trusted Advisor identifies unattached EBS volumes as part of its Cost Optimization check category, allowing you to delete them to eliminate unnecessary charges.
</details>

---

## Question 60: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company is running an Application Load Balancer. They want to capture detailed information about all HTTP requests, including the client IP, request path, and user agent. Where should this be enabled?

### Options
*   A. CloudWatch Metrics.
*   B. ALB Access Logs delivered to Amazon S3.
*   C. AWS CloudTrail.
*   D. VPC Flow Logs.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
ALB Access Logs capture detailed metadata about all requests routed through the load balancer and deliver them as log files to an S3 bucket for analysis.
</details>

---

## Question 61: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company wants to migrate an on-premises Microsoft SQL Server database to Amazon RDS for SQL Server. The database size is 2 TB and the internet bandwidth is 100 Mbps. The cutover downtime window must be less than 1 hour. Which migration approach should be chosen?

### Options
*   A. Backup the database, copy the backup over the internet using AWS DataSync, and restore it.
*   B. Use AWS Database Migration Service (DMS) to perform full load and enable Change Data Capture (CDC) over a VPN or Direct Connect path.
*   C. Ship a Snowball Edge device with the database backups.
*   D. Use VM Import/Export to migrate the SQL database server.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS DMS handles database migration with continuous replication (CDC). Full load copies the initial database state, and CDC keeps the RDS target synchronized. At cutover, you stop writes, let DMS catch up, and switch endpoints in minutes, staying under the 1-hour window.
</details>

---

## Question 62: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
During a migration assessment, a company discovers 15 legacy applications that are no longer used by the business. Which migration strategy (6Rs) should be applied to these applications?

### Options
*   A. Retain.
*   B. Retire.
*   C. Rehost.
*   D. Replatform.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The Retire migration strategy is applied to applications that are no longer useful or needed by the business, saving costs by shutting them down instead of migrating them.
</details>

---

## Question 63: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is planning to migrate 500 TB of media assets from on-premises SAN storage to Amazon S3. The migration must be completed within 30 days. The corporate internet link has 50 Mbps available. Which method is most effective?

### Options
*   A. Transfer files over the internet using AWS DataSync.
*   B. Order multiple AWS Snowball Edge Storage Optimized devices, copy data locally, and ship them to AWS.
*   C. Use S3 Multi-part upload via AWS Client VPN.
*   D. Set up an AWS Direct Connect link.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
At 50 Mbps, a 500 TB transfer would take over two years. Shipping multiple Snowball Edge devices allows transferring the data offline via physical shipping, completing the migration within a few weeks.
</details>

---

## Question 64: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company wants to migrate virtual machines from an on-premises VMware cluster to EC2 instances. They want to automate the migration process and replicate VM storage block-by-block. Which service should they use?

### Options
*   A. AWS Application Migration Service (MGN).
*   B. VM Import/Export.
*   C. AWS DataSync.
*   D. AWS Migration Hub.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS MGN is the primary migration service, continuously replicating VM volumes at the block level, allowing automated, non-disruptive testing and minimal-downtime cutovers.
</details>

---

## Question 65: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is migrating their on-premises NAS to Amazon EFS. They need to transfer 10 TB of files. They have a 1 Gbps Direct Connect connection. Which service should they use to automate the transfer and verify file integrity?

### Options
*   A. AWS DataSync.
*   B. AWS Site-to-Site VPN with rsync.
*   C. AWS Snowcone.
*   D. S3 File Gateway.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS DataSync is designed specifically to automate and accelerate file transfers. It integrates directly with EFS, handles scheduling, performs data validation (file integrity checks), and maximizes bandwidth usage.
</details>

---

## Question 66: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is migrating a mainframe application to AWS. They plan to completely rewrite the application in Python to run on a serverless container architecture. What migration strategy (6Rs) does this represent?

### Options
*   A. Rehost.
*   B. Replatform.
*   C. Refactor / Re-architect.
*   D. Repurchase.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: C**

### Explanation:
Decomposing or rewriting a monolithic application to leverage cloud-native features (like serverless containers) is categorized as Refactor / Re-architect.
</details>

---

## Question 67: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
An enterprise wants to assess their on-premises resource utilization and estimate the cost of running their workloads on AWS. Which tool or service should they use to build a business case?

### Options
*   A. AWS Application Discovery Service.
*   B. AWS Migration Evaluator (formerly TSO Logic).
*   C. AWS Migration Hub Orchestrator.
*   D. AWS Billing Conductor.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Migration Evaluator gathers hardware utilization data to construct a detailed cloud business case, providing cost estimates based on optimized compute and storage recommendations.
</details>

---

## Question 68: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company has migrated a web application to EC2. They want to perform a canary deployment, routing 5% of DNS requests to the new cloud environment and keeping 95% on-premises, gradually shifting traffic over a week. What Route 53 routing policy should they configure?

### Options
*   A. Geolocation routing.
*   B. Weighted routing.
*   C. Failover routing.
*   D. Latency routing.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Route 53 Weighted routing allows you to assign specific weights to records (95 to on-premises IP, 5 to cloud IP), making it ideal for gradual canary migrations.
</details>

---

## Question 69: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A database administrator is migrating an Oracle database to Aurora PostgreSQL. They need to convert schema definitions, views, and PL/SQL code. Which tool should they use?

### Options
*   A. AWS DMS.
*   B. AWS Schema Conversion Tool (SCT).
*   C. AWS Glue.
*   D. AWS DataSync.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS SCT (Schema Conversion Tool) is designed to convert non-compatible database schemas and SQL scripts (like Oracle PL/SQL) into target cloud-compatible formats (like PostgreSQL PL/pgSQL).
</details>

---

## Question 70: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company wants to migrate their legacy ERP system to AWS. They choose to replace the legacy system with a cloud-native SaaS solution (e.g., Salesforce or SAP Cloud). What migration strategy (6Rs) does this represent?

### Options
*   A. Refactor.
*   B. Replatform.
*   C. Repurchase.
*   D. Retire.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: C**

### Explanation:
The Repurchase migration strategy (often called 'Drop and Shop') involves retiring the legacy product and moving to a different, cloud-based product or SaaS model.
</details>

---

## Question 71: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is migrating on-premises VMs to AWS. They want to coordinate the migration steps (discovery, scheduling replication, launch testing, and cutover) from a single console. Which service provides this dashboard?

### Options
*   A. AWS Systems Manager.
*   B. AWS Migration Hub.
*   C. AWS Control Tower.
*   D. AWS Service Catalog.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Migration Hub provides a single dashboard to track the progress of discovery and migration tasks across multiple tools (like MGN, DMS, and discovery agents) in your AWS environment.
</details>

---

## Question 72: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company wants to migrate an application running on an on-premises Linux server to AWS. They want to optimize the database to run on Amazon RDS, but do not want to alter the application OS settings or rewrite code. What migration strategy (6Rs) does this represent?

### Options
*   A. Rehost.
*   B. Replatform.
*   C. Refactor.
*   D. Retain.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Replatforming (often called 'Lift-tinker-and-shift') involves making minor optimizations to leverage cloud-managed services (like moving a database to RDS) without changing the core application architecture.
</details>

---

## Question 73: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is migrating a high-throughput transaction database to AWS using AWS DMS. They experience replication lag because of network congestion on their shared VPN tunnel. What is the recommended network improvement?

### Options
*   A. Configure a dedicated Direct Connect connection with a Transit VIF.
*   B. Set up S3 replication.
*   C. Increase the SQS queue size.
*   D. Switch to public internet routing.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
A dedicated AWS Direct Connect link bypasses the public internet, providing reliable, high-bandwidth, and low-latency network connections, eliminating replication lag caused by VPN network congestion.
</details>

---

## Question 74: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company has migrated a transactional web application to AWS. To support a fallback strategy with zero data loss in case of a critical post-migration bug, which replication configuration is required?

### Options
*   A. A reverse DMS replication task running from the AWS database back to the on-premises database in real-time.
*   B. Perform nightly database exports.
*   C. Use AWS Backup to restore databases on-premises.
*   D. Write a script to replicate log files.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
To prevent data loss if a rollback is triggered, a reverse replication task must be configured (AWS RDS -> on-premises database) using DMS CDC, ensuring all updates committed in the cloud are replicated back.
</details>

---

## Question 75: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company needs to transfer database logs stored on-premises to Amazon S3. The logs must be converted from CSV to Parquet format to enable fast queries in Athena. Which service configuration handles this?

### Options
*   A. AWS DMS with S3 target settings configured to output Parquet files.
*   B. AWS DataSync.
*   C. S3 Glacier.
*   D. AWS Snowball.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS DMS supports writing target data to S3 in Parquet format. By configuring target endpoint properties, DMS converts the source CSV data stream and outputs Parquet files to the S3 bucket.
</details>

---
