---
sidebar_position: 4
sidebar_label: Part 3 (Questions 51-75)
---

# SAP-C02 Full Mock Exam - Part 3 (Questions 51-75)

This is Part 3 of the full-length, 75-question AWS Certified Solutions Architect - Professional (SAP-C02) Practice Mock Exam. This part covers Domain 3 (Continuous Improvement) and Domain 4 (Migrations).

---

## Question 51: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A database administrator wants to encrypt an existing unencrypted Amazon RDS DB instance. How can this be accomplished with the lowest downtime?

### Options
*   A. Enable encryption in the RDS console directly (in-place modification).
*   B. Take a snapshot of the unencrypted DB instance, copy the snapshot while enabling encryption, and restore a new DB instance from the encrypted snapshot.
*   C. Create a read replica, encrypt the replica, and promote it.
*   D. Export data using pg_dump and import it into a new encrypted DB.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
RDS does not support encrypting an existing unencrypted database in-place. The standard migration path is to take a snapshot, copy and encrypt the snapshot, and then restore a new database instance from that encrypted snapshot.
</details>

---

## Question 52: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company has a web application hosted on EC2 instances. The security team wants to detect vulnerability issues, such as software packages with known CVEs, running on the instances. Which service should they deploy?

### Options
*   A. AWS Artifact.
*   B. Amazon Inspector.
*   C. Amazon GuardDuty.
*   D. AWS WAF.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon Inspector is an automated vulnerability management service that scans EC2 instances, container images, and Lambda functions for software vulnerabilities and unintended network exposure.
</details>

---

## Question 53: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
An enterprise wants to optimize its AWS costs. They have predictable workloads running on EC2 and Fargate that run 24/7. Which commitment-based pricing model offers the highest flexibility across compute types?

### Options
*   A. EC2 Instance Reserved Instances.
*   B. Compute Savings Plans.
*   C. EC2 Instance Savings Plans.
*   D. Spot Instances.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Compute Savings Plans offer the highest flexibility because they apply to usage across EC2, Fargate, and Lambda, regardless of region, instance family, operating system, or tenancy.
</details>

---

## Question 54: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to build a central logging solution that aggregates VPC Flow Logs from all VPCs in all accounts. The logs must be stored in a central S3 bucket and queried periodically using SQL. Which service combination should they choose?

### Options
*   A. CloudWatch Logs with Athena.
*   B. Firehose delivering to a central S3 bucket, and Amazon Athena for querying.
*   C. Systems Manager Session Manager.
*   D. AWS Data Pipeline.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
VPC Flow Logs can be published directly to S3 or CloudWatch. For multi-account scaling, delivering Flow Logs via S3 destinations or Kinesis Data Firehose to a centralized S3 bucket, and querying them using Amazon Athena, is the most cost-effective and scalable design.
</details>

---

## Question 55: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to enforce that all data uploaded to an S3 bucket is encrypted. If a user attempts to upload an object without specifying encryption in the request header, the upload must be rejected. What configuration is needed?

### Options
*   A. Set the S3 Default Encryption property on the bucket.
*   B. Apply a bucket policy that denies 's3:PutObject' if 's3:x-amz-server-side-encryption' is missing in the request condition.
*   C. Use KMS key policies to restrict access.
*   D. Enable S3 Versioning.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
While S3 Default Encryption encrypts objects if not specified, enforcing that the client sends encryption headers requires a bucket policy with a Deny effect testing the s3:x-amz-server-side-encryption request condition key.
</details>

---

## Question 56: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company is running an analytics workload on Amazon Redshift. The query patterns are unpredictable, and the database administrator wants to ensure that the cluster scales up compute capacity automatically during heavy usage spikes. Which feature should they enable?

### Options
*   A. Redshift Classic Resize.
*   B. Concurrency Scaling.
*   C. Elastic Resize.
*   D. Redshift Spectrum.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Redshift Concurrency Scaling automatically adds transient query capacity in seconds to handle spikes in concurrent read queries, maintaining consistent performance without manual resizing.
</details>

---

## Question 57: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company needs to audit their AWS environment to ensure it complies with the CIS AWS Foundations Benchmark. Which service should they use to automate this assessment?

### Options
*   A. AWS Artifact.
*   B. AWS Security Hub.
*   C. Amazon GuardDuty.
*   D. AWS Firewall Manager.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Security Hub provides automated security checks that align with standard industry compliance frameworks, including the CIS AWS Foundations Benchmark.
</details>

---

## Question 58: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to implement a disaster recovery drill that tests their failover capabilities. The drill must verify that databases can failover to a standby region without disrupting the production databases. Which service should they use?

### Options
*   A. AWS Elastic Disaster Recovery (DRS) with non-disruptive drills.
*   B. Route 53 Application Recovery Controller.
*   C. AWS Backup snapshot restores.
*   D. Aurora Global Database manual promotion.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS DRS allows running non-disruptive recovery drills in a segregated staging VPC without interrupting ongoing replication or affecting the production source servers.
</details>

---

## Question 59: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A security policy requires that all database passwords and API keys be rotated every 30 days automatically. Which service handles this integration natively?

### Options
*   A. AWS Systems Manager Parameter Store.
*   B. AWS Secrets Manager with built-in rotation Lambda functions.
*   C. AWS KMS.
*   D. IAM Credentials Report.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Secrets Manager supports automatic rotation of secrets (such as database credentials). It provides templates for Lambda functions that handle the rotation lifecycle for RDS, Redshift, and DocumentDB databases.
</details>

---

## Question 60: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company has a web application running on AWS. The application experiences distributed denial of service (DDoS) attacks targeting the network layer. Which service provides protection against these attacks?

### Options
*   A. AWS WAF.
*   B. AWS Shield Advanced.
*   C. Amazon Inspector.
*   D. AWS Firewall Manager.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Shield Advanced provides comprehensive protection against sophisticated DDoS attacks targeting the network (Layer 3/4) and transport layers, offering access to the DDoS Response Team (DRT) and cost protection.
</details>

---

## Question 61: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is migrating an on-premises Oracle database to AWS. The database is 10 TB in size and cannot tolerate more than 4 hours of downtime during migration. The target database will be Amazon Aurora PostgreSQL. Which tools should be used?

### Options
*   A. AWS Database Migration Service (DMS) for full load, and AWS DataSync for continuous replication.
*   B. AWS Schema Conversion Tool (SCT) to convert the schema, and AWS DMS for data migration (Full Load + CDC).
*   C. VM Import/Export to migrate the database server.
*   D. AWS Snowball Edge to ship the database backup files.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
For heterogeneous migrations (Oracle to Aurora PostgreSQL), you must use AWS SCT to convert schemas and stored procedures, and AWS DMS (Change Data Capture/CDC) to replicate data and keep the target in sync until cutover, keeping downtime minimal.
</details>

---

## Question 62: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company wants to migrate 100 on-premises physical servers to AWS. They need to discover the dependencies between servers and gather performance metrics (CPU, memory utilization) to size the EC2 instances. Which tool should they deploy?

### Options
*   A. AWS Application Migration Service (MGN).
*   B. AWS Application Discovery Service (ADS).
*   C. AWS Systems Manager Agent.
*   D. AWS Migration Hub Orchestrator.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Application Discovery Service (ADS) gathers information about on-premises datacenters, including server specifications and dependency mapping, helping you plan the migration.
</details>

---

## Question 63: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company needs to transfer 50 TB of archive files from on-premises network attached storage (NAS) to Amazon S3. The internet connection is limited to 10 Mbps. The transfer must be completed within a week. What transfer method should they use?

### Options
*   A. AWS DataSync over the internet.
*   B. AWS Snowball Edge Storage Optimized device.
*   C. S3 Multi-part upload using the AWS CLI.
*   D. AWS VPN connection.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
With a 10 Mbps connection, transferring 50 TB would take months. A Snowball Edge device allows you to copy data locally at gigabit speeds, and then ship the physical device to AWS, completing the migration in days.
</details>

---

## Question 64: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
An enterprise wants to migrate 200 Linux VMs from VMware on-premises to AWS. They need to ensure that the operating system configurations, application configurations, and local data are replicated continuously with minimal downtime. Which service should they use?

### Options
*   A. AWS Application Migration Service (MGN).
*   B. VM Import/Export.
*   C. AWS DataSync.
*   D. AWS Migration Hub.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS MGN (Application Migration Service) replicates physical, virtual, and cloud servers at the block level, providing continuous replication and minimal downtime cutovers.
</details>

---

## Question 65: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is migrating a web application to AWS. The application uses a shared file system. The file system contains 500 GB of files that are frequently updated. How can they copy these files to Amazon EFS with minimal disruption to the users?

### Options
*   A. Mount EFS on-premises over a VPN and use rsync.
*   B. Use AWS DataSync to copy files from the on-premises NAS to Amazon EFS, running incremental syncs.
*   C. Backup the NAS to S3 using Snowcone and restore to EFS.
*   D. AWS EFS does not support cross-network file copy.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS DataSync is optimized for fast, reliable data transfers over network paths. Running incremental syncs allows copying the bulk of data first, and then syncing final changes during a short cutover window.
</details>

---

## Question 66: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
During a migration assessment, a company categorizes its applications. One legacy payroll application cannot be migrated because of compliance restrictions on data residency. The application must remain on-premises. What migration strategy (6Rs) does this represent?

### Options
*   A. Retire.
*   B. Retain.
*   C. Replatform.
*   D. Rehost.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The 'Retain' strategy is chosen for applications that you want to keep in their current environment due to business constraints, technical constraints, or compliance rules.
</details>

---

## Question 67: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is migrating an on-premises VMware cluster to AWS. They want to maintain their existing vSphere management tools and run their workloads on dedicated VMware infrastructure hosted in the AWS Cloud. Which solution meets this requirement?

### Options
*   A. AWS Application Migration Service (MGN).
*   B. VMware Cloud on AWS (VMC).
*   C. EC2 Dedicated Hosts.
*   D. Outposts.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
VMware Cloud on AWS (VMC) allows you to run VMware vSphere clusters on bare-metal EC2 instances in AWS, letting you use existing VMware management tools and policies.
</details>

---

## Question 68: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company has migrated a web application to EC2 instances. The database was migrated to RDS. They want to route 10% of user traffic to the new AWS environment, and keep 90% on-premises, gradually shifting traffic as they gain confidence. What Route 53 routing policy should they configure?

### Options
*   A. Failover routing.
*   B. Weighted routing.
*   C. Latency routing.
*   D. Geolocation routing.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Route 53 Weighted routing allows you to assign weights to resource record sets (e.g., 90 to on-premises, 10 to AWS), facilitating canary testing or gradual migrations.
</details>

---

## Question 69: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A database migration task using AWS DMS fails during the full load phase because of network interruptions on the Direct Connect link. How can the database administrator design the DMS task to resume from the failure point automatically?

### Options
*   A. Enable the 'Resume from checkpoint' option in the DMS task settings.
*   B. Configure DMS in Multi-AZ mode.
*   C. Use DMS Serverless which handles task retries and network failures automatically.
*   D. Create a secondary task to replicate the remaining tables.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS DMS allows tasks to be configured to resume from the point of interruption using checkpoints, avoiding the need to restart the full load phase from scratch.
</details>

---

## Question 70: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company wants to migrate an application that runs on an Apache Tomcat web server to AWS. They do not want to manage OS patching or EC2 scaling configurations. Which migration target service is most suitable?

### Options
*   A. Amazon EC2.
*   B. AWS Elastic Beanstalk.
*   C. Amazon ECS.
*   D. AWS Lambda.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Elastic Beanstalk supports Apache Tomcat platforms. It automates deployment, capacity provisioning, load balancing, scaling, and platform updates, removing infrastructure management overhead.
</details>

---

## Question 71: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is migrating their on-premises SAN storage to AWS. They require a hybrid cloud storage service that allows local applications to access data with low latency via NFS, while backing up all files to Amazon S3. Which service should they deploy?

### Options
*   A. AWS DataSync.
*   B. Amazon S3 File Gateway (part of AWS Storage Gateway).
*   C. AWS Snowball Edge.
*   D. Amazon EFS.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon S3 File Gateway provides a local cache of files stored in S3, allowing local applications to access data using file protocols like NFS or SMB with low latency.
</details>

---

## Question 72: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is planning to migrate a Java-based monolithic application to AWS. They want to decompose the monolith into microservices. What migration path does this represent?

### Options
*   A. Rehost (Lift & Shift).
*   B. Refactor / Re-architect.
*   C. Replatform.
*   D. Repurchase.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Refactoring or re-architecting involves redesigning the application's architecture (e.g., monolith to microservices) to take full advantage of cloud-native features.
</details>

---

## Question 73: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
An enterprise wants to migrate a large-scale data warehouse (100 TB) from an on-premises Teradata appliance to Amazon Redshift. Which service helps convert database schemas and SQL scripts automatically?

### Options
*   A. AWS DMS.
*   B. AWS Schema Conversion Tool (SCT).
*   C. AWS Glue.
*   D. Amazon Redshift Spectrum.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS SCT (Schema Conversion Tool) converts database schemas, functions, and SQL scripts from legacy data warehouses (like Teradata) to Amazon Redshift.
</details>

---

## Question 74: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company is executing a database migration. After cutover to AWS, they detect a critical application bug that corrupts user data. They must roll back to the on-premises database. What setup is required to support this rollback with zero data loss?

### Options
*   A. A reverse DMS replication task running from the new AWS database back to the on-premises database, replicating all updates in real-time.
*   B. Take hourly snapshots of the RDS database and restore them on-premises.
*   C. Use AWS Backup to sync files back.
*   D. Manually copy database updates using CSV exports.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
To achieve a rollback with zero data loss, a reverse replication task must be configured (AWS database -> on-premises database) using DMS CDC, ensuring all transaction updates committed on AWS are mirrored back to the on-premises database.
</details>

---

## Question 75: Domain 4: Accelerate Workload Migration and Modernization

### Scenario
A company wants to transfer data from a Microsoft SQL Server database to an Amazon S3 bucket. The data must be converted into Parquet format during the migration for optimized analytical queries. Which tool combination handles this?

### Options
*   A. AWS DMS with S3 target settings configured to output data in Parquet format.
*   B. AWS DataSync.
*   C. VM Import/Export.
*   D. S3 Glacier Deep Archive.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS DMS allows S3 as a migration target. You can configure target endpoint settings (such as dataFormat=parquet and parquetVersion=parquet-1-0) to automatically convert database tables to Parquet files in S3.
</details>

---
