# 🧠 AWS SAA – COMPLETE SYLLABUS ARCHITECTURE PATTERN MASTER SHEET (300+)

---

# 🆕 0. RECENT & EMERGING SERVICES (SAA-C03 2024–2026)

## Security & Governance

- AWS Security Hub → Centralized security findings
- AWS Control Tower → Multi-account governance
- AWS Resource Access Manager (RAM) → Cross-account resource sharing
- AWS Service Catalog → Self-service provisioning with governance
- AWS Security Lake → Centralized security log aggregation

## Compute & Containers

- AWS Graviton Instances → ARM-based cost/performance
- Amazon EKS → Managed Kubernetes
- AWS Outposts / Local Zones → Hybrid/edge architectures

## Storage & Data

- Amazon FSx for OpenZFS → Managed file system
- Amazon S3 Express One Zone → High-performance S3 storage
- Amazon DataZone → Data catalog/governance
- AWS Backup → Centralized backup management

## Networking & Integration

- AWS Global Accelerator → Global traffic routing
- AWS PrivateLink → Secure private connectivity
- Amazon VPC Lattice → Service-to-service networking
- Amazon AppFlow → SaaS data integration
- Amazon EventBridge Pipes → Simplified event-driven integration

## Database & Analytics

- Amazon Aurora Serverless v2 → Improved serverless DB scaling
- Amazon OpenSearch Service → Search/analytics (successor to Elasticsearch)
- Amazon Elastic Disaster Recovery (EDR) → Modern DR solution

## Machine Learning & AI

- Amazon SageMaker → ML integration patterns
- Amazon Bedrock → Generative AI integration (edge topic)

---

# 🌍 1. DESIGN SECURE ARCHITECTURES

## IAM & Identity

1. Human access → IAM Identity Center (SSO)
2. App access to AWS → IAM Role
3. Cross-account access → AssumeRole
4. Temporary credentials → STS
5. Fine-grained S3 access → IAM policy + bucket policy
6. Instance permission → EC2 role (not access keys)
7. Lambda permission → execution role
8. Rotate secrets → Secrets Manager
9. Store config → Parameter Store
10. Enforce MFA → IAM condition

---

## Network security

11. Instance firewall → Security Group
12. Subnet-level blocking → NACL
13. Private app → private subnets only
14. No internet → remove IGW
15. Private AWS access → VPC endpoint
16. Inspect traffic → GWLB + firewall
17. DDoS → Shield Advanced
18. L7 protection → WAF
19. Block countries → WAF geo match
20. API protection → WAF + rate limit

---

## Data protection

21. Encrypt S3 default → SSE-S3
22. Audit encryption → SSE-KMS
23. EBS encryption → default EBS encryption
24. RDS encryption → KMS
25. In-transit encryption → TLS + ACM
26. Prevent delete → S3 Object Lock
27. Version recovery → S3 versioning
28. PII discovery → Macie
29. Compliance → AWS Config
30. Threat detection → GuardDuty

---

# 🏗️ 2. DESIGN RESILIENT ARCHITECTURES

## Multi-AZ patterns

31. HA compute → ASG + ALB
32. HA DB → RDS Multi-AZ
33. HA cache → ElastiCache Multi-AZ
34. HA file system → EFS
35. NAT HA → NAT per AZ
36. Endpoint HA → endpoint per AZ

---

## Multi-region DR

37. Backup → S3 CRR
38. Pilot light → minimal infra warm
39. Warm standby → scaled-down active
40. Active-active → multi-region routing
41. Aurora global DB → cross-region reads
42. DynamoDB global tables → multi-region write
43. Route 53 failover → DR automation
44. AMI replication → DR compute
45. EBS snapshot copy → DR volumes
46. Cross-region ASG → DR compute scaling

---

## Decoupling for resilience

47. Async processing → SQS
48. Fan-out → SNS
49. Event-driven → EventBridge
50. Replay events → Kinesis
51. DLQ → failure isolation
52. Step Functions → retry orchestration

---

# ⚡ 3. DESIGN HIGH-PERFORMING ARCHITECTURES

## Compute selection

53. Long-running → EC2
54. Containers → ECS/Fargate
55. Serverless → Lambda
56. Batch jobs → AWS Batch
57. HPC → EC2 cluster placement group
58. Burstable → T family
59. GPU → P/G instances

---

## Caching strategies

60. DB read cache → ElastiCache
61. DynamoDB cache → DAX
62. Edge cache → CloudFront
63. API cache → API Gateway cache

---

## Storage performance

64. High IOPS → io2
65. Throughput → st1
66. General → gp3
67. Shared file → EFS
68. HPC file → FSx Lustre

---

## Database performance

69. Read scaling → Read replica
70. Connection pooling → RDS Proxy
71. Serverless scaling → Aurora Serverless
72. Partition at scale → DynamoDB partition key
73. GSI for new query → DynamoDB GSI

---

# 💰 4. DESIGN COST-OPTIMIZED ARCHITECTURES

## Compute cost

74. Steady → Savings Plan
75. Fault tolerant → Spot
76. Predictable → Reserved instances
77. Auto shutdown → Instance scheduler
78. Right size → Compute Optimizer

---

## Storage cost

79. Lifecycle → S3 IA
80. Archive → Glacier
81. Delete old logs → lifecycle
82. Tier unknown → Intelligent tiering

---

## Network cost

83. Avoid NAT for S3 → Gateway endpoint
84. Reduce data transfer → CloudFront
85. Same AZ traffic → place resources in same AZ

---

## Database cost

86. Serverless DB → Aurora Serverless
87. On-demand DynamoDB → unpredictable traffic
88. Storage auto-scale → Aurora

---

# 🌐 5. NETWORK DESIGN

## Connectivity

89. Public app → IGW
90. Private outbound → NAT
91. Hybrid → VPN
92. Dedicated hybrid → Direct Connect
93. Multi-VPC → Transit Gateway
94. Small VPC connect → VPC peering

---

## DNS

95. Private DNS → private hosted zone
96. Hybrid DNS → Route 53 resolver
97. Health routing → Route 53 failover
98. Latency routing → global app
99. Weighted → blue/green

---

# 🛢️ 6. STORAGE SERVICES USE CASES

100. Data lake → S3 + Athena + Glue
101. Static site → S3 + CloudFront
102. Shared Linux file → EFS
103. Windows file → FSx Windows
104. NetApp → FSx ONTAP
105. HPC → FSx Lustre
106. Hybrid file → Storage Gateway
107. Large transfer → DataSync
108. Snowball → offline migration
109. Backup → AWS Backup

---

# 🧠 7. DATABASE SERVICE DECISIONS

110. OLTP → RDS
111. Global relational → Aurora global
112. Massive KV → DynamoDB
113. Graph → Neptune
114. Document → DocumentDB
115. Search → OpenSearch
116. Warehouse → Redshift
117. Time-series → Timestream
118. Cache → ElastiCache
119. Ledger → QLDB
120. Migration → DMS

---

# 🔄 8. INTEGRATION & MESSAGING

121. Queue → SQS
122. Ordered queue → SQS FIFO
123. Pub/sub → SNS
124. Event bus → EventBridge
125. Workflow → Step Functions
126. Streaming → Kinesis
127. Delivery → Firehose
128. API facade → API Gateway
129. Sync microservices → ALB
130. Async microservices → SNS/SQS

---

# 📊 9. OBSERVABILITY

131. Metrics → CloudWatch
132. Logs → CloudWatch logs
133. API audit → CloudTrail
134. Distributed tracing → X-Ray
135. Central dashboard → CloudWatch dashboard
136. Auto remediation → EventBridge + Lambda
137. Log archive → S3
138. Alarm → SNS notification
139. Custom metrics → CloudWatch PutMetric
140. Anomaly detection → CloudWatch

---

# 🧪 10. DEPLOYMENT & MIGRATION

141. Lift & shift → MGN
142. DB migration → DMS
143. Schema convert → SCT
144. Blue/green → CodeDeploy
145. CI/CD → CodePipeline
146. Infra as code → CloudFormation
147. App deploy → Elastic Beanstalk
148. Container deploy → ECS/EKS
149. Serverless deploy → SAM
150. Canary release → weighted routing

---

# 🧩 11. SERVERLESS ARCHITECTURES

151. REST API → API Gateway + Lambda
152. Async event → S3 → Lambda
153. Queue processing → SQS → Lambda
154. Cron → EventBridge schedule
155. Orchestration → Step Functions
156. Streaming → Kinesis → Lambda
157. WebSocket → API Gateway
158. Auth → Cognito
159. Private serverless → VPC Lambda
160. File processing → S3 event

---

# 🏆 12. EXAM SUPER-TRIGGERS

161. Decouple → SQS
162. Fan-out → SNS
163. Event routing → EventBridge
164. HA DB → Multi-AZ
165. Read scale → Read replica
166. Global users → CloudFront
167. Private AWS → VPC endpoint
168. Audit → CloudTrail
169. Metrics → CloudWatch
170. Cache → ElastiCache

---

# 🔥 EXTRA REAL EXAM EDGE PATTERNS

171. Bastionless SSH → SSM Session Manager
172. Private EC2 patching → SSM + endpoints
173. Store AMI for DR → cross-region copy
174. Cross-account logs → subscription filter
175. Central security account → Organizations
176. Enforce policies → SCP
177. Tag-based cost tracking → cost allocation tags
178. Multi-tenant isolation → separate accounts
179. Shared services VPC → central networking
180. Private API access → interface endpoint
181. Lambda DB scaling → RDS Proxy
182. High connection DB → RDS Proxy
183. Secrets in Lambda → Secrets Manager
184. Config in Lambda → Parameter Store
185. Throttle API → API Gateway usage plan
186. Cache API → API Gateway cache
187. Web app firewall → WAF
188. Upload via browser → pre-signed URL
189. IoT ingestion → IoT Core → Kinesis
190. Real-time analytics → Kinesis → Lambda
191. Batch ETL → Glue
192. Query S3 → Athena
193. Search logs → OpenSearch
194. Archive logs → S3 Glacier
195. Cost anomaly → Cost Explorer
196. Spot interruption handling → capacity rebalance
197. Mixed instances → ASG mixed policy
198. Cross-zone failover → health checks
199. Sticky session removal → external session store
200. Zero-downtime deploy → blue/green

---

## Prerequisites

- [Documentation Overview](../README.md)

## Recommended Next Topics

- [🎴 Flashcards - Incorrect Question Areas Only](../study-guides/INCORRECT-AREAS-FLASHCARDS.md)

## Related Topics

- [AWS Solution Architect - Mermaid Diagrams Index](DIAGRAMS-INDEX.md)
- [AWS Solutions Architect - Quick Reference Guide](QUICK-REFERENCE.md)
- [AWS Visual Memory Guide - Diagrams & Charts](VISUAL-GUIDE.md)
