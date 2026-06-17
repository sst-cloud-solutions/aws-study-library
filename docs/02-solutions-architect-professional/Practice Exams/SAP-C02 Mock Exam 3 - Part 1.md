---
sidebar_label: Part 1 (Questions 1-25)
---

﻿---
sidebar_position: 9
---

# SAP-C02 Full Mock Exam 3 - Part 1 (Questions 1-25)

This is Part 1 of the third full-length, 75-question AWS Certified Solutions Architect - Professional (SAP-C02) Practice Mock Exam. This part covers Domain 1 (Organizational Complexity) and Domain 2 (Design for New Solutions) with high-difficulty scenarios.

---

## Question 1: Domain 1: Design for Organizational Complexity

### Scenario
An enterprise wants to enforce a strict security policy across its 100+ AWS member accounts managed by AWS Control Tower. Any API attempt to create a public S3 bucket or modify an existing bucket to allow public access must be immediately blocked. However, three central security accounts must be excluded from this policy to allow public audit logging. What is the most operationally efficient way to implement this policy?

### Options
*   A. Create an SCP at the Organization root that denies 's3:PutBucketPublicAccessBlock' and 's3:PutBucketPolicy' unless the request originates from the three security account IDs, and apply the SCP organization-wide.
*   B. Create a custom AWS Config Rule in each member account that automatically deletes public bucket policies and enables the public access block via an Systems Manager remediation document.
*   C. Define a central Service Catalog S3 bucket product with the public access block enabled, and restrict spoke accounts' IAM roles to deploy S3 buckets only through Service Catalog.
*   D. Group all member accounts (excluding the three security accounts) into a custom Organizational Unit (OU) structure, and attach an SCP to those OUs that denies 's3:PutBucketPublicAccessBlock' and 's3:PutBucketPolicy' when the public block is disabled.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: D**

### Explanation:
The most efficient and secure way to exclude specific accounts from an SCP is to isolate them within the Organizational Unit (OU) structure. Attaching the restrictive SCP to the OUs containing the member accounts, while keeping the security accounts in a separate OU without the SCP, enforces the guardrail without complex condition logic that might exceed SCP size limits.
</details>

---

## Question 2: Domain 1: Design for Organizational Complexity

### Scenario
A global financial group is building a hybrid cloud network. They have multiple AWS accounts connected via Transit Gateways in us-east-1 and eu-west-1. The Transit Gateways are peered. On-premises datacenters are connected via 10 Gbps Direct Connect links terminating at a Direct Connect Gateway. They require that traffic between us-east-1 and on-premises uses the local DX link, but must fail over to the peered Transit Gateway and eu-west-1 DX link within 5 seconds if the local link fails. How should this routing behavior be configured?

### Options
*   A. Configure static routing on all virtual interfaces (VIFs), manually updating routes when a link failure occurs.
*   B. Configure BGP on the Direct Connect VIFs. Set BGP community tags on the on-premises routers to advertise local routes with a higher local preference, and use AS-Path prepending on the cross-region failover path.
*   C. Peer all VPCs using VPC Peering instead of Transit Gateway to handle regional path failovers automatically.
*   D. Set up an IPsec VPN over the public internet as the primary path and configure Direct Connect as the backup path.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
BGP routing with community tags and AS-Path prepending allows establishing primary and backup dynamic routing paths. By prepending the AS-Path on the cross-region link, AWS will prefer the local, shorter path during normal operations and automatically reroute traffic via the peered Transit Gateway if the local link drops.
</details>

---

## Question 3: Domain 1: Design for Organizational Complexity

### Scenario
A company wants to federate its on-premises Microsoft Active Directory with AWS IAM Identity Center. They want to ensure that access permissions are evaluated dynamically at session launch based on both the user's AD group memberships and the security tags of the target AWS accounts. What configuration should the architect recommend?

### Options
*   A. Use AD Connector to sync users, and write IAM Permission Boundaries in each account.
*   B. Sync users and groups via SCIM, and implement Attribute-Based Access Control (ABAC) using permission sets in IAM Identity Center that compare Principal tags (e.g., Department) with Resource tags.
*   C. Configure manual IAM roles in each account and map them to AD groups using custom ADFS federation claims.
*   D. Deploy AWS Managed Microsoft AD and set up forest trusts with dynamic trust mapping configurations.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
SCIM synchronizes AD users and groups to IAM Identity Center, mapping AD attributes as principal tags. Employing Attribute-Based Access Control (ABAC) in permission sets allows comparing these Principal tags directly against target resource tags, enabling dynamic and secure group access evaluations.
</details>

---

## Question 4: Domain 1: Design for Organizational Complexity

### Scenario
A company has a central services VPC containing a shared Amazon RDS MySQL database. Multiple spoke VPCs owned by different business units in the same AWS Organization need to access this database. The spoke VPCs must not have direct network routing to each other. What is the most secure and scalable way to provide database access?

### Options
*   A. Peer all spoke VPCs to the central services VPC using a hub-and-spoke VPC Peering design.
*   B. Configure a VPC Endpoint Service (PrivateLink) in the central Services VPC powered by a Network Load Balancer (NLB) in front of the RDS database, and create Interface VPC Endpoints in the spoke VPCs.
*   C. Use a Transit Gateway to connect all VPCs and configure a single routing table containing all VPC attachments.
*   D. Deploy a NAT Gateway in the central VPC and route all spoke traffic through the internet.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS PrivateLink provides private, one-way network connectivity to specific services without establishing full IP routing or peering between VPCs. Using an NLB in front of RDS and exposing it as an Endpoint Service ensures that spokes can access the database, but spokes remain completely isolated from one another.
</details>

---

## Question 5: Domain 1: Design for Organizational Complexity

### Scenario
A financial company is setting up a hybrid network. They have a 10 Gbps Direct Connect (DX) link to their primary on-premises datacenter. They require an encrypted backup network path to AWS that automatically fails over if the Direct Connect link goes down. RTO must be minimal. Which solution should they choose?

### Options
*   A. Set up a secondary 1 Gbps Direct Connect connection at a different location, and configure BGP metrics.
*   B. Configure an IPsec VPN connection over the public internet to the Transit Gateway. Advertise routes via BGP. Assign a higher AS-Path prepend value to the VPN connection to make it the backup path.
*   C. Set up a software VPN on EC2 instances and write a Lambda function to update route tables when CloudWatch detects DX latency spikes.
*   D. Configure an AWS Client VPN endpoint and instruct administrators to connect manually when the DX link fails.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
A backup IPsec VPN connection terminating at the Transit Gateway with BGP routing provides automated failover. Prepending the AS-Path on the VPN connection ensures that AWS prefers the Direct Connect link (shorter path) during normal operation, and automatically routes traffic to the VPN if the DX link goes down.
</details>

---

## Question 6: Domain 1: Design for Organizational Complexity

### Scenario
A company is using AWS Organizations. The finance department needs to allocate AWS costs across multiple business units. Some BUs have custom pricing agreements (e.g., 10% discount on EC2) and require custom line items for shared tooling. Which service should they implement?

### Options
*   A. AWS Cost Explorer with custom billing tags.
*   B. AWS Budgets with billing alerts mapped to custom SNS topics.
*   C. AWS Billing Conductor to create custom billing groups and define custom pricing parameters for BUs.
*   D. Amazon Athena querying the Cost and Usage Report (CUR) database.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: C**

### Explanation:
AWS Billing Conductor allows customers to group member accounts into custom billing groups, define custom pricing rules (discounts, markups, or public rates), and insert custom line items. This generates pro-forma billing reports for internal chargebacks without affecting the master consolidated billing data.
</details>

---

## Question 7: Domain 1: Design for Organizational Complexity

### Scenario
A company is migrating multiple accounts into AWS Organizations. The security team wants to ensure that no member account can create public S3 buckets. However, three specific accounts used by the marketing team must be allowed to create public S3 buckets for hosting assets. How should this be implemented?

### Options
*   A. Apply an SCP at the root level that denies 's3:PutBucketPublicAccessBlock' and apply it to all accounts.
*   B. Create a Service Control Policy (SCP) that denies public S3 bucket creation, and attach it to an Organizational Unit (OU) containing all accounts except the three marketing accounts.
*   C. Enable AWS Config in all accounts, and use a remediation rule to delete any public S3 bucket automatically.
*   D. Create an IAM policy with a deny statement for public S3 bucket creation and attach it to all users.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
SCPs cannot have exceptions for specific accounts in their target list directly unless structured using conditions or target scoping. The most secure and clean way is to group the non-marketing accounts into an OU and attach the restrictive SCP to that OU, leaving the marketing accounts in a separate OU without the restriction.
</details>

---

## Question 8: Domain 1: Design for Organizational Complexity

### Scenario
A company has a multi-account setup using AWS Organizations. The security team needs to deploy an IAM security role into all existing and future member accounts. The role must trust the security account and allow security engineers to perform incident audits. What is the most automated way to achieve this?

### Options
*   A. Write a script using the AWS CLI to loop through all accounts and create the IAM role manually.
*   B. Use AWS CloudFormation StackSets targeted at the Organization root, configuring it to automatically deploy the stack to any new accounts added to the organization.
*   C. Configure AWS Control Tower to run a lifecycle event trigger that runs a Lambda function to create the role.
*   D. Write a custom Systems Manager Automation document and share it with all accounts.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS CloudFormation StackSets with service-managed permissions integrates directly with AWS Organizations. By enabling automatic deployment, CloudFormation will automatically deploy the stack containing the IAM role to any new accounts that join the target OUs or organization root in the future.
</details>

---

## Question 9: Domain 1: Design for Organizational Complexity

### Scenario
A company has a Direct Connect Gateway connected to a Transit Gateway. Spoke VPCs are attached to the Transit Gateway. The customer wants to ensure that dynamic routes are shared between their on-premises datacenter and AWS spoke VPCs. Which protocol should be configured on the Direct Connect virtual interfaces (VIFs)?

### Options
*   A. OSPF (Open Shortest Path First)
*   B. Static routing only
*   C. BGP (Border Gateway Protocol)
*   D. RIP (Routing Information Protocol)

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: C**

### Explanation:
AWS Direct Connect requires BGP (Border Gateway Protocol) for dynamic routing. This allows the Direct Connect Gateway and the on-premises router to exchange routing information automatically, facilitating failover and route adjustments.
</details>

---

## Question 10: Domain 1: Design for Organizational Complexity

### Scenario
An enterprise wants to enforce tag compliance across its entire AWS Organization. Specifically, all EC2 instances must be tagged with a 'Project' tag upon creation. If a user tries to launch an EC2 instance without this tag, the API call must be blocked. Which configuration meets this goal?

### Options
*   A. Create an AWS Organizations Tag Policy requiring the 'Project' tag on EC2 instances.
*   B. Create a Service Control Policy (SCP) with a Deny effect on 'ec2:RunInstances' if the request tag 'aws:RequestTag/Project' is missing.
*   C. Set up a CloudWatch Alarm that triggers a Lambda function to stop any untagged EC2 instance.
*   D. Create an AWS Config rule that checks for the 'Project' tag and flags non-compliant instances.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Tag Policies enforce tag spelling and values, but they do NOT block resource creation. To block the API call at execution time, a Service Control Policy (SCP) with a Deny effect is required, testing the presence of the tag via ws:RequestTag/Project during ec2:RunInstances.
</details>

---

## Question 11: Domain 1: Design for Organizational Complexity

### Scenario
A company has multiple spoke VPCs that need to access a shared S3 bucket in a central services VPC. To comply with security policies, the spoke VPCs must not route traffic over the public internet. What is the most cost-effective and scalable network design?

### Options
*   A. Create an S3 Gateway Endpoint in each spoke VPC and write bucket policies to allow access.
*   B. Create an S3 Interface Endpoint (PrivateLink) in the central VPC, and route spoke traffic to it via a Transit Gateway.
*   C. Deploy NAT Gateways in each spoke VPC and route S3 traffic through them.
*   D. Configure VPC Peering between all spoke VPCs and the central services VPC.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
While S3 Gateway Endpoints are free, they cannot be accessed over Transit Gateway or VPC Peering. S3 Interface Endpoints (PrivateLink) can be accessed over Transit Gateway, making it highly scalable to deploy a single S3 Interface Endpoint in a central VPC and route all spoke traffic to it.
</details>

---

## Question 12: Domain 1: Design for Organizational Complexity

### Scenario
A security audit reveals that many accounts within an AWS Organization contain unused IAM roles and active access keys that have not been rotated in 90 days. The security team wants a central view of all credentials across the organization. How can they achieve this?

### Options
*   A. Run the IAM Credentials Report in each account and write a script to compile the CSV files into S3.
*   B. Enable AWS Security Hub and use the IAM credentials check across all member accounts.
*   C. Use the AWS Organizations console to download the Master Credentials Report.
*   D. Configure AWS Config to evaluate the 'iam-user-unused-credentials-check' rule across all accounts and aggregate results.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
The IAM Credentials report is the native tool that lists all users, their MFA status, access key ages, and unused roles. To aggregate this across the organization, you must generate it in each member account (using script/automation) and collect the results.
</details>

---

## Question 13: Domain 1: Design for Organizational Complexity

### Scenario
A company is designing a hybrid DNS infrastructure. On-premises servers need to resolve names of resources in AWS Private Hosted Zones (PHZs), and AWS EC2 instances need to resolve hostnames in the on-premises corporate DNS server. What is the most efficient configuration?

### Options
*   A. Configure Route 53 Resolver Inbound Endpoints in the VPC to receive DNS queries from on-premises, and Outbound Endpoints with forwarding rules to route queries for the corporate domain to on-premises DNS servers.
*   B. Use a Simple AD directory in AWS to proxy all DNS queries between the on-premises environment and Route 53 PHZs.
*   C. Set up a DNS Forwarder on an EC2 instance in a public subnet, and modify the DHCP options set of the VPC to point to this instance.
*   D. Replicate all Private Hosted Zone records to the on-premises DNS server using a daily cron job.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
Route 53 Resolver Inbound Endpoints receive queries from on-premises DNS forwarders, allowing on-premises systems to resolve AWS private hosted zone names. Outbound Endpoints use forwarding rules to route AWS DNS queries targeting the corporate domain to on-premises DNS servers. This is the native hybrid DNS architecture.
</details>

---

## Question 14: Domain 1: Design for Organizational Complexity

### Scenario
A company wants to share an SQS queue in Account A with an application running in Account B. The application in Account B must be able to send messages to the queue. How can this access be granted with the lowest complexity?

### Options
*   A. Create an IAM role in Account A, allow Account B to assume it, and have the application assume the role.
*   B. Configure a resource-based policy on the SQS queue in Account A that grants the 'sqs:SendMessage' permission to Account B's IAM role principal.
*   C. Create a VPC Peering connection between Account A and Account B VPCs.
*   D. Share the SQS queue using AWS Resource Access Manager (RAM).

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
SQS supports resource-based policies (queue policies). This allows you to grant permissions directly to cross-account principals without requiring them to assume an IAM role, reducing authentication overhead and complexity.
</details>

---

## Question 15: Domain 1: Design for Organizational Complexity

### Scenario
A company is designing a multi-tier web application in AWS. The databases are located in a private VPC. The web servers are in another VPC. The traffic between the web servers and databases must be highly secure and not pass over the public internet. What VPC connection method should be used?

### Options
*   A. VPC Peering between the web server VPC and the database VPC.
*   B. Transit VPC with dual-homed VPN connections.
*   C. Internet Gateway in both VPCs with route tables configured to send database traffic through them.
*   D. Configure AWS Client VPN on all database instances.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
VPC Peering provides a direct network path between two VPCs. The traffic remains on the private AWS network and does not traverse the public internet, offering high security, low latency, and zero bandwidth bottlenecks.
</details>

---

## Question 16: Domain 1: Design for Organizational Complexity

### Scenario
An enterprise has multiple AWS accounts. One account contains a central Amazon Route 53 Private Hosted Zone (PHZ) for internal service discovery. Spoke accounts need to resolve records inside this PHZ. How can this be accomplished?

### Options
*   A. Replicate the Route 53 zone files to all spoke accounts.
*   B. Create a VPC Peering connection between spoke VPCs and the host VPC, then associate the spoke VPCs with the central PHZ in Route 53.
*   C. Use Route 53 Resolver Outbound Endpoints to forward DNS queries from spoke VPCs to the host VPC DNS server.
*   D. Share the Private Hosted Zone using AWS Resource Access Manager (RAM).

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
To allow spoke VPCs to resolve records in a Private Hosted Zone owned by another account, you must associate the spoke VPCs with the PHZ. This requires the PHZ owner to authorize the association and the spoke account to accept it. Network connectivity (like VPC Peering or Transit Gateway) is required for actual resource access, but the PHZ association is done directly in Route 53.
</details>

---

## Question 17: Domain 1: Design for Organizational Complexity

### Scenario
A company is planning to deploy a third-party security auditing application in their AWS environment. The auditing application runs in the vendor's AWS account and needs read-only access to resources in the company's AWS accounts. The security team wants to prevent the Confused Deputy problem. What should they request from the vendor?

### Options
*   A. The vendor's IAM access keys.
*   B. An External ID to be added as a condition in the IAM Role's trust policy.
*   C. A SAML federation assertion.
*   D. A certificate issued by a private Certificate Authority.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The standard solution to the Confused Deputy problem in cross-account role assumption is the use of an External ID. The vendor generates a unique ID, which the customer adds as a condition in their IAM role trust policy. When the vendor assumes the role, they must supply this External ID.
</details>

---

## Question 18: Domain 1: Design for Organizational Complexity

### Scenario
An enterprise is using AWS Control Tower. They want to ensure that all newly created AWS accounts are automatically configured with a default set of VPCs, security groups, and IAM roles. Which Control Tower feature or integration should they use?

### Options
*   A. AWS Control Tower Account Factory customization using AWS Service Catalog.
*   B. AWS Organizations SCPs.
*   C. Custom AWS Config rules.
*   D. CloudFormation StackSets triggered manually.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
AWS Control Tower Account Factory allows you to customize accounts during provisioning. By integrating with AWS Service Catalog, you can run product templates (containing VPCs, IAM roles, security configurations) automatically whenever a new account is provisioned.
</details>

---

## Question 19: Domain 1: Design for Organizational Complexity

### Scenario
A company has a multi-account structure in AWS Organizations. They need to monitor API activity across all accounts. The security team wants to store all CloudTrail logs in a single S3 bucket in a dedicated log archive account. How can they achieve this?

### Options
*   A. Enable CloudTrail in each member account and configure them to write to the log archive bucket.
*   B. Create an Organization Trail in the management account, and configure it to deliver log files to the centralized S3 bucket in the log archive account.
*   C. Use AWS Config to replicate logs between accounts.
*   D. Create an S3 replication rule in all member accounts' local log buckets.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
An Organization Trail automatically logs API activity for all AWS accounts in the organization. The trail is configured in the management account and delivers logs directly to a central S3 bucket, which can reside in a dedicated log archive account.
</details>

---

## Question 20: Domain 1: Design for Organizational Complexity

### Scenario
A company wants to implement Service Control Policies (SCPs) to restrict access to specific AWS regions. However, they must ensure that global services (like IAM, CloudFront, and Route 53) are not blocked. What is the correct way to write the SCP condition?

### Options
*   A. Use the 'aws:RequestedRegion' condition key and deny all regions except the allowed ones, while adding a 'NotAction' clause that excludes global service APIs.
*   B. Deny all actions if 'aws:RequestedRegion' is not equal to the allowed regions, and exclude global services using the 'aws:PrincipalAccount' condition.
*   C. Define region restrictions directly in the IAM policy of each user, as SCPs cannot check regions.
*   D. Disable the global services in all non-allowed regions.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
SCPs restricting regions typically use the ws:RequestedRegion condition key with a Deny effect. To avoid breaking global services, the SCP must use NotAction to exclude actions from global services (like iam:*, cloudfront:*, oute53:*) from the region restriction.
</details>

---

## Question 21: Domain 2: Design for New Solutions

### Scenario
A financial corporation wants to host a public facing API that processes transactions. The API must handle sudden spikes in traffic, run in a serverless container environment with a persistent filesystem mount, and scale compute automatically based on concurrency rules. Which architecture meets these parameters?

### Options
*   A. Deploy Apache Tomcat on EC2 instances behind an Application Load Balancer.
*   B. Deploy the containers on Amazon ECS using AWS Fargate, mount Amazon EFS for persistent shared filesystems, and expose the services using Amazon API Gateway.
*   C. Run the container on ECS EC2 instances with EBS gp3 volumes.
*   D. Use AWS Lambda with EBS volumes mounted locally.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Fargate compute supports mounting Amazon EFS volumes for persistent, shared serverless filesystems. Placing API Gateway in front of ECS Fargate provides a highly resilient, serverless transaction handler with auto-scaling capabilities.
</details>

---

## Question 22: Domain 2: Design for New Solutions

### Scenario
A big data analytics platform needs to process petabytes of streaming data daily. They require a fully managed search engine cluster that can index and search JSON log records with sub-second response times. Which service should they choose?

### Options
*   A. Amazon Redshift.
*   B. Amazon OpenSearch Service (successor to Elasticsearch).
*   C. Amazon DocumentDB.
*   D. Amazon Keyspaces.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon OpenSearch Service is a fully managed search and analytics engine optimized for real-time log analytics, full-text search, and application monitoring, delivering sub-second response times on indexed JSON files.
</details>

---

## Question 23: Domain 2: Design for New Solutions

### Scenario
An application needs to save raw JSON transaction payloads. The data must be encrypted in transit and at rest, and stored in compliance with strict regulatory rules stating that no data can be modified or deleted for 5 years, even by administrators. Which configuration achieves this?

### Options
*   A. Store data in Amazon S3. Enable S3 Versioning and apply an S3 Object Lock in Compliance mode with a 5-year retention period.
*   B. Apply an IAM policy that blocks S3 delete operations.
*   C. Use KMS encryption keys to lock down access permissions.
*   D. Store the files on EBS volumes configured with WORM compliance scripts.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A**

### Explanation:
S3 Object Lock in Compliance mode blocks any delete or modify operation on S3 objects for the retention duration. This cannot be overridden or bypassed by any user account, including the AWS root account, ensuring WORM regulatory compliance.
</details>

---

## Question 24: Domain 2: Design for New Solutions

### Scenario
An enterprise wants to deploy containerized microservices running on Kubernetes. They want to expose these services to the internet using a single Application Load Balancer that dynamically routes traffic to target pods based on URL paths. Which integration should they deploy?

### Options
*   A. Deploy an AWS ALB in a public subnet, and configure manual target group routes to Kubernetes EC2 worker nodes.
*   B. Install the AWS Load Balancer Controller on the EKS cluster to automatically provision ALBs in response to Kubernetes Ingress resources.
*   C. Use an ECS cluster with Fargate task profiles.
*   D. Configure Route 53 latency records pointing to the pod IP addresses.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The AWS Load Balancer Controller is the standard Kubernetes integration. It watches for Ingress resources on EKS and automatically provisions ALBs, creating target groups and routing rules that track Kubernetes pod endpoints dynamically.
</details>

---

## Question 25: Domain 2: Design for New Solutions

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

## Prerequisites

- [SAP-C02 Full Mock Exam 2 - Part 3 (Questions 51-75)](SAP-C02 Mock Exam 2 - Part 3.md)

## Recommended Next Topics

- [SAP-C02 Full Mock Exam 3 - Part 2 (Questions 26-50)](SAP-C02 Mock Exam 3 - Part 2.md)

## Related Topics

- [SAP-C02 Practice Mock Exams](SAP-C02 Mock Exam.md)
- [SAP-C02 Full Mock Exam - Part 1 (Questions 1-25)](SAP-C02 Mock Exam - Part 1.md)
- [SAP-C02 Full Mock Exam - Part 2 (Questions 26-50)](SAP-C02 Mock Exam - Part 2.md)
