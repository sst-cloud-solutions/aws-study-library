module.exports = [
  // ==========================================
  // COMPUTE (6 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Compute/placement-groups.md',
    title: 'EC2 Placement Groups',
    category: 'Compute',
    analogy: 'A theater seating plan: Cluster is a group of friends sitting adjacent in the same row to talk instantly; Spread is putting guests in different rows and aisles so if one gets sick, the others are unaffected; Partition is group ticketing where blocks of seats are isolated.',
    description: 'EC2 Placement Groups determine how instances are placed on physical hardware. Cluster placement groups place instances close together inside an Availability Zone for low-latency network performance. Spread placement groups place instances on separate physical racks to reduce correlated failures. Partition placement groups split instances into logical partitions across different racks.',
    mermaid: `graph TD
    subgraph Cluster Placement Group [Cluster - Same AZ, Low Latency]
      Inst1[EC2 Instance 1] <-->|10 Gbps / Ultra-low Latency| Inst2[EC2 Instance 2]
    end
    subgraph Spread Placement Group [Spread - Different Hardware]
      Rack1[Rack A] --> SInst1[EC2 Instance 1]
      Rack2[Rack B] --> SInst2[EC2 Instance 2]
    end`,
    comparison: `| Placement Type | Core Benefit | Network Performance | Instance Limits |
| :--- | :--- | :--- | :--- |
| **Cluster** | Ultra-low latency | Up to 100 Gbps network speed | AZ-restricted |
| **Spread** | Max high availability | Standard network | 7 instances per AZ |
| **Partition** | Scale-out distributed workloads | Rack-separated standard | Hundreds of instances |`,
    performance: 'Cluster placement groups support up to 100 Gbps network throughput. For maximum throughput, use Enhanced Networking (ENA) and matching instance types.',
    cost: 'Placement groups are free to configure; you only pay for the launched EC2 instances.',
    security: 'IAM control over `ec2:CreatePlacementGroup` is recommended. Network security is maintained via standard security groups.',
    tips: 'Use Cluster for HPC and distributed databases requiring low-latency node-to-node communication. Use Spread for critical nodes like database primary/secondary.',
    traps: 'You cannot merge existing EC2 instances into a placement group. You must create the group and launch new instances into it.',
    clues: 'placement group, cluster placement group, low latency node communication, rack-level isolation, partition'
  },
  {
    path: 'docs/02-solutions-architect-professional/Compute/dedicated-hosts.md',
    title: 'Dedicated Hosts',
    category: 'Compute',
    analogy: 'Renting a whole physical building (Dedicated Host) where you can paint and modify individual apartments (VMs) and bring your own locks, vs renting a private room in a shared apartment (Dedicated Instance).',
    description: 'An Amazon EC2 Dedicated Host is a physical server fully dedicated to your use. It allows you to use your existing software licenses (BYOL) like Windows Server or SQL Server, and helps satisfy regulatory compliance requirements.',
    mermaid: `graph LR
    subgraph Physical Server [Physical Server Host]
      Lic[BYOL Licensing Boundary]
      VM1[EC2 VM Instance A]
      VM2[EC2 VM Instance B]
    end`,
    comparison: `| Feature | Dedicated Hosts | Dedicated Instances | Shared Instances |
| :--- | :--- | :--- | :--- |
| **Hardware Dedicated?** | Yes (Physical server level) | Yes (Instance level, physical host shared with same account only) | No (Multi-tenant hosting) |
| **BYOL Support?** | Yes (Core/Socket based) | No | No |
| **Host Visibility?** | Yes (Socket/Core count visible) | No | No |`,
    performance: 'Guarantees hardware resources are not shared with other AWS customers (no noisy neighbors), maintaining consistent raw physical host performance.',
    cost: 'Billed per physical host hour, regardless of the number of EC2 instances running on it. Offers Savings Plans options.',
    security: 'Ideal for strict regulatory environments requiring physical server isolation. Supports host-level affinity to keep instances on the same hardware during restarts.',
    tips: 'Look for "Bring Your Own License (BYOL)", core/socket-based licensing compliance, and physical isolation requirements in the exam.',
    traps: 'Dedicated Hosts do not support automatic scaling across multiple hosts without careful management of instance placement affinity.',
    clues: 'dedicated host, software license, compliance constraint, physical server host, socket cores, byol'
  },
  {
    path: 'docs/02-solutions-architect-professional/Compute/capacity-reservations.md',
    title: 'On-Demand Capacity Reservations',
    category: 'Compute',
    analogy: 'Booking a hotel room in advance with a non-refundable deposit: the room is guaranteed to be vacant for you, even if you do not show up, and you pay for it regardless of occupancy.',
    description: 'On-Demand Capacity Reservations enable you to reserve compute capacity for your EC2 instances in a specific Availability Zone. This ensures that you have access to EC2 capacity when needed, mitigating resource constraints during scaling events.',
    mermaid: `graph TD
    CR[Capacity Reservation AZ-1a] -->|Guarantees Compute| EC2[EC2 Launch Request]
    CR -->|Billing Active| Bill[Charge Active even if empty]`,
    comparison: `| Metric | Capacity Reservations | Reserved Instances | Spot Instances |
| :--- | :--- | :--- | :--- |
| **Capacity Guarantee**| Yes (Zone-specific) | Yes (Only if Zonal RI, not Regional) | No (Subject to termination) |
| **Commitment Length** | None (Can be deleted instantly) | 1 or 3 Years | None |
| **Billing Model** | Charged standard On-Demand rate | Discounted rate | Market pricing |`,
    performance: 'Reduces the risk of "insufficient capacity" errors during critical auto-scaling events or disaster recovery failovers.',
    cost: 'Charged at the standard On-Demand rate when the reservation is active, whether instances are running in it or not.',
    security: 'Managed via standard IAM resource policies and tags. Cross-account capacity sharing is supported via AWS RAM.',
    tips: 'Use Capacity Reservations for disaster recovery environments where compute capacity must be absolutely guaranteed in the target region.',
    traps: 'Regional Reserved Instances do NOT guarantee capacity; they only provide billing discounts. You must use zonal configuration or On-Demand Capacity Reservations for capacity guarantees.',
    clues: 'capacity reservation, insufficient capacity error, zonal capacity guarantee, resource constraint prevention'
  },
  {
    path: 'docs/02-solutions-architect-professional/Compute/spot-fleet.md',
    title: 'Spot Fleet',
    category: 'Compute',
    analogy: 'A taxi service aggregator that rents out cars based on varying market price bids, automatically switching to a cheaper car type or route if the price of one model spikes.',
    description: 'A Spot Fleet is a collection of Spot Instances (and optionally On-Demand Instances) launched based on criteria you define. It attempts to meet a target capacity by dynamically selecting from diverse instance pools.',
    mermaid: `graph TD
    SF[Spot Fleet Controller] -->|Launch Request| Pool1[Pool A: m5.large Spot - Low Price]
    SF -->|Fallback Request| Pool2[Pool B: c5.large Spot - Diversified]
    SF -->|Stable Base| OD[On-Demand Instance]`,
    comparison: `| Strategy | lowestPrice | diversified | capacityOptimized |
| :--- | :--- | :--- | :--- |
| **Allocation goal** | Selects cheapest instance pool | Spreads instances across all pools | Selects pool with deepest capacity |
| **Interruption Risk**| High (if pool price spikes) | Low (isolated to single pool) | Lowest |`,
    performance: 'Optimized by diversifying instance types to prevent simultaneous termination when Spot prices spike in a single pool.',
    cost: 'Saves up to 90% compared to standard On-Demand costs. Set maximum bid price limits to control budget bounds.',
    security: 'Requires standard Spot Fleet IAM Service-Linked Roles to manage the dynamic launch and termination of EC2 instances on your behalf.',
    tips: 'Spot Fleet can launch instance types specified in a launch template. Use the "diversified" allocation strategy to maintain high availability.',
    traps: 'Spot Fleet is a legacy API; prefer EC2 Auto Scaling groups with mixed instance policies for modern architectures.',
    clues: 'spot fleet, spot instance pool, allocation strategy, diversified, lowestPrice, bid price'
  },
  {
    path: 'docs/02-solutions-architect-professional/Compute/launch-templates.md',
    title: 'EC2 Launch Templates',
    category: 'Compute',
    analogy: 'A standard operating recipe sheet that can be versioned (v1: 2 eggs, v2: 3 eggs with cheese) and cloned to quickly replicate the exact same dish at multiple restaurant chains.',
    description: 'An EC2 Launch Template specifies instance configuration information, including AMI IDs, instance types, network settings, security groups, and user data. It supports versioning and parameter overrides, replacing legacy Launch Configurations.',
    mermaid: `graph LR
    LT[Launch Template v2] -->|Launch| EC2[EC2 Instances]
    LT -->|Override Parameters| ASG[Auto Scaling Groups]`,
    comparison: `| Feature | Launch Templates | Launch Configurations (Legacy) |
| :--- | :--- | :--- |
| **Versioning** | Yes | No (Must create a new configuration) |
| **Parameter Overrides**| Yes | No |
| **Spot/On-Demand Mixed**| Yes | No |`,
    performance: 'Reduces launch errors by standardizing boot templates, enabling faster auto-scaling execution times.',
    cost: 'Launch templates are stored free of charge; standard EC2 resource billing applies at instance launch.',
    security: 'Enforces least privilege by allowing users to launch instances only if they use a sanctioned and secured Launch Template.',
    tips: 'Always use Launch Templates instead of Launch Configurations in modern designs. Versioning allows easy rollbacks of AMI updates.',
    traps: 'A launch configuration cannot be modified or versioned. Do not build new architectures using launch configurations.',
    clues: 'launch template, versioning launch, instance settings overrides, template parameter inheritance'
  },
  {
    path: 'docs/02-solutions-architect-professional/Compute/warm-pools.md',
    title: 'Auto Scaling Warm Pools',
    category: 'Compute',
    analogy: 'Pre-cooking food at a buffet and keeping it under warm lamps: when a surge of hungry customers arrives, you serve the pre-warmed dishes instantly instead of cooking from scratch.',
    description: 'Warm Pools for EC2 Auto Scaling allow you to decrease the scale-out latency of applications by maintaining a pool of pre-initialized, stopped, or running EC2 instances ready to join the active ASG.',
    mermaid: `graph LR
    subgraph Active ASG [Active Auto Scaling Group]
      Live1[Running Instance]
    end
    subgraph Warm Pool [Stopped Warm Instances]
      Warm1[Pre-initialized stopped Instance] -->|Quick Start| Live1
    end`,
    comparison: `| Instance State | Boot Latency | Hourly Compute Cost | Storage Cost |
| :--- | :--- | :--- | :--- |
| **Stopped Pool** | Medium (Requires VM startup) | Zero (Only pay for EBS) | EBS Volumes standard billing |
| **Running Pool** | Ultra-low (Ready instantly) | Full hourly compute cost | EBS Volumes standard billing |`,
    performance: 'Drastically reduces the time needed for scale-out, from 5-10 minutes (cold boot + heavy app setup scripts) to under a minute.',
    cost: 'Saves money compared to keeping instances constantly running by allowing pre-initialized instances to exist in a `Stopped` state.',
    security: 'Instances in a warm pool execute lifecycle hooks in isolation before being added to the load balancer target group.',
    tips: 'Use warm pools for heavy applications with long boot/initialization sequences (e.g. Java/WebLogic apps).',
    traps: 'Instances in the warm pool do not receive traffic from ELB target groups until they are transitioned to the Active pool.',
    clues: 'warm pool, boot latency scale-out, stopped state instances, pre-initialized scaling, lifecycle hooks'
  },

  // ==========================================
  // CONTAINERS (5 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Containers/eks-architecture.md',
    title: 'EKS Control Plane & Worker Nodes',
    category: 'Containers',
    analogy: 'A shipyard company: EKS Control Plane is the board of directors that manages container positions and schedules shipments, while EKS Worker Nodes are the physical crane systems lifting the boxes.',
    description: 'Amazon Elastic Kubernetes Service (EKS) manages the Kubernetes control plane across multiple Availability Zones for high availability. Worker nodes run on EC2 instances or AWS Fargate, executing the actual Kubernetes Pods.',
    mermaid: `graph TD
    subgraph EKS Managed [EKS Control Plane]
      API[Kubernetes API Server] <--> etcd[(Highly Available etcd)]
    end
    subgraph Customer VPC [Worker Infrastructure]
      API <--> Node1[Managed Node Group EC2]
      API <--> Node2[AWS Fargate Profile]
    end`,
    comparison: `| Compute Type | Managed Node Groups | AWS Fargate (Serverless) | Self-Managed Nodes |
| :--- | :--- | :--- | :--- |
| **OS Management** | Semi-managed (AWS patches AMI) | Fully managed (Zero OS) | Customer responsibility |
| **Configuration** | Easy scaling via ASG | Pod-level configuration | Complex configuration |
| **Pricing** | Standard EC2/EBS billing | Per vCPU/Memory runtime | Standard EC2/EBS billing |`,
    performance: 'Control plane scaling is managed automatically by AWS based on resource load, ensuring etcd write speeds are maintained.',
    cost: 'AWS charges a flat rate of $0.10/hour per EKS cluster, plus underlying EC2 compute and EBS storage rates.',
    security: 'EKS control plane communicates with worker nodes over a secured VPC private endpoint or public endpoint with IP restrictions.',
    tips: 'Ensure control plane endpoints are configured as private-only for enterprise setups to prevent internet-facing attack vectors.',
    traps: 'Do not manage Kubernetes etcd backups manually; AWS guarantees etcd availability and replication across 3 AZs.',
    clues: 'eks cluster, kubernetes control plane, etcd replication, managed node group, fargate profile'
  },
  {
    path: 'docs/02-solutions-architect-professional/Containers/eks-networking.md',
    title: 'EKS Pod Networking (VPC CNI)',
    category: 'Containers',
    analogy: 'Giving every single desk in a massive corporate office its own direct, unique physical landline phone number connected directly to the building main telephone system, instead of sharing a line.',
    description: 'Amazon EKS uses the AWS VPC Container Network Interface (CNI) plugin. This CNI allows Kubernetes pods to receive native, private IPv4/IPv6 addresses from the surrounding VPC subnet range.',
    mermaid: `graph LR
    Subnet[VPC Subnet CIDR: 10.0.0.0/16] --> Node[EC2 Worker Node: 10.0.1.10]
    Node --> Pod1[Kubernetes Pod A: 10.0.1.55]
    Node --> Pod2[Kubernetes Pod B: 10.0.1.56]`,
    comparison: `| Networking Mode | AWS VPC CNI | Standard Kubenet overlay |
| :--- | :--- | :--- |
| **IP Assignment** | Native VPC IP (from Subnet) | Virtual cluster IP (Private overlay) |
| **Performance** | Line-rate performance (No overlay overhead) | Lower throughput due to routing encapsulation |
| **Routing** | Directly routable within VPC | Requires NAT/routing tables to cross VPC |`,
    performance: 'VPC CNI provides line-rate networking throughput equivalent to native EC2 ENIs, eliminating packet overlay encapsulation latency.',
    cost: 'No charge for CNI plugin; however, pods consume IP addresses, which can lead to subnet IP exhaustion.',
    security: 'Supports standard security groups for pods, allowing direct security group assignment to individual Kubernetes workloads.',
    tips: 'Avoid IP exhaustion by sizing subnets correctly or using the custom networking feature to assign pods to a separate secondary CIDR block.',
    traps: 'Each EC2 instance type supports a maximum number of ENIs and IP addresses. Small instance types limit the maximum number of pods you can run.',
    clues: 'vpc cni, pod networking, subnet ip exhaustion, secondary cidr, maximum pod limits, line-rate'
  },
  {
    path: 'docs/02-solutions-architect-professional/Containers/eks-security.md',
    title: 'EKS Security & IRSA',
    category: 'Containers',
    analogy: 'Giving a bank employee a custom, single-use access code that matches only their specific current transaction, rather than sharing the keys to the entire bank vault.',
    description: 'EKS Security utilizes IAM Roles for Service Accounts (IRSA) to associate IAM roles with Kubernetes service accounts. This provides least-privilege AWS API access directly to pods, replacing node-level instance profiles.',
    mermaid: `graph TD
    Pod[Kubernetes Pod] -->|Use Service Account| SA[Service Account]
    SA -->|OIDC Web Identity Federation| OIDC[EKS OIDC Provider]
    OIDC -->|AssumeRole| IAM[AWS IAM Role]
    IAM -->|Temporary Token| AWS[Access S3/DynamoDB]`,
    comparison: `| Authorization Method | IRSA (IAM OIDC) | Node Instance Profile (Legacy) |
| :--- | :--- | :--- |
| **Isolation level** | Pod-specific | Node-wide (All pods on node share permissions) |
| **Token lifecycle** | Short-lived temp tokens | Persistent VM credentials |
| **Security risk** | Lowest | High (compromised pod gains all node permissions) |`,
    performance: 'IAM credentials are cached by the AWS SDK inside the container, resulting in negligible API request overhead.',
    cost: 'No charge for EKS OIDC identity provider integration.',
    security: 'Ensures strict compliance and tenant isolation in multi-tenant Kubernetes clusters.',
    tips: 'Look for IAM Roles for Service Accounts (IRSA) and OIDC integration when the exam asks for secure pod authentication to AWS services.',
    traps: 'Do not use hardcoded access keys in secret manifests. Always map application configurations to IRSA.',
    clues: 'irsa, iam roles for service accounts, oidc provider eks, pod security context, least privilege pods'
  },
  {
    path: 'docs/02-solutions-architect-professional/Containers/app-mesh.md',
    title: 'AWS App Mesh',
    category: 'Containers',
    analogy: 'A central command tower that manages flight paths, speeds, and communications for planes (Microservices) globally, without requiring pilots (Application Code) to change how they fly.',
    description: 'AWS App Mesh is a managed service mesh that provides application-level networking, making it easy to manage communication, monitor traffic, and configure routing policies across microservices.',
    mermaid: `graph LR
    Proxy1[Envoy Proxy - Container A] -->|Routable Traffic| Proxy2[Envoy Proxy - Container B]
    AppMesh[AWS App Mesh Control Plane] -->|Configures Policies| Proxy1 & Proxy2`,
    comparison: `| Metric | Service Mesh (App Mesh) | Client-Side Library | Application Load Balancer |
| :--- | :--- | :--- | :--- |
| **Routing Layer** | Layer 7 (Service-to-service) | Layer 7 (Code dependency) | Layer 7 (Edge-to-service) |
| **Encryption** | mTLS automatically managed | Manual coding required | Standard TLS termination |
| **Overhead** | Low latency proxy sidecars | High code maintainability | Higher latency hops |`,
    performance: 'App Mesh configures Envoy proxies running as sidecars, introducing a sub-millisecond network latency overhead per hop.',
    cost: 'AWS App Mesh is a free service; you only pay for the underlying ECS, EKS, or EC2 resources that execute Envoy proxies.',
    security: 'Supports Mutual TLS (mTLS) for secure, encrypted communication between service nodes, with certificate integration via ACM.',
    tips: 'Use App Mesh for microservices patterns requiring canary routing, service discovery, and tracing without modifying application source code.',
    traps: 'App Mesh requires applications to route traffic through local Envoy proxy containers; ensure ECS task definitions have sidecars registered.',
    clues: 'app mesh, service mesh, envoy proxy, sidecar container, mtls routing, canary deployment'
  },
  {
    path: 'docs/02-solutions-architect-professional/Containers/ingress-controllers.md',
    title: 'EKS Ingress Controllers',
    category: 'Containers',
    analogy: 'A security desk at the lobby of a skyscraper that inspects guest IDs and directs them to specific office floors and rooms depending on the floor directory.',
    description: 'An EKS Ingress Controller manages external access to services in a Kubernetes cluster, typically routing HTTP/HTTPS traffic to backend pods by deploying AWS Application Load Balancers.',
    mermaid: `graph LR
    Client[External Client] -->|HTTP Request| ALB[Application Load Balancer]
    ALB -->|Ingress Controller Rule| Pod1[App Pod A: Path /api]
    ALB -->|Ingress Controller Rule| Pod2[App Pod B: Path /web]`,
    comparison: `| Controller Type | AWS Load Balancer Controller | NGINX Ingress Controller |
| :--- | :--- | :--- |
| **AWS Integration** | Directly provisions ALB/NLB instances | Provisions NLB to route to backend NGINX pods |
| **Routing Engine** | AWS ALB routing engine | In-cluster NGINX proxy container |
| **Pricing** | Standard ALB pricing per LCU | Compute node costs + NLB pricing |`,
    performance: 'ALB Target Group binding can target pods directly using their IP addresses, bypassing NodePort hopping overhead for faster latency.',
    cost: 'Billed based on standard AWS Application Load Balancer LCU usage and active instances.',
    security: 'Supports ACM SSL/TLS termination at the load balancer level, and integrates with AWS WAF for Layer 7 web security filters.',
    tips: 'Use the AWS Load Balancer Controller to dynamically provision ALBs from Kubernetes ingress resource YAML specifications.',
    traps: 'Ensure target subnets are tagged correctly (`kubernetes.io/role/elb` for public, `internal-elb` for private) or the controller will fail to provision.',
    clues: 'ingress controller, aws load balancer controller, alb target group binding, subnet tagging ELB'
  },

  // ==========================================
  // STORAGE (8 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Storage/efs-performance-modes.md',
    title: 'EFS Performance & Throughput Modes',
    category: 'Storage',
    analogy: 'A library check-out system: General Purpose is a fast desk for standard student requests; Max I/O is a distributed multi-lane gate that handles massive lines of visitors but takes slightly longer to process each ticket.',
    description: 'Amazon EFS provides elastic, shared file storage. It offers two performance modes: General Purpose (lowest latency) and Max I/O (highest scale). It also offers three throughput modes: Elastic (pay-per-use scaling), Provisioned, and Bursting.',
    mermaid: `graph TD
    Client1[EC2 Server A] -->|Shared File System| EFS[Amazon EFS File System]
    Client2[EC2 Server B] -->|Shared File System| EFS
    EFS -->|Dynamic Scaling| ElasticThroughput[Elastic Throughput Mode]`,
    comparison: `| Feature | General Purpose | Max I/O |
| :--- | :--- | :--- |
| **Primary Use Case** | Web servers, CI/CD, standard app directories | Large-scale parallel processing (Big Data, analytics) |
| **IOPS limit** | 35,000 IOPS | Unlimited scale-out IOPS |
| **File Latency** | Low latency | Higher file operation latency |`,
    performance: 'Use Elastic Throughput mode to automatically scale throughput capacity to meet peaks up to 3 GiB/s, ideal for unpredictable workloads.',
    cost: 'Elastic Throughput is billed per GB read/written. Provisioned is charged per MB/s provisioned. Use Lifecycle Management to transition cold files to EFS Infrequent Access (IA) to save up to 92%.',
    security: 'Encrypt data in transit using TLS, and encrypt data at rest via KMS CMK. Enforce file access using IAM authorization policies.',
    tips: 'Choose General Purpose performance mode for almost all architectures unless you actively hit the 35k IOPS ceiling.',
    traps: 'EFS does not support Windows hosts natively over SMB; EFS is strictly optimized for Linux client mounts over NFSv4.',
    clues: 'efs performance, general purpose latency, max i/o scale, provisioned throughput, elastic throughput, lifecycle management'
  },
  {
    path: 'docs/02-solutions-architect-professional/Storage/fsx-windows.md',
    title: 'FSx for Windows File Server',
    category: 'Storage',
    analogy: 'A shared server storage folder in a legacy Windows enterprise office: all employees log in using Windows Active Directory accounts and share files over standard SMB folders.',
    description: 'Amazon FSx for Windows File Server provides fully managed, highly reliable shared file storage built on Windows Server, fully compatible with the SMB protocol and Microsoft Active Directory.',
    mermaid: `graph LR
    Windows[Windows EC2 / On-Premise Host] -->|SMB Mount| FSx[FSx Windows File System]
    FSx <-->|Authorize Access| AD[Active Directory / AWS Managed AD]`,
    comparison: `| Metric | FSx for Windows | Amazon EFS |
| :--- | :--- | :--- |
| **Protocol** | SMB (Server Message Block) | NFS (Network File System) |
| **Target Clients** | Windows, Windows Server | Linux |
| **AD Integration** | Native integration (ACLs) | IAM-based file permissions |`,
    performance: 'Supports SSD storage for sub-millisecond latencies and HDD storage for cost-effective backups. Throughput can scale to 2 GB/s.',
    cost: 'Billed per GB/month of storage capacity and per MB/s of throughput capacity. Multi-AZ configurations double capacity costs.',
    security: 'Integrates natively with Windows ACLs (Access Control Lists) for file-level permissions, and encrypts all data in transit using SMB encryption.',
    tips: 'Use FSx for Windows to migrate legacy enterprise applications (e.g. IIS web farms, SQL Server clusters) without changing file systems.',
    traps: 'Do not use single-AZ deployments for production; always use Multi-AZ to ensure automatic failover and data replication across availability zones.',
    clues: 'fsx for windows, active directory integration, smb protocol, windows acl, multi-az windows'
  },
  {
    path: 'docs/02-solutions-architect-professional/Storage/fsx-lustre.md',
    title: 'FSx for Lustre',
    category: 'Storage',
    analogy: 'A super-fast, high-octane conveyor belt that loads data from S3 storage directly into high-powered processing engines (GPUs) for massive compute jobs, then puts results back.',
    description: 'Amazon FSx for Lustre is a fully managed, high-performance file system optimized for compute-intensive workloads, such as machine learning, high-performance computing (HPC), and video processing.',
    mermaid: `graph LR
    S3[Amazon S3 Bucket] <-->|Automatic Sync| FSx[FSx for Lustre File System]
    FSx <-->|Direct Mount| HPC[HPC Compute Nodes / SageMaker]`,
    comparison: `| Feature | Scratch Deployment | Persistent Deployment |
| :--- | :--- | :--- |
| **Data Durability** | Non-replicated (temporary storage) | Replicated across AZ (long-term) |
| **Cost** | Extremely low cost | Higher, covers replica overhead |
| **Primary Use Case** | Short analysis runs | Long-term modeling runs |`,
    performance: 'Delivers sub-millisecond latencies and throughput of hundreds of gigabytes per second, with millions of IOPS scaling dynamically.',
    cost: 'Scratch deployment is highly cost-effective for transient workloads. Set up automatic sync with S3 to minimize runtime disk usage.',
    security: 'Fully integrated with AWS Key Management Service (KMS) for data encryption at rest, and respects VPC network route tables.',
    tips: 'Use FSx for Lustre to load S3 dataset files into a high-speed file system, run GPU computing, and output logs back to S3.',
    traps: 'Do not use Scratch storage for persistent, long-lived data storage, as hardware failures in scratch storage will result in unrecoverable data loss.',
    clues: 'fsx for lustre, scratch vs persistent, high performance computing, s3 sync integration, hpc files'
  },
  {
    path: 'docs/02-solutions-architect-professional/Storage/fsx-ontap.md',
    title: 'FSx for NetApp ONTAP',
    category: 'Storage',
    analogy: 'A luxury multi-tool Swiss Army knife: it supports Windows folders (SMB), Linux folders (NFS), and raw database disks (iSCSI) all in one file system with advanced space-saving tech.',
    description: 'Amazon FSx for NetApp ONTAP is a fully managed service that provides popular NetApp ONTAP storage features, including multiprotocol access, snapshots, and data compression/deduplication.',
    mermaid: `graph TD
    Client[Multi-Protocol Client] -->|NFS / SMB / iSCSI| ONTAP[FSx for NetApp ONTAP]
    ONTAP -->|Primary Storage| SSDTier[SSD Storage Tier]
    ONTAP -->|Cold Data| CapacityTier[Capacity Storage Tier - Low Cost]`,
    comparison: `| Protocol | FSx ONTAP | Amazon EFS |
| :--- | :--- | :--- |
| **Multi-protocol** | Yes (NFS, SMB, iSCSI simultaneously) | No (NFS only) |
| **Data Compression**| Yes (deduplication/compression) | No |
| **Tiering** | Auto tiering (SSD to Capacity) | IA lifecycle tiering |`,
    performance: 'Uses SSD storage for performance-critical data, automatically tiering cold data to a capacity tier to save storage capacity.',
    cost: 'Data compression and deduplication features can reduce net storage usage by up to 50% to optimize monthly spend.',
    security: 'Supports SVM (Storage Virtual Machines) configuration, active directory integration, and VPC security groups.',
    tips: 'Use FSx for NetApp ONTAP to migrate on-premises NetApp workloads to AWS without rewriting storage controller integration scripts.',
    traps: 'Multiprotocol access requires careful management of user mappings between Active Directory and UNIX permissions.',
    clues: 'fsx for netapp ontap, iscsi protocol, deduplication, compression, svm, multiprotocol storage'
  },
  {
    path: 'docs/02-solutions-architect-professional/Storage/fsx-openzfs.md',
    title: 'FSx for OpenZFS',
    category: 'Storage',
    analogy: 'A high-speed drag racer: built on the open-source OpenZFS system to provide ultra-high IOPS and throughput with microsecond latency for Linux systems.',
    description: 'Amazon FSx for OpenZFS provides fully managed shared file storage built on the OpenZFS file system. It is designed to deliver high throughput and low latencies for Linux clients.',
    mermaid: `graph LR
    Linux[Linux Workstation] -->|NFS Mount| ZFS[FSx for OpenZFS]
    ZFS -->|Snapshots| Backup[S3 Backups]`,
    comparison: `| Metric | Custom OpenZFS | Amazon EFS |
| :--- | :--- | :--- |
| **Latency** | Microsecond latency (&lt;1ms) | Millisecond latency (~1-3ms) |
| **File system** | OpenZFS | Standard NFSv4 |
| **Throughput** | Up to 12.5 GB/s | Up to 3 GiB/s |`,
    performance: 'Delivers up to 1 million IOPS and high throughput rates, making it suitable for media editing and high-speed financial modeling.',
    cost: 'Supports ZFS data compression, which dynamically reduces data footprint to optimize billing charges.',
    security: 'Encrypts all data at rest via KMS customer managed keys, and supports security groups for VPC network control.',
    tips: 'Use FSx for OpenZFS when you need higher performance scaling than standard EFS can provide for Linux-heavy application pools.',
    traps: 'OpenZFS does not support Windows Active Directory security boundaries natively; access is managed via NFS permissions.',
    clues: 'fsx for openzfs, microsecond latency, nfs file system, zfs compression, linux shared files'
  },
  {
    path: 'docs/02-solutions-architect-professional/Storage/Backup & Disaster Recovery/AWS Storage Gateway.md', isDetailed: true,
    title: 'AWS Storage Gateway',
    category: 'Storage',
    analogy: 'A hybrid file cabinet: you keep the most frequently used folders on a small shelf in your local office (Local Cache) while archiving the massive vault of files in a secure cloud storage system.',
    description: 'AWS Storage Gateway is a hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. It provides three primary configurations: File Gateway, Volume Gateway, and Tape Gateway.',
    mermaid: `graph TD
    Local[On-Premises Application] -->|NFS / SMB / iSCSI| SG[Storage Gateway VM]
    SG -->|Local Cache| Cache[Local VM Cache Disk]
    SG -->|Private Link / HTTPS| S3[Amazon S3 / Glacier]`,
    comparison: `| Gateway Type | Target Interface | Cloud Storage Backend | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **File Gateway (S3/FSx)** | NFS / SMB | S3 Buckets / FSx | Native file access in S3 |
| **Volume Gateway** | iSCSI | S3 block volumes (Cached/Stored) | Virtual disk backup / disaster recovery |
| **Tape Gateway** | iSCSI VTL (Virtual Tape Library) | Glacier / Glacier Deep Archive | Legacy backup tape replacement |`,
    performance: 'Features a local cache storage disk to provide low-latency, LAN-speed access to frequently requested files.',
    cost: 'Billed based on storage capacity consumed in AWS, data retrieval charges, and flat VM fees.',
    security: 'Supports KMS encryption at rest, secure SSL/TLS channels for data transit, and IAM resource policies.',
    tips: 'Use Storage Gateway to bridge legacy on-premises applications to AWS storage services without modifying application logic.',
    traps: 'File Gateway maintains a cache; modifications to S3 files directly from the cloud may not reflect locally without a `RefreshCache` API call.',
    clues: 'storage gateway, file gateway, volume gateway, tape gateway, vtl, local cache, iscsi'
  },
  {
    path: 'docs/02-solutions-architect-professional/Migration & Transfer/Migration Tools/AWS DataSync.md', isDetailed: true,
    title: 'AWS DataSync',
    category: 'Storage',
    analogy: 'A high-speed, military-grade moving truck company: it packs your local files, validates their integrity using checklists, encrypts them, and drives them to the cloud at maximum speed over dedicated routes.',
    description: 'AWS DataSync is an online data transfer service that simplifies, automates, and accelerates moving data between on-premises storage systems and AWS storage services.',
    mermaid: `graph LR
    Local[On-Premises NFS/SMB] -->|DataSync Agent| Agent[Local DataSync Agent]
    Agent -->|TLS Tunnel| Service[AWS DataSync Service]
    Service -->|Write| Target[S3 / EFS / FSx]`,
    comparison: `| Migration Tool | AWS DataSync | AWS Storage Gateway |
| :--- | :--- | :--- |
| **Primary Goal** | One-time or recurring batch migrations | Persistent hybrid storage bridge |
| **Execution** | Active batch agent execution | Persistent mounting VM |
| **Throughput** | Optimized for high-throughput batching | Optimized for low-latency local reads |`,
    performance: 'Accelerates data transfer speeds up to 10x faster than standard open-source tools by using custom protocol optimizations.',
    cost: 'Billed flat rate per GB transferred. Highly cost-effective compared to custom-managed tools.',
    security: 'Performs automatic data integrity validation during transit, and encrypts all data with TLS and KMS.',
    tips: 'Use AWS DataSync for migrations, disaster recovery data syncs, and large analytics ingestion pipelines.',
    traps: 'DataSync requires installing an agent VM on-premises; ensure network firewall rules allow port 443 communications.',
    clues: 'datasync, datasync agent, data migration, data verification, automated sync schedule'
  },
  {
    path: 'docs/02-solutions-architect-professional/Migration & Transfer/File Transfer/AWS Transfer Family.md', isDetailed: true,
    title: 'AWS Transfer Family',
    category: 'Storage',
    analogy: 'An API translation layer that lets external partners upload legacy files using traditional routes (SFTP/FTP) directly into a modern data lake storage bucket (S3).',
    description: 'AWS Transfer Family provides fully managed support for file transfers directly into and out of Amazon S3 or Amazon EFS. It supports SFTP, FTPS, and FTP.',
    mermaid: `graph LR
    Partner[External Client] -->|SFTP / FTPS| TF[AWS Transfer Family Endpoint]
    TF -->|Direct Write| S3[Amazon S3 Bucket]
    TF <-->|Authenticate| Identity[IAM / Cognito / API Gateway Custom Auth]`,
    comparison: `| Protocol | Security | Authentication Methods |
| :--- | :--- | :--- |
| **SFTP** | High (SSH File Transfer) | SSH keys / Password |
| **FTPS** | High (FTP over SSL) | Username / Password + Certificate |
| **FTP** | Low (Plaintext) | VPC-Internal only |`,
    performance: 'Automatically scales to support thousands of concurrent client connections with high throughput.',
    cost: 'Charged per hour the server endpoint is active, plus data transfer charges per GB.',
    security: 'Use custom API Gateway integrations to route authentication calls to external active directory systems.',
    tips: 'Look for managed SFTP interfaces storing files directly in Amazon S3 for external business partner file integrations.',
    traps: 'Ensure to associate elastic IP addresses with your Transfer Family endpoints to prevent partner firewall route breakages.',
    clues: 'transfer family, sftp, ftps, ftp server, custom identity provider auth, partner upload'
  },

  // ==========================================
  // DATABASES (9 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Database/aurora-serverless.md',
    title: 'Amazon Aurora Serverless v2',
    category: 'Databases',
    analogy: 'An accordion database: it expands its size and compute resources instantly during rush hour scaling, then contracts to a single core at night to save resources.',
    description: 'Amazon Aurora Serverless v2 is an on-demand, auto-scaling configuration for Amazon Aurora. It automatically starts up, shuts down, and scales capacity up or down based on your application needs.',
    mermaid: `graph TD
    Client[Application Client] --> Proxy[Aurora Request Router]
    Proxy -->|Compute Scaling| DB[Aurora Serverless DB Node: 0.5 to 128 ACUs]
    DB -->|Shared Storage Plane| Storage[Aurora Shared Storage Cluster]`,
    comparison: `| Provisioning Mode | Aurora Serverless v2 | Aurora Provisioned |
| :--- | :--- | :--- |
| **Scaling latency** | Sub-second scaling (Instant) | Minutes (Requires launching new VM node) |
| **Billing Increment**| Per Aurora Capacity Unit (ACU) per second | Fixed hourly rate per instance size |
| **Management** | Zero server sizing management | Manual instance scaling and DB replicas |`,
    performance: 'Scales database capacity in fractions of a second without service interruptions or connection drops.',
    cost: 'Charged per ACU-hour. Set minimum and maximum capacity ranges to prevent budget overruns.',
    security: 'Supports standard IAM database authentication, KMS encryption at rest, and VPC subnet security groups.',
    tips: 'Use Aurora Serverless v2 for workloads with unpredictable or variable traffic peaks to ensure performance scaling.',
    traps: 'Unlike v1, Serverless v2 does not scale down to 0 ACUs. The minimum capacity is typically 0.5 ACUs, so it is not completely free when idle.',
    clues: 'aurora serverless v2, acu capacity, sub-second scale, variable workload db, auto-scaling database'
  },
  {
    path: 'docs/02-solutions-architect-professional/Database/aurora-cloning.md',
    title: 'Amazon Aurora Fast Database Cloning',
    category: 'Databases',
    analogy: 'Creating a reference link to a book chapter: you read the pages instantly without buying a new copy, and only pay for a new page if you scribble notes on it (Copy-on-Write).',
    description: 'Amazon Aurora Fast Database Cloning creates a new clone of an Aurora database cluster. It uses a Copy-on-Write protocol, meaning it shares the storage blocks of the original database until changes are made.',
    mermaid: `graph TD
    SourceDB[Source Aurora Cluster] -->|Shares Storage Blocks| CloneDB[Cloned Aurora Cluster]
    CloneDB -->|New Writes Only| Alloc[New Allocated Storage Blocks]`,
    comparison: `| Metric | Fast Database Cloning | Standard Snapshot Restore |
| :--- | :--- | :--- |
| **Creation Speed** | Instant (seconds) | Hours (depends on database size) |
| **Storage Cost** | Zero initially (only pay for changes) | Full database storage size cost |
| **Impact on Source** | None | I/O degradation during snapshot generation |`,
    performance: 'Clones are created in seconds regardless of the multi-terabyte size of the database, with zero impact on production performance.',
    cost: 'Saves storage costs by using shared pointer blocks, charging only for modified data blocks.',
    security: 'Clones can be created across accounts within the same AWS Organization using resource permissions.',
    tips: 'Use database cloning to spin up isolated test environments with real production data sizes instantly.',
    traps: 'You cannot clone database clusters across different AWS regions; cloning is restricted to within the same region.',
    clues: 'aurora database clone, fast cloning, copy-on-write database, test database refresh'
  },
  {
    path: 'docs/02-solutions-architect-professional/Database/aurora-backtracking.md',
    title: 'Amazon Aurora Backtracking',
    category: 'Databases',
    analogy: 'An "Undo" (Ctrl+Z) button for database transactions: if an engineer runs a bad script and corrupts data, you rewind the entire database to the exact second before the mistake occurred.',
    description: 'Amazon Aurora Backtracking allows you to rewind an Aurora DB cluster to a specific point in time without restoring data from backups. It record changes as a continuous log stream.',
    mermaid: `graph LR
    Now[Current Time: 10:05 AM] -->|Rewind Log stream| Target[Target Time: 10:01 AM - Pre-Mistake]
    Target -->|Resume Writes| NewWrites[New Log State]`,
    comparison: `| Feature | Backtrack | Point-in-Time Restore (PITR) |
| :--- | :--- | :--- |
| **Duration** | Seconds to minutes | Hours (provisions new DB cluster) |
| **Target DB** | Same cluster (rewound in-place) | New database cluster instance |
| **State Loss** | Discards transactions after target time | Preserves source cluster state intact |`,
    performance: 'In-place rewinds occur within minutes, minimizing recovery time objectives (RTO) during operational emergencies.',
    cost: 'Billed based on the volume of backtrack change logs stored for the defined backtrack window.',
    security: 'KMS customer managed keys encrypt the backtrack change logs, maintaining encryption compliance.',
    tips: 'Use backtrack to quickly recover from destructive database script deployments or user entry errors.',
    traps: 'Backtracking must be enabled at database creation; you cannot enable backtracking on an existing database cluster.',
    clues: 'aurora backtrack, rewind database in-place, rto optimization database, ctrl-z db execution'
  },
  {
    path: 'docs/02-solutions-architect-professional/Database/rds-proxy.md',
    title: 'Amazon RDS Proxy',
    category: 'Databases',
    analogy: 'A professional bouncer at a busy club who manages the queue: instead of letting 1,000 visitors (Lambda connections) crowd the bar, they route traffic through a pool of 50 active channels.',
    description: 'Amazon RDS Proxy is a fully managed, highly available database proxy for Amazon RDS that makes applications more scalable, resilient to database failures, and secure.',
    mermaid: `graph LR
    Lambda[1000+ Scaled Lambda Pods] -->|Dynamic Scale| Proxy[RDS Proxy]
    Proxy -->|Connection Pooling| RDS[RDS Database Host]`,
    comparison: `| Feature | RDS Proxy | Direct Connection |
| :--- | :--- | :--- |
| **Connection Limits** | Scales to thousands | Restricted by DB memory (max_connections) |
| **Failover Speed** | Up to 66% faster (Maintains proxy sessions) | Requires client DNS resolution lookup |
| **Authentication** | IAM database credentials to Proxy | Plaintext credentials to RDS |`,
    performance: 'Reduces database memory and CPU consumption by pooling and sharing database connections.',
    cost: 'Billed per vCPU hour of the underlying database instances. Highly cost-effective compared to sizing up DB instances for connections.',
    security: 'Enforces IAM authentication to the proxy, retrieving DB passwords securely from AWS Secrets Manager.',
    tips: 'Use RDS Proxy in serverless architectures where scaled Lambda functions trigger database connection limits.',
    traps: 'RDS Proxy introduces database connection pinning if you use prepared statements; ensure applications release connections correctly.',
    clues: 'rds proxy, database connection pooling, lambda database connections, connection pinning'
  },
  {
    path: 'docs/02-solutions-architect-professional/Database/dax.md',
    title: 'Amazon DynamoDB Accelerator (DAX)',
    category: 'Databases',
    analogy: 'A convenience store rack right at the checkout counter: instead of walking down the aisles of the warehouse (DynamoDB query), you grab the soda immediately from the cache.',
    description: 'Amazon DynamoDB Accelerator (DAX) is a fully managed, highly available, in-memory cache for Amazon DynamoDB that delivers up to a 10x performance improvement.',
    mermaid: `graph LR
    Client[Application Client] -->|API Request| DAX[DAX In-Memory Cache]
    DAX -->|Cache Miss| DynamoDB[DynamoDB Table]`,
    comparison: `| Metric | DAX Cache | DynamoDB read |
| :--- | :--- | :--- |
| **Latency** | Microsecond reads (&lt;1ms) | Single-digit millisecond reads (~2-5ms) |
| **API compatibility**| Fully API compatible (Drop-in SDK) | Native DynamoDB API |
| **Pricing Model** | Provisioned cache instance sizes | Pay-per-read RCU capacity units |`,
    performance: 'Reduces read latency to microseconds for read-heavy workloads, freeing up DynamoDB tables from read load.',
    cost: 'Billed per hour per node in the DAX cluster. Saves DynamoDB RCU costs by intercepting read hot spots.',
    security: 'Integrates with KMS for cache data encryption at rest, and manages access via IAM role boundaries.',
    tips: 'Use DAX for read-heavy workloads with high hotkey distributions (e.g. popular products in e-commerce).',
    traps: 'DAX is not recommended for write-heavy applications, as cache updates introduce consistency checks and processing overhead.',
    clues: 'dax cluster, dynamodb accelerator, microsecond database reads, read hot spots'
  },
  {
    path: 'docs/02-solutions-architect-professional/Database/Specialized & In-Memory/Amazon Neptune.md', isDetailed: true,
    title: 'Amazon Neptune',
    category: 'Databases',
    analogy: 'A family tree chart: instead of searching tables to find who is married to whom (complex SQL joins), you follow the lines (vertices and edges) directly on the paper.',
    description: 'Amazon Neptune is a fast, reliable, fully managed graph database service optimized for storing and querying highly connected datasets.',
    mermaid: `graph LR
    NodeA[User Node: Alice] -->|Edge: FRIEND_OF| NodeB[User Node: Bob]
    NodeB -->|Edge: FOLLOWS| NodeC[User Node: Charlie]`,
    comparison: `| Parameter | Amazon Neptune (Graph) | Relational RDS (SQL) |
| :--- | :--- | :--- |
| **Data Relationship** | First-class entities (Edges/Nodes) | Linked tables (Foreign key joins) |
| **Query Language** | Gremlin, SPARQL | SQL |
| **Typical Use Case** | Fraud detection, social graphs, identity | Transaction processing (ERP, billing) |`,
    performance: 'Executes complex relationship queries with millisecond latencies, even across datasets of billions of connections.',
    cost: 'Billed based on Neptune instance hours, storage volume, and database I/O operations.',
    security: 'Requires HTTPS connections, supports IAM database authentication, and encrypts data at rest using KMS.',
    tips: 'Look for graph databases, social network relationships, fraud pattern detection, or network topology maps in the exam.',
    traps: 'Neptune is not a general-purpose transactional database; do not use it for standard document or relational workloads.',
    clues: 'neptune, graph database, gremlin sparql, social network graph, relationship mapping'
  },
  {
    path: 'docs/02-solutions-architect-professional/Database/NoSQL Databases/Amazon DocumentDB.md', isDetailed: true,
    title: 'Amazon DocumentDB',
    category: 'Databases',
    analogy: 'Storing document files in a digital filing cabinet where each folder contains a complete profile page (JSON document) instead of indexing them across different databases.',
    description: 'Amazon DocumentDB (with MongoDB compatibility) is a fast, scalable, highly durable, and fully managed document database service designed to run MongoDB workloads.',
    mermaid: `graph TD
    Client[MongoDB Application] -->|JSON Protocol| DocDB[Amazon DocumentDB Cluster]
    DocDB -->|Shared Storage Plane| Storage[DocumentDB Storage Cluster]`,
    comparison: `| Feature | Amazon DocumentDB | Self-Hosted MongoDB on EC2 |
| :--- | :--- | :--- |
| **Scaling** | Instantly scales compute and storage | Requires manual sharding setups |
| **Durability** | Replication across 3 AZs | Manual replica sets configuration |
| **Management** | Fully managed by AWS | Customer administration required |`,
    performance: 'Provides low-latency document reads and writes, scaling write capacities dynamically up to millions of requests.',
    cost: 'Billed per document instance size, per GB stored, and per database I/O operation.',
    security: 'Secured via standard VPC access control, AWS KMS database encryption, and TLS connection configurations.',
    tips: 'Use DocumentDB when migrating existing MongoDB workloads to AWS to reduce administrative overhead.',
    traps: 'DocumentDB is not fully compliant with every MongoDB version feature; check API compatibility matrix before migration.',
    clues: 'documentdb, mongodb compatibility, json document database, document query schema'
  },
  {
    path: 'docs/02-solutions-architect-professional/Database/Specialized & In-Memory/Amazon Timestream.md', isDetailed: true,
    title: 'Amazon Timestream',
    category: 'Databases',
    analogy: 'A medical monitor chart logging heartbeat data over time: you record millions of ticks a day, query them chronologically, and throw out old charts after 30 days.',
    description: 'Amazon Timestream is a fast, scalable, and serverless time-series database service for IoT and operational applications, designed to store and analyze trillions of events per day.',
    mermaid: `graph TD
    IoT[IoT Device Sensors] -->|Time-series events| TS[Amazon Timestream]
    TS -->|Memory Store| Memory[Recent Logs - Fast Queries]
    TS -->|Magnetic Store| Disk[Cold Historical Data]`,
    comparison: `| Parameter | Timestream | Relational DB (RDS) |
| :--- | :--- | :--- |
| **Data Order** | Time-series sequences | Any relational sequence |
| **Scaling** | Serverless automatic scale | Manual cluster partitioning |
| **Retention** | Auto data tiering | Manual pruning scripts |`,
    performance: 'Features a dual-tier storage system (in-memory and magnetic store) to optimize query speeds for recent and historical data.',
    cost: 'Charged based on query data scanned and total volume of data stored in memory and disk tiers.',
    security: 'Enforces encryption at rest and in transit via KMS, and manages user access via IAM policies.',
    tips: 'Use Timestream for IoT telemetry logs, clickstream sequences, server performance metrics, or financial tick data.',
    traps: 'Timestream data is append-only; it does not support updating historical records in-place.',
    clues: 'timestream, time-series database, iot telemetry, magnetic storage tier, append-only records'
  },
  {
    path: 'docs/02-solutions-architect-professional/Database/memorydb.md',
    title: 'Amazon MemoryDB for Redis',
    category: 'Databases',
    analogy: 'A cash register drawer that keeps transactions in immediate memory (Redis cache speed) but write-protects them on a receipt roll (Multi-AZ transaction log) before dispensing change.',
    description: 'Amazon MemoryDB for Redis is a Redis-compatible, durable, in-memory database service that delivers ultra-fast performance with high durability.',
    mermaid: `graph LR
    App[Application client] -->|Redis API| MemoryDB[MemoryDB Cluster]
    MemoryDB -->|Durable Write| Log[Multi-AZ Transaction Log]`,
    comparison: `| Feature | MemoryDB for Redis | ElastiCache for Redis |
| :--- | :--- | :--- |
| **Primary Goal** | Primary Database (In-memory + Durable) | Caching layer (Non-durable, ephemeral) |
| **Data Durability** | Yes (Writes committed to log) | No (Data can be lost on node crash) |
| **Read Latency** | Microseconds | Microseconds |`,
    performance: 'Combines microsecond read latencies and single-digit millisecond write latencies with multi-AZ transaction logging.',
    cost: 'Billed based on database node size, transaction log volume, and total storage size.',
    security: 'Supports Redis ACL access control, KMS encryption at rest, and TLS client connections.',
    tips: 'Choose MemoryDB when you need a fast in-memory Redis database that cannot afford data loss during node restarts.',
    traps: 'MemoryDB is more expensive than ElastiCache due to transaction durability; do not use it as a simple cache.',
    clues: 'memorydb, redis database, in-memory database, durable transaction log Redis'
  },

  // ==========================================
  // NETWORKING (8 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Networking & Content Delivery/Hybrid Connectivity/AWS PrivateLink.md', isDetailed: true,
    title: 'AWS PrivateLink',
    category: 'Networking',
    analogy: 'A secure, private underground tunnel connecting a customer room directly to a partner building next door, bypassing the public street entirely.',
    description: 'AWS PrivateLink provides private connectivity between VPCs, AWS services, and on-premises networks, without exposing traffic to the public internet.',
    mermaid: `graph LR
    subgraph Customer VPC
      App[App Instance] -->|VPC Endpoint Interface| ENI[Elastic Network Interface]
    end
    subgraph Provider VPC
      NLB[Network Load Balancer] --> Service[SaaS Database Service]
    end
    ENI <-->|AWS PrivateLink backbone| NLB`,
    comparison: `| Metric | VPC Peering | AWS PrivateLink |
| :--- | :--- | :--- |
| **Network Path** | Connects entire VPC subnets | Connects specific service interface endpoint |
| **IP Overlaps?** | No (Fails if CIDRs overlap) | Yes (Allowed since routing is interface-based) |
| **Security Scope** | Full IP routing allowed | Restricted to designated service port |`,
    performance: 'Direct connection over the AWS private fiber network ensures low network jitter and low latencies.',
    cost: 'Billed per hour per VPC endpoint interface configured, plus data processing fees per GB.',
    security: 'Secures VPC service connections by eliminating internet-facing routes, gateways, and public IPs.',
    tips: 'Use PrivateLink to connect services to SaaS partners with overlapping IP ranges, avoiding routing updates.',
    traps: 'PrivateLink is uni-directional; only the consumer can initiate connections to the provider service.',
    clues: 'privatelink, vpc endpoint, interface endpoint, overlapping cidr, private connectivity saas'
  },
  {
    path: 'docs/02-solutions-architect-professional/Networking & Content Delivery/vpc-lattice.md',
    title: 'Amazon VPC Lattice',
    category: 'Networking',
    analogy: 'An airport transit terminal that connects all gates (services) using a standardized shuttle line, regardless of which airline (VPC/Account) they run on.',
    description: 'Amazon VPC Lattice is a fully managed application networking service that makes it easy to connect, secure, and monitor microservices across multiple VPCs and AWS accounts.',
    mermaid: `graph TD
    subgraph Lattice Service Network [Lattice Service Network]
      ServiceA[Payment Service VPC 1]
      ServiceB[Delivery Service VPC 2]
    end
    Client[API Client VPC 3] -->|Connect via Lattice| LatticeServiceNetwork`,
    comparison: `| Feature | VPC Lattice | Transit Gateway | VPC Peering |
| :--- | :--- | :--- | :--- |
| **Layer** | Layer 7 (HTTP/HTTPS/gRPC) | Layer 3 (IP Routing) | Layer 3 (IP Routing) |
| **Setup** | Service-directory association | Complex route table mappings | Pairwise subnet peering |
| **Overlap CIDR**| Allowed | Blocked | Blocked |`,
    performance: 'Integrates with AWS network routing, managing traffic routing at the API level with minimal latency overhead.',
    cost: 'Billed per service configured, plus data processing fees and connection logs usage.',
    security: 'Supports fine-grained Auth policies (AWS IAM auth, SigV4 authorization) and integrates with AWS Secrets Manager.',
    tips: 'Use VPC Lattice to connect multi-account container microservices without managing complex IP routing matrices.',
    traps: 'VPC Lattice only supports HTTP, HTTPS, and gRPC. It cannot route raw TCP/UDP workloads like databases.',
    clues: 'vpc lattice, service network, application networking, http grpc routing, sigv4 authentication'
  },
  {
    path: 'docs/02-solutions-architect-professional/Networking & Content Delivery/gateway-load-balancer.md',
    title: 'Gateway Load Balancer',
    category: 'Networking',
    analogy: 'A security screening line at the airport: all baggage (network packets) is diverted to a team of inspectors (firewalls) before being returned to the original conveyor belt.',
    description: 'AWS Gateway Load Balancer (GWLB) makes it easy to deploy, scale, and manage virtual network appliances, such as firewalls, intrusion detection systems (IDS), and deep packet inspection systems.',
    mermaid: `graph LR
    Client[External Client] -->|VPC Route| GWLBE[GWLB Endpoint]
    GWLBE -->|GENEVE Encapsulation| GWLB[Gateway Load Balancer]
    GWLB -->|Inspect| FW[Firewall Appliance EC2]
    FW -->|Clean Packet| GWLBE
    GWLBE --> Target[Target Web Server]`,
    comparison: `| Load Balancer | Network Load Balancer (NLB) | Gateway Load Balancer (GWLB) |
| :--- | :--- | :--- |
| **Protocol** | Layer 4 TCP/UDP | Layer 3 IP packets (using GENEVE encapsulation) |
| **Target Workload** | High-throughput backend databases/web servers | Security inspection firewalls and IDS appliances |`,
    performance: 'Uses GENEVE encapsulation to maintain source IP and destination IP headers during firewall routing loops.',
    cost: 'Billed per Gateway Load Balancer instance hour and LCU data processing usage.',
    security: 'Ensures centralized, inline inspection of all inbound and outbound traffic paths across accounts.',
    tips: 'Look for GWLB in architectures requiring transparent third-party firewall inspection zones (bump-in-the-wire design).',
    traps: 'Verify that virtual security appliances are configured to decapsulate GENEVE packets on port 6081.',
    clues: 'gateway load balancer, gwlb, geneve encapsulation, port 6081, virtual appliance, bump-in-the-wire'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/Network Security/AWS Network Firewall.md', isDetailed: true,
    title: 'AWS Network Firewall',
    category: 'Networking',
    analogy: 'A state border checkpoint checking every truck: it inspects license plates (IPs), checks the manifesting labels (domain names), and looks inside the trailers (deep packet inspection).',
    description: 'AWS Network Firewall is a managed service that provides customizable network protections for your VPCs, including stateful inspection, intrusion prevention, and web filtering.',
    mermaid: `graph LR
    IGW[Internet Gateway] -->|Route Table Redirect| FW[AWS Network Firewall Endpoint]
    FW -->|Passes Rule Checks| Web[Web App Subnet]`,
    comparison: `| Protection Layer | AWS Network Firewall | Security Groups | WAF |
| :--- | :--- | :--- | :--- |
| **Network Layer** | Layer 3-7 (Full Packet) | Layer 3-4 (IP/Port) | Layer 7 (HTTP only) |
| **Stateful?** | Yes | Yes | Yes |
| **Rule engine** | Suricata rule sets compatible | Allow-rules only | Web ACL rules |`,
    performance: 'Uses AWS Hyperplane technology to scale capacity to meet traffic throughput demands without latency drops.',
    cost: 'Billed per firewall endpoint hour, plus data processing fees. Optimize costs by centralizing endpoints in a transit VPC.',
    security: 'Enforces custom Suricata rules to block outbound traffic to untrusted domains (domain filtering).',
    tips: 'Use AWS Network Firewall to replace third-party firewall appliances, reducing software license and server management overhead.',
    traps: 'Ensure routing tables are updated to direct traffic through the firewall endpoint before it hits the internet gateway.',
    clues: 'aws network firewall, suricata rules, stateful inspection, packet filtering, route redirection'
  },
  {
    path: 'docs/02-solutions-architect-professional/Networking & Content Delivery/cloud-wan.md',
    title: 'AWS Cloud WAN',
    category: 'Networking',
    analogy: 'A centralized corporate railway network management system: you define a single layout schema policy, and new train tracks (VPCs/on-premise routes) automatically register and peer.',
    description: 'AWS Cloud WAN is a managed wide area network (WAN) service that connects on-premises branch offices, data centers, and VPCs across the AWS global infrastructure.',
    mermaid: `graph TD
    subgraph Global Network [AWS Cloud WAN Global Network]
      Policy[Central Core Network Policy]
      HubUS[US Core Hub] <--> HubEU[EU Core Hub]
    end
    VPCUS[US VPC] --> HubUS
    VPCEU[Europe VPC] --> HubEU`,
    comparison: `| Metric | AWS Cloud WAN | Transit Gateway Peering |
| :--- | :--- | :--- |
| **Routing Management** | Centralized Policy-Based | Manual, decentralized route table entries |
| **Global Reach** | Native multi-region backbone routing | Manual peer routing between regions |
| **Scale** | Global enterprise scale | Multi-region hubs (high overhead) |`,
    performance: 'Leverages the AWS high-speed global fiber network to optimize multi-region traffic routing.',
    cost: 'Charged per core network hub connection hour and data processing usage metrics.',
    security: 'Enforces segmentation policies across core regions to isolate development and production traffic.',
    tips: 'Use Cloud WAN when managing multi-region, multi-account enterprise global networks, avoiding manual Transit Gateway peerings.',
    traps: 'Updating core policy documents requires a review and validation execution phase before deployment to prevent outages.',
    clues: 'cloud wan, global network policy, core network hub, multi-region routing segmentation'
  },
  {
    path: 'docs/02-solutions-architect-professional/Networking & Content Delivery/transit-gateway-route-tables.md',
    title: 'Transit Gateway Routing Deep Dive',
    category: 'Networking',
    analogy: 'A corporate logistics sorting center: packages arrive from various warehouses (VPCs) and are sorted onto outgoing delivery trucks based on specific shipping manifests (route tables).',
    description: 'Transit Gateway (TGW) routes traffic between attached VPCs, VPNs, and Direct Connect connections using route tables, associations, propagations, and route filters.',
    mermaid: `graph TD
    VPC[VPC Connection] -->|Attached| TGW[Transit Gateway]
    TGW -->|Lookup| RT[Route Table A]
    RT -->|Route Match| Destination[Target VPC Attachment]`,
    comparison: `| Route Term | Meaning | Use Case |
| :--- | :--- | :--- |
| **Association** | Links an attachment to a specific route table | Directs incoming traffic to lookup table |
| **Propagation** | Dynamically pushes routes from attachment to table | Automates route updates from VPC/BGP |
| **Static Route** | Manually written route entry | Directs traffic to firewall virtual appliances |`,
    performance: 'TGW attachments support up to 50 Gbps network burst capacity per VPC, handling high-speed traffic routing.',
    cost: 'Billed per Transit Gateway attachment hour, plus data processing costs per GB.',
    security: 'Create separate route tables to isolate development, staging, and production VPC attachments (segmentation).',
    tips: 'To block spoke-to-spoke VPC communications in a hub-and-spoke design, associate spokes with a route table containing no routes to other spokes.',
    traps: 'An attachment can be associated with only one TGW route table, but it can propagate routes to multiple TGW route tables.',
    clues: 'transit gateway routing, tgw association, propagation, static routing, route table segmentation'
  },
  {
    path: 'docs/02-solutions-architect-professional/Networking & Content Delivery/transit-gateway-appliance-mode.md',
    title: 'Transit Gateway Appliance Mode',
    category: 'Networking',
    analogy: 'A single, central security line at the airport: all travelers going from gate A to gate B must walk through the same metal detector lane, preventing them from skipping checks.',
    description: 'Transit Gateway Appliance Mode ensures that stateful network appliances (such as firewalls) in a shared VPC inspect both direction paths of a network flow, preventing asymmetric routing.',
    mermaid: `graph TD
    Client[Client VPC] -->|Inbound Flow| TGW[Transit Gateway]
    TGW -->|Appliance Mode: Pin to same ENI| FW[Firewall Instance Subnet A]
    FW -->|Outbound Flow| TGW --> Destination[Target VPC]`,
    comparison: `| Mode | Appliance Mode Enabled | Appliance Mode Disabled |
| :--- | :--- | :--- |
| **Routing Flow** | Symmetric (source/destination use same firewall AZ ENI) | Asymmetric (return packets may route to a different firewall AZ ENI) |
| **Firewall State** | Works correctly (stateful tables validate packet) | Drops packet (firewall sees return packet without start handshake) |`,
    performance: 'Ensures stateful firewall appliances do not drop valid return connections due to split routing paths.',
    cost: 'No additional cost for enabling appliance mode on the TGW VPC attachment.',
    security: 'Critical configuration to enable reliable, stateful security appliance inspection zones across accounts.',
    tips: 'Always enable Appliance Mode on the Transit Gateway VPC attachment pointing to the security/firewall VPC.',
    traps: 'If Appliance Mode is disabled, stateful packet filters will drop return traffic because they do not see the initial SYN handshake.',
    clues: 'appliance mode, asymmetric routing, stateful firewall drop, return traffic destination, tgw attachment'
  },
  {
    path: 'docs/02-solutions-architect-professional/Networking & Content Delivery/ipv6-architectures.md',
    title: 'IPv6 VPC Architectures',
    category: 'Networking',
    analogy: 'Upgrading a city mailing system from a short, congested phone extension code directory to a global unique zip code system where every mailbox has a distinct number.',
    description: 'AWS supports IPv6 configurations. This page details designing dual-stack and IPv6-only VPC architectures, routing tables, and using Egress-Only Internet Gateways.',
    mermaid: `graph LR
    subgraph IPv6 Subnet [IPv6-Only Subnet]
      Inst[IPv6 Instance]
    end
    Inst -->|Outbound-Only IPv6| EIGW[Egress-Only Internet Gateway]
    EIGW -->|Target| IPv6Internet[IPv6 Internet Web]`,
    comparison: `| Gateway Type | Internet Gateway (IGW) | Egress-Only Internet Gateway (EIGW) |
| :--- | :--- | :--- |
| **Traffic Path** | Bi-directional (Inbound + Outbound) | Outbound-only |
| **IP Protocols** | IPv4 and IPv6 | IPv6 only |
| **NAT Required?**| Yes (for private IPv4 NAT) | No (IPv6 addresses are globally unique) |`,
    performance: 'IPv6 routes bypass NAT gateways, eliminating performance choke points and NAT latency.',
    cost: 'IPv6 addresses are free of charge. Egress-Only Internet Gateways are free, unlike NAT Gateways ($0.045/hour + data fees).',
    security: 'Use Egress-Only Internet Gateways to block unsolicited inbound connections from the internet to your IPv6 resources.',
    tips: 'Use NAT64 and DNS64 to enable legacy, IPv4-only external services to communicate with your new IPv6-only instances.',
    traps: 'An Egress-Only Internet Gateway is for IPv6 only; it cannot route or secure IPv4 traffic paths.',
    clues: 'ipv6 architecture, egress-only internet gateway, nat64 dns64, dual-stack subnet'
  },

  // ==========================================
  // SECURITY, IDENTITY, AND COMPLIANCE (9 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon GuardDuty.md', isDetailed: true,
    title: 'Amazon GuardDuty',
    category: 'Security',
    analogy: 'A security guard that continuously listens to police radio logs, guest logbooks, and exit gate logs to spot signs of a break-in.',
    description: 'Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts, workloads, and data stored in S3.',
    mermaid: `graph TD
    Data[VPC Flow Logs / CloudTrail / DNS Queries] -->|Ingestion| GD[Amazon GuardDuty Engine]
    GD -->|Threat Intel Machine Learning| Findings[Generate Security Findings]
    Findings -->|Publish| SecurityHub[AWS Security Hub / EventBridge]`,
    comparison: `| Resource Scope | GuardDuty | Inspector |
| :--- | :--- | :--- |
| **Scope** | Network & API Activity (Logs) | Instance Software Vulnerabilities (Host) |
| **Execution** | Continuous, log-based analysis | Scheduled or package-triggered host scans |
| **Data Source** | CloudTrail, VPC Flow Logs, DNS logs | Host SSM agent scans |`,
    performance: 'Operates completely out-of-band by analyzing logs, causing zero performance overhead to running workloads.',
    cost: 'Billed based on the volume of log data analyzed (VPC Flow Logs, DNS logs, and CloudTrail events).',
    security: 'Detects threats like cryptocurrency mining patterns, brute-force attacks, and compromised IAM credentials.',
    tips: 'Enable GuardDuty centrally across all accounts in your organization using AWS Organizations delegation.',
    traps: 'GuardDuty only detects and alerts; it does not automatically resolve or block threats without configuring EventBridge Lambda actions.',
    clues: 'guardduty, threat detection, vpc flow logs monitoring, dns query analysis, log intelligence'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/Security Monitoring & Threat Detection/AWS Security Hub.md', isDetailed: true,
    title: 'AWS Security Hub',
    category: 'Security',
    analogy: 'A centralized dashboard in a security command room that collects alarms from different cameras (GuardDuty, Inspector, Macie) and prints a combined compliance score.',
    description: 'AWS Security Hub is a cloud security posture management service that aggregates findings from various AWS services, checks compliance against standards, and automates remediation.',
    mermaid: `graph TD
    GD[GuardDuty] & Insp[Inspector] & Macie[Macie] -->|Standardized Format ASFF| SH[AWS Security Hub]
    SH -->|Compliance Checks| Standards[CIS / PCI DSS Standards]
    SH -->|Remediation Trigger| EventBridge[Amazon EventBridge]`,
    comparison: `| Standard | Target Focus | Compliance Check |
| :--- | :--- | :--- |
| **CIS Foundations** | General AWS best practices | Multi-AZ checks, root credentials |
| **PCI DSS** | Payment card security | Port exposures, encryption checks |
| **AWS Foundational Security**| Cloud security posture | Resource public exposures |`,
    performance: 'Aggregates data asynchronously, causing no runtime latency impact to application traffic.',
    cost: 'Billed based on the number of security checks processed per month, and findings ingested.',
    security: 'Standardizes findings into the AWS Security Finding Format (ASFF), simplifying automated response workflows.',
    tips: 'Enable Security Hub centrally in the audit/security account, delegating organization-wide scanning permissions.',
    traps: 'Security Hub does not fix security issues out-of-the-box; configure custom actions via EventBridge to automate fixes.',
    clues: 'security hub, asff format, compliance standards checks, security posture aggregation'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/macie.md',
    title: 'Amazon Macie',
    category: 'Security',
    analogy: 'A compliance auditor who opens every box in your storage warehouse (S3) to check if anyone stored confidential customer documents (PII) like credit cards.',
    description: 'Amazon Macie is a fully managed data security and data privacy service that uses machine learning and pattern matching to discover and protect sensitive data in Amazon S3.',
    mermaid: `graph LR
    S3[Amazon S3 Buckets] -->|Automated Scanning| Macie[Amazon Macie Engine]
    Macie -->|PII Detected| Alert[Generate EventBridge Findings / Alert]`,
    comparison: `| Search Scope | Macie | GuardDuty |
| :--- | :--- | :--- |
| **Primary Target** | S3 object content data (PII, credentials) | AWS account access logs (behavior) |
| **Technology** | Regular expressions and machine learning | Threat intelligence and logs |`,
    performance: 'Performs asynchronous background object analysis, causing zero request latency impact to S3 operations.',
    cost: 'Billed per GB of data processed in S3 bucket scans, and per bucket analyzed.',
    security: 'Essential compliance tool to locate customer credit cards, SSNs, and private keys stored in public buckets.',
    tips: 'Target Macie scans at specific paths and files using size or type exclusions to optimize scanning budgets.',
    traps: 'Macie cannot scan encrypted S3 objects unless its service role has decrypt permissions on the KMS customer managed keys.',
    clues: 'macie, pii discovery, s3 content analysis, personal data detection, credentials check'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Detective.md', isDetailed: true,
    title: 'Amazon Detective',
    category: 'Security',
    analogy: 'A detective inspector who takes finding reports (GuardDuty findings) and builds a visual timeline map of who entered the building and what they touched to reconstruct a crime.',
    description: 'Amazon Detective helps you analyze, investigate, and quickly identify the root cause of potential security issues or suspicious activities using graph models and visual data representations.',
    mermaid: `graph TD
    Logs[VPC Flow Logs / CloudTrail / GuardDuty Findings] -->|Ingestion| Det[Amazon Detective Graph Database]
    Det -->|Visual Context Mapping| Console[Investigator Interactive UI]`,
    comparison: `| Tool | GuardDuty | Detective |
| :--- | :--- | :--- |
| **Goal** | Real-time security threat alerting | Retrospective security incident root-cause analysis |
| **Visuals** | Raw finding lists | Interactive graph visual maps |`,
    performance: 'Maintains out-of-band log ingestion, causing zero impact on active cloud compute performance.',
    cost: 'Billed based on the volume of log data ingested and parsed into the Detective graph database.',
    security: 'Correlates distinct API behaviors into a single security event map, simplifying security triage operations.',
    tips: 'Open Amazon Detective directly from GuardDuty console finding links to analyze the historical context of an attack.',
    traps: 'Detective does not perform threat detection checks; it relies on findings from GuardDuty to begin investigations.',
    clues: 'detective, incident investigation, root cause analysis database, behavioral profile graph'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Inspector.md', isDetailed: true,
    title: 'Amazon Inspector',
    category: 'Security',
    analogy: 'A safety inspector checking your server hardware: they log in, check if the software packages have known security bugs (CVEs), and verify if any doors are open.',
    description: 'Amazon Inspector is an automated vulnerability management service that continuously scans AWS workloads (EC2, ECR container images, Lambda) for software vulnerabilities and unintended network exposure.',
    mermaid: `graph LR
    EC2[EC2 Workload Instance] -->|Scan Agent/Agentless| Insp[Amazon Inspector Service]
    Insp -->|Cross-reference database| CVE[Known CVE Database]
    Insp -->|Trigger Alerts| EventBridge[EventBridge Remediation]`,
    comparison: `| Scope | Amazon Inspector | AWS Systems Manager Patch Manager |
| :--- | :--- | :--- |
| **Goal** | Security vulnerability and risk reporting | Applying OS security updates (remediation) |
| **Scans** | Software packages (CVE), network paths | Installed patch software lists |`,
    performance: 'Supports agentless scanning using EBS snapshots, eliminating cpu performance impact on active VM systems.',
    cost: 'Billed per running EC2 instance scanned per month, per container image scanned, and per Lambda function analyzed.',
    security: 'Identifies software package vulnerabilities and scans network paths to verify if ports (e.g., SSH port 22) are open to the internet.',
    tips: 'Use Amazon Inspector in CI/CD container pipelines to reject docker builds containing critical CVE vulnerabilities.',
    traps: 'Inspector reports vulnerabilities; it is the customer responsibility to trigger patches using SSM Patch Manager.',
    clues: 'inspector, software vulnerability scanning, cve check, container image scan, agentless scan'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/waf.md',
    title: 'AWS WAF (Web Application Firewall)',
    category: 'Security',
    analogy: 'A security guard checking bags at a concert entrance: they look for specific banned objects like SQL injections, cross-site scripts, or bot patterns before letting people enter.',
    description: 'AWS WAF is a web application firewall that helps protect web applications and APIs against common web exploits and bots that may affect availability, compromise security, or consume excessive resources.',
    mermaid: `graph LR
    Client[Web Client] -->|HTTP Payload| WAF[AWS WAF Web ACL]
    WAF -->|Pass Block Checks| ALB[Application Load Balancer / API Gateway]
    WAF -->|Fail Block Checks| Block[Status 403 Forbidden]`,
    comparison: `| Layer | AWS WAF | Security Groups | AWS Network Firewall |
| :--- | :--- | :--- | :--- |
| **Layer Scope** | Layer 7 (HTTP payload, URL, headers) | Layer 3-4 (IP, Port) | Layer 3-7 (Full network flow) |
| **Remediation** | Blocks, challenges (CAPTCHA), logs | Blocks IP routing | Block rules, deep packet drop |`,
    performance: 'Adds minimal sub-millisecond latency overhead to HTTP request streams.',
    cost: 'Billed per Web ACL configured, per rule group added, and per million requests inspected.',
    security: 'Protects against OWASP Top 10 exploits, SQL injection (SQLi), Cross-Site Scripting (XSS), and automated bot traffic.',
    tips: 'Associate WAF with Amazon CloudFront distribution edge points to block threats before they reach your AWS origin infrastructure.',
    traps: 'AWS WAF cannot inspect encrypted network traffic unless it is attached to an AWS service that terminates SSL/TLS (CloudFront, ALB).',
    clues: 'waf, web acl, owasp top 10, sqli xss protection, rate-based rule block, cloudfront waf'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/shield-advanced.md',
    title: 'AWS Shield Advanced',
    category: 'Security',
    analogy: 'An insurance policy with dedicated security responders: the basic coverage keeps standard rain out (Shield Standard), while the premium plan provides structural protection during a massive hurricane (Shield Advanced).',
    description: 'AWS Shield is a managed Distributed Denial of Service (DDoS) protection service. Shield Standard is enabled by default. Shield Advanced provides additional protection, mitigation, and financial coverage for scaling costs.',
    mermaid: `graph TD
    DDoS[Massive Volumetric DDoS Attack] -->|Mitigate| Shield[AWS Shield Advanced Routing Shield]
    Shield -->|Clean Traffic Only| CloudFront[Amazon CloudFront Origin]
    Shield -->|Notify| SRT[AWS DDoS Response Team]`,
    comparison: `| Feature | Shield Standard | Shield Advanced |
| :--- | :--- | :--- |
| **Cost** | Free (Included) | $3,000/month per account flat subscription fee |
| **SRT Support?**| No | Yes (24/7 direct access to DDoS Response Team) |
| **Cost Protection**| No | Yes (Covers scaling bill spikes from DDoS attacks) |`,
    performance: 'Performs packet validation at the AWS border network layer, preventing attack traffic from reaching compute nodes.',
    cost: 'Subscription costs $3,000/month, plus data transfer fees. Includes cost protection for ELB, CloudFront, and Route 53 scaling fees.',
    security: 'Protects against Layer 3, 4, and 7 volumetric and application-layer DDoS attacks.',
    tips: 'Look for "Shield Advanced" when requirements mention 24/7 DDoS support, financial protection against scaling bills, or volumetric attacks.',
    traps: 'Do not subscribe to Shield Advanced for small-scale applications, as the $3,000 monthly flat subscription fee is prohibitive.',
    clues: 'shield advanced, ddos response team srt, volumetric attack mitigation, billing protection ddos'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/Network Security/AWS Firewall Manager.md', isDetailed: true,
    title: 'AWS Firewall Manager',
    category: 'Security',
    analogy: 'A corporate security manager who defines a single building code standard: they ensure that every building (AWS Account) has standard security cameras and alarms installed automatically.',
    description: 'AWS Firewall Manager is a security management service that allows you to centrally configure and manage firewall rules across your accounts and resources in AWS Organizations.',
    mermaid: `graph TD
    subgraph Organization [AWS Organizations Accounts]
      FM[AWS Firewall Manager Policy] -->|Enforce Rules| Acc1[VPC Account A: WAF ACL]
      FM -->|Enforce Rules| Acc2[VPC Account B: Security Group]
    end`,
    comparison: `| Tool | Firewall Manager | AWS Config |
| :--- | :--- | :--- |
| **Primary Focus** | Security rule enforcement (WAF, Shield, Security Groups) | Resource configuration state audits |
| **Action** | Creates and maintains rules dynamically | Flag compliance status and alerts |`,
    performance: 'Ensures security rules are configured at no performance cost to resource executions.',
    cost: 'Requires Shield Advanced subscription or billing per active policy per region.',
    security: 'Automatically applies security policies to newly created VPC resources, ensuring consistent organization security.',
    tips: 'Use Firewall Manager to enforce a minimum baseline security group config across all developer VPCs in an Organization.',
    traps: 'Firewall Manager requires AWS Organizations to be configured with "All Features Enabled". It cannot manage standalone accounts.',
    clues: 'firewall manager, central security rule policy, organization-wide waf rules, compliance security groups'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/Identity & Access Management/AWS Verified Access.md', isDetailed: true,
    title: 'AWS Verified Access',
    category: 'Security',
    analogy: 'A corporate VPN replacement: you log in once using your enterprise portal account (OIDC/Okta), and the gateway checks your device health before letting you read files.',
    description: 'AWS Verified Access provides secure VPN-less access to corporate applications using Zero Trust principles, checking user identity and device security status before granting access.',
    mermaid: `graph LR
    User[Remote Employee] -->|Access Request| AVA[AWS Verified Access Endpoint]
    AVA <-->|Check Identity| Okta[Okta / OIDC Provider]
    AVA <-->|Check Device Health| CrowdStrike[Device Security Agent]
    AVA -->|Pass Policies| App[Internal Application VPC]`,
    comparison: `| Connection Type | AWS Verified Access | Corporate Client VPN |
| :--- | :--- | :--- |
| **Agent Required?**| No (Browser-based) | Yes (Client VPN Software) |
| **Trust Model** | Zero Trust (Checks identity + device state per call) | Per-session Network Trust (Access to subnet CIDR) |
| **Scale** | Fully managed scale | Requires sizing VPN servers |`,
    performance: 'Direct path access via the AWS global network optimizes application routing speeds.',
    cost: 'Billed based on the number of endpoints managed, plus data processing costs per GB.',
    security: 'Eliminates the risks associated with exposing whole subnets via VPN, restricting access to validated users and secure devices.',
    tips: 'Look for "Zero Trust app access", "VPN-less corporate app access", or identity-based application routes in the exam.',
    traps: 'AVA requires integration with an external OIDC-compliant Identity Provider (IdP); you cannot manage users inside AVA itself.',
    clues: 'verified access, zero trust client, vpn-less access, device health check, oidc authentication'
  },

  // ==========================================
  // MANAGEMENT AND GOVERNANCE (4 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Management & Governance/config-aggregators.md',
    title: 'AWS Config Multi-Account Aggregators',
    category: 'Governance',
    analogy: 'A central regional filing office: every local store branch logs their inventory daily (AWS Config) and ships reports to the head office desk for a total review.',
    description: 'An AWS Config aggregator collects configuration compliance data from multiple AWS accounts and Regions into a single security audit account, enabling enterprise-wide governance.',
    mermaid: `graph TD
    subgraph Spoke Accounts [Spoke Account Pool]
      Acc1[Account A: Config Data] -->|Push Compliance| Agg[Config Aggregator Audit Account]
      Acc2[Account B: Config Data] -->|Push Compliance| Agg
    end`,
    comparison: `| Feature | Config Aggregator | CloudTrail Organization Trail |
| :--- | :--- | :--- |
| **Primary Data** | Compliance state and config history | API event log trails |
| **Focus** | Resource compliance monitoring | Security auditing of API calls |`,
    performance: 'Asynchronous event collector has zero impact on runtime compute performance.',
    cost: 'No fee for creating aggregators; you pay standard rates for Config rules evaluated in spoke accounts.',
    security: 'Provides audit and compliance teams with a single pane of glass to identify compliance issues across accounts.',
    tips: 'Configure Config Aggregators in the Security Audit account to view non-compliant resources across all organizational units (OUs).',
    traps: 'Aggregators do not authorize Config rules; they only collect compliance evaluation outcomes from local regions.',
    clues: 'config aggregator, multi-account compliance collection, configuration aggregator dashboard'
  },
  {
    path: 'docs/02-solutions-architect-professional/Management & Governance/Governance & Compliance/AWS Control Tower.md', isDetailed: true,
    title: 'AWS Control Tower',
    category: 'Governance',
    analogy: 'A master building general contractor: they lay out the foundation blocks, set up common plumbing lines, and build standardized security gates for new offices.',
    description: 'AWS Control Tower establishes a multi-account landing zone using AWS Organizations, setting up standard security baselines and applying preventative and detective guardrails.',
    mermaid: `graph TD
    CT[Control Tower] -->|Provision| LZ[Enterprise Landing Zone]
    LZ -->|Enforce Policies| Org[AWS Organizations]
    LZ -->|Log Consolidation| Logs[Log Archive Account]
    LZ -->|Security Guardrails| Sec[Audit Account]`,
    comparison: `| Tool | AWS Control Tower | AWS Organizations |
| :--- | :--- | :--- |
| **Scope** | Orchestrates Organizations, Service Catalog, and SSO | Core account structure and billing parent API |
| **Baselines** | Sets up Log Archive, Security Audit, SSO | Only provides root container structure |`,
    performance: 'Automates account setups without modifying the execution path of deployed systems.',
    cost: 'No direct fee for Control Tower; standard resource rates apply for created Organizations, Config, and CloudTrail setups.',
    security: 'Applies Service Control Policies (preventative guardrails) and AWS Config rules (detective guardrails) to maintain security.',
    tips: 'Use Control Tower to quickly spin up a secure, multi-account structure for new enterprise projects.',
    traps: 'Do not configure custom Organizations structures that clash with Control Tower OU layout guidelines, as it will break policy compliance mappings.',
    clues: 'control tower, landing zone baselines, preventative guardrails, detective guardrails, account factory'
  },
  {
    path: 'docs/02-solutions-architect-professional/Management & Governance/account-factory.md',
    title: 'Control Tower Account Factory',
    category: 'Governance',
    analogy: 'A cookie cutter machine: you push a button, and it stamps out a new cookie with the exact same shapes, security stamps, and frostings every time.',
    description: 'The Account Factory is a capability of AWS Control Tower that automates the provisioning of new AWS accounts with pre-configured security baselines, networking resources, and SSO access.',
    mermaid: `graph LR
    Dev[Developer request] -->|Service Catalog Request| AF[Account Factory]
    AF -->|Provision| NewAcc[Secured AWS Account with baselines]`,
    comparison: `| Metric | Account Factory | Manual Organizations Create |
| :--- | :--- | :--- |
| **Baseline Applied?**| Yes (VPC, IAM, Config, CloudTrail configured) | No (Blank AWS account) |
| **Execution** | Self-service via AWS Service Catalog | API call / Organizations Console |`,
    performance: 'Simplifies operational workflows by automating baseline setups in roughly 15-20 minutes.',
    cost: 'Billed based on the standard AWS resources created in the target baseline (e.g. AWS Config, VPC resource consumption).',
    security: 'Ensures new developer accounts match corporate security profiles, restricting network configurations.',
    tips: 'Use Account Factory inside Service Catalog to delegate account creation authority to project managers safely.',
    traps: 'Ensure you have sufficient service limit boundaries in AWS Organizations before running large batch account creations.',
    clues: 'account factory, baseline account creation, service catalog account template, automated setup'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/Compliance & Governance/AWS Audit Manager.md', isDetailed: true,
    title: 'AWS Audit Manager',
    category: 'Governance',
    analogy: 'An audit clerk who checks all financial records: they collect receipts (AWS Config/CloudTrail trails) and prepare a structured ledger booklet for auditors.',
    description: 'AWS Audit Manager automates evidence collection to assess compliance with regulations and standards (such as HIPAA, GDPR, PCI DSS) by checking AWS configuration status.',
    mermaid: `graph TD
    AuditManager[AWS Audit Manager] -->|Collect Evidence| Sources[CloudTrail, AWS Config, Security Hub]
    AuditManager -->|Generate Audit Report| Report[Compliance Audit PDF Document]`,
    comparison: `| Metric | Audit Manager | Security Hub |
| :--- | :--- | :--- |
| **Output Goal** | Audit-ready compliance evidence reports (PDF/Excel) | Security status and real-time finding maps |
| **Audience** | External financial/security auditors | Security operations teams |`,
    performance: 'Collects configuration snapshots asynchronously, causing zero resource performance latency.',
    cost: 'Billed based on the number of resource assessment evaluations processed.',
    security: 'Ensures compliance evidence remains untampered, providing structured logs for audits.',
    tips: 'Use Audit Manager to automate the collection of evidence needed for annual SOC2 or PCI audits.',
    traps: 'Audit Manager does not solve compliance errors; it only provides the evidence of current configurations.',
    clues: 'audit manager, evidence collection compliance, soc2 audit evidence, regulatory compliance report'
  },

  // ==========================================
  // MIGRATION AND TRANSFER (4 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Migration & Transfer/Migration Tools/AWS Migration Hub.md', isDetailed: true,
    title: 'AWS Migration Hub',
    category: 'Migration',
    analogy: 'A flight control screen showing departures, arrivals, and delays: it tracks every flight (servers) migrating to the city from one dashboard.',
    description: 'AWS Migration Hub provides a single location to track the progress of application migrations across multiple AWS and partner solutions.',
    mermaid: `graph TD
    ADS[Discovery Service] & MGN[Application Migration] & DMS[Database Migration] -->|Track Progress| MH[AWS Migration Hub]
    MH -->|Single Pane of Glass| Console[Migration Hub Console]`,
    comparison: `| Tool | Migration Hub | AWS Application Migration Service (MGN) |
| :--- | :--- | :--- |
| **Goal** | Overall migration dashboard tracking | The tool that performs server block replication |
| **Data Scope** | High-level tracking metrics | Low-level disk block data streams |`,
    performance: 'Tracks status updates via API calls, causing zero network impact on the actual migration streams.',
    cost: 'AWS Migration Hub is free of charge; you only pay for the migration tools used.',
    security: 'Secured via standard IAM policies, restricting access to migration tracking boards.',
    tips: 'Use Migration Hub to present migration progress reports to enterprise leadership teams.',
    traps: 'Migration Hub does not execute migrations; you must configure tools like MGN or DMS to do the actual data moving.',
    clues: 'migration hub, migration status tracking dashboard, server migration progress'
  },
  {
    path: 'docs/02-solutions-architect-professional/Migration & Transfer/Physical & Offline Migration/AWS Snow Family.md', isDetailed: true,
    title: 'AWS Snow Family',
    category: 'Migration',
    analogy: 'A locked physical storage crate: instead of uploading 100 Terabytes over a slow internet route, you load the files onto a hard drive vault and ship it via courier.',
    description: 'The AWS Snow Family consists of Snowcone, Snowball, and Snowmobile. These are physical devices that secure and migrate large amounts of data to AWS offline.',
    mermaid: `graph LR
    Local[On-Premises Data Center] -->|Local LAN copy| Snow[Snowball Edge Device]
    Snow -->|Physical Shipping| AWS[AWS Data Center]
    AWS -->|Import| S3[Amazon S3 Bucket]`,
    comparison: `| Device Type | Capacity | Primary Use Case |
| :--- | :--- | :--- |
| **Snowcone** | 8 - 14 TB | Small data copy, edge computing |
| **Snowball Edge** | 80 - 100 TB | Large data migrations, local compute runs |
| **Snowmobile** | Up to 100 PB | Massive data center decommissioning (semi-truck) |`,
    performance: 'Offline data copying avoids consuming enterprise network bandwidth over public routes.',
    cost: 'Charged flat rate per job, plus daily fees if kept beyond standard window limits.',
    security: 'Uses TPM (Trusted Platform Module) chips and cryptographically locked cases, erasing data automatically if tampered with.',
    tips: 'Use Snowball Edge when migrations exceed 10 TB and network connections are slow or unreliable.',
    traps: 'Ensure to prepare local compute configurations (e.g. NFS client mounts) to copy data at maximum speed.',
    clues: 'snow family, snowball edge, snowcone, physical shipping data, offline migration'
  },
  {
    path: 'docs/02-solutions-architect-professional/Migration & Transfer/Migration Tools/AWS Migration Evaluator.md', isDetailed: true,
    title: 'AWS Migration Evaluator',
    category: 'Migration',
    analogy: 'A cost estimator contractor: they inspect your current office building layouts and prepare a cost estimate showing what your monthly bills would look like in a new city.',
    description: 'AWS Migration Evaluator (formerly TSO Logic) creates an initial data-driven business case for AWS migration, analyzing host resource profiles to optimize costs.',
    mermaid: `graph LR
    Local[Local Server Environment] -->|Analyze host usage logs| ME[Migration Evaluator]
    ME -->|Business Case Report| Report[Optimized AWS Sizing Cost Proposal]`,
    comparison: `| Tool | Migration Evaluator | Application Discovery Service (ADS) |
| :--- | :--- | :--- |
| **Goal** | Initial financial cost projections | Technical server dependency mapping |
| **Output** | Business case cost model | Server inventory spreadsheets |`,
    performance: 'Gathers host resource logs without affecting server CPU/Memory performances.',
    cost: 'Migration Evaluator is a free tool provided by AWS to help build cloud business cases.',
    security: 'Data collected is encrypted and securely analyzed to map least-cost AWS configurations.',
    tips: 'Use Migration Evaluator early in migration planning to secure leadership approvals for budgets.',
    traps: 'Evaluator outputs cost models, not migration plans or server configurations; it is a financial planning tool.',
    clues: 'migration evaluator, cloud business case, optimized cost model projection, host sizing assessment'
  },
  {
    path: 'docs/02-solutions-architect-professional/Migration & Transfer/Migration Tools/AWS Application Discovery Service.md', isDetailed: true,
    title: 'AWS Application Discovery Service',
    category: 'Migration',
    analogy: 'An architect mapping a complex underground city: they check every room, map the pipes and cables connecting buildings, and document every tenant.',
    description: 'AWS Application Discovery Service (ADS) identifies on-premises servers, collects resource usage profiles, and maps application dependencies.',
    mermaid: `graph TD
    subgraph On-Premises Servers
      Serv1[Server A] <-->|Network Flow| Serv2[Server B]
    end
    Agent[ADS Collector Agent] -->|Scan Netstat Flows| ADS[Discovery Service Repository]`,
    comparison: `| Collector Type | Agentless Collector | Agent-Based Collector |
| :--- | :--- | :--- |
| **Host Setup** | No agent installed (hypervisor layer query) | Install agent software directly on VM OS |
| **Detail Level** | Basic hardware sizing and VM state | High-detail network connection flows and software versions |`,
    performance: 'Agentless collector queries hypervisors, keeping host performance impact at absolute zero.',
    cost: 'No fee for discovery scans; standard S3 rates apply for storage of exported server inventory datasets.',
    security: 'Data collected is encrypted in transit and at rest, protecting system architectures.',
    tips: 'Use agent-based collectors to map server dependencies, identifying which servers must be migrated together.',
    traps: 'Ensure corporate security firewalls permit outbound communication from the collector VM to AWS endpoints.',
    clues: 'application discovery service, ads collector agent, server dependency mapping, agent-based discovery'
  },

  // ==========================================
  // ANALYTICS (6 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Analytics/Interactive Query & Batch Processing/Amazon Athena.md', isDetailed: true,
    title: 'Amazon Athena',
    category: 'Analytics',
    analogy: 'Searching for a name in a massive stack of tax papers: instead of scanning them manually, you use a magic scanner that searches all sheets in the boxes instantly and highlights the matches.',
    description: 'Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage.',
    mermaid: `graph LR
    SQL[SQL Query Input] --> Athena[Amazon Athena Engine]
    Athena -->|Scan Parquet/CSV data| S3[Amazon S3 Data Lake]`,
    comparison: `| Parameter | Amazon Athena | Amazon Redshift |
| :--- | :--- | :--- |
| **Architecture** | Serverless (Query directly in S3) | Provisioned Data Warehouse Cluster |
| **Query Speed** | Seconds to minutes | Sub-second queries on indexed data |
| **Cost Model** | Pay per TB scanned ($5.00/TB) | Fixed hourly cluster instance rate |`,
    performance: 'Improve performance by converting data to columnar formats like Apache Parquet and partitioning data paths.',
    cost: 'Saves money by only scanning relevant partitions. Convert files to Parquet to reduce data scan volume by up to 90%.',
    security: 'Integrates with KMS keys to query encrypted S3 objects, and uses IAM policies to restrict query access.',
    tips: 'Use Athena to query server log streams (ALB logs, CloudTrail logs, VPC Flow Logs) stored in S3.',
    traps: 'Do not use Athena for highly transactional database applications (OLTP) due to query latency overhead.',
    clues: 'athena, serverless sql query, query s3 data lake, parquet compression, scan partition search'
  },
  {
    path: 'docs/02-solutions-architect-professional/Analytics/Data Integration & Management/AWS Glue.md', isDetailed: true,
    title: 'AWS Glue',
    category: 'Analytics',
    analogy: 'A translation clerk who reads varying catalog files, translates their formats into a uniform language, and logs them in a central index database.',
    description: 'AWS Glue is a serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development.',
    mermaid: `graph TD
    Raw[Raw Data in S3] -->|Glue Crawler| Catalog[Glue Data Catalog]
    GlueJob[Glue ETL Job Spark] -->|Transform| Clean[Clean Data in S3]`,
    comparison: `| Tool | AWS Glue Data Catalog | DynamoDB Metadata Table |
| :--- | :--- | :--- |
| **Goal** | Schema and partition indexing for data lakes | Fast operational lookup table |
| **Schema** | Dynamically updated by crawlers | Static document schema |`,
    performance: 'Glue Crawlers automatically detect file schemas and partition layouts, accelerating query mapping structures.',
    cost: 'Billed based on Data Processing Units (DPUs) consumed during ETL spark job execution.',
    security: 'Uses KMS to encrypt data at rest, and manages access via IAM role boundaries.',
    tips: 'Look for "serverless ETL", "schema registry", "data cataloging", or "Apache Spark job" in the exam.',
    traps: 'Glue Crawlers can incur high costs if run too frequently on large, unchanged datasets; schedule them optimally.',
    clues: 'aws glue, glue crawler, schema detection data catalog, spark etl job dpu'
  },
  {
    path: 'docs/02-solutions-architect-professional/Analytics/Data Integration & Management/AWS Lake Formation.md', isDetailed: true,
    title: 'AWS Lake Formation',
    category: 'Analytics',
    analogy: 'A high-security data library vault: instead of granting employees access to whole wings of files, the librarian grants permissions to read specific pages and columns.',
    description: 'AWS Lake Formation is a service that makes it easy to set up a secure data lake in days. It simplifies and automates data lake ingestion, cataloging, and security.',
    mermaid: `graph TD
    Client[Athena / EMR Query Client] -->|Request Access| LF[AWS Lake Formation]
    LF -->|Validate Column/Row Policies| S3[S3 Data Lake Storage]`,
    comparison: `| Authorization Type | AWS Lake Formation | S3 Bucket Policies |
| :--- | :--- | :--- |
| **Granularity** | Column-level and row-level access control | Object-level / prefix-level access control |
| **Management** | Centralized database style permissions (GRANT/REVOKE) | Complex JSON policy documents |`,
    performance: 'Validates permissions in real-time during query executions with negligible overhead.',
    cost: 'No additional cost for Lake Formation; standard underlying S3, Glue, and query service charges apply.',
    security: 'Enforces cell-level security, preventing unauthorized database operators from scanning sensitive columns (e.g. credit card numbers).',
    tips: 'Use Lake Formation to manage multi-tenant compliance environments across S3 data lakes.',
    traps: 'Lake Formation requires registering S3 paths first; unregistered paths will bypass Lake Formation security rules.',
    clues: 'lake formation, column level permissions, secure data lake, cell-level row filtering'
  },
  {
    path: 'docs/02-solutions-architect-professional/Analytics/Interactive Query & Batch Processing/Amazon EMR.md', isDetailed: true,
    title: 'Amazon EMR',
    category: 'Analytics',
    analogy: 'A fleet of rental trucks hired for a single day: you rent 50 trucks (Master, Core, Task nodes) to move a massive pile of bricks (Big Data) in parallel, then return the trucks.',
    description: 'Amazon EMR is a managed cluster platform that simplifies running open-source big data frameworks, such as Apache Hadoop, Spark, Hive, and Presto, on AWS.',
    mermaid: `graph TD
    subgraph EMR Cluster
      Master[Master Node - EC2 Instance]
      Core1[Core Node - Runs HDFS]
      Task1[Task Node - Compute Only Spot]
    end
    EMRCluster -->|Read/Write| S3[Amazon S3 EMRFS]`,
    comparison: `| Node Type | Core Node | Task Node |
| :--- | :--- | :--- |
| **Compute?** | Yes | Yes |
| **HDFS Data Storage?**| Yes | No (Compute only) |
| **EC2 Billing** | On-Demand (highly stable) | Spot instances (highly cost-effective) |`,
    performance: 'Using EMR File System (EMRFS) allows EMR to query S3 directly, separating storage and compute for performance scaling.',
    cost: 'Save costs by running Task nodes on Spot instances; EMR clusters can automatically shrink nodes as compute needs change.',
    security: 'Supports EMR Security Configurations, Kerberos authentication integration, and KMS encryption of local disks.',
    tips: 'Use EMR when existing Hadoop/Spark map-reduce codebases must be migrated to AWS with minimum modifications.',
    traps: 'Core nodes store active HDFS data blocks; do not run Core nodes on Spot instances to prevent data loss.',
    clues: 'amazon emr, hadoop spark migration, master core task nodes, emrfs s3 storage'
  },
  {
    path: 'docs/02-solutions-architect-professional/Analytics/opensearch.md',
    title: 'Amazon OpenSearch Service',
    category: 'Analytics',
    analogy: 'A search engine box on an e-commerce website: it indexes billions of catalog pages instantly and returns matching search results in milliseconds.',
    description: 'Amazon OpenSearch Service (successor to Amazon Elasticsearch Service) is a managed service that makes it easy to deploy, operate, and scale OpenSearch clusters in AWS.',
    mermaid: `graph LR
    Log[Application Server Log] -->|Kinesis Firehose| OS[Amazon OpenSearch Cluster]
    OS -->|Visualize Dashboard| Kibana[OpenSearch Dashboards UI]`,
    comparison: `| Search Engine | OpenSearch Service | Amazon Athena |
| :--- | :--- | :--- |
| **Search Speed** | Real-time / Sub-second search | Batch query speeds (seconds to minutes) |
| **Index Method** | Pre-built indexes on document ingest | Direct scan of S3 data (no index) |
| **Primary Use Case** | Log analysis, website search box | Analytical business intelligence query |`,
    performance: 'Use dedicated master nodes to coordinate cluster tasks, preventing split-brain states under load.',
    cost: 'Billed per instance hour of the active cluster nodes and storage size. Supports UltraWarm nodes to save costs for historical data.',
    security: 'Secured via standard IAM identity mapping, VPC security groups, and encryption at rest via KMS.',
    tips: 'Choose OpenSearch for real-time log analytics pipelines (the ELK stack replacement) and full-text search requirements.',
    traps: 'OpenSearch is not a relational database; do not use it as the primary transactional database of record.',
    clues: 'opensearch, elasticsearch migration, search indexing, ultrawarm storage, log visualization'
  },
  {
    path: 'docs/02-solutions-architect-professional/Analytics/Visualization & Search/Amazon QuickSight.md', isDetailed: true,
    title: 'Amazon QuickSight',
    category: 'Analytics',
    analogy: 'A dashboard chart designer: it connects to various source data folders, imports the numbers into a fast memory machine (SPICE), and plots interactive graphics.',
    description: 'Amazon QuickSight is a fast, cloud-powered business intelligence (BI) service that makes it easy to deliver insights to everyone in your organization.',
    mermaid: `graph TD
    Data[RDS / S3 / Redshift] -->|Ingestion| SPICE[SPICE High-Speed In-Memory Engine]
    SPICE -->|Visualize| Dashboard[Interactive QuickSight Visual Dashboard]`,
    comparison: `| Feature | SPICE Engine | Direct Query |
| :--- | :--- | :--- |
| **Query Speed** | Instant (In-memory retrieval) | Query execution speed of backend database |
| **Impact on Source** | Zero after initial import data load | Can overload production database CPUs |`,
    performance: 'SPICE (Super-fast, Parallel, In-memory Calculation Engine) caches datasets to deliver fast visual response speeds.',
    cost: 'Billed per active dashboard author and reader account. Readers have a capped monthly maximum charge.',
    security: 'Supports row-level and column-level security filters, restricting data visibility based on user IAM profiles.',
    tips: 'Use QuickSight to embed interactive charts and business dashboards into external client portals.',
    traps: 'Ensure SPICE datasets have scheduled refreshes configured, or dashboards will display outdated, stale numbers.',
    clues: 'quicksight, spice engine, bi dashboards visual, row level data security'
  },

  // ==========================================
  // APPLICATION INTEGRATION (3 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Application Integration/Messaging & Eventing/Amazon MQ.md', isDetailed: true,
    title: 'Amazon MQ',
    category: 'Application Integration',
    analogy: 'A legacy shipping post dispatcher who speaks traditional shipping terms (JMS, AMQP) helping migrate an old post system without converting the shipping labels.',
    description: 'Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ that makes it easy to migrate legacy messaging systems to AWS.',
    mermaid: `graph LR
    Producer[Legacy Client Java App] -->|JMS / AMQP protocol| MQ[Amazon MQ ActiveMQ Broker]
    MQ -->|Consume| Consumer[Backend App Server]`,
    comparison: `| Metric | Amazon MQ | Amazon SQS |
| :--- | :--- | :--- |
| **Protocol Support** | AMQP, MQTT, JMS, OpenWire, STOMP | Custom AWS SQS HTTP API |
| **Scaling** | Active/Standby fixed instance limits | Virtually unlimited serverless scaling |
| **Durability** | Multi-AZ storage replication | Standard AWS queue replication |`,
    performance: 'Throughput is constrained by the selected broker instance size; select optimized instances for high message volumes.',
    cost: 'Billed per broker instance hour, plus standard storage capacity consumed.',
    security: 'Supports Active/Standby replication configurations across AZs, encrypting messages at rest using KMS.',
    tips: 'Choose Amazon MQ when migrating on-premises applications using traditional APIs (e.g. JMS, AMQP) to avoid code rewrites.',
    traps: 'Amazon MQ is not serverless; you must monitor instance disk and CPU usage to prevent message delivery blockages.',
    clues: 'amazon mq, activemq rabbitmq migration, amqp jms protocol, active standby broker'
  },
  {
    path: 'docs/02-solutions-architect-professional/Application Integration/amazon-msk.md',
    title: 'Amazon Managed Streaming for Apache Kafka (MSK)',
    category: 'Application Integration',
    analogy: 'A massive multi-lane highway designed for thousands of freight trucks passing through every second: you build dedicated lanes (brokers) to route high-speed stream data.',
    description: 'Amazon MSK is a fully managed service that makes it easy to build and run applications that use Apache Kafka to process streaming data.',
    mermaid: `graph LR
    Producer[Clickstream Event Stream] -->|Kafka API| MSK[Amazon MSK Broker Cluster]
    MSK -->|Consume stream| Consumer[Spark / EMR Analytics]`,
    comparison: `| Parameter | Amazon MSK | Amazon Kinesis Data Streams |
| :--- | :--- | :--- |
| **Eco-System** | Native Apache Kafka API | AWS Native API |
| **Broker Management**| Managed brokers (fixed cluster size) | Serverless shard management |
| **Retention** | Up to unlimited storage limits | 24 hours up to 365 days max |`,
    performance: 'Deliver high-throughput data streams, scaling partition counts dynamically to handle massive parallel ingestion rates.',
    cost: 'Billed based on active broker instance sizes and total storage capacity consumed.',
    security: 'Supports TLS client certificate authentication, IAM database access control, and KMS encryption of data logs.',
    tips: 'Choose Amazon MSK when migrating existing Apache Kafka streaming pipelines to AWS to minimize code alterations.',
    traps: 'Do not ignore cluster disk space metrics; if brokers run out of disk space, the Kafka cluster will lock writes.',
    clues: 'amazon msk, apache kafka managed, broker partition sizing, streaming ingestion cluster'
  },
  {
    path: 'docs/02-solutions-architect-professional/Application Integration/appflow.md',
    title: 'Amazon AppFlow',
    category: 'Application Integration',
    analogy: 'A managed transport bridge connecting two completely different companies (Salesforce and AWS S3): it automatically transfers contacts every hour without requiring custom code.',
    description: 'Amazon AppFlow is a fully managed integration service that enables you to securely transfer data between Software as a Service (SaaS) applications (such as Salesforce, Marketo, Slack, and Zendesk) and AWS services.',
    mermaid: `graph LR
    SF[Salesforce Contact Records] -->|AppFlow Run| AF[Amazon AppFlow Service]
    AF -->|Transform & Write| S3[Amazon S3 Data Lake]`,
    comparison: `| Tool | Amazon AppFlow | Custom Lambda integration |
| :--- | :--- | :--- |
| **Complexity** | Zero Code (managed UI setup) | Custom development and token refresh scripts |
| **Execution** | Fully managed scaling | Cold start limits, runtime limits (15 min) |
| **SaaS Tokens** | Auto-managed refresh keys | Custom Key Rotation scripts required |`,
    performance: 'Handles multi-gigabyte files, executing transformations (such as filtering and masking) during data transfer.',
    cost: 'Billed per flow execution run, plus total data volume transferred.',
    security: 'Integrates with AWS PrivateLink to transfer SaaS data without routing packets over the public internet.',
    tips: 'Look for "Salesforce to S3 data lake transfer without custom code" or SaaS API data syncs in the exam.',
    traps: 'AppFlow is strictly for data transfer and simple mappings; do not use it for complex data processing pipeline tasks.',
    clues: 'appflow, salesforce data lake sync, saas data transfer integration, zero code integration'
  },

  // ==========================================
  // HYBRID & EDGE (5 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Compute/Virtual Machines & Infrastructure/AWS Outposts.md', isDetailed: true,
    title: 'AWS Outposts',
    category: 'Hybrid and Edge',
    analogy: 'Renting a physical AWS rack and dropping it directly into your own on-premises data center, connecting it to the local power and network lines while control remains in AWS.',
    description: 'AWS Outposts is a fully managed service that extends AWS infrastructure, services, APIs, and tools to virtually any on-premises co-location space for a consistent hybrid experience.',
    mermaid: `graph TD
    subgraph Local Data Center
      Outpost[AWS Outposts Rack Node] -->|Local LAN| Db[(Local On-Premises DB)]
    end
    subgraph AWS Cloud Region
      Control[AWS Regional Control Plane] <-->|Secure VPN / Direct Connect| Outpost
    end`,
    comparison: `| Feature | AWS Outposts | Local VM / VMware |
| :--- | :--- | :--- |
| **API Interface** | Native AWS CLI, SDK, console | VMware VSphere / local hypervisor |
| **Hardware Control** | Managed and patched by AWS | Customer manages hardware failures |
| **Network Path** | LAN speeds to local resources | Standard server routes |`,
    performance: 'Enables sub-millisecond local network access to database nodes and high-speed local processing systems.',
    cost: 'High upfront commitment fee. Offers lease and monthly billing structures for hardware installation.',
    security: 'Physical security of the rack is customer responsibility; AWS manages the encryption keys via local hardware modules.',
    tips: 'Look for "sub-millisecond latency to on-premises resources" or local hardware regulatory requirements in the exam.',
    traps: 'Outposts must maintain a persistent network path to the parent AWS Region; it is not designed for offline operations.',
    clues: 'aws outposts, local hardware rack, hybrid latency, local api consistency, physical control'
  },
  {
    path: 'docs/02-solutions-architect-professional/Compute/local-zones.md',
    title: 'AWS Local Zones',
    category: 'Hybrid and Edge',
    analogy: 'A satellite AWS outpost positioned right inside a major metropolitan city: you rent resources there to serve city customers with single-digit millisecond latency.',
    description: 'AWS Local Zones place compute, storage, database, and other select AWS services closer to large population, industry, and IT centers, providing low-latency access.',
    mermaid: `graph LR
    Client[Client in Boston] -->|Single-digit ms| LZ[Boston Local Zone Compute]
    LZ <-->|Private Backbone| Region[Main AWS Region Northern Virginia]`,
    comparison: `| Edge Type | Local Zones | AWS Outposts | Wavelength |
| :--- | :--- | :--- | :--- |
| **Location** | Metropolitan city center | Customer data center | Telecom carrier 5G network |
| **Ownership** | AWS-owned hardware | Customer-owned building space | Telecom partner building |
| **Setup** | Enabled with a console click | Requires physical delivery | Enabled with a console click |`,
    performance: 'Reduces latency for heavy web traffic and real-time interactive apps inside target metropolitan cities.',
    cost: 'Standard resource pricing applies, featuring slight regional premium rates depending on the city.',
    security: 'Maintains standard IAM permissions, VPC routing tables, and KMS encryption boundary rules.',
    tips: 'Use Local Zones for applications requiring real-time updates (e.g. gaming, live media broadcasting) in specific cities.',
    traps: 'Not every AWS service is available in every Local Zone; verify service matrices before designing architecture.',
    clues: 'local zones, metropolitan latency, single-digit millisecond routing, edge compute city'
  },
  {
    path: 'docs/02-solutions-architect-professional/Compute/Virtual Machines & Infrastructure/AWS Wavelength.md', isDetailed: true,
    title: 'AWS Wavelength',
    category: 'Hybrid and Edge',
    analogy: 'Installing mini AWS compute blocks directly inside a mobile carrier 5G base station: mobile user traffic goes from phone to tower to AWS without ever touching the standard internet.',
    description: 'AWS Wavelength zones embed AWS compute and storage services within 5G networks, providing mobile developers with single-digit millisecond latency for mobile devices.',
    mermaid: `graph LR
    Phone[5G Mobile Client] -->|5G Signal| Tower[Cellular Base Station]
    Tower -->|Wavelength carrier gateway| WL[AWS Wavelength Zone EC2]
    WL <-->|Backbone| Region[Main AWS Region]`,
    comparison: `| Metric | AWS Wavelength | Standard AWS Region |
| :--- | :--- | :--- |
| **Traffic Latency** | Single-digit ms to 5G devices | 20-100ms depending on internet routes |
| **Routing path** | Directly via carrier network | Standard cellular -> internet -> AWS region |
| **Target Devices** | Mobile apps, smart cars, IoT | Standard web browsers, server API backends |`,
    performance: 'Eliminates network hops over the public internet, optimizing real-time mobile responses.',
    cost: 'Charged per active Wavelength resource, matching standard instance billing schedules.',
    security: 'VPC subnets are extended to Wavelength locations using carrier gateways to control access routing.',
    tips: 'Look for "5G mobile application low latency", "smart vehicle navigation latency", or "edge AR/VR processing" in the exam.',
    traps: 'Wavelength zones do not support complex architectures like RDS database engines; run lightweight containers and proxy databases.',
    clues: 'wavelength zone, 5g carrier network, mobile low latency, edge device routing'
  },
  {
    path: 'docs/02-solutions-architect-professional/Networking & Content Delivery/route53-resolver.md',
    title: 'Route 53 Resolvers (Hybrid DNS)',
    category: 'Hybrid and Edge',
    analogy: 'A corporate telephone switchboard operator: if you dial an internal corporate extension, they route the call to the office phone system; if you dial an external extension, they route it out.',
    description: 'AWS Route 53 Resolvers enable hybrid DNS resolution across VPCs and on-premises networks using Inbound and Outbound Endpoints.',
    mermaid: `graph TD
    OnPrem[On-Premises DNS Server] -->|Query internal.aws| Inbound[Route 53 Inbound Endpoint]
    Inbound -->|Resolve| VPC[VPC Resolver]
    VPC -->|Query onprem.corp| Outbound[Route 53 Outbound Endpoint]
    Outbound -->|Forward| OnPrem`,
    comparison: `| Endpoint Type | Traffic Direction | Target DNS Resolver |
| :--- | :--- | :--- |
| **Inbound Endpoint** | On-premises → AWS VPC | VPC local resolver (169.254.169.253) |
| **Outbound Endpoint** | AWS VPC → On-premises | On-premises local DNS server |`,
    performance: 'Endpoints scale dynamically to handle high DNS query volumes, ensuring fast name resolution.',
    cost: 'Billed per resolver endpoint network interface hour, plus query processing fees.',
    security: 'Requires target IP mappings and security groups to permit DNS traffic over port 53.',
    tips: 'Configure Outbound Resolver Rules to forward requests for your corporate domain (e.g. `*.corp`) to on-premises IP addresses.',
    traps: 'Do not attempt to route DNS traffic without enabling active VPN or Direct Connect routes between networks.',
    clues: 'route53 resolver, inbound resolver endpoint, outbound resolver endpoint, hybrid dns resolution'
  },
  {
    path: 'docs/02-solutions-architect-professional/Security, Identity & Compliance/active-directory-integration.md',
    title: 'AWS Active Directory Integration',
    category: 'Hybrid and Edge',
    analogy: 'Establishing a diplomatic passport treaty: you keep your passport system at home (On-premises AD) but AWS trust stamps it, allowing citizens to enter the border without getting a new ID.',
    description: 'AWS Active Directory integration enables you to connect AWS applications and resources to your existing Microsoft Active Directory, using Active Directory Connector, AWS Managed Microsoft AD, or Trust Relationships.',
    mermaid: `graph LR
    subgraph On-Premises
      AD[Microsoft Active Directory]
    end
    subgraph AWS Cloud
      ADC[Active Directory Connector] <-->|Proxy Auth AD Queries| AD
      App[AWS Console / Workspaces] --> ADC
    end`,
    comparison: `| Method | AD Connector | Managed Microsoft AD | trust relationship |
| :--- | :--- | :--- | :--- |
| **Directory Service**| Direct proxy wrapper | Fully functional AWS-hosted AD | Two-way forest trust link |
| **Database Sync?** | No database sync (real-time auth proxy) | Syncs local users to cloud database | Real-time delegation trust |
| **Best For** | On-premises auth proxy | Cloud-native workloads | Enterprise migrations |`,
    performance: 'Reduces directory lookup times by caching credentials locally in cloud configurations.',
    cost: 'AD Connector is highly cost-effective; Managed AD charges hourly rates based on directory sizes.',
    security: 'Maintains password policies and authorization controls on-premises, avoiding credential replication.',
    tips: 'Use AD Connector when you only need to authenticate AWS users against an on-premises directory without copying data.',
    traps: 'AD Connector requires active VPN/Direct Connect routing paths; if connection drops, cloud authentication fails.',
    clues: 'active directory integration, ad connector, managed microsoft ad, forest trust, federation AD'
  },

  // ==========================================
  // CLOUD FINANCIAL MANAGEMENT (6 pages)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/Cloud Financial Management/cost-allocation-tags.md',
    title: 'Cost Allocation Tags',
    category: 'Cost Optimization',
    analogy: 'Sticking color-coded label tags on office boxes: red for marketing department, blue for engineering, and green for HR, so the finance clerk can bill each team.',
    description: 'AWS Cost Allocation Tags organize and track your AWS costs. AWS uses these tags to group costs on your cost allocation report, making it easier to categorize and track spend.',
    mermaid: `graph TD
    Resource[AWS Resource: EC2] -->|Tag: Dept=Finance| Cost[Billing Engine Data]
    Cost -->|Filter| Report[Finance Cost Center Billing Ledger]`,
    comparison: `| Tag Type | AWS Generated Tags | User-Defined Tags |
| :--- | :--- | :--- |
| **Creation** | Automatically created by AWS | Created by users / terraform |
| **Example** | \`aws:createdBy\` | \`Project\`, \`CostCenter\`, \`Owner\` |
| **Activation** | Must be activated in Billing Console | Must be activated in Billing Console |`,
    performance: 'No runtime performance impact on active cloud compute architectures.',
    cost: 'Using and tracking cost allocation tags is free of charge.',
    security: 'Use SCPs and IAM boundary policies to enforce that resources cannot be launched without standard tags.',
    tips: 'Remember that tags must be explicitly activated in the Billing Console to appear in Cost Explorer.',
    traps: 'Untagged resources fall into an "unallocated cost" bucket, obscuring team expenditures.',
    clues: 'cost allocation tags, activate tags billing, resource categorization, cost center tracking'
  },
  {
    path: 'docs/02-solutions-architect-professional/Cloud Financial Management/cost-and-usage-reports.md',
    title: 'AWS Cost & Usage Report (CUR)',
    category: 'Cost Optimization',
    analogy: 'An itemized telephone bill listing every call duration, rate, timestamp, and destination down to the millisecond, exported as a spreadsheet for database review.',
    description: 'The AWS Cost & Usage Report (CUR) contains the most comprehensive set of cost and usage data available. It lists usage at the account, resource, and tag level.',
    mermaid: `graph LR
    Billing[AWS Billing Engine] -->|Daily Export CSV/Parquet| S3[Amazon S3 Bucket]
    S3 -->|Query via SQL| Athena[Amazon Athena Query Analysis]
    Athena -->|Visualize| QuickSight[Cost Visual dashboards]`,
    comparison: `| Tool | Cost Explorer | Cost & Usage Report (CUR) |
| :--- | :--- | :--- |
| **Data Granularity**| High-level summary visuals | Itemized row-by-row data logs |
| **Format** | Interactive web GUI | CSV or Parquet files in S3 |
| **Query Method** | Console filters | SQL Queries (Athena, Redshift) |`,
    performance: 'Athena queries against Parquet CUR data run in seconds, minimizing query runtimes.',
    cost: 'CUR reports are free; standard S3 storage and Athena search query scan charges apply.',
    security: 'Secure S3 buckets storing CUR reports using bucket policies and KMS keys to protect billing data.',
    tips: 'Use CUR with Athena to write custom SQL statements that check for billing anomalies at the resource level.',
    traps: 'CUR files can grow to multi-gigabyte sizes; configure compression (GZIP or Parquet) to save S3 storage costs.',
    clues: 'cost and usage report, cur, query cur athena, detailed billing log s3'
  },
  {
    path: 'docs/02-solutions-architect-professional/Cloud Financial Management/savings-plans-modeling.md',
    title: 'Savings Plans Modeling & Purchase',
    category: 'Cost Optimization',
    analogy: 'Buying a season pass for a railway line: you commit to spending $10/hour on travel for the year, receiving a massive discount compared to paying per ticket.',
    description: 'AWS Savings Plans offer significant savings over On-Demand pricing in exchange for a commitment to a consistent amount of usage (measured in $/hour) for a 1 or 3-year term.',
    mermaid: `graph TD
    Commit[Commitment: $10/hour spend] -->|Compute Usage < $10| Discount[Apply 66% Savings discount]
    Commit -->|Compute Usage > $10| OnDemand[Excess billed at standard On-Demand rate]`,
    comparison: `| Plan Type | Compute Savings Plans | EC2 Instance Savings Plans | SageMaker Savings Plans |
| :--- | :--- | :--- | :--- |
| **Flexibility** | Highest (EC2, Fargate, Lambda) | Restricted to family in specific region | SageMaker compute instances only |
| **Discount Rate** | Up to 66% | Up to 72% | Up to 64% |`,
    performance: 'No performance latency impact; Savings Plans are purely billing and discount constructs.',
    cost: 'Allows organizations to save up to 72% compared to standard On-Demand hourly compute costs.',
    security: 'Managed centrally in the Management Account of AWS Organizations, sharing discounts across member accounts.',
    tips: 'Use Cost Explorer recommendations to choose the optimal hourly commitment amount based on historical usage.',
    traps: 'Savings Plans cannot be cancelled or modified once purchased; ensure compute commitments are accurate.',
    clues: 'savings plans, compute commitment, hourly spend discount, savings plan recommendation'
  },
  {
    path: 'docs/02-solutions-architect-professional/Cloud Financial Management/reserved-instance-strategy.md',
    title: 'Reserved Instance (RI) Strategy',
    category: 'Cost Optimization',
    analogy: 'Signing a 3-year lease on an office suite: you get a massive discount on rent compared to renting by the day, but you are locked in to that specific location.',
    description: 'Amazon EC2 Reserved Instances (RIs) provide a discount compared to On-Demand pricing and can provide a capacity reservation when launched in a specific Availability Zone.',
    mermaid: `graph LR
    ZonalRI[Zonal Reserved Instance] -->|Guarantees Capacity| AZ[Availability Zone 1a]
    RegionalRI[Regional Reserved Instance] -->|Applies discount to family| Region[Main Region]`,
    comparison: `| Feature | Zonal RI | Regional RI | Savings Plans |
| :--- | :--- | :--- | :--- |
| **Capacity Guarantee**| Yes | No | No |
| **Billing Discount** | Yes | Yes | Yes |
| **Scope** | Zone-specific instance | Region-wide instance family | Any compute across region |`,
    performance: 'Zonal RIs guarantee instance capacity in the target AZ, preventing resource constraint errors during recovery events.',
    cost: 'Saves up to 72% compared to standard On-Demand rates. Standard RIs can be resold on the RI Marketplace.',
    security: 'Managed centrally via billing tools, allocating discounts automatically to matching instance types.',
    tips: 'Use Convertible RIs if you anticipate changing instance types or operating systems during the 3-year term.',
    traps: 'Regional RIs do NOT guarantee capacity. Only zonal configurations guarantee resource capacity in a specific zone.',
    clues: 'reserved instance, zonal ri capacity, convertible ri, standard ri marketplace'
  },
  {
    path: 'docs/02-solutions-architect-professional/Management & Governance/Operations & Optimization/AWS Compute Optimizer.md', isDetailed: true,
    title: 'AWS Compute Optimizer',
    category: 'Cost Optimization',
    analogy: 'A personal fitness coach who reviews your performance data and says: you are using a heavy truck to carry a single envelope; switch to a scooter to save fuel.',
    description: 'AWS Compute Optimizer recommends optimal AWS resources for your workloads to reduce costs and improve performance, using machine learning to analyze historical configurations.',
    mermaid: `graph LR
    Resource[EC2 / Lambda metrics] -->|Continuous Analysis| CO[AWS Compute Optimizer Engine]
    CO -->|Recommendations| Recs[Downgrade Over-provisioned / Upgrade Under-provisioned]`,
    comparison: `| Metric | Over-provisioned | Under-provisioned |
| :--- | :--- | :--- |
| **Resource State** | Idle CPU/Memory, high costs | CPU bottlenecks, slow performance |
| **Recommendation** | Downsize instance (save money) | Scale up instance (improve speed) |`,
    performance: 'Ensures instances are sized correctly to handle traffic loads, preventing performance drops and server resource exhaustion.',
    cost: 'Compute Optimizer is free; however, resizing instances dynamically reduces monthly operational bills.',
    security: 'Gathers operational metrics securely via AWS Systems Manager and CloudWatch integration.',
    tips: 'Look for "rightsizing recommendations", "identifying overprovisioned EC2 instances", or "Lambda memory optimizations" in the exam.',
    traps: 'Compute Optimizer requires at least 30 consecutive hours of CloudWatch metrics before it can generate recommendations.',
    clues: 'compute optimizer, rightsizing instance recommendations, over-provisioned compute, downsize recommendations'
  },
  {
    path: 'docs/02-solutions-architect-professional/Cloud Financial Management/chargeback-showback.md',
    title: 'Chargeback & Showback Methodologies',
    category: 'Cost Optimization',
    analogy: 'Chargeback is charging each roommate’s card for their exact share of the electricity bill based on room monitors; Showback is sticking the itemized bill on the fridge so they see how much they consume.',
    description: 'Chargeback allocates cloud costs back to the internal business units that generated them, while Showback presents costs to teams without actively billing their internal accounts.',
    mermaid: `graph TD
    S3[Data Lake Billing] -->|AWS Organizations Consolidated Billing| Management[Consolidated Invoice]
    Management -->|Chargeback| Dev[Charge Dev Team Card]
    Management -->|Showback| QA[Show QA Team usage report]`,
    comparison: `| Metric | Chargeback | Showback |
| :--- | :--- | :--- |
| **Action** | Transfers funds internally between departments | Reports usage costs for visibility |
| **Primary Goal** | Operational budget accountability | Awareness and cost culture education |
| **Complexity** | High (requires billing integration scripts) | Low (requires dashboard sharing) |`,
    performance: 'No performance overhead; these are financial governance methodologies.',
    cost: 'Improves cost culture, driving developers to terminate idle instances when their teams are charged directly.',
    security: 'Restricts billing data visibility to authorized accounting and engineering roles using IAM.',
    tips: 'Use AWS Billing Conductor to define custom pricing groups and manage billing structures for chargebacks.',
    traps: 'Do not implement chargeback systems without clear alignment from department leaders on how untagged costs are shared.',
    clues: 'chargeback, showback, billing conductor custom billing, consolidated invoice distribution'
  },

  // ==========================================
  // WELL-ARCHITECTED FRAMEWORK (1 page)
  // ==========================================
  {
    path: 'docs/02-solutions-architect-professional/well-architected-framework.md',
    title: 'AWS Well-Architected Framework',
    category: 'Well-Architected',
    analogy: 'A building inspection checklist: checking the structural integrity, safety escapes, lock standards, maintenance costs, and materials efficiency.',
    description: 'The AWS Well-Architected Framework helps cloud architects build secure, high-performing, resilient, and efficient infrastructure for their applications, structured around six pillars.',
    mermaid: `graph TD
    WA[Well-Architected Framework] --> Operational[Operational Excellence]
    WA --> Security[Security]
    WA --> Reliability[Reliability]
    WA --> Performance[Performance Efficiency]
    WA --> Cost[Cost Optimization]
    WA --> Sustainability[Sustainability]`,
    comparison: `| Pillar | Core Objective | Key AWS Service |
| :--- | :--- | :--- |
| **Operational Excellence** | Running and monitoring systems | CloudWatch, Systems Manager |
| **Security** | Protecting data and assets | IAM, KMS, Shield, GuardDuty |
| **Reliability** | Recovering from failures | Auto Scaling, Multi-AZ RDS |
| **Performance Efficiency** | Using compute resources efficiently | DynamoDB, ElastiCache, Auto Scaling |
| **Cost Optimization** | Avoiding unnecessary costs | Cost Explorer, Savings Plans |
| **Sustainability** | Minimizing environmental impact | Serverless architectures, instance sizing |`,
    performance: 'Helps design workloads that scale dynamically and utilize serverless compute to match user demand patterns.',
    cost: 'Provides design principles to optimize workloads and avoid over-provisioning infrastructure.',
    security: 'Establishes a baseline for identity access, data encryption, and incident response procedures.',
    tips: 'Review the six pillars carefully; exam scenarios will test your ability to trade off pillars (e.g. trading off cost to improve reliability).',
    traps: 'Do not view the Well-Architected Tool as a validator that configures resources; it is an assessment checklist tool.',
    clues: 'well-architected framework, operational excellence, security pillar, reliability disaster recovery, cost optimization, sustainability'
  }
];
