# Module 01: Architecture Patterns

## Overview
This module covers common AWS architecture patterns and design principles essential for the Solutions Architect exam.

## Learning Objectives
- Design multi-tier architectures
- Implement serverless architectures
- Build event-driven systems
- Design for high availability and disaster recovery
- Optimize architectures for cost and performance

---

## 1. Well-Architected Framework Review

### Six Pillars

1. **Operational Excellence**: Run and monitor systems
2. **Security**: Protect data and systems
3. **Reliability**: Recover from failures, meet demand
4. **Performance Efficiency**: Use resources efficiently
5. **Cost Optimization**: Avoid unnecessary costs
6. **Sustainability**: Minimize environmental impact

### Design Principles
- **Stop guessing capacity**: Auto-scale
- **Test at production scale**: Cloud makes it affordable
- **Automate**: IaC, CI/CD
- **Allow for evolutionary architectures**: Adapt to changes
- **Drive architectures using data**: CloudWatch metrics
- **Improve through game days**: Simulate failures

---

## 2. Multi-Tier Architecture Pattern

### Classic 3-Tier Architecture

```
┌─────────────────────────────────────────────┐
│              Users / Internet               │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Presentation Tier (Web)             │
│  CloudFront → Route 53 → ALB → EC2/ECS     │
│              Auto Scaling Group             │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Application Tier (Logic)           │
│         ALB → EC2/ECS/Lambda                │
│         Auto Scaling Group                  │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│           Data Tier (Database)              │
│     RDS Multi-AZ / Aurora / DynamoDB        │
│           ElastiCache (Caching)             │
│              S3 (Storage)                   │
└─────────────────────────────────────────────┘
```

### Key Components
- **Route 53**: DNS and health checks
- **CloudFront**: CDN for static content
- **ALB**: Layer 7 load balancing
- **EC2 Auto Scaling**: Horizontal scaling
- **Multi-AZ deployment**: High availability
- **RDS with Read Replicas**: Database scaling
- **ElastiCache**: Reduce database load

### Best Practices
- ✅ Deploy across multiple AZs
- ✅ Use Auto Scaling for elasticity
- ✅ Implement caching layers
- ✅ Separate presentation, logic, and data
- ✅ Use managed services where possible

---

## 3. Serverless Architecture Pattern

### Serverless Web Application

```
┌─────────────────────────────────────────────┐
│                  Users                      │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│    CloudFront + S3 (Static Website)         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│    API Gateway (REST/WebSocket API)         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Lambda Functions (Compute)          │
└────┬──────────────────────────────────┬─────┘
     │                                   │
┌────▼──────────────┐         ┌─────────▼─────┐
│  DynamoDB         │         │  S3 Bucket    │
│  (NoSQL Database) │         │  (Storage)    │
└───────────────────┘         └───────────────┘
```

### Serverless Components
- **S3**: Host static website
- **CloudFront**: Global CDN
- **API Gateway**: RESTful API endpoints
- **Lambda**: Serverless compute
- **DynamoDB**: NoSQL database
- **Cognito**: User authentication
- **Step Functions**: Orchestration

### Benefits
- ✅ No server management
- ✅ Automatic scaling
- ✅ Pay per use
- ✅ High availability built-in
- ✅ Reduced operational overhead

### Use Cases
- Web applications
- Mobile backends
- API backends
- Real-time file processing
- Stream processing

---

## 4. Event-Driven Architecture

### Event-Driven Pattern

```
┌──────────────┐
│   Producers  │ (S3, DynamoDB, IoT, Custom Apps)
└──────┬───────┘
       │
┌──────▼───────────────────────────────────────┐
│         Event Bus / Queue / Stream           │
│   EventBridge / SNS / SQS / Kinesis          │
└──────┬───────────────────────────────────────┘
       │
┌──────▼───────┐
│  Consumers   │ (Lambda, ECS, EC2, SQS)
└──────────────┘
```

### Event Sources
- **S3 Events**: Object created, deleted
- **DynamoDB Streams**: Table modifications
- **Kinesis**: Real-time data streams
- **SNS**: Pub/sub messaging
- **SQS**: Message queuing
- **EventBridge**: Event bus for AWS services, SaaS, custom apps

### Patterns

**Pub/Sub Pattern (SNS)**
- Publisher sends message to topic
- Multiple subscribers receive message
- Fan-out pattern

**Queue Pattern (SQS)**
- Producer sends messages to queue
- Consumer polls and processes
- Decoupling and buffering

**Stream Pattern (Kinesis)**
- Real-time data streaming
- Multiple consumers read same stream
- Ordered processing per partition

### Benefits
- ✅ Loose coupling
- ✅ Scalability
- ✅ Resilience
- ✅ Flexibility
- ✅ Real-time processing

---

## 5. Microservices Architecture

### Microservices on AWS

```
┌─────────────────────────────────────────────┐
│              API Gateway                    │
└──┬──────┬──────┬──────┬──────┬─────────────┘
   │      │      │      │      │
   ▼      ▼      ▼      ▼      ▼
┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐
│User  ││Order ││Pay   ││Inv   ││Ship  │
│Svc   ││Svc   ││Svc   ││Svc   ││Svc   │
│Lambda││ECS   ││Lambda││ECS   ││Lambda│
└──┬───┘└──┬───┘└──┬───┘└──┬───┘└──┬───┘
   │       │       │       │       │
   ▼       ▼       ▼       ▼       ▼
┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐
│Dynamo││RDS   ││Dynamo││RDS   ││S3    │
│DB    ││Aurora││DB    ││Aurora││      │
└──────┘└──────┘└──────┘└──────┘└──────┘
```

### Microservices Tools
- **Compute**: Lambda, ECS, EKS
- **API Management**: API Gateway, ALB
- **Service Discovery**: AWS Cloud Map, ECS Service Discovery
- **Communication**: SQS, SNS, EventBridge
- **Orchestration**: Step Functions
- **Monitoring**: CloudWatch, X-Ray

### Benefits
- ✅ Independent deployment
- ✅ Technology diversity
- ✅ Fault isolation
- ✅ Scalability per service
- ✅ Team autonomy

---

## 6. High Availability Patterns

### Multi-AZ Deployment

**Active-Active**
```
Region: us-east-1
┌─────────────────────────────────────────────┐
│              Route 53 (Weighted)            │
└──────────────┬─────────────┬────────────────┘
               │             │
    ┌──────────▼──────┐  ┌──▼─────────────┐
    │   AZ-1a         │  │   AZ-1b        │
    │   ALB           │  │   ALB          │
    │   EC2 Fleet     │  │   EC2 Fleet    │
    │   RDS Primary   │  │   RDS Standby  │
    └─────────────────┘  └────────────────┘
```

**Active-Passive**
```
Primary Region: us-east-1        Standby Region: us-west-2
┌─────────────────────┐         ┌─────────────────────┐
│  Route 53 Failover  │         │   Route 53 Failover │
│     (Primary)       │         │    (Secondary)      │
│  ┌──────────────┐   │         │  ┌──────────────┐   │
│  │   ALB + EC2  │   │         │  │   ALB + EC2  │   │
│  │   RDS        │───┼────────▶│  │   RDS Replica│   │
│  └──────────────┘   │         │  └──────────────┘   │
└─────────────────────┘         └─────────────────────┘
          (Active)                     (Standby)
```

### Components for HA
- **Multiple AZs**: Automatic failover
- **Auto Scaling**: Replace unhealthy instances
- **Elastic Load Balancing**: Distribute traffic
- **Route 53**: DNS-based failover
- **RDS Multi-AZ**: Database failover
- **S3**: 99.999999999% durability
- **CloudWatch Alarms**: Automated recovery

---

## 7. Disaster Recovery Strategies

### DR Strategies (RPO/RTO)

**Backup and Restore** (Cheapest, Slowest)
- **RPO**: Hours
- **RTO**: Hours to days
- Backup to S3, restore when needed
- Use: Non-critical applications

**Pilot Light** (Core services always running)
- **RPO**: Minutes
- **RTO**: Hours
- Minimal version running (e.g., database replication)
- Scale up when disaster occurs

**Warm Standby** (Scaled-down version running)
- **RPO**: Seconds
- **RTO**: Minutes
- Fully functional but smaller scale
- Scale up when disaster occurs

**Multi-Site Active-Active** (Expensive, Fastest)
- **RPO**: Near zero
- **RTO**: Near zero
- Full production in multiple regions
- Route 53 distributes traffic

### DR Tools
- **AWS Backup**: Centralized backup
- **S3 Cross-Region Replication**: Data replication
- **RDS Read Replicas**: Database replication (can promote)
- **Aurora Global Database**: \< 1 second lag
- **DynamoDB Global Tables**: Multi-region active-active
- **Route 53**: DNS failover
- **CloudFormation**: Infrastructure as Code for quick deployment

---

## 8. Caching Strategies

### Caching Layers

```
User Request
    ↓
┌─────────────────┐
│   CloudFront    │ (Edge caching)
└────────┬────────┘
         ↓
┌─────────────────┐
│   API Gateway   │ (API caching)
└────────┬────────┘
         ↓
┌─────────────────┐
│   Application   │
└────────┬────────┘
         ↓
┌─────────────────┐
│  ElastiCache/   │ (Database caching)
│     DAX         │
└────────┬────────┘
         ↓
┌─────────────────┐
│    Database     │
└─────────────────┘
```

### Caching Best Practices
- ✅ Cache at multiple layers
- ✅ Set appropriate TTLs
- ✅ Implement cache invalidation
- ✅ Use cache-aside pattern
- ✅ Monitor cache hit rates

---

## 9. Cost Optimization Patterns

### Strategies

**Right Sizing**
- Use CloudWatch metrics
- Choose appropriate instance types
- Use AWS Compute Optimizer

**Reserved Capacity**
- Reserved Instances (1-3 years)
- Savings Plans
- Reserved capacity for RDS, ElastiCache, etc.

**Spot Instances**
- For fault-tolerant workloads
- Batch processing, big data
- Can save up to 90%

**Auto Scaling**
- Scale down during off-peak
- Scheduled scaling
- Target tracking

**Storage Optimization**
- S3 lifecycle policies
- EBS volume optimization
- Delete unused snapshots
- Use S3 Intelligent-Tiering

**Serverless**
- Pay per use
- No idle capacity costs
- Lambda, DynamoDB On-Demand, Fargate

### Cost Monitoring
- AWS Cost Explorer
- AWS Budgets
- Cost Allocation Tags
- Trusted Advisor cost checks

---

## 10. Security Patterns

### Defense in Depth

```
┌─────────────────────────────────────────────┐
│         Edge: WAF, Shield, CloudFront       │
├─────────────────────────────────────────────┤
│         Network: NACL, Security Groups      │
├─────────────────────────────────────────────┤
│         Application: IAM, Cognito           │
├─────────────────────────────────────────────┤
│         Data: KMS, encryption at rest/transit│
└─────────────────────────────────────────────┘
```

### Security Principles
- **Least Privilege**: IAM policies
- **Encryption**: At rest and in transit
- **Network Isolation**: Private subnets, VPC
- **Monitoring**: CloudTrail, GuardDuty, Config
- **Automated Response**: EventBridge + Lambda

---

## Practice Scenarios

### Scenario 1: High-Traffic Web Application
**Requirements**: Handle millions of users globally, \<100ms latency

**Solution**:
- CloudFront for global CDN
- Route 53 with latency-based routing
- Multi-region deployment with ALB
- Aurora Global Database
- ElastiCache for caching
- Auto Scaling for compute

### Scenario 2: Cost-Optimized Batch Processing
**Requirements**: Process large datasets overnight, cost-sensitive

**Solution**:
- Spot Instances for compute (up to 90% savings)
- S3 for data storage (lifecycle to Glacier)
- Lambda for job orchestration
- Step Functions for workflow
- CloudWatch Events for scheduling

### Scenario 3: Highly Available Database
**Requirements**: Zero data loss, \<1 min RTO

**Solution**:
- Aurora with Multi-AZ
- Aurora Read Replicas across regions
- Route 53 failover routing
- Automated backups with PITR
- Cross-region replica promotion for DR

### Scenario 4: Serverless API
**Requirements**: Unpredictable traffic, pay per use

**Solution**:
- API Gateway for API management
- Lambda for compute
- DynamoDB for database
- Cognito for authentication
- CloudWatch for monitoring
- X-Ray for tracing

---

## Anti-Patterns to Avoid

❌ **Single Point of Failure**: Always deploy across multiple AZs  
❌ **Manual Scaling**: Use Auto Scaling instead  
❌ **Monolithic Architecture**: Break into microservices  
❌ **Ignoring Security**: Implement defense in depth  
❌ **Over-Provisioning**: Use Auto Scaling and right-sizing  
❌ **No Monitoring**: Implement comprehensive monitoring  
❌ **Tight Coupling**: Use queues and event-driven architecture  
❌ **No Disaster Recovery**: Implement appropriate DR strategy  

---

## Key Architecture Decisions

### Compute Choice
- **EC2**: Full control, specific OS requirements
- **Lambda**: Serverless, event-driven, \< 15 min
- **ECS/EKS**: Containers, microservices
- **Fargate**: Serverless containers

### Database Choice
- **RDS/Aurora**: Relational, ACID transactions
- **DynamoDB**: NoSQL, high performance, serverless
- **ElastiCache**: In-memory caching
- **Redshift**: Data warehousing, analytics

### Storage Choice
- **S3**: Object storage, static content
- **EBS**: Block storage for EC2
- **EFS**: Shared file storage across instances
- **FSx**: Specialized file systems (Windows, Lustre)

### Integration Choice
- **Synchronous**: API Gateway, ALB
- **Asynchronous**: SQS, SNS, EventBridge
- **Streaming**: Kinesis, MSK

---

## Key Takeaways

✅ Design for failure (assume everything fails)  
✅ Implement elasticity (auto-scale)  
✅ Decouple components (use queues, event-driven)  
✅ Use managed services (reduce operational overhead)  
✅ Optimize for cost (right-sizing, auto-scaling, spot instances)  
✅ Secure at every layer (defense in depth)  
✅ Monitor everything (CloudWatch, X-Ray)  
✅ Automate recovery (self-healing architectures)  
✅ Design for global scale (multi-region, CloudFront)  
✅ Think cloud-native (leverage AWS services)  

---

## Additional Resources

- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Well-Architected Tool](https://aws.amazon.com/well-architected-tool/)
- [AWS Reference Architectures](https://aws.amazon.com/architecture/reference-architecture-diagrams/)
- [AWS This Is My Architecture](https://aws.amazon.com/this-is-my-architecture/)

---

**Previous Module**: [Module 01: Analytics](../10-Analytics/README.md)  
**Next Module**: [Module 01: Cost Optimization](../12-Cost-Optimization/README.md)

---

## Prerequisites

- [Analytics Services - Practice Questions](../10-Analytics/PRACTICE-QUESTIONS.md)

## Recommended Next Topics

- [FAST-LEARN](FAST-LEARN.md)

## Related Topics

- [FAST-LEARN](FAST-LEARN.md)
- [12: Architecture Patterns - Ultra Fast Learning 🚀](ULTRA-FAST-LEARN.md)
- [Architecture Patterns - Mermaid Diagrams](DIAGRAMS.md)
