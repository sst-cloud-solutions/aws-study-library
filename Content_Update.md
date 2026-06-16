# AWS Study Library - Comprehensive Content Expansion & Curriculum Enhancement Plan

## Objective

Transform the AWS Study Library from a documentation repository into a complete AWS learning platform capable of taking a learner from:

```text
Complete Beginner
    ↓
IT Foundations
    ↓
AWS Developer Associate (DVA-C02)
    ↓
AWS Solutions Architect Professional (SAP-C02)
    ↓
Real-World Cloud Architect Competency
```

This implementation plan expands the curriculum, improves exam readiness, introduces architecture decision-making content, and fills all identified syllabus gaps while preserving existing content.

---

# Core Principles

### Documentation Requirements

- Minimum 1500 words per major service page
- Beginner-friendly explanations
- Real-world analogies
- Mermaid architecture diagrams
- Comparison tables
- Exam tip callouts
- Common exam traps
- Architecture decision guidance

---

# Phase 1 - IT Foundation Enhancements

## Existing Files To Enhance

### docs/foundation-bridge/1-how-computers-work.md

Add:

#### Memory Management

- Swap Space
- Paging
- Virtual Memory
- Memory Allocation

#### CPU Internals

- Interrupts
- NUMA
- CPU Scheduling
- Context Switching
- Hyperthreading Deep Dive

#### Process Management

- Process States
- Zombie Processes
- Orphan Processes
- Thread Pools
- Worker Threads

---

### docs/foundation-bridge/2-linux-fundamentals.md

Add:

#### Service Management

- systemd
- systemctl
- Unit Files
- journalctl

#### Scheduling

- cron
- crontab

#### Secure Connectivity

- SSH
- SCP
- Rsync

#### Monitoring

- top
- htop
- free
- vmstat

#### Networking

- netstat
- ss
- traceroute
- dig
- nslookup

#### Text Processing

- grep
- awk
- sed

#### Archiving

- tar
- gzip
- unzip

#### Security

- openssl
- certificate inspection

---

### docs/foundation-bridge/3-networking-fundamentals.md

Add:

#### Layer 2

- ARP
- MAC Address Tables
- VLANs
- Trunking
- STP

#### Layer 3

- NAT
- PAT
- Routing Protocols

#### Core Services

- DHCP
- MTU
- Jumbo Frames

#### Traffic Management

- QoS

#### WAN Technologies

- MPLS
- VPN Concepts

#### Internet Routing

- BGP
- Anycast
- Internet Exchange Points

---

### docs/foundation-bridge/5-databases.md

Add:

#### Performance

- Indexes
- B-Trees
- Query Optimization
- Execution Plans

#### Scalability

- Partitioning
- Sharding

#### Replication

- Leader/Follower
- Multi-Leader
- Leaderless

#### Distributed Databases

- CAP Theorem
- Eventual Consistency

---

### docs/foundation-bridge/9-security-foundations.md

Add:

#### Cryptography

- Hashing
- Salting
- HMAC
- Digital Signatures

#### PKI

- Certificate Authorities
- Certificate Chains
- OCSP
- CRL

#### Authentication Standards

- OAuth2
- OIDC
- SAML
- LDAP
- Kerberos

#### Transport Security

- TLS
- mTLS

---

# Phase 2 - Developer Associate Curriculum Expansion

## Study Plan Enhancements

Update:

```text
docs/Developer Associate/Study Plan.md
```

---

## Create New Documentation Pages

### IAM Deep Dive

Create:

```text
iam-permission-boundaries.md
iam-policy-evaluation.md
iam-cross-account-access.md
iam-abac.md
iam-access-analyzer.md
```

Topics:

- Permission Boundaries
- Session Policies
- Resource Policies
- Cross Account Access
- ABAC
- Policy Evaluation Logic
- Federation

---

### Lambda Deep Dive

Create:

```text
lambda-advanced.md
```

Topics:

- SnapStart
- Reserved Concurrency
- Provisioned Concurrency
- DLQ
- Destinations
- Response Streaming
- Lambda URLs
- Execution Environment Reuse
- Ephemeral Storage

---

### API Gateway Deep Dive

Create:

```text
api-gateway-advanced.md
```

Topics:

- Usage Plans
- API Keys
- Private APIs
- mTLS
- WAF Integration
- Canary Deployments
- Stage Variables

---

### DynamoDB Deep Dive

Create:

```text
dynamodb-advanced.md
```

Topics:

- Adaptive Capacity
- Hot Partitions
- Single Table Design
- Transactions
- TTL
- PITR
- Export to S3
- Global Tables

---

### EventBridge

Create:

```text
eventbridge-deep-dive.md
```

Topics:

- Event Buses
- Archive
- Replay
- Schema Registry
- API Destinations
- Cross Account Events

---

### ECS & Containers

Create:

```text
ecs-capacity-providers.md
ecs-autoscaling.md
eks-fundamentals.md
```

---

### Observability

Create:

```text
cloudwatch-advanced.md
xray-advanced.md
```

Topics:

- Contributor Insights
- Synthetics
- RUM
- OpenTelemetry
- Distributed Tracing

---

### Developer Security

Create:

```text
cognito.md
jwt-and-authentication.md
sigv4.md
parameter-store-vs-secrets-manager.md
```

---

### AWS Developer Tooling

Create:

```text
cloud9.md
codeartifact.md
codecatalyst.md
appconfig.md
cloudshell.md
```

---

# Phase 3 - SAP-C02 Curriculum Expansion

## Update

```text
docs/Solutions Architect Professional/intro.md
```

---

# Compute

Create:

```text
placement-groups.md
dedicated-hosts.md
capacity-reservations.md
spot-fleet.md
launch-templates.md
warm-pools.md
```

---

# Containers

Create:

```text
eks-architecture.md
eks-networking.md
eks-security.md
app-mesh.md
ingress-controllers.md
```

---

# Storage

Create:

```text
efs-performance-modes.md
fsx-windows.md
fsx-lustre.md
fsx-ontap.md
fsx-openzfs.md
storage-gateway.md
datasync.md
transfer-family.md
```

---

# Databases

Create:

```text
aurora-serverless.md
aurora-cloning.md
aurora-backtracking.md
rds-proxy.md
dax.md
neptune.md
documentdb.md
timestream.md
memorydb.md
```

---

# Networking

Create:

```text
privatelink.md
vpc-lattice.md
gateway-load-balancer.md
network-firewall.md
cloud-wan.md
transit-gateway-route-tables.md
transit-gateway-appliance-mode.md
ipv6-architectures.md
```

---

# Security

Create:

```text
guardduty.md
security-hub.md
macie.md
detective.md
inspector.md
waf.md
shield-advanced.md
firewall-manager.md
verified-access.md
```

---

# Governance

Create:

```text
config-aggregators.md
control-tower-deep-dive.md
account-factory.md
audit-manager.md
```

---

# Migration

Create:

```text
migration-hub.md
snow-family.md
migration-evaluator.md
application-discovery-service.md
```

---

# Analytics

Create:

```text
athena.md
glue.md
lake-formation.md
emr.md
opensearch.md
quicksight.md
```

---

# Integration

Create:

```text
amazon-mq.md
amazon-msk.md
appflow.md
```

---

# Hybrid & Edge

Create:

```text
outposts.md
local-zones.md
wavelength.md
route53-resolver.md
active-directory-integration.md
```

---

# Cost Optimization

Create:

```text
cost-allocation-tags.md
cost-and-usage-reports.md
savings-plans-modeling.md
reserved-instance-strategy.md
compute-optimizer.md
chargeback-showback.md
```

---

# Well-Architected Framework

Create:

```text
well-architected-framework.md
```

Cover:

- Operational Excellence
- Security
- Reliability
- Performance Efficiency
- Cost Optimization
- Sustainability

---

# Phase 4 - Architecture Decision Frameworks

Create New Section:

```text
Architecture Decision Frameworks
```

Create:

```text
alb-vs-nlb-vs-gwlb.md
ecs-vs-eks.md
aurora-vs-rds.md
sns-vs-eventbridge.md
sqs-vs-mq.md
cloudfront-vs-global-accelerator.md
efs-vs-fsx.md
dms-vs-mgn.md
transit-gateway-vs-cloud-wan.md
```

Each document must include:

- When to use
- When not to use
- Cost impact
- Performance impact
- Security implications
- SAP-C02 exam clues

---

# Phase 5 - Architecture Workshops

Create:

```text
Architecture Workshops
```

---

## Workshop 1

Enterprise Landing Zone

Topics:

- Organizations
- SCPs
- Identity Center
- Control Tower
- Security Hub

---

## Workshop 2

Global SaaS Platform

Topics:

- CloudFront
- Global Accelerator
- Aurora Global
- DynamoDB Global Tables

---

## Workshop 3

Hybrid Enterprise Network

Topics:

- Direct Connect
- VPN
- Transit Gateway
- Route53 Resolver

---

## Workshop 4

Multi-Region Disaster Recovery

Topics:

- RTO
- RPO
- Aurora Global
- DRS

---

## Workshop 5

Media Streaming Platform

Topics:

- S3
- CloudFront
- Media Services

---

## Workshop 6

IoT Platform

Topics:

- IoT Core
- Kinesis
- Lambda
- DynamoDB

---

# Phase 6 - Exam Strategy Modules

Create:

```text
Exam Strategy
```

Topics:

- Question Decomposition
- Keyword Recognition
- Elimination Techniques
- Time Management
- Scenario Analysis
- Architecture Decision Patterns

Include:

### Exam Clue Tables

Example:

| Exam Clue      | Service            |
| -------------- | ------------------ |
| Lowest Latency | Global Accelerator |
| Shared Storage | EFS                |
| Fanout         | SNS                |
| Event Routing  | EventBridge        |

---

# Phase 7 - Practice Exam Enhancements

Enhance Existing Exams

Add:

- Architecture Review Questions
- Scenario-Based Labs
- Service Comparison Drills
- Domain-Based Question Banks
- Adaptive Readiness Scoring

---

# Phase 8 - Sidebar & Navigation Updates

Update:

```text
sidebars.ts
```

Add:

- Architecture Decision Frameworks
- Architecture Workshops
- Exam Strategy

Maintain logical progression:

```text
00 Foundation

01 Developer Associate

02 Solutions Architect Professional

03 Architecture Decision Frameworks

04 Architecture Workshops

05 Exam Strategy

06 Practice Exams
```

---

# Phase 9 - Automation Improvements

Enhance:

```text
scripts/validate-dva-exam-prep.ps1
scripts/validate-exam-prep.ps1
```

Validate:

- Required AWS services
- Required architecture topics
- Required exam-tip sections
- Mermaid diagrams
- Troubleshooting sections
- Comparison tables

Generate:

```text
curriculum_coverage_report.md
```

---

# Verification Plan

## Build Validation

Run:

```bash
yarn install
yarn build
```

Ensure:

- No broken links
- No missing sidebars
- No markdown rendering issues

## Audit Validation

Run:

```powershell
.\scripts\validate-dva-exam-prep.ps1
.\scripts\validate-exam-prep.ps1
```

Target:

```text
100% syllabus coverage
```

## Final Outcome

The repository should evolve from:

```text
AWS Notes Repository
```

into:

```text
AWS Learning Platform

Foundation → DVA-C02 → SAP-C02 → Architect Workshops → Exam Readiness
```

with comprehensive coverage of AWS services, architecture patterns, governance, networking, security, migration, disaster recovery, cost optimization, and certification-focused learning.
