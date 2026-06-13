---
sidebar_label: Part 2 (Questions 26-50)
---

﻿---
sidebar_position: 6
---

# SAP-C02 Full Mock Exam 2 - Part 2 (Questions 26-50)

This is Part 2 of the second full-length, 75-question AWS Certified Solutions Architect - Professional (SAP-C02) Practice Mock Exam. This part covers Domain 2 (Design for New Solutions) and Domain 3 (Continuous Improvement).

---

## Question 26: Domain 2: Design for New Solutions

### Scenario
A company is deploying containerized microservices. They want to ensure that containers are distributed across multiple Availability Zones, scale dynamically based on memory usage, and are managed using Kubernetes. Which service should they choose?

### Options
*   A. Amazon ECS.
*   B. Amazon EKS on AWS Fargate.
*   C. Amazon ECS on EC2.
*   D. AWS App Runner.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon EKS provides managed Kubernetes service, and running it on AWS Fargate provides serverless container compute, ensuring AZ-redundancy and automatic resource scaling without node management.
</details>

---

## Question 27: Domain 2: Design for New Solutions

### Scenario
A media application transcodes video uploads. The transcoding jobs are compute-intensive and can run for up to 30 minutes. What compute option should be used to run these tasks with the lowest cost and management overhead?

### Options
*   A. AWS Lambda.
*   B. AWS Batch with Fargate Spot resources.
*   C. EC2 On-Demand instances.
*   D. Amazon ECS on Dedicated Hosts.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Batch manages batch jobs efficiently, and using Fargate Spot compute resources reduces costs up to 70% without server management. Lambda cannot be used as its maximum execution limit is 15 minutes.
</details>

---

## Question 28: Domain 2: Design for New Solutions

### Scenario
A company wants to build an event-driven system where changes in database records in a DynamoDB table trigger the execution of a payment processing script. What architecture achieves this serverlessly?

### Options
*   A. Configure DynamoDB Streams to trigger an AWS Lambda function that executes the payment script.
*   B. Poll the DynamoDB table from an EC2 instance every 10 seconds.
*   C. Set up a CloudWatch Event on an hourly schedule.
*   D. Use AWS Glue to process table records daily.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
DynamoDB Streams captures item-level modifications in real-time. Integrating it with AWS Lambda allows you to run functions immediately in response to database changes with zero server management.
</details>

---

## Question 29: Domain 2: Design for New Solutions

### Scenario
A company is designing a web application. They need to protect the site from SQL injection, cross-site scripting (XSS), and HTTP floods. Which service should they deploy?

### Options
*   A. AWS Shield Standard.
*   B. AWS WAF attached to the Application Load Balancer or CloudFront distribution.
*   C. Amazon Inspector.
*   D. AWS Network Firewall.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS WAF (Web Application Firewall) inspects HTTP/HTTPS requests and allows you to block common web exploits like SQL injection, XSS, and HTTP flood attacks.
</details>

---

## Question 30: Domain 2: Design for New Solutions

### Scenario
A retail website is hosted in the us-west-2 region. The company wants to improve the load times of static assets (images, CSS) for users in Europe and Asia. What service configuration should they choose?

### Options
*   A. Deploy an Application Load Balancer in each region.
*   B. Create an Amazon CloudFront distribution with the S3 bucket as the origin.
*   C. Configure Route 53 Latency routing to S3 buckets.
*   D. Use AWS Global Accelerator.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon CloudFront is a Content Delivery Network (CDN) that caches static assets at edge locations worldwide, drastically reducing load times and latencies for global users.
</details>

---

## Question 31: Domain 2: Design for New Solutions

### Scenario
A company wants to build a data lake on Amazon S3. The data must be cataloged automatically, and schemas must be inferred so that data analysts can query the files using SQL. Which combination of services should be used?

### Options
*   A. AWS Glue Crawlers to catalog the data, and Amazon Athena for SQL queries.
*   B. Amazon Kinesis Data Firehose with Amazon Redshift.
*   C. AWS DataSync with S3 Select.
*   D. Amazon EMR running Hadoop.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS Glue Crawlers scan S3 data lakes to infer schemas and build a central Metadata Catalog. Once cataloged, analysts can query the files in-place using Amazon Athena SQL queries.
</details>

---

## Question 32: Domain 2: Design for New Solutions

### Scenario
An application running in a private subnet needs to access a third-party payment gateway over the internet. The connection must be secure and the private IP of the instances must not be exposed. Which network component should be deployed?

### Options
*   A. Internet Gateway.
*   B. NAT Gateway in a public subnet with a route in the private route table.
*   C. Transit Gateway Peering.
*   D. AWS PrivateLink.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
A NAT Gateway allows instances in private subnets to initiate outbound connections to the internet (for APIs/gateways) while blocking incoming connections, shielding private IP addresses.
</details>

---

## Question 33: Domain 2: Design for New Solutions

### Scenario
A company wants to host an Apache Spark application that processes terabytes of data daily. They want to manage the underlying cluster configuration and customize the Spark settings. Which service should they choose?

### Options
*   A. AWS Glue ETL.
*   B. Amazon EMR (Elastic MapReduce) cluster.
*   C. Amazon Athena.
*   D. AWS Batch.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon EMR is the industry-standard managed cluster platform for running big data frameworks like Spark, Hive, and Hadoop, allowing detailed customization of instance types and cluster settings.
</details>

---

## Question 34: Domain 2: Design for New Solutions

### Scenario
A company needs to implement a shared file system that can be mounted simultaneously by thousands of EC2 Linux instances running in multiple Availability Zones. The file system must scale capacity automatically. Which service should they choose?

### Options
*   A. Amazon EBS (gp3).
*   B. Amazon EFS (Elastic File System).
*   C. Amazon FSx for Windows File Server.
*   D. Amazon S3.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon EFS is a managed NFS file system that can be mounted concurrently by thousands of Linux instances across multiple Availability Zones, scaling storage capacity automatically as files are added.
</details>

---

## Question 35: Domain 2: Design for New Solutions

### Scenario
A company is deploying an application that uses Amazon RDS. They want to ensure database passwords are not hardcoded in the application code and are rotated every 30 days automatically. What is the recommended design?

### Options
*   A. Store passwords in Systems Manager Parameter Store.
*   B. Store passwords in AWS Secrets Manager and enable automatic rotation using a built-in Lambda function.
*   C. Hardcode passwords but encrypt the code files using KMS.
*   D. Use IAM Database Authentication and disable password requirements.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Secrets Manager securely stores secrets and supports automatic rotation (integrating natively with RDS databases via Lambda rotation templates), removing hardcoded secrets from code.
</details>

---

## Question 36: Domain 2: Design for New Solutions

### Scenario
A company needs a database that can store JSON documents, scale horizontal write capacity, and support standard MongoDB APIs. Which managed AWS database service should they select?

### Options
*   A. Amazon Aurora.
*   B. Amazon DocumentDB (with MongoDB compatibility).
*   C. Amazon Neptune.
*   D. Amazon Keyspaces.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon DocumentDB is a fully managed document database service that is compatible with MongoDB workloads, allowing developers to use existing MongoDB drivers and tools.
</details>

---

## Question 37: Domain 2: Design for New Solutions

### Scenario
A company is building an IoT platform. They need a service that can ingest streams of JSON messages from millions of sensors, buffer the data, and load it into Amazon S3 within 60 seconds of arrival. Which service is best suited?

### Options
*   A. Amazon SQS.
*   B. Amazon Kinesis Data Firehose.
*   C. AWS DataSync.
*   D. AWS Glue ETL.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon Kinesis Data Firehose is a fully managed streaming delivery service that can ingest, transform, buffer, and load streaming data into destinations like S3 or Redshift in near real-time.
</details>

---

## Question 38: Domain 2: Design for New Solutions

### Scenario
An application requires a NoSQL database to store shopping cart data. The database must scale instantly to support traffic spikes, require no schema design, and support single-digit millisecond latency reads. Which service should they choose?

### Options
*   A. Amazon Aurora.
*   B. Amazon DynamoDB.
*   C. Amazon Redshift.
*   D. Amazon ElastiCache.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon DynamoDB is a managed NoSQL database delivering consistent single-digit millisecond latency at any scale. It handles shopping cart data patterns perfectly and requires no schema definition.
</details>

---

## Question 39: Domain 2: Design for New Solutions

### Scenario
A company wants to deploy a containerized application to AWS. They want to configure load balancing, auto-scaling, and SSL termination without managing containers, clusters, or scaling policies directly. Which service should they choose?

### Options
*   A. Amazon ECS on EC2.
*   B. AWS App Runner.
*   C. Amazon EKS.
*   D. AWS Batch.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS App Runner is a fully managed container service that makes it easy for developers to quickly deploy containerized web applications and APIs, handling load balancing, auto-scaling, and routing automatically.
</details>

---

## Question 40: Domain 2: Design for New Solutions

### Scenario
A company wants to run a serverless application that queries data from an S3 bucket. The query load is irregular. They want to minimize costs by paying only for the data scanned. Which service should they choose?

### Options
*   A. Amazon Redshift.
*   B. Amazon Athena.
*   C. Amazon EMR.
*   D. AWS Glue ETL.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon Athena is a serverless query service. You write standard SQL queries directly against data stored in S3, paying only for the amount of data scanned per query.
</details>

---

## Question 41: Domain 2: Design for New Solutions

### Scenario
A company is designing a microservices application. They want to orchestrate multiple Lambda functions into a workflow, executing them in sequence, handling errors, and maintaining state. Which service should they use?

### Options
*   A. Amazon SQS.
*   B. AWS Step Functions.
*   C. Amazon EventBridge.
*   D. AWS Lambda Destinations.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Step Functions is a serverless orchestrator that makes it easy to coordinate multiple Lambda functions and AWS services into visual workflows, managing execution state and error retry logic.
</details>

---

## Question 42: Domain 2: Design for New Solutions

### Scenario
A company is setting up a hybrid network. They need to share an AWS Transit Gateway with multiple AWS accounts within their AWS Organization. Which service should they use to share the Transit Gateway?

### Options
*   A. VPC Peering.
*   B. AWS Resource Access Manager (RAM).
*   C. AWS Control Tower.
*   D. AWS CloudFormation.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Resource Access Manager (RAM) allows you to securely share AWS resources (like Transit Gateways, subnets, Route 53 Resolver rules) across accounts within your Organization.
</details>

---

## Question 43: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A web application hosted on EC2 instances experiences random database connection timeouts. The database is hosted on Amazon RDS MySQL. The database CPU utilization remains below 30%. How should the architect address this issue?

### Options
*   A. Scale up the DB instance class.
*   B. Deploy Amazon RDS Proxy in front of the database and update application database connection pools.
*   C. Enable RDS Auto Scaling.
*   D. Configure RDS Read Replicas.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon RDS Proxy pools and shares database connections, reducing the CPU and memory overhead of opening/closing connections. This resolves timeout issues caused by connection spikes exceeding database connection limits.
</details>

---

## Question 44: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to detect unauthorized configuration changes in their AWS environment (e.g., an IAM policy change or an S3 bucket made public) in near real-time. Which combination of services should they use to detect and alert on these changes?

### Options
*   A. AWS CloudTrail, Amazon EventBridge, and Amazon SNS.
*   B. AWS Config and AWS Trusted Advisor.
*   C. Amazon GuardDuty and AWS Shield.
*   D. CloudWatch Metrics and Auto Scaling.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS CloudTrail logs API calls. Amazon EventBridge can capture these API events in near real-time (e.g., detecting PutBucketAcl or CreatePolicy calls) and route them to an Amazon SNS topic to send alerts.
</details>

---

## Question 45: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
An application runs on EC2 instances behind an ALB. The traffic spikes heavily every Friday morning. The company wants to scale out compute capacity proactively to prevent performance issues. What scaling strategy should they choose?

### Options
*   A. Step Scaling.
*   B. Scheduled Scaling.
*   C. Target Tracking Scaling.
*   D. Simple Scaling.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Scheduled Scaling allows you to scale your Auto Scaling group based on predictable schedule patterns (like every Friday morning), ensuring capacity is added before traffic arrives.
</details>

---

## Question 46: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A security audit highlights that data in transit to an S3 bucket is not encrypted. The company wants to enforce that all connections to the S3 bucket must use HTTPS. What configuration is required?

### Options
*   A. Enable default encryption on the S3 bucket.
*   B. Apply an S3 Bucket Policy that contains a Deny statement for any action where the condition 'aws:SecureTransport' is false.
*   C. Deploy AWS Shield Advanced.
*   D. Use a KMS Customer Managed Key.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The ws:SecureTransport global condition key tests whether requests are sent using SSL/HTTPS. Adding a Deny statement in the S3 bucket policy for ws:SecureTransport=false blocks unencrypted HTTP requests.
</details>

---

## Question 47: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to identify underutilized EBS volumes across all their AWS accounts to reduce storage costs. Which service or tool provides these recommendations out of the box?

### Options
*   A. AWS Compute Optimizer.
*   B. AWS Trusted Advisor.
*   C. Cost Explorer.
*   D. AWS Config.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Trusted Advisor includes cost optimization checks, specifically identifying underutilized EBS volumes and idle RDS instances, helping you eliminate wasted resources.
</details>

---

## Question 48: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A database administrator wants to set up a multi-region disaster recovery database for a business-critical application. The database must support sub-second cross-region replication latency and allow read queries in the secondary region. Which database service fits this?

### Options
*   A. Amazon RDS for PostgreSQL with cross-region replicas.
*   B. Amazon Aurora Global Database.
*   C. Amazon DynamoDB.
*   D. Amazon Redshift.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon Aurora Global Database provides fast cross-region replication (< 150 ms latency) and allows read-only scaling in the secondary regions, satisfying the RPO and read-scaling goals.
</details>

---

## Question 49: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company wants to track AWS resource configuration history over time, such as changes made to a security group's ingress rules. Which service should they enable?

### Options
*   A. AWS CloudTrail.
*   B. AWS Config.
*   C. Amazon CloudWatch.
*   D. AWS Artifact.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Config records resource configurations and relationships. It maintains a timeline of configuration changes (configuration history), making it ideal for auditing security group modifications.
</details>

---

## Question 50: Domain 3: Continuous Improvement for Existing Solutions

### Scenario
A company is reviewing its compute costs. They have many web servers that run constantly with predictable CPU load. Which pricing model offers the highest savings for this workload?

### Options
*   A. Spot Instances.
*   B. EC2 Instance Savings Plans.
*   C. On-Demand Instances.
*   D. Dedicated Hosts.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
For predictable, 24/7 workloads, committing to an EC2 Instance Savings Plan offers significant discounts (up to 72% off On-Demand rates) in exchange for a 1 or 3-year commitment.
</details>

---
