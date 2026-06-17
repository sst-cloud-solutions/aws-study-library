---
sidebar_position: 3
sidebar_label: Part 2 (Questions 26-50)
---

# SAP-C02 Full Mock Exam - Part 2 (Questions 26-50)

This is Part 2 of the full-length, 75-question AWS Certified Solutions Architect - Professional (SAP-C02) Practice Mock Exam. This part covers Domain 2 (Design for New Solutions) and Domain 3 (Continuous Improvement).

---

## Question 26: Domain 2: Design for New Solutions

### Scenario
A critical application requires an Amazon Aurora MySQL database. The database must remain highly available even if an entire AWS Region suffers an outage. The RTO must be less than 1 minute. Which DB design satisfies this?

### Options
*   A. Aurora Multi-AZ deployment with a read replica in the same region.
*   B. Amazon Aurora Global Database with managed cross-region failover.
*   C. Set up a cron job to take snapshots and copy them to another region.
*   D. Use AWS Database Migration Service (DMS) to replicate data to another region.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Aurora Global Database replicates data to a secondary region with sub-second latency. It supports managed cross-region failover, allowing the promotion of the secondary cluster to a primary writer in under a minute, meeting the RTO requirement.
</details>

---

## Question 27: Domain 2: Design for New Solutions

### Scenario
An application is deploying a new REST API on AWS. The API must be secured using OAuth 2.0 tokens and handle rate-limiting and IP whitelisting. Which service configuration should be deployed?

### Options
*   A. Application Load Balancer (ALB) with AWS WAF.
*   B. Amazon API Gateway with custom authorizers and AWS WAF integration.
*   C. Amazon Route 53 with latency routing.
*   D. AWS AppSync with API keys.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon API Gateway natively supports custom authorizers (for OAuth 2.0 validation), client rate-limiting (throttling), and integrates with AWS WAF for IP whitelisting and threat protection.
</details>

---

## Question 28: Domain 2: Design for New Solutions

### Scenario
A logistics company needs to track vehicles in real-time. Thousands of IoT devices will send telemetry data every 5 seconds. The data must be ingested, processed in real-time, and stored in a time-series database. Which ingestion and streaming service should be chosen?

### Options
*   A. AWS IoT Core with Amazon Kinesis Data Streams.
*   B. Amazon SQS with AWS Lambda.
*   C. Amazon Kinesis Data Firehose writing directly to S3.
*   D. AWS Glue ETL.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS IoT Core securely connects devices to AWS. Pairing it with Amazon Kinesis Data Streams allows real-time ingestion of high-frequency data streams, which can then be processed and stored in a database (like Amazon Timestream).
</details>

---

## Question 29: Domain 2: Design for New Solutions

### Scenario
A company is designing a web application that must comply with PCI-DSS. The web servers must use SSL/TLS encryption. The private keys must be stored in a dedicated, FIPS 140-2 Level 3 compliant hardware security module (HSM). Which service should they choose?

### Options
*   A. AWS KMS (Key Management Service).
*   B. AWS CloudHSM.
*   C. AWS Certificate Manager (ACM).
*   D. Systems Manager Parameter Store.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS CloudHSM provides dedicated HSMs that are FIPS 140-2 Level 3 compliant, whereas AWS KMS is multi-tenant and compliant up to Level 2 for standard keys. CloudHSM is the standard choice for PCI-DSS workloads requiring dedicated Level 3 modules.
</details>

---

## Question 30: Domain 2: Design for New Solutions

### Scenario
A company wants to host a static website on AWS. The website must be highly performant worldwide, secure (HTTPS), and cost-effective. Which combination of services should they use?

### Options
*   A. Amazon S3 static website hosting with Amazon CloudFront and AWS Certificate Manager (ACM).
*   B. Amazon EC2 instances running Apache web servers behind an ALB.
*   C. AWS Elastic Beanstalk with an ALB.
*   D. Amazon Lightsail.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
Amazon S3 static website hosting combined with Amazon CloudFront provides global content caching and HTTPS support (via ACM). This serverless design is highly performant, secure, and significantly cheaper than running server instances.
</details>

---

## Question 31: Domain 2: Design for New Solutions

### Scenario
A financial analytics company needs to run daily batch jobs that process millions of records. The jobs take 15 to 20 minutes to complete. The company wants to minimize costs and administrative overhead. Which service should they use?

### Options
*   A. AWS Lambda.
*   B. AWS Batch running on Fargate compute resources.
*   C. Amazon EMR cluster running Spark.
*   D. Amazon EC2 Spot Instances managed by a custom cron script.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Batch automatically plans, schedules, and executes containerized batch jobs. Running on Fargate eliminates server management. AWS Lambda is not suitable because its maximum execution timeout is 15 minutes, whereas the batch jobs require 15 to 20 minutes.
</details>

---

## Question 32: Domain 2: Design for New Solutions

### Scenario
An application requires an Amazon Relational Database Service (RDS) instance. During business hours, the database experiences high read traffic, causing performance degradation. The write traffic remains constant. What is the most cost-effective way to scale the database?

### Options
*   A. Scale up the DB instance class (vertical scaling).
*   B. Create RDS Read Replicas and offload read traffic from the primary instance.
*   C. Deploy a Redis cache in front of the database.
*   D. Migrate the database to Amazon DynamoDB.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Creating RDS Read Replicas is the most direct and cost-effective way to scale read-heavy relational databases without altering the database engine. Scaling up the instance class is more expensive and requires a brief write outage during modification.
</details>

---

## Question 33: Domain 2: Design for New Solutions

### Scenario
A company is designing a backend system that will receive messages from external systems. The messages must be processed sequentially in the order they are received. How should the architect design this queue system?

### Options
*   A. Use an Amazon SQS Standard Queue.
*   B. Use an Amazon SQS FIFO Queue.
*   C. Use Amazon SNS with SMS delivery.
*   D. Deploy Amazon MQ in Active/Standby mode.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon SQS FIFO (First-In-First-Out) queues guarantee ordered delivery and exactly-once processing, making them suitable for applications requiring strict sequential processing.
</details>

---

## Question 34: Domain 2: Design for New Solutions

### Scenario
A company needs to implement a file storage solution for a Windows-based application. The application requires SMB protocol support, Active Directory integration, and DFS namespaces. Which service should they choose?

### Options
*   A. Amazon EFS.
*   B. Amazon FSx for Windows File Server.
*   C. Amazon S3 mounted as a network drive.
*   D. Amazon FSx for Lustre.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon FSx for Windows File Server provides fully managed Windows utility file storage. It natively supports the SMB protocol, Active Directory integration, and DFS Namespaces.
</details>

---

## Question 35: Domain 2: Design for New Solutions

### Scenario
A global gaming application needs a network architecture that minimizes latency for players worldwide. The application backend is hosted in the us-east-1 region. What service should be deployed to routing player traffic?

### Options
*   A. Amazon CloudFront.
*   B. AWS Global Accelerator.
*   C. Route 53 Latency Routing.
*   D. AWS Direct Connect.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Global Accelerator routes user traffic through AWS's global network edge locations, minimizing latency and jitter. It is optimized for non-HTTP protocols (like UDP/TCP gaming traffic) compared to CloudFront, which focuses on HTTP/HTTPS content caching.
</details>

---

## Question 36: Domain 2: Design for New Solutions

### Scenario
A machine learning application needs to run inference on large models. The compute resources must scale dynamically based on request load, but must run in a secure, private subnet. Which configuration meets these requirements?

### Options
*   A. Amazon SageMaker endpoints deployed inside a VPC private subnet.
*   B. AWS Lambda functions with public endpoints.
*   C. Amazon EC2 instances running behind a public ALB.
*   D. AWS Batch jobs running on Spot instances.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
Amazon SageMaker supports deploying real-time inference endpoints inside a VPC. This allows the endpoint to communicate privately with other internal systems while automatically scaling compute based on load.
</details>

---

## Question 37: Domain 2: Design for New Solutions

### Scenario
A company is designing an infrastructure deployment pipeline. They want to ensure that all infrastructure resources are modeled and provisioned as code. They prefer using a programming language like TypeScript instead of JSON/YAML. Which tool should they choose?

### Options
*   A. AWS CloudFormation.
*   B. AWS Cloud Development Kit (CDK).
*   C. AWS Systems Manager Parameter Store.
*   D. AWS OpsWorks.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS CDK allows developers to define cloud infrastructure using familiar programming languages like TypeScript, Python, Java, or C#. It compiles down to standard CloudFormation JSON/YAML templates.
</details>

---

## Question 38: Domain 2: Design for New Solutions

### Scenario
A company wants to store data in Amazon S3. The data must be transitioned to cheaper storage tiers as it ages, and eventually deleted after 7 years. What S3 feature should be configured?

### Options
*   A. S3 Object Lock.
*   B. S3 Lifecycle Policies.
*   C. S3 Replication.
*   D. S3 Intelligent-Tiering.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
S3 Lifecycle Policies allow you to define rules to automatically transition objects to colder storage tiers (like S3 Standard-IA, Glacier) and delete them after a specific time period (e.g., 7 years).
</details>

---

## Question 39: Domain 2: Design for New Solutions

### Scenario
An application needs to process files uploaded to S3. When a file is uploaded, a processing job must run immediately. Which architecture provides serverless, event-driven integration?

### Options
*   A. Configure S3 event notifications to trigger an AWS Lambda function directly.
*   B. Set up an EC2 instance that polls the S3 bucket every 5 seconds.
*   C. Use Amazon Kinesis Data Firehose to stream files from S3.
*   D. Schedule a daily AWS Glue job to check for new files.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
S3 Event Notifications can trigger AWS Lambda functions directly when objects are created or deleted. This event-driven, serverless approach is highly responsive and scales automatically.
</details>

---

## Question 40: Domain 2: Design FOR New Solutions

### Scenario
A company requires a database that supports highly complex graph queries, such as social network relationships or fraud detection patterns. Which managed AWS database service should they choose?

### Options
*   A. Amazon Aurora.
*   B. Amazon Neptune.
*   C. Amazon DocumentDB.
*   D. Amazon Keyspaces.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon Neptune is a graph database service supporting Gremlin and SPARQL. It is optimized for storing and querying highly connected graph relationships with low latency.
</details>

---

## Question 41: Domain 2: Design for New Solutions

### Scenario
A security requirement states that all traffic between EC2 instances in a VPC and Amazon DynamoDB must not traverse the public internet. How can this be accomplished with zero cost?

### Options
*   A. Configure a NAT Gateway in the public subnet.
*   B. Create a Gateway VPC Endpoint for DynamoDB and associate it with the VPC route tables.
*   C. Configure an Interface VPC Endpoint (PrivateLink) for DynamoDB.
*   D. Establish a VPN connection to the VPC.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Gateway VPC Endpoints for S3 and DynamoDB are free and route traffic privately from the VPC to the service without going over the public internet, satisfying both the security and cost constraints.
</details>

---

## Question 42: Domain 2: Design for New Solutions

### Scenario
A company is building an analytics platform. They need to query structured data stored in Amazon S3 using standard SQL queries without loading the data into a database. Which service should they use?

### Options
*   A. Amazon Redshift.
*   B. Amazon Athena.
*   C. AWS Glue Data Brew.
*   D. Amazon EMR.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. It is serverless, so there is no infrastructure to manage, and you pay only for the queries you run.
</details>

---

## Question 43: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
An application running on EC2 instances behind an ALB experiences periodic response time spikes. The CPU utilization on the instances remains low. How should the architect investigate the issue?

### Options
*   A. Enable ALB Access Logs and analyze the 'target_processing_time' field.
*   B. Check CPU utilization using CloudWatch host metrics.
*   C. Increase the Auto Scaling Group minimum capacity.
*   D. Modify the instance type to a memory-optimized class.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
ALB Access Logs capture detailed information about requests sent to the load balancer. The 	arget_processing_time field represents the time taken by target instances to process the request, allowing you to isolate application latency issues from ALB queue delays.
</details>

---

## Question 44: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to identify security compliance drift across all AWS accounts in their Organization. They want to check if security groups are open to the world (0.0.0.0/0) on SSH port 22 and remediate them. How should they configure this centrally?

### Options
*   A. Deploy AWS Config rules across the organization and configure a central aggregator.
*   B. Enable GuardDuty and configure it to send alerts via SNS.
*   C. Use AWS Trusted Advisor in each member account manually.
*   D. Write a custom Python script that runs on a cron job on an EC2 instance.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS Config allows you to define compliance rules (e.g., restricted SSH) and deploy them organization-wide. A central aggregator collects compliance data from all accounts, providing a unified view of security posture drift.
</details>

---

## Question 45: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A retail application runs on EC2 instances. During marketing campaigns, traffic increases tenfold in minutes. The current Auto Scaling policy uses CPU utilization to scale, but instances are launched too slowly, causing application timeouts. How can the scaling behavior be improved?

### Options
*   A. Switch to target tracking scaling on CPU utilization.
*   B. Configure a Scheduled Scaling policy to launch instances ahead of known campaigns, and configure Warm Pools to pre-initialize instances.
*   C. Use Step Scaling with aggressive thresholds.
*   D. Increase the cooldown period.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Scheduled Scaling launches instances before a known traffic spike. Combining it with ASG Warm Pools pre-initializes instances (bakes them or runs boot scripts), allowing them to join the active pool in seconds during scaling, eliminating launch lag.
</details>

---

## Question 46: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to encrypt sensitive data stored in S3 buckets. The security policy states that the KMS keys must be rotated every year. The keys are managed by AWS. What is the most automated way to achieve this?

### Options
*   A. Create a new Customer Managed Key every year and update application code.
*   B. Enable automatic key rotation on the KMS Customer Managed Key.
*   C. Write a Lambda function that rotates keys using the KMS API.
*   D. AWS automatically rotates AWS Managed Keys every year, so no action is required if using default S3 encryption keys.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
For Customer Managed Keys (CMKs) in AWS KMS, you can enable automatic key rotation with a single click. AWS will automatically rotate the key material every year, preserving the key's ARN and preventing code changes.
</details>

---

## Question 47: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company is reviewing its AWS spending. They have several RDS databases that are used only during office hours (9 AM to 5 PM, Monday to Friday). How can they reduce database costs with the least effort?

### Options
*   A. Migrate the databases to Aurora Serverless.
*   B. Use AWS Instance Scheduler to automatically stop the RDS instances outside office hours and restart them in the morning.
*   C. Delete the databases and restore them from snapshots every morning.
*   D. Apply for Reserved Instances for all databases.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Instance Scheduler allows you to configure start/stop schedules for EC2 and RDS instances, reducing costs for non-production databases that do not need to run 24/7.
</details>

---

## Question 48: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company has a multi-tier application. The web tier is stateless, but the database tier is stateful. The company wants to implement a multi-region disaster recovery strategy. The RPO must be 15 minutes and RTO must be 30 minutes. What DR pattern should they choose?

### Options
*   A. Backup & Restore.
*   B. Pilot Light using Aurora Global Database.
*   C. Active-Active Multi-Site.
*   D. Warm Standby.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Pilot Light maintains a running database replica in the secondary region (Aurora Global Database handles sub-second replication) while keeping compute resources idle or scaled-down, easily satisfying the 15-minute RPO and 30-minute RTO targets.
</details>

---

## Question 49: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to track user API operations inside their AWS accounts. Specifically, they need to log who deleted an EC2 instance and when. Which service provides this information?

### Options
*   A. Amazon CloudWatch.
*   B. AWS CloudTrail.
*   C. AWS Config.
*   D. Amazon GuardDuty.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS CloudTrail records API activity in your AWS account. It details the identity of the API caller, the time of the call, the source IP, and the parameters of the request, making it ideal for auditing actions like instance deletion.
</details>

---

## Question 50: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company is analyzing its EC2 instance usage. They want to identify underutilized instances and receive recommendations for resizing or stopping them. Which tool should they use?

### Options
*   A. AWS Trusted Advisor.
*   B. AWS Compute Optimizer.
*   C. Cost Explorer.
*   D. AWS Budgets.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Compute Optimizer analyzes resource configurations and utilization metrics to provide sizing recommendations, helping you identify opportunities to downsize or change instance types.
</details>

---

## Prerequisites

- [SAP-C02 Full Mock Exam - Part 1 (Questions 1-25)](SAP-C02 Mock Exam - Part 1.md)

## Recommended Next Topics

- [SAP-C02 Full Mock Exam - Part 3 (Questions 51-75)](SAP-C02 Mock Exam - Part 3.md)

## Related Topics

- [SAP-C02 Practice Mock Exams](SAP-C02 Mock Exam.md)
- [SAP-C02 Full Mock Exam - Part 1 (Questions 1-25)](SAP-C02 Mock Exam - Part 1.md)
- [SAP-C02 Full Mock Exam - Part 3 (Questions 51-75)](SAP-C02 Mock Exam - Part 3.md)
