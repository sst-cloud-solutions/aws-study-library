---
title: "Amazon EFS vs Amazon FSx Decision Matrix"
sidebar_label: "Amazon EFS vs Amazon FSx"
---

# Amazon EFS vs Amazon FSx Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

| Feature | Amazon EFS | Amazon FSx (Suite) |
| :--- | :--- | :--- |
| **Protocols** | NFSv4 (Linux only) | SMB (Windows), Lustre, NetApp ONTAP, OpenZFS |
| **Storage Type** | Distributed, elastic file system | Configurable performance disks (SSD/HDD) |
| **Active Clients** | Multi-AZ Linux hosts | Dependent on the specific FSx engine |
| **Integration** | EC2, ECS, EKS, Lambda | EC2, EKS, on-premises machines |

## Decision Guidance

- **Amazon EFS:** Use for shared Linux-based directories, web server asset farms, CI/CD workspaces, and serverless Lambda configurations requiring persistent storage.
- **Amazon FSx:** Use when you need specialized file systems: FSx for Windows (SMB/Active Directory), FSx for Lustre (HPC/S3 link), FSx for ONTAP (multiprotocol NetApp), or FSx for OpenZFS (microsecond Linux).

- **EFS:** Do not use for Windows servers (as EFS lacks SMB support) or database system root drives requiring high-speed raw block storage.
- **FSx:** Do not use for simple shared Linux directories where EFS offers simpler, serverless scaling with zero configuration.

---

## Key Performance, Cost & Security Considerations

### Performance Impact
EFS General Purpose latency is ~1-3ms. FSx for OpenZFS and ONTAP offer sub-millisecond or microsecond SSD read speeds. FSx for Lustre provides massive gigabytes per second bandwidth.

### Cost Impact
EFS is serverless, billing for storage used and offering low-cost Infrequent Access (IA) tiers. FSx systems are provisioned, billing for storage and throughput, requiring careful sizing to control budget spend.

### Security Implications
EFS uses IAM and POSIX file permissions. FSx for Windows supports standard Windows ACL directory permissions linked to Active Directory.

---

## Exam tips & Traps

:::tip
**Exam Clues:** Use EFS for shared Linux directories, serverless mounts, and standard NFSv4. Use FSx Windows for Active Directory/SMB. Use FSx Lustre for HPC/ML. Use FSx ONTAP for NetApp/iSCSI.
:::

:::warning
**Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
:::

---

## Prerequisites

- [ECS vs EKS Decision Matrix](ecs-vs-eks.md)

## Recommended Next Topics

- [Amazon SNS vs Amazon EventBridge Decision Matrix](sns-vs-eventbridge.md)

## Related Topics

- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)
- [Amazon CloudFront vs AWS Global Accelerator Decision Matrix](cloudfront-vs-global-accelerator.md)
