---
title: "Transit Gateway vs AWS Cloud WAN Decision Matrix"
sidebar_label: "Transit Gateway vs AWS Cloud WAN"
---

# Transit Gateway vs AWS Cloud WAN Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

| Feature | Transit Gateway (TGW) | AWS Cloud WAN |
| :--- | :--- | :--- |
| **Scope** | Regional network hub | Global wide-area network |
| **Management** | Manual route table edits per region | Central Core Network Policy (JSON) |
| **Peering** | Requires manual TGW region peering | Built-in multi-region backbone routing |
| **Scale** | Low to medium region pools | Global enterprise networks |

## Decision Guidance

- **Transit Gateway:** Use for regional network configurations, when routing between a small number of VPCs and accounts, or when manual route controls are preferred.
- **AWS Cloud WAN:** Use when managing large, complex networks spanning multiple AWS regions and on-premises hubs, requiring central policy enforcement and segmentation.

- **Transit Gateway:** Do not use for large multi-region deployments where managing peerings and manual route table updates becomes error-prone.
- **Cloud WAN:** Do not use for simple, single-region architectures where a regional Transit Gateway is simpler and cheaper to configure.

---

## Key Performance, Cost & Security Considerations

### Performance Impact
Both leverage the high-speed AWS network backbone. Cloud WAN automates multi-region route selection, optimizing latency paths.

### Cost Impact
Both bill per VPC attachment hour and data processing. Cloud WAN adds a fee for Core Network Hub connections. Cloud WAN reduces administrative overhead costs for global routing managers.

### Security Implications
TGW uses manual route table segmentation. Cloud WAN uses policies to define segments globally, preventing dev/prod cross-routing.

---

## Exam tips & Traps

:::tip
**Exam Clues:** Use TGW for regional networking, simple VPC hubs, and manual route table control. Use Cloud WAN for global multi-region networks, central core network policies, and global segmentation.
:::

:::warning
**Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
:::

---

## Prerequisites

- [Amazon SQS vs Amazon MQ Decision Matrix](sqs-vs-mq.md)

## Recommended Next Topics

- Congratulations! You have completed the Decision Matrices track.

## Related Topics

- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)
- [Amazon CloudFront vs AWS Global Accelerator Decision Matrix](cloudfront-vs-global-accelerator.md)
