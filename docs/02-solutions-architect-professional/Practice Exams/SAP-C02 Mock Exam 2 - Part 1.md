---
sidebar_label: Part 1 (Questions 1-25)
---

﻿---
sidebar_position: 5
---

# SAP-C02 Full Mock Exam 2 - Part 1 (Questions 1-25)

This is Part 1 of the second full-length, 75-question AWS Certified Solutions Architect - Professional (SAP-C02) Practice Mock Exam. This part covers Domain 1 (Organizational Complexity) and Domain 2 (Design for New Solutions).

---

## Question 1: Domain 1: Design for Organizational Complexity

### Scenario
An enterprise has a multi-account structure managed via AWS Organizations. The security team wants to prevent any developer account from launching EC2 instances unless they are using approved AMIs from the central security account. What is the most effective way to enforce this policy across the entire organization?

### Options
*   A. Create an AWS Config rule in each member account that stops any non-compliant EC2 instance.
*   B. Implement a Service Control Policy (SCP) at the organization root that denies 'ec2:RunInstances' unless the ImageID matches a specific tag or list of ARNs approved by the security account.
*   C. Define an IAM Permissions Boundary in each member account that restricts the EC2 run instances API.
*   D. Share a Service Catalog portfolio containing approved EC2 products and delete EC2 access from IAM roles.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Service Control Policies (SCPs) are the primary tool to enforce organization-wide guardrails. By denying the ec2:RunInstances API unless the target AMI matches a specific condition (e.g., owned by the central security account ID or tagged with a verified compliance tag), you prevent the creation of unapproved EC2 instances at the API layer.
</details>

---

## Question 2: Domain 1: Design for Organizational Complexity

### Scenario
A global retailer uses AWS Organizations. They need to connect their corporate offices to multiple VPCs in different regions. The traffic must be encrypted, use dynamic routing, and scale to hundreds of connections. Which architecture meets this with the lowest management complexity?

### Options
*   A. Configure a full mesh of VPC Peering connections between all spoke VPCs.
*   B. Create a Transit Gateway in each region, peer the Transit Gateways, attach spoke VPCs locally, and terminate customer VPNs on the Transit Gateways.
*   C. Create a Direct Connect connection to a central Transit Gateway, and use public VIFs for all VPCs.
*   D. Deploy software routers in each VPC and configure IPsec VPN tunnels back to on-premises.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Transit Gateway simplifies network routing by acting as a hub. Peering regional Transit Gateways allows multi-region VPC connectivity. Terminating customer VPNs directly on the Transit Gateways provides encrypted, dynamically routed connections (using BGP) that scale easily.
</details>

---

## Question 3: Domain 1: Design for Organizational Complexity

### Scenario
An enterprise wants to implement AWS IAM Identity Center. They need to integrate their existing Microsoft Active Directory Domain Services (AD DS) located on-premises. The solution must support SSO and not replicate AD password hashes to the cloud. Which Directory Service option should they configure?

### Options
*   A. Simple AD.
*   B. AD Connector.
*   C. AWS Managed Microsoft AD with a trust relationship.
*   D. IAM SAML Identity Provider.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AD Connector is a directory gateway that redirects directory requests to your on-premises Microsoft Active Directory without caching or storing credentials in the cloud, making it the most secure, lowest-overhead option that meets these constraints.
</details>

---

## Question 4: Domain 1: Design for Organizational Complexity

### Scenario
A company has a multi-account environment. Spoke accounts must resolve internal DNS hostnames registered in a central services account's Route 53 Private Hosted Zone (PHZ). How can this be enabled without exposing public DNS endpoints?

### Options
*   A. Create Route 53 Resolver Inbound and Outbound Endpoints in all spoke accounts.
*   B. Associate the spoke VPCs with the central PHZ in Route 53. The central account must first authorize the association, and then the spoke accounts accept it.
*   C. Replicate the DNS zone files from the central account to spoke accounts daily.
*   D. Set up public DNS hosted zones and use private IP records.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
To allow VPCs in other accounts to resolve names in a Private Hosted Zone, the PHZ owner must authorize the cross-account association. Once authorized, the spoke VPC owner accepts the association, allowing native DNS queries without adding endpoints or forwarders.
</details>

---

## Question 5: Domain 1: Design for Organizational Complexity

### Scenario
A high-frequency trading firm needs to connect its on-premises infrastructure to AWS. They require a dedicated, low-latency connection with active-passive paths for maximum reliability. How should they design their BGP routing?

### Options
*   A. Set up two Direct Connect connections. Use AS-Path prepending on the passive connection to make the routing path longer, causing AWS to prefer the active link.
*   B. Set up a Direct Connect link and a backup VPN. Configure VPN as the active link.
*   C. Configure static routes on both Direct Connect virtual interfaces.
*   D. Configure OSPF weights on the on-premises router.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS prefers the Direct Connect path with the shortest AS-Path. By advertising routes from the passive link with additional AS-Path prepends, you instruct AWS to route all outbound traffic through the active link, failing over to the passive link automatically if the active path goes down.
</details>

---

## Question 6: Domain 1: Design for Organizational Complexity

### Scenario
A company has a multi-account AWS environment. A shared services account contains an S3 bucket with central configuration files. Spoke accounts need to read files from this bucket. What is the most secure and scale-friendly access design?

### Options
*   A. Attach a bucket policy to the shared S3 bucket that permits access to spoke accounts' IAM roles by ARN.
*   B. Configure cross-account IAM roles in the shared account and have spoke applications call 'AssumeRole'.
*   C. Use S3 Object Access Control Lists (ACLs) to grant public read permission to all files.
*   D. Copy the files to S3 buckets in every spoke account using S3 Replication.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
S3 supports resource-based policies (bucket policies). By listing the spoke accounts or specific spoke IAM role ARNs in the bucket policy and allowing s3:GetObject, spoke accounts can read data directly without the latency and complexity of assuming cross-account roles.
</details>

---

## Question 7: Domain 1: Design for Organizational Complexity

### Scenario
A security team needs to monitor AWS API calls across all accounts in an organization. They want to ensure that member accounts cannot delete or disable CloudTrail logging. What configuration enforces this?

### Options
*   A. Create an IAM Permissions Boundary in each account.
*   B. Enable an AWS Control Tower preventive guardrail or attach an SCP that denies 'cloudtrail:StopLogging' and 'cloudtrail:DeleteTrail' actions.
*   C. Use AWS Config to rebuild deleted trails.
*   D. Run a Lambda function on an EventBridge schedule to check for trail deletions.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
An SCP attached to the organizational units (OUs) that denies delete or stop actions on CloudTrail is the most effective and native way to enforce log integrity and prevent member accounts from disabling audit trails.
</details>

---

## Question 8: Domain 1: Design for Organizational Complexity

### Scenario
A company wants to share dynamic database endpoints from an Aurora cluster in Account A with spoke accounts. Spoke accounts must access the database privately over the AWS network. What should be used?

### Options
*   A. Deploy NAT Gateways in the spoke VPCs.
*   B. Create a VPC Endpoint Service (PrivateLink) in Account A powered by a Network Load Balancer (NLB) in front of the database, and create Interface Endpoints in spoke VPCs.
*   C. Use VPC Peering between all spoke VPCs and the database VPC.
*   D. Route database traffic over a software VPN.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS PrivateLink allows exposing services to other VPCs privately, even across different accounts, without establishing full routing peering. Deploying a Network Load Balancer (NLB) in front of the database and exposing it as a VPC Endpoint Service is the standard, most isolated way to share private endpoints.
</details>

---

## Question 9: Domain 1: Design for Organizational Complexity

### Scenario
A financial corporation wants to aggregate all billing data. They have three subsidiaries, each with its own AWS Organization. The corporate CFO wants to receive a single, combined invoice with custom markups applied for shared security services. How can they achieve this?

### Options
*   A. Consolidate the three organizations into a single organization, configure AWS Billing Conductor, and create billing groups with custom markups.
*   B. Write a custom Python script that queries the Cost Explorer API of all organizations and aggregates the outputs.
*   C. Use AWS Budgets to consolidate reports across organization lines.
*   D. Set up cross-account S3 bucket replication for the CUR reports.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS consolidated billing and Billing Conductor require accounts to be in the same AWS Organization. To generate a single invoice with custom billing groups and markup rules, the subsidiaries must be consolidated under a single Organization root, allowing Billing Conductor to manage the custom pro forma views.
</details>

---

## Question 10: Domain 1: Design for Organizational Complexity

### Scenario
An enterprise wants to enforce that no public subnets are created in spoke VPCs, except in designated ingress/egress VPCs. What is the most direct preventive control?

### Options
*   A. Apply an SCP that denies 'ec2:CreateInternetGateway' and 'ec2:AttachInternetGateway' actions, attaching it to all spoke account OUs.
*   B. Use an AWS Config rule to delete route table entries pointing to an Internet Gateway.
*   C. Implement a CloudWatch Alarm that detects IGW creations.
*   D. Remove public IP assignment configurations from EC2 launch templates.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
A subnet is public only if it has a route to an Internet Gateway (IGW). By denying the creation or attachment of Internet Gateways via an SCP in the spoke account OUs, you prevent the creation of public subnets, keeping those VPCs isolated by design.
</details>

---

## Question 11: Domain 1: Design for Organizational Complexity

### Scenario
A company has a multi-account environment. To comply with security policies, all data shared between VPCs must be encrypted in transit. Some VPCs reside in different regions. What is the most scalable way to connect these VPCs securely?

### Options
*   A. Peer all VPCs together using inter-region VPC peering, which encrypts traffic natively.
*   B. Build a Transit Gateway in each region, peer the Transit Gateways, and configure inter-region attachments.
*   C. Deploy EC2 instances running software VPNs in each VPC.
*   D. Route all inter-VPC traffic over the public internet using HTTPS.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Transit Gateway inter-region peering provides fully private, scalable, and encrypted network connections. Traffic between Transit Gateways is automatically encrypted by AWS using built-in hardware security, making it highly secure and scalable.
</details>

---

## Question 12: Domain 1: Design for Organizational Complexity

### Scenario
A security auditing tool runs in a dedicated Security Account. The tool needs to assume an IAM role in all member accounts to analyze configuration settings. What trust configuration is needed?

### Options
*   A. Create an IAM role in each member account with a trust policy that permits the Security Account ID as the Principal.
*   B. Allow the Security Account access using bucket policies on all S3 buckets.
*   C. Create a SAML identity provider in all member accounts pointing to the Security Account.
*   D. Store Security Account credentials in Secrets Manager inside each member account.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
Cross-account access via IAM is configured by creating a role in the target (member) account. The trust policy of this role must specify the Security Account's AWS account ID as the trusted Principal, allowing users or tools in the Security Account to call AssumeRole.
</details>

---

## Question 13: Domain 1: Design for Organizational Complexity

### Scenario
A company has a hybrid network. They need to connect their VPCs to their on-premises datacenter. They require a connection that supports up to 10 Gbps bandwidth, is dedicated, and provides predictable latency. Which service should they choose?

### Options
*   A. AWS Client VPN.
*   B. AWS Site-to-Site VPN.
*   C. AWS Direct Connect.
*   D. VPC Peering.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: C**

### Explanation:
AWS Direct Connect provides a dedicated, physical network connection from your datacenter to AWS, supporting bandwidths up to 100 Gbps and delivering consistent network latency and performance compared to internet-based VPNs.
</details>

---

## Question 14: Domain 1: Design for Organizational Complexity

### Scenario
A company is setting up AWS Control Tower. They want to customize newly provisioned accounts by automatically configuring AWS security services (like Amazon GuardDuty, AWS Security Hub, and Amazon Macie). What feature should they use?

### Options
*   A. Account Factory Customization using AWS Control Tower Lifecycle Events and CloudFormation StackSets.
*   B. Attach SCPs that enable these services.
*   C. Enable AWS Config rules manually after creation.
*   D. Use AWS Systems Manager to deploy agents.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS Control Tower emits lifecycle events when an account is successfully created. By capturing these events via EventBridge, you can trigger a Lambda function or CloudFormation StackSet to automatically deploy and configure security services across the new account.
</details>

---

## Question 15: Domain 1: Design for Organizational Complexity

### Scenario
A company has a multi-account environment. They want to share an S3 bucket in Account A with Account B. They must ensure that objects uploaded by Account B are owned by Account A, to avoid access permission issues. What bucket configuration is required?

### Options
*   A. Disable S3 Object Ownership on the bucket.
*   B. Set S3 Object Ownership to 'Bucket owner preferred' or 'Bucket owner enforced' on the bucket in Account A.
*   C. Use S3 Cross-Region Replication.
*   D. Write a custom Lambda function to copy files.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Setting S3 Object Ownership to Bucket owner preferred or Bucket owner enforced ensures that the bucket owner (Account A) automatically owns any new objects uploaded by other accounts (Account B), eliminating permission issues caused by writer ownership.
</details>

---

## Question 16: Domain 1: Design for Organizational Complexity

### Scenario
An enterprise wants to enforce that all IAM users in member accounts have Multi-Factor Authentication (MFA) enabled. If they do not, they must be denied all access to AWS APIs. Which SCP statement accomplishes this?

### Options
*   A. Deny all actions if the condition 'aws:MultiFactorAuthPresent' is false, with a NotAction clause that excludes IAM actions required to set up MFA.
*   B. Allow actions only if 'aws:MultiFactorAuthPresent' is true.
*   C. Deploy an AWS Config rule that checks for MFA compliance.
*   D. Enforce MFA via a Tag Policy.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
An SCP with a Deny effect testing ws:MultiFactorAuthPresent as false is the standard pattern. It must exclude IAM actions (using NotAction) like iam:CreateVirtualMFADevice and iam:EnableMFADevice to allow users to configure MFA in the first place.
</details>

---

## Question 17: Domain 1: Design for Organizational Complexity

### Scenario
A company is integrating their on-premises Active Directory with AWS IAM Identity Center. They want to ensure that if an employee is terminated and deactivated in the corporate AD, their access to AWS is revoked immediately. What configuration is required?

### Options
*   A. Run a cron job that calls the IAM delete user API.
*   B. Configure SCIM (System for Cross-domain Identity Management) provisioning between the identity provider and AWS IAM Identity Center.
*   C. Set up a forest trust with AWS Directory Service.
*   D. Rely on periodic manual audits of IAM credentials.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
SCIM provisioning synchronizes user accounts and groups from your external identity provider to AWS IAM Identity Center automatically in real-time. If a user is deactivated in the IdP, SCIM immediately propagates this change to AWS, revoking access.
</details>

---

## Question 18: Domain 1: Design for Organizational Complexity

### Scenario
A company has a multi-account setup. The finance department needs to access the raw billing reports (Cost and Usage Reports - CUR) from all accounts. The files are delivered to a central S3 bucket in a master account. How can they restrict access to the central S3 bucket to only the finance team?

### Options
*   A. Share the S3 bucket using AWS RAM.
*   B. Update the S3 Bucket Policy to allow access only to specific IAM roles mapped to the finance team, and enforce HTTPS access.
*   C. Create a separate AWS account for the finance team and copy the CUR files daily.
*   D. Encrypt the files using a regional KMS key.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Restricting access to a central S3 log or billing bucket is best managed via an S3 Bucket Policy. By explicitly allowing only the finance IAM roles/accounts to execute s3:GetObject and denying all others, you secure the data natively.
</details>

---

## Question 19: Domain 1: Design for Organizational Complexity

### Scenario
A company is designing a hybrid network using a Transit Gateway. They need to connect several VPCs and their on-premises datacenter. They want to ensure that traffic between VPC A and VPC B is blocked, but both can communicate with the central services VPC. What Transit Gateway feature should they use?

### Options
*   A. Route 53 Resolver rules.
*   B. Multiple Transit Gateway Route Tables with association and propagation rules configured to isolate the VPC paths.
*   C. VPC Peering connections.
*   D. Security groups attached to Transit Gateway attachments.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Transit Gateway supports multiple route tables. By associating VPC A and B with separate route tables that do not have routes to each other, but both have routes pointing to the central services VPC route table, you achieve network isolation.
</details>

---

## Question 20: Domain 1: Design for Organizational Complexity

### Scenario
A company has a multi-account environment. The security team wants to ensure that no resources are created in unapproved AWS regions. What is the most effective way to enforce this organization-wide?

### Options
*   A. Create an SCP that denies all actions unless the 'aws:RequestedRegion' condition matches the approved list of regions, and apply it to the Organization root.
*   B. Deploy an AWS Config rule to check resource regions.
*   C. Configure AWS Budgets to alert on spending in non-approved regions.
*   D. Terminate all resources using a Lambda function in non-approved regions.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
An SCP restricting regions using ws:RequestedRegion is a preventive control that blocks API calls targeting unapproved regions at the door. This is the most effective way to restrict region usage across all member accounts.
</details>

---

## Question 21: Domain 2: Design for New Solutions

### Scenario
A logistics company wants to build a serverless REST API that processes order requests. The API must handle highly volatile traffic patterns and require no server management. Which architecture represents the most resilient and scalable serverless configuration?

### Options
*   A. Deploy Apache Tomcat on EC2 instances behind an Application Load Balancer.
*   B. Create a REST API using Amazon API Gateway with AWS Lambda integration, storing transactional state in Amazon DynamoDB.
*   C. Set up an ECS cluster running on EC2 instances with a MySQL database.
*   D. Deploy the API on AWS Elastic Beanstalk with an RDS Postgres backend.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
API Gateway, Lambda, and DynamoDB are fully serverless, scaling automatically from zero to thousands of concurrent requests without manual infrastructure provisioning, satisfying all constraints.
</details>

---

## Question 22: Domain 2: Design for New Solutions

### Scenario
A financial analytics company requires a database that supports millisecond read latencies for high-frequency queries. The database must replicate data across multiple regions for low-latency global reads. Which service should they choose?

### Options
*   A. Amazon Aurora PostgreSQL.
*   B. Amazon RDS for SQL Server.
*   C. Amazon DynamoDB with Global Tables and DAX configured.
*   D. Amazon DocumentDB.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: C**

### Explanation:
DynamoDB Global Tables provide multi-region active-active database replication. Adding DynamoDB Accelerator (DAX) adds a fully managed in-memory cache, reducing read latencies to sub-milliseconds.
</details>

---

## Question 23: Domain 2: Design for New Solutions

### Scenario
A company needs to store transactional database backup files. The files must be stored durably, accessed rarely, but must be available within minutes if a recovery is required. What is the most cost-effective S3 storage class?

### Options
*   A. S3 Standard.
*   B. S3 Standard-IA.
*   C. S3 Glacier Instant Retrieval.
*   D. S3 Glacier Flexible Retrieval.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: C**

### Explanation:
S3 Glacier Instant Retrieval is the most cost-effective storage class for rarely accessed data that requires milliseconds retrieval (instant access), satisfying the recovery-in-minutes constraint at a lower cost than Standard-IA.
</details>

---

## Question 24: Domain 2: Design for New Solutions

### Scenario
A web application runs on EC2 instances behind an ALB. During traffic surges, the CPU utilization spikes, causing response times to slow down. What Auto Scaling configuration should the architect implement?

### Options
*   A. Configure a Target Tracking scaling policy based on the ALB request count per target metric.
*   B. Set up a Simple Scaling policy based on memory usage.
*   C. Manually adjust the Auto Scaling group desired capacity.
*   D. Create a Scheduled Scaling policy to add 5 instances every hour.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
Target Tracking scaling based on ALB Request Count Per Target adjusts instance count in direct response to request volume, keeping capacity aligned with load better than CPU metrics which can lag.
</details>

---

## Question 25: Domain 2: Design for New Solutions

### Scenario
A company is designing a high-performance database cluster. The database requires block storage with up to 100,000 IOPS and sub-millisecond latencies. Which Amazon EBS volume type should they select?

### Options
*   A. General Purpose SSD (gp3).
*   B. Provisioned IOPS SSD (io2 Block Express).
*   C. Throughput Optimized HDD (st1).
*   D. Cold HDD (sc1).

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
EBS io2 Block Express is designed for mission-critical, high-performance database workloads, supporting up to 256,000 IOPS and sub-millisecond latencies.
</details>

---

## Prerequisites

- [SAP-C02 Full Mock Exam - Part 3 (Questions 51-75)](SAP-C02 Mock Exam - Part 3.md)

## Recommended Next Topics

- [SAP-C02 Full Mock Exam 2 - Part 2 (Questions 26-50)](SAP-C02 Mock Exam 2 - Part 2.md)

## Related Topics

- [SAP-C02 Practice Mock Exams](SAP-C02 Mock Exam.md)
- [SAP-C02 Full Mock Exam - Part 1 (Questions 1-25)](SAP-C02 Mock Exam - Part 1.md)
- [SAP-C02 Full Mock Exam - Part 2 (Questions 26-50)](SAP-C02 Mock Exam - Part 2.md)
