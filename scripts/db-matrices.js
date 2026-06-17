module.exports = [
  {
    path: 'docs/03-architecture-decision-frameworks/alb-vs-nlb-vs-gwlb.md',
    title: 'ALB vs NLB vs GWLB',
    comparison: `| Feature | Application Load Balancer (ALB) | Network Load Balancer (NLB) | Gateway Load Balancer (GWLB) |
| :--- | :--- | :--- | :--- |
| **Layer** | Layer 7 (HTTP/HTTPS/HTTP2/gRPC) | Layer 4 (TCP/UDP/TLS) | Layer 3 (IP Packets) |
| **Routing Protocol**| Path/Host/Header-based routing | IP/Port-based routing | Route redirection (GENEVE 6081) |
| **Target Latency** | Millisecond range (~5-10ms) | Microsecond range (&lt;1ms) | Millisecond range (hop latency) |
| **Static IPs?** | No (Uses dynamically scaling IPs) | Yes (One Elastic IP per AZ) | No |`,
    when_to_use: `- **Application Load Balancer (ALB):** Use for standard web applications, microservices (ECS/EKS) requiring path-based or host-based routing, and SSL termination at the edge.
- **Network Load Balancer (NLB):** Use for high-performance TCP/UDP workloads, gaming servers, financial applications requiring ultra-low latency, and when you need static/Elastic IPs for client allowlists.
- **Gateway Load Balancer (GWLB):** Use when inserting third-party virtual security firewalls or IDS/IPS appliances inline into the VPC network flow.`,
    when_not_to_use: `- **ALB:** Do not use for non-HTTP applications, or workloads that need to handle millions of connections per second instantly (ALB requires scaling time).
- **NLB:** Do not use when you need advanced Layer 7 routing logic, cookie-based sticky sessions, or HTTP header injection.
- **GWLB:** Do not use for standard application traffic load balancing; it is strictly a network appliance interceptor.`,
    cost_impact: 'ALB and NLB are billed per hour plus Load Balancer Capacity Units (LCUs). NLB LCUs cover higher bandwidth and connections. GWLB is billed per GWLB endpoint hour and data processing. Centralizing firewalls in a shared transit VPC using GWLB saves firewall software licensing costs.',
    performance_impact: 'NLB offers the highest performance, scaling instantly to handle millions of requests/second. ALB adds small Layer 7 header parsing latency. GWLB adds a hop latency for GENEVE encapsulation and firewall processing.',
    security_implications: 'ALB integrates with AWS WAF for HTTP rule scanning. NLB does not support WAF. GWLB routes all traffic through security appliances, ensuring deep packet inspection.',
    exam_clues: 'Use ALB for Layer 7 microservices, container routing, and WAF integration. Use NLB for Layer 4, static IP allowlists, ultra-low latency, and TCP traffic. Use GWLB for inline firewall appliances, GENEVE encapsulation, and port 6081.'
  },
  {
    path: 'docs/03-architecture-decision-frameworks/ecs-vs-eks.md',
    title: 'ECS vs EKS',
    comparison: `| Feature | Amazon ECS | Amazon EKS |
| :--- | :--- | :--- |
| **Ecosystem** | AWS-native | Kubernetes open-source standard |
| **Configuration** | Simple Task Definitions (JSON) | Complex Kubernetes YAML (Pods, Services) |
| **Control Plane Fee**| Free | $0.10/hour ($72/month) per cluster |
| **Portability** | Harder (AWS proprietary) | High (Standard Kubernetes workloads) |`,
    when_to_use: `- **Amazon ECS:** Use when you want a simple, AWS-native container orchestrator that integrates out-of-the-box with AWS services, has low management overhead, and does not require dedicated cluster managers.
- **Amazon EKS:** Use when migrating existing on-premises Kubernetes workloads, when portability across cloud environments is a strict business requirement, or when leveraging the Kubernetes open-source operator ecosystem.`,
    when_not_to_use: `- **ECS:** Do not use if your deployment workflow is strictly standardized on Kubernetes tooling (kubectl, Helm, Kustomize).
- **EKS:** Do not use for small-scale applications or projects with limited container expertise, as it introduces high operational complexity and control plane fees.`,
    cost_impact: 'ECS control plane is free. EKS costs $0.10/hour per cluster. Both support Fargate serverless compute and EC2 instances. Fargate Spot offers up to 70% discounts, ideal for stateless containers.',
    performance_impact: 'Both offer high-speed container scheduling. EKS pod networking uses VPC CNI, offering direct IP routing to pods. ECS `awsvpc` network mode offers similar performance, routing traffic directly through ENIs.',
    security_implications: 'ECS uses IAM roles for task execution and container authorization. EKS uses IAM Roles for Service Accounts (IRSA) mapping Kubernetes service accounts to AWS IAM roles using OIDC federation.',
    exam_clues: 'Use ECS for simplicity, fast AWS integrations, and zero control plane fees. Use EKS for Kubernetes migrations, open-source operators, hybrid portability, and Helm/kubectl tooling.'
  },
  {
    path: 'docs/03-architecture-decision-frameworks/aurora-vs-rds.md',
    title: 'Amazon Aurora vs Amazon RDS',
    comparison: `| Feature | Amazon Aurora | Amazon RDS (Standard) |
| :--- | :--- | :--- |
| **Storage Engine** | Distributed, auto-scaling storage | Fixed EBS volumes (gp3, io1) |
| **Replication** | Shared storage replication (6-way copy) | Master-to-Replica block replication |
| **Failover time** | Sub-30 seconds (Shared storage) | ~30-60 seconds (Requires DNS change) |
| **Max Storage** | Up to 128 TiB | Up to 64 TiB (depends on DB engine) |`,
    when_to_use: `- **Amazon Aurora:** Use for high-scale enterprise applications requiring automatic scaling storage, ultra-fast Multi-AZ failovers, and write-forwarding read replicas.
- **Amazon RDS:** Use when database requirements fit standard scaling bounds, or when using database engines not supported by Aurora (such as SQL Server, Oracle, or MariaDB).`,
    when_not_to_use: `- **Aurora:** Do not use for small databases with minimal traffic, as the minimum cluster size has higher entry cost points.
- **RDS:** Do not use when applications require high write throughput and zero read replica lag, or when storage must scale dynamically without manual resizing configurations.`,
    cost_impact: 'Aurora instances are typically 20% more expensive than standard RDS equivalents. However, Aurora storage automatically scales down, saving storage capacity fees when data is deleted. Standard RDS volumes only scale up and require manual intervention.',
    performance_impact: 'Aurora provides up to 5x the throughput of standard MySQL and 3x of standard PostgreSQL. Read replicas share the storage plane, eliminating replication lag.',
    security_implications: 'Both support KMS storage encryption, IAM database authentication, SSL/TLS connections, and RDS Proxy integration.',
    exam_clues: 'Use Aurora for high performance, sub-30 sec failover, auto-scaling storage to 128 TiB, and zero replication lag. Use RDS for SQL Server, Oracle, MariaDB, or standard budget-constrained setups.'
  },
  {
    path: 'docs/03-architecture-decision-frameworks/sns-vs-eventbridge.md',
    title: 'Amazon SNS vs Amazon EventBridge',
    comparison: `| Feature | Amazon SNS | Amazon EventBridge |
| :--- | :--- | :--- |
| **Payload Routing** | Simple message attributes matching | Rich JSON pattern matching schema |
| **Target Types** | HTTP, SQS, SMS, Email, Lambda | 20+ AWS services, API destinations |
| **Latency** | Sub-10ms (Real-time pub/sub) | Typically sub-second (usually ~100-200ms) |
| **Schema Registry** | No | Yes (Auto-detects payload shapes) |`,
    when_to_use: `- **Amazon SNS:** Use when you need low-latency, real-time message fanout to SQS queues, HTTP endpoints, or mobile notifications (SMS/Push).
- **Amazon EventBridge:** Use when building modern event-driven microservices requiring rich JSON payload filtering, third-party SaaS integrations (SaaS event buses), or scheduled cron triggers.`,
    when_not_to_use: `- **SNS:** Do not use when target subscribers need to filter messages based on deep content patterns in the JSON body payload.
- **EventBridge:** Do not use for real-time high-frequency streaming applications where sub-10ms latency is a hard constraint.`,
    cost_impact: 'SNS is billed per million requests published. EventBridge custom events are billed per million events published. AWS service events (e.g. EC2 state change) in EventBridge are free, making it cost-effective for AWS system automation.',
    performance_impact: 'SNS delivers message fanout with near-instantaneous latency. EventBridge has slightly higher latency due to JSON rule matching operations.',
    security_implications: 'Both integrate with KMS keys for message encryption, and support resource-based policies to control who can publish events.',
    exam_clues: 'Use SNS for raw throughput, fast message fanout, SMS/Email, and low latency. Use EventBridge for JSON content filtering, SaaS integrations, cron rules, API destinations, and event replay.'
  },
  {
    path: 'docs/03-architecture-decision-frameworks/sqs-vs-mq.md',
    title: 'Amazon SQS vs Amazon MQ',
    comparison: `| Feature | Amazon SQS | Amazon MQ |
| :--- | :--- | :--- |
| **Architecture** | Serverless, fully managed | Provisioned message broker instance |
| **Protocols** | SQS Custom HTTP API | AMQP, MQTT, JMS, OpenWire, STOMP |
| **Scaling** | Scales dynamically to virtually infinite | Limited by broker instance compute size |
| **Maintenance** | Zero management | Software patching and active/standby setup |`,
    when_to_use: `- **Amazon SQS:** Use for modern cloud-native serverless systems requiring decoupled queues, asynchronous Lambda execution, and infinite scale.
- **Amazon MQ:** Use when migrating legacy enterprise on-premises message systems (like ActiveMQ or RabbitMQ) without rewriting application APIs or changing protocols (JMS, AMQP).`,
    when_not_to_use: `- **SQS:** Do not use when applications require legacy messaging protocols or socket-based connections (such as AMQP or MQTT).
- **MQ:** Do not use for new, cloud-native greenfield development where SQS offers simpler, serverless scaling with lower management overhead.`,
    cost_impact: 'SQS has a generous free tier of 1 million requests/month, billing only for usage. Amazon MQ charges flat hourly instance rates for the running broker, making it more expensive for idle queues.',
    performance_impact: 'SQS scales read and write capacity automatically, handling billions of messages daily. Amazon MQ performance is bound to instance memory and CPU capacity.',
    security_implications: 'Both support KMS encryption at rest. SQS uses IAM permissions. Amazon MQ supports Active Directory integration for user authentication.',
    exam_clues: 'Use SQS for serverless, dynamic scale, cloud-native workflows, and zero server maintenance. Use Amazon MQ for legacy migrations, ActiveMQ/RabbitMQ compatibility, and JMS/AMQP/MQTT protocols.'
  },
  {
    path: 'docs/03-architecture-decision-frameworks/cloudfront-vs-global-accelerator.md',
    title: 'Amazon CloudFront vs AWS Global Accelerator',
    comparison: `| Feature | Amazon CloudFront | AWS Global Accelerator |
| :--- | :--- | :--- |
| **Caching** | Caches static/dynamic content at edge | No content caching (packet proxy only) |
| **Target Content** | HTTP/HTTPS workloads | TCP and UDP (HTTP, gaming, voice) |
| **IP addresses** | Dynamic DNS names | Two static Anycast IPs |
| **Protocol** | Layer 7 only | Layer 4 and Layer 3 routing |`,
    when_to_use: `- **Amazon CloudFront:** Use for caching web content, images, videos, static websites, and dynamic API endpoints using HTTP/HTTPS.
- **AWS Global Accelerator:** Use when you need to route non-HTTP protocols (gaming, VOIP, database connections), require static Anycast IPs for client firewall rules, or need fast failover between regional endpoints.`,
    when_not_to_use: `- **CloudFront:** Do not use for raw TCP/UDP workloads (like gaming protocols or SSH connections).
- **Global Accelerator:** Do not use for static web page hosting or file download acceleration where edge caching is required to reduce origin load.`,
    cost_impact: 'CloudFront bills for data transfer output and requests. Global Accelerator charges a daily flat base fee plus a data transfer markup fee (DT-Premium) based on the destination region.',
    performance_impact: 'CloudFront caches content at 400+ Edge locations, reducing origin round-trips. Global Accelerator routes IP packets over the private AWS global fiber network, reducing jitter and latency.',
    security_implications: 'CloudFront integrates with WAF and terminates SSL/TLS at the edge. Global Accelerator routes TCP/UDP traffic directly to regional targets, allowing security group enforcement at the origin.',
    exam_clues: 'Use CloudFront for HTTP/HTTPS caching, media streaming, static sites, and WAF integration. Use Global Accelerator for Anycast static IPs, non-HTTP (TCP/UDP), gaming, voice, and fast cross-region failover.'
  },
  {
    path: 'docs/03-architecture-decision-frameworks/efs-vs-fsx.md',
    title: 'Amazon EFS vs Amazon FSx',
    comparison: `| Feature | Amazon EFS | Amazon FSx (Suite) |
| :--- | :--- | :--- |
| **Protocols** | NFSv4 (Linux only) | SMB (Windows), Lustre, NetApp ONTAP, OpenZFS |
| **Storage Type** | Distributed, elastic file system | Configurable performance disks (SSD/HDD) |
| **Active Clients** | Multi-AZ Linux hosts | Dependent on the specific FSx engine |
| **Integration** | EC2, ECS, EKS, Lambda | EC2, EKS, on-premises machines |`,
    when_to_use: `- **Amazon EFS:** Use for shared Linux-based directories, web server asset farms, CI/CD workspaces, and serverless Lambda configurations requiring persistent storage.
- **Amazon FSx:** Use when you need specialized file systems: FSx for Windows (SMB/Active Directory), FSx for Lustre (HPC/S3 link), FSx for ONTAP (multiprotocol NetApp), or FSx for OpenZFS (microsecond Linux).`,
    when_not_to_use: `- **EFS:** Do not use for Windows servers (as EFS lacks SMB support) or database system root drives requiring high-speed raw block storage.
- **FSx:** Do not use for simple shared Linux directories where EFS offers simpler, serverless scaling with zero configuration.`,
    cost_impact: 'EFS is serverless, billing for storage used and offering low-cost Infrequent Access (IA) tiers. FSx systems are provisioned, billing for storage and throughput, requiring careful sizing to control budget spend.',
    performance_impact: 'EFS General Purpose latency is ~1-3ms. FSx for OpenZFS and ONTAP offer sub-millisecond or microsecond SSD read speeds. FSx for Lustre provides massive gigabytes per second bandwidth.',
    security_implications: 'EFS uses IAM and POSIX file permissions. FSx for Windows supports standard Windows ACL directory permissions linked to Active Directory.',
    exam_clues: 'Use EFS for shared Linux directories, serverless mounts, and standard NFSv4. Use FSx Windows for Active Directory/SMB. Use FSx Lustre for HPC/ML. Use FSx ONTAP for NetApp/iSCSI.'
  },
  {
    path: 'docs/03-architecture-decision-frameworks/dms-vs-mgn.md',
    title: 'AWS DMS vs AWS Application Migration Service (MGN)',
    comparison: `| Feature | AWS Database Migration Service (DMS) | AWS Application Migration Service (MGN) |
| :--- | :--- | :--- |
| **Scope** | Database-level data replication | Server block-level replication (OS + Disk) |
| **Source Type** | SQL, NoSQL databases | Any physical server or VM (Windows/Linux) |
| **Target Type** | RDS, Aurora, DynamoDB, S3 | EC2 Instance VMs |
| **Method** | Continuous database transactional replication | Block-level continuous background replication |`,
    when_to_use: `- **AWS DMS:** Use when migrating database tables, when you need to perform heterogeneous conversions (using SCT, e.g. Oracle to Aurora PostgreSQL), or to sync databases continuously.
- **AWS MGN:** Use to lift-and-shift physical or virtual servers (OS, configuration, application files, database files) directly into EC2 VMs with minimal downtime.`,
    when_not_to_use: `- **DMS:** Do not use for migrating whole operating systems or non-database files.
- **MGN:** Do not use when refactoring applications to serverless architectures, or when doing heterogeneous database migrations.`,
    cost_impact: 'DMS replication instances are billed hourly. AWS MGN is free to use for the first 90 days per server migrated. Standard EC2 staging and EBS replication storage charges apply during replication.',
    performance_impact: 'DMS replication requires resources on the source database to read transaction logs. MGN runs an agent that copies disk blocks, optimizing host performance impacts.',
    security_implications: 'Both support secure TLS tunnels and KMS disk encryption to protect migration data.',
    exam_clues: 'Use DMS for database-only migrations, schema changes (SCT), and continuous DB sync. Use MGN for lift-and-shift server migrations, OS level copy, and physical/virtual to EC2 replication.'
  },
  {
    path: 'docs/03-architecture-decision-frameworks/transit-gateway-vs-cloud-wan.md',
    title: 'Transit Gateway vs AWS Cloud WAN',
    comparison: `| Feature | Transit Gateway (TGW) | AWS Cloud WAN |
| :--- | :--- | :--- |
| **Scope** | Regional network hub | Global wide-area network |
| **Management** | Manual route table edits per region | Central Core Network Policy (JSON) |
| **Peering** | Requires manual TGW region peering | Built-in multi-region backbone routing |
| **Scale** | Low to medium region pools | Global enterprise networks |`,
    when_to_use: `- **Transit Gateway:** Use for regional network configurations, when routing between a small number of VPCs and accounts, or when manual route controls are preferred.
- **AWS Cloud WAN:** Use when managing large, complex networks spanning multiple AWS regions and on-premises hubs, requiring central policy enforcement and segmentation.`,
    when_not_to_use: `- **Transit Gateway:** Do not use for large multi-region deployments where managing peerings and manual route table updates becomes error-prone.
- **Cloud WAN:** Do not use for simple, single-region architectures where a regional Transit Gateway is simpler and cheaper to configure.`,
    cost_impact: 'Both bill per VPC attachment hour and data processing. Cloud WAN adds a fee for Core Network Hub connections. Cloud WAN reduces administrative overhead costs for global routing managers.',
    performance_impact: 'Both leverage the high-speed AWS network backbone. Cloud WAN automates multi-region route selection, optimizing latency paths.',
    security_implications: 'TGW uses manual route table segmentation. Cloud WAN uses policies to define segments globally, preventing dev/prod cross-routing.',
    exam_clues: 'Use TGW for regional networking, simple VPC hubs, and manual route table control. Use Cloud WAN for global multi-region networks, central core network policies, and global segmentation.'
  }
];
