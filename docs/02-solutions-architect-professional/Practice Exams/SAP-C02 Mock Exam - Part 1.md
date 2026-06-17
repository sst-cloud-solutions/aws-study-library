---
sidebar_position: 2
sidebar_label: Part 1 (Questions 1-25)
---

# SAP-C02 Full Mock Exam - Part 1 (Questions 1-25)

This is Part 1 of the full-length, 75-question AWS Certified Solutions Architect - Professional (SAP-C02) Practice Mock Exam. This part covers Domain 1 (Organizational Complexity) and Domain 2 (Design for New Solutions).

---

## Question 1: Domain 1: Design for Organizational Complexity

### Scenario
A large multi-national enterprise is deploying AWS Control Tower to manage its multi-account environment. The security team wants to ensure that no member accounts can disable AWS Config, disable CloudTrail logging, or delete the centralized S3 log bucket. Additionally, member accounts must not be able to modify these guardrails. How can the Solutions Architect implement this policy with the least administrative effort?

### Options
*   A. Create a Service Control Policy (SCP) at the root level of the organization that denies 'config:*', 'cloudtrail:*', and 's3:DeleteBucket' actions. Apply an exception for IAM administrators in member accounts.
*   B. Enable the default preventive guardrails in AWS Control Tower, which automatically deploy SCPs to enforce these restrictions on the core and enrolled OUs. Ensure that Control Tower manages the organizational compliance.
*   C. Create a custom AWS Config rule in each member account that monitors the state of CloudTrail and Config. If a non-compliant resource is found, use an Systems Manager automation runbook to re-enable them.
*   D. Attach an IAM Permissions Boundary to all roles created in the member accounts that restricts access to the Config, CloudTrail, and S3 APIs.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
AWS Control Tower provides built-in preventive guardrails implemented as SCPs that prevent the modification of Control Tower-managed resources (like CloudTrail, Config, and log S3 buckets) by member accounts. Enabling these guardrails is the standard, lowest-overhead way to enforce compliance across all accounts.
</details>

---

## Question 2: Domain 1: Design for Organizational Complexity

### Scenario
A company wants to share resources from a central shared services account with multiple spoke accounts in AWS Organizations. They need to share an Amazon Aurora database cluster's read-only endpoints, a set of private subnets, and custom KMS keys used to encrypt data. Which combination of AWS services should the architect recommend? (Select TWO)

### Options
*   A. Use AWS Resource Access Manager (RAM) to share the private subnets with spoke accounts in the organization.
*   B. Create VPC peering connections between the shared services VPC and all spoke account VPCs to share subnets directly.
*   C. Update the KMS Key Policy in the shared services account to grant 'kms:Decrypt' and 'kms:DescribeKey' permissions to the spoke accounts' IAM roles.
*   D. Use AWS RAM to share the custom KMS keys and Aurora DB clusters directly with the spoke accounts.
*   E. Use AWS Transit Gateway to share the subnets and database endpoints across the spoke accounts.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: A, C**

### Explanation:
AWS RAM supports sharing subnets, Transit Gateways, and Route 53 Resolver rules, but it does NOT support sharing KMS keys or Aurora databases directly. To share the database, clients connect to its endpoint over shared subnets (RAM-shared), and to decrypt the data, the central KMS key policy must explicitly allow access to the spoke account IAM roles.
</details>

---

## Question 3: Domain 1: Design for Organizational Complexity

### Scenario
An organization has a transit VPC design using a software VPN. As traffic grows, the software VPN instances are bottlenecked. The architect decides to migrate to AWS Transit Gateway. The solution must support dynamic routing and high availability across three Availability Zones. What is the most resilient way to connect spoke VPCs to the Transit Gateway?

### Options
*   A. Create an IPSec VPN connection between the spoke VPCs and the Transit Gateway, enabling BGP routing.
*   B. Create a Transit Gateway VPC attachment in each spoke VPC. Specify a subnet in each of the three Availability Zones to ensure high availability.
*   C. Use VPC Peering to connect each spoke VPC to the Transit Gateway.
*   D. Deploy a software router instance in each spoke VPC and peer it directly with the Transit Gateway routing tables using dynamic BGP.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The native and most resilient way to connect VPCs to a Transit Gateway is using VPC attachments. By specifying subnets in multiple Availability Zones (AZs) during the attachment creation, AWS automatically creates Elastic Network Interfaces (ENIs) in those subnets, ensuring high-availability and routing path redundancy.
</details>

---

## Question 4: Domain 1: Design for Organizational Complexity

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
Setting up a backup IPsec VPN connection terminating at the Transit Gateway provides automatic failover when BGP routing is configured. By prepending the AS-Path on the VPN connection, AWS will prefer the Direct Connect link (short AS-Path) for routing and automatically failover to the VPN (longer AS-Path) if the DX path fails.
</details>

---

## Question 6: Domain 1: Design for Organizational Complexity

### Scenario
A multinational retail company is designing its multi-account billing structure. The company wants to allocate costs to each business unit (BU). Some BUs have private pricing agreements (PPAs) with AWS for EC2. The centralized finance account must see actual billing rates, while the sub-accounts representing the BUs must see a pro forma bill with custom discounts applied. Which service should they implement?

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
A retail company is designing a serverless e-commerce application. The backend APIs will be deployed on AWS Lambda behind Amazon API Gateway. The database layer will use Amazon DynamoDB. The application must support spike loads up to 10,000 requests per second during promotional events. How should the architect configure the database to handle these write spikes with the lowest latency and cost?

### Options
*   A. Enable DynamoDB Auto Scaling with high target utilization.
*   B. Configure DynamoDB On-Demand capacity mode.
*   C. Deploy a DynamoDB Accelerator (DAX) cluster in front of the table.
*   D. Provision a high write capacity unit (WCU) limit manually and leave it high permanently.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
DynamoDB On-Demand capacity mode automatically scales to accommodate sudden, unpredictable spikes in traffic, making it ideal for retail promotional spikes. DAX only accelerates reads, not writes. Auto Scaling is slower to react to sudden, instantaneous spikes.
</details>

---

## Question 22: Domain 2: Design for New Solutions

### Scenario
A high-performance computing (HPC) application runs on Amazon EC2 instances and requires a shared file system. The file system must deliver sub-millisecond latencies and hundreds of gigabytes per second of throughput. Which storage service should the architect select?

### Options
*   A. Amazon EFS (Elastic File System) in Provisioned Throughput mode.
*   B. Amazon FSx for Lustre.
*   C. Amazon S3 with multi-part upload configured.
*   D. Amazon FSx for Windows File Server.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon FSx for Lustre is a high-performance file system designed specifically for compute-intensive workloads like HPC, machine learning, and media processing. It offers sub-millisecond latencies and massive throughput, outperforming general-purpose systems like EFS.
</details>

---

## Question 23: Domain 2: Design for New Solutions

### Scenario
A media streaming company is designing a system to transcode videos. The transcoding tasks are CPU-intensive and can run for several hours. The tasks can be paused and resumed without data loss. The company wants to minimize compute costs. Which instance purchase option should they choose?

### Options
*   A. On-Demand Instances.
*   B. Spot Instances with EC2 Auto Scaling Groups.
*   C. Savings Plans.
*   D. Dedicated Hosts.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Spot Instances offer up to 90% savings compared to On-Demand. Since the transcoding tasks can handle interruptions (paused and resumed), Spot Instances are the most cost-effective choice for this batch processing workload.
</details>

---

## Question 24: Domain 2: Design for New Solutions

### Scenario
A financial application needs to process transactions and store the audit logs in Amazon S3. Compliance requirements dictate that the logs must be encrypted and stored in a write-once, read-many (WORM) format to prevent tampering. How can the architect enforce this?

### Options
*   A. Enable S3 Versioning and apply an IAM policy that denies 's3:DeleteObject'.
*   B. Enable S3 Object Lock in Compliance mode on the bucket.
*   C. Encrypt the S3 bucket using a KMS Customer Managed Key.
*   D. Store the logs in Glacier Deep Archive.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
S3 Object Lock in Compliance mode enforces WORM compliance. In Compliance mode, objects cannot be overwritten or deleted by any user, including the root user, for the duration of the retention period.
</details>

---

## Question 25: Domain 2: Design for New Solutions

### Scenario
A company wants to migrate an existing application to AWS using containers. The application is composed of multiple microservices that have dynamic scaling requirements. The company does not want to manage the underlying server infrastructure. Which container orchestration service should they choose?

### Options
*   A. Amazon ECS on Amazon EC2.
*   B. Amazon ECS with AWS Fargate.
*   C. Kubernetes deployed on EC2 instances.
*   D. AWS Elastic Beanstalk.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Amazon ECS with AWS Fargate provides container orchestration without the need to provision or manage the EC2 server infrastructure. Fargate acts as the serverless compute engine for ECS, handling infrastructure scaling and server management automatically.
</details>

---

## Prerequisites

- [AWS Certification 05-exam-strategy](../../05-exam-strategy/intro.md)

## Recommended Next Topics

- [SAP-C02 Full Mock Exam - Part 2 (Questions 26-50)](SAP-C02 Mock Exam - Part 2.md)

## Related Topics

- [SAP-C02 Practice Mock Exams](SAP-C02 Mock Exam.md)
- [SAP-C02 Full Mock Exam - Part 2 (Questions 26-50)](SAP-C02 Mock Exam - Part 2.md)
- [SAP-C02 Full Mock Exam - Part 3 (Questions 51-75)](SAP-C02 Mock Exam - Part 3.md)
