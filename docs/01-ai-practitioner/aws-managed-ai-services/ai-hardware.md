# Hardware for AI

- [Hardware for AI](#hardware-for-ai)
  - [Amazon EC2](#amazon-ec2)
  - [Amazon's Hardware for AI](#amazons-hardware-for-ai)

## Amazon EC2

- EC2 is one of the most popular offering from AWS
- EC2 = Elastic Compute Cloud => IaaS
- EC2 service mainly consists of the following capabilities:
  - Renting virtual machines (EC2 Instances)
  - Storing data of virtual drives (EBS - Elastic Block Storage)
  - Distribute load across machines (ELB - Elastic Load Balancing)
  - Scaling the services using auto-scaling groups (ASG)
- EC2 configurations:
  - Operating System (OS): Linux, Windows, MacOS
  - Compute power and cores (CPU)
  - Random-access memory (RAM)
  - Storage space for EBS or Instance Store
  - Network card: speed of the card, Public IP address
  - Firewall rules (Security Group)
  - Bootstrap script (configure the instance at launch) - EC2 User Data

## Amazon's Hardware for AI

- AWS provides GPU based EC2 instances (P3, P4, P5, G3, G6, etc.)
- AWS Trainium:
  - ML chip built to perform Deep Learning on 100B+ parameter models
  - Trn1 instance has for example **16 Trainium Accelerators**
  - We can get **50% cost reduction** when training a model
- AWS Inferentia:
  - ML chip built to deliver inference at high performance and low cost
  - Inf1, Inf2 instances are powered by AWS Inferentia
  - Up to **4x throughput** and **70% cost reduction** compared to CPU-only instances
- Trn & Inf have the **lowest environmental footprint**

---

## Prerequisites

- [Amazon Augmented AI (A2I)](aws-augmented-ai.md)

## Recommended Next Topics

- [AWS Managed AI Services - Quick Revision Summary](aws-ai-services-summary.md)

## Related Topics

- [Introduction of AWS Managed AI Services](introduction-of-aws-managed-ai-services.md)
- [Amazon Comprehend](aws-comprehend.md)
- [Amazon Translate](aws-translate.md)
