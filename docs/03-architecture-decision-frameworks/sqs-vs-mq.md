---
title: "Amazon SQS vs Amazon MQ Decision Matrix"
sidebar_label: "Amazon SQS vs Amazon MQ"
---

# Amazon SQS vs Amazon MQ Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

| Feature | Amazon SQS | Amazon MQ |
| :--- | :--- | :--- |
| **Architecture** | Serverless, fully managed | Provisioned message broker instance |
| **Protocols** | SQS Custom HTTP API | AMQP, MQTT, JMS, OpenWire, STOMP |
| **Scaling** | Scales dynamically to virtually infinite | Limited by broker instance compute size |
| **Maintenance** | Zero management | Software patching and active/standby setup |

## Decision Guidance

- **Amazon SQS:** Use for modern cloud-native serverless systems requiring decoupled queues, asynchronous Lambda execution, and infinite scale.
- **Amazon MQ:** Use when migrating legacy enterprise on-premises message systems (like ActiveMQ or RabbitMQ) without rewriting application APIs or changing protocols (JMS, AMQP).

- **SQS:** Do not use when applications require legacy messaging protocols or socket-based connections (such as AMQP or MQTT).
- **MQ:** Do not use for new, cloud-native greenfield development where SQS offers simpler, serverless scaling with lower management overhead.

---

## Key Performance, Cost & Security Considerations

### Performance Impact
SQS scales read and write capacity automatically, handling billions of messages daily. Amazon MQ performance is bound to instance memory and CPU capacity.

### Cost Impact
SQS has a generous free tier of 1 million requests/month, billing only for usage. Amazon MQ charges flat hourly instance rates for the running broker, making it more expensive for idle queues.

### Security Implications
Both support KMS encryption at rest. SQS uses IAM permissions. Amazon MQ supports Active Directory integration for user authentication.

---

## Exam tips & Traps

:::tip
**Exam Clues:** Use SQS for serverless, dynamic scale, cloud-native workflows, and zero server maintenance. Use Amazon MQ for legacy migrations, ActiveMQ/RabbitMQ compatibility, and JMS/AMQP/MQTT protocols.
:::

:::warning
**Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
:::

---

## Prerequisites

- [Amazon SNS vs Amazon EventBridge Decision Matrix](sns-vs-eventbridge.md)

## Recommended Next Topics

- [Transit Gateway vs AWS Cloud WAN Decision Matrix](transit-gateway-vs-cloud-wan.md)

## Related Topics

- [ALB vs NLB vs GWLB Decision Matrix](alb-vs-nlb-vs-gwlb.md)
- [Amazon Aurora vs Amazon RDS Decision Matrix](aurora-vs-rds.md)
- [Amazon CloudFront vs AWS Global Accelerator Decision Matrix](cloudfront-vs-global-accelerator.md)
