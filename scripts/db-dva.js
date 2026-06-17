module.exports = [
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/iam-deep-dive/iam-permission-boundaries.md',
    title: 'IAM Permission Boundaries',
    category: 'IAM Deep Dive',
    analogy: 'A boundary line set by a building owner: no matter what keycard permission a tenant gives their employees (IAM policies), they cannot access rooms beyond the building outer wall boundary.',
    description: 'An IAM permission boundary is an advanced security feature used to delegate policy creation authority to developers while preventing privilege escalation. It sets the maximum permissions that an identity-based policy can grant.',
    mermaid: `graph TD
    User[IAM User or Role] -->|Attached Permissions Policy| Auth[Allow Actions]
    User -->|Attached Permission Boundary| Limit[Maximum Allowed Actions]
    Auth & Limit -->|Intersection| Allowed[Effective Permissions]`,
    comparison: `| Feature | Identity-Based Policy | Permission Boundary | Service Control Policy (SCP) |
| :--- | :--- | :--- | :--- |
| **Applied To** | User or Role | User or Role | AWS Account or OU |
| **Use Case** | Grants permissions | Restricts maximum permissions | Restricts maximum permissions across accounts |
| **Allows Escalation?**| Yes, if not limited | No, limits delegation | No, overrides account admin |`,
    performance: 'Permission boundaries are evaluated during the auth decision process by IAM engine. There is zero performance latency impact on API requests.',
    cost: 'IAM features, including permission boundaries, are free of charge.',
    security: 'Ensures developers can create new roles and attach policies for Lambda functions or EC2 instances without the risk of creating a superuser admin role.',
    tips: 'Use permission boundaries to safely delegate IAM administrative tasks to non-admin users without risk of privilege escalation.',
    traps: 'A permission boundary by itself does NOT grant permissions. The user/role must still have an identity-based policy allowing the action.',
    clues: 'Delegating IAM role creation, preventing privilege escalation, setting maximum permissions boundary for developers.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/iam-deep-dive/iam-policy-evaluation.md',
    title: 'IAM Policy Evaluation Logic',
    category: 'IAM Deep Dive',
    analogy: 'A court system where a single "No" (Explicit Deny) immediately overrides all "Yes" (Allow) approvals, regardless of who signed them.',
    description: 'IAM Policy Evaluation Logic is the framework AWS uses to decide whether an API request is authorized. It evaluates identity-based, resource-based, permission boundaries, and SCPs.',
    mermaid: `graph TD
    Start[API Request] --> DenyCheck{Explicit Deny?}
    DenyCheck -->|Yes| Deny[Deny Access]
    DenyCheck -->|No| SCPCheck{SCP Allow?}
    SCPCheck -->|No| Deny
    SCPCheck -->|Yes| ResourcePolicy{Resource Policy Allow?}
    ResourcePolicy -->|Yes| Allow[Allow Access]
    ResourcePolicy -->|No| Boundary{Boundary Allow?}
    Boundary -->|No| Deny
    Boundary -->|Yes| IdentityPolicy{Identity Policy Allow?}
    IdentityPolicy -->|Yes| Allow
    IdentityPolicy -->|No| Deny`,
    comparison: `| Policy Type | Evaluated For | Can Deny? | Can Allow? |
| :--- | :--- | :--- | :--- |
| **Explicit Deny** | Everywhere | Yes (Immediate Override) | N/A |
| **SCP** | Multi-Account | Yes | Yes (Restricts) |
| **Resource Policy** | Resource itself | Yes | Yes (Bypasses Boundary if principal is local) |`,
    performance: 'IAM engine processes policies in micro-seconds, ensuring no delay to AWS API requests.',
    cost: 'Evaluated at no cost.',
    security: 'Crucial for implementing defense-in-depth security policies across identity and resource layers.',
    tips: 'Understand that resource-based policies can grant direct access to cross-account principals without requiring role assumption.',
    traps: 'An explicit deny in *any* policy always overrides any allows, even if the allow is in an administrator policy.',
    clues: 'API authorization flow, resource-based vs identity-based precedence, explicit deny overrides allow.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/iam-deep-dive/iam-cross-account-access.md',
    title: 'IAM Cross-Account Access',
    category: 'IAM Deep Dive',
    analogy: 'A visitor badge provided by a host company that lets a guest employee temporarily enter their building and access specific rooms.',
    description: 'IAM Cross-Account Access allows identities in one AWS account to safely access resources in another AWS account without sharing security credentials.',
    mermaid: `sequenceDiagram
    participant User as User (Account A)
    participant STS as AWS STS (Account B Role)
    participant Resource as S3 / DynamoDB (Account B)
    User->>STS: AssumeRole (sts:AssumeRole)
    STS-->>User: Temporary Security Credentials
    User->>Resource: Access Resource using Temp Credentials`,
    comparison: `| Method | AssumeRole | Resource-Based Policy |
| :--- | :--- | :--- |
| **Pros** | Provides temporary credentials, audit logs in destination | Faster access, does not require switching roles |
| **Cons** | Requires STS API call overhead | Not supported by all AWS services |`,
    performance: 'Requires a one-time latency cost for the STS `AssumeRole` call, after which local temp credentials are cached.',
    cost: 'Free, though STS calls are billed at standard minor execution rates if external.',
    security: 'Recommended over long-lived IAM user access keys, enforcing token rotation.',
    tips: 'Always configure the ExternalId when implementing cross-account access for third-party integrations to prevent the confused deputy problem.',
    traps: 'Cross-account resource policies do not automatically grant access to users in target accounts unless the target account administrators also allow it.',
    clues: 'Cross-account trust relationship, STS AssumeRole, temp credentials, External ID protection.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/iam-deep-dive/iam-abac.md',
    title: 'IAM Attribute-Based Access Control (ABAC)',
    category: 'IAM Deep Dive',
    analogy: 'An office keycard that reads your department tag (e.g., "Engineering") and automatically grants access only to doors labeled "Engineering".',
    description: 'Attribute-Based Access Control (ABAC) is an authorization strategy that defines permissions based on tags (attributes) attached to users, roles, and resources.',
    mermaid: `graph LR
    User[User Tag: Dept=Finance] -->|Request Write| Resource[Resource Tag: Dept=Finance]
    Resource -->|Tags Match?| IAM{IAM Decision Engine}
    IAM -->|Yes| Allow[Allow Write]
    IAM -->|No| Deny[Deny Write]`,
    comparison: `| Parameter | Role-Based Access Control (RBAC) | Attribute-Based Access Control (ABAC) |
| :--- | :--- | :--- |
| **Management** | Harder, requires creating new roles/policies | Easier, permissions scale automatically with tags |
| **Policy Count** | High | Low (Single policy for matching attributes) |
| **Granularity** | Coarse-grained | Fine-grained |`,
    performance: 'No performance latency difference compared to standard IAM evaluations.',
    cost: 'Tag-based evaluations are free of charge.',
    security: 'Reduces security team overhead when scaling teams or adding resources.',
    tips: 'Configure session tags in AWS STS to pass client-specific tags during role assumption for ABAC evaluations.',
    traps: 'If a resource or user is untagged or has typos in tags (e.g., "finance" vs "Finance"), access will be denied.',
    clues: 'Fine-grained access based on tag matching, dynamic policy scale, principal tags, resource tags.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/iam-deep-dive/iam-access-analyzer.md',
    title: 'IAM Access Analyzer',
    category: 'IAM Deep Dive',
    analogy: 'A security guard walking the perimeter of your building checking if any doors are accidentally left open to the public street.',
    description: 'IAM Access Analyzer monitors and analyzes resource policies to identify resources shared with external entities or public access.',
    mermaid: `graph TD
    Analyzer[IAM Access Analyzer] --> Scan[Scan S3, KMS, IAM Roles]
    Scan --> Find[Identify External/Public Access]
    Find --> Alert[Generate Findings in Console / EventBridge]`,
    comparison: `| Tool | IAM Access Analyzer | AWS Config |
| :--- | :--- | :--- |
| **Primary Scope** | Policy analysis (Mathematical proving) | Resource configuration state changes over time |
| **Automation** | Runs automatically on policy changes | Runs based on rule triggers |`,
    performance: 'Asynchronous analysis has zero runtime performance impact on active services.',
    cost: 'Free service within your account.',
    security: 'Identifies unintended external access path violations, preventing data leaks.',
    tips: 'Enable IAM Access Analyzer in all regions to detect cross-account role sharing or open S3 buckets.',
    traps: 'Access Analyzer only alerts on public or cross-account access; it does not automatically modify or lock down policies.',
    clues: 'Finding public access to S3, external access path detection, automated policy generator, mathematical verification.'
  },
  {
    path: 'docs/01-developer-associate/3-aws-serverless/lambda-advanced.md',
    title: 'AWS Lambda Deep Dive',
    category: 'AWS Serverless',
    analogy: 'A restaurant kitchen prep station that instantly boots up (Cold Start) when a customer orders, but remains warm and ready (Warm Start) for immediate subsequent orders.',
    description: 'AWS Lambda is a serverless function-as-a-service (FaaS) platform. Advanced Lambda engineering covers SnapStart, concurrency types, DLQs, Destinations, and execution environments.',
    mermaid: `graph TD
    Trigger[API Gateway / SQS] --> Lambda{Lambda Service}
    Lambda -->|No Idle Env| Cold[Cold Start: Init Runtime & Code]
    Lambda -->|Idle Env Exists| Warm[Warm Start: Invoke Handler]
    Cold --> Run[Execute Handler]
    Warm --> Run`,
    comparison: `| Parameter | Reserved Concurrency | Provisioned Concurrency |
| :--- | :--- | :--- |
| **Primary Goal** | Limits concurrency to prevent backend overload | Eliminates cold start latency |
| **Cost Impact** | Free | Hourly charge per provisioned block |
| **Scaling Cap** | Yes, strictly limits scale | No, functions scale beyond provisioned to on-demand |`,
    performance: 'SnapStart uses Firecracker VM micro-virtual machine snapshots to reduce Java application start times from seconds to sub-100ms.',
    cost: 'Provisioned concurrency is billed per GB-second allocated, regardless of invocation count.',
    security: 'Enforce execution roles with least-privilege policies and place functions in private VPCs for database access.',
    tips: 'Implement Lambda Destinations to route asynchronous invocation results (Success/Failure) to SQS, SNS, or EventBridge without code.',
    traps: 'Do not use Provisioned Concurrency if you do not have cold start performance constraints, as it introduces constant hourly running costs.',
    clues: 'Cold starts mitigation, SnapStart, reserved concurrency vs provisioned concurrency, SQS event source mapping.'
  },
  {
    path: 'docs/01-developer-associate/3-aws-serverless/api-gateway-advanced.md',
    title: 'API Gateway Deep Dive',
    category: 'AWS Serverless',
    analogy: 'A smart office receptionist who validates tickets (API Keys), routes visitors (Stage Variables), and limits the speed of entries (Throttling) to prevent overcrowding.',
    description: 'AWS API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.',
    mermaid: `graph LR
    Client[Web/Mobile Client] -->|Request| APIGW[API Gateway]
    APIGW -->|Authorizer| LambdaAuth[Lambda Authorizer]
    APIGW -->|Route| Backend[Lambda / HTTP / AWS Service]`,
    comparison: `| Feature | HTTP API | REST API |
| :--- | :--- | :--- |
| **Latency** | Ultra-low latency | Higher features, slightly higher latency |
| **Securities** | mTLS, JWT authorizers | mTLS, Cognito, IAM, API Keys, WAF |
| **Cost** | Much cheaper (~$1.00 per million) | Standard pricing (~$3.50 per million) |`,
    performance: 'Enable API Gateway caching to store backend responses and bypass Lambda execution for static endpoints, reducing latency.',
    cost: 'Billed per million requests processed, plus data transfer output fees.',
    security: 'Enable mTLS (mutual TLS) for client-to-API authentication, and configure AWS WAF to filter malicious web inputs.',
    tips: 'Use Stage Variables to dynamically point API Gateway integrations to different backend Lambda versions or aliases (e.g., dev, prod).',
    traps: 'API Gateway has a hard 29-second timeout limit for integration requests that cannot be increased.',
    clues: 'Throttling limit status code 429, mTLS integration, custom authorizer, stage variables, REST vs HTTP API.'
  },
  {
    path: 'docs/01-developer-associate/3-aws-serverless/dynamodb-advanced.md',
    title: 'DynamoDB Deep Dive',
    category: 'AWS Serverless',
    analogy: 'A dictionary index card catalog system where you can look up items directly by a word (Partition Key) or list them alphabetically within a category (Sort Key).',
    description: 'Amazon DynamoDB is a fully managed, serverless, multi-region NoSQL database. This advanced deep dive details adaptive capacity, transactions, PITR, and Global Tables.',
    mermaid: `graph TD
    Request[Write Request] --> Hash{Hash Function}
    Hash -->|Partition Key| Part1[Partition 1]
    Hash -->|Partition Key| Part2[Partition 2]
    Part1 --> GSI[Global Secondary Index Update]`,
    comparison: `| Feature | Local Secondary Index (LSI) | Global Secondary Index (GSI) |
| :--- | :--- | :--- |
| **Partition Key** | Same as base table | Can be different |
| **Sort Key** | Must be different | Can be different |
| **Creation** | Only at table creation | At table creation or any time |
| **Capacity** | Shares base table WCU/RCU | Has its own provisioned capacity |`,
    performance: 'Enable DynamoDB Accelerator (DAX) to provide microsecond response times for read-heavy key-value workloads.',
    cost: 'Billed based on Provisioned Capacity (RCU/WCU) or On-Demand Request Units, plus storage and backup sizes.',
    security: 'Use KMS customer managed keys for data encryption at rest, and IAM policy variables to restrict user access to their own data partitions.',
    tips: 'Use On-Demand capacity mode for unpredictable workloads to avoid throttling, and Provisioned capacity with Auto Scaling for stable traffic.',
    traps: 'Updating a GSI with low provisioned write capacity can throttle writes on the base table. Ensure GSIs have matching write capacities.',
    clues: 'Hot partition resolution, LSI vs GSI differences, ACID Transactions, DAX cache integration, PITR backups.'
  },
  {
    path: 'docs/01-developer-associate/3-aws-serverless/eventbridge-deep-dive.md',
    title: 'Amazon EventBridge',
    category: 'AWS Serverless',
    analogy: 'A centralized corporate mail hub that reads letters, matches their addresses/departments, and routes them to the correct office boxes.',
    description: 'Amazon EventBridge is a serverless event bus service that makes it easy to connect application data from various sources and route it to targets.',
    mermaid: `graph LR
    Source[S3 / Custom App] -->|Event| Bus[EventBridge Event Bus]
    Bus -->|Rule Match| Target1[Lambda Function]
    Bus -->|Rule Match| Target2[SQS Queue]`,
    comparison: `| Feature | EventBridge | Amazon SNS |
| :--- | :--- | :--- |
| **Payload Routing** | Rich JSON pattern matching | Simple message attributes |
| **Targets** | 20+ AWS target types | HTTP, SQS, SMS, Email |
| **Schema Registry** | Yes, auto-detects payload shapes | No |`,
    performance: 'EventBridge routes events asynchronously. Delivery times are typically sub-second, though not designed for real-time streaming operations.',
    cost: 'Billed per million custom events published. AWS service events are free.',
    security: 'Use resource-based policies on target resources (like SQS or Lambda) to allow EventBridge to trigger them.',
    tips: 'Use EventBridge Archive and Replay to capture event streams and replay them during testing or failure recovery phases.',
    traps: 'EventBridge has a default payload size limit of 256 KB. If events exceed this, use the claim-check pattern (S3 link).',
    clues: 'Event buses, schema registry, API destinations to call third-party endpoints, event replay, JSON rule match.'
  },
  {
    path: 'docs/01-developer-associate/4-aws-containers/ecs-capacity-providers.md',
    title: 'ECS Capacity Providers',
    category: 'AWS Containers',
    analogy: 'A logistics manager who dynamically rents trucks (EC2 instances) or hires courier bikes (Fargate containers) depending on the size and volume of packages.',
    description: 'ECS Capacity Providers manage the infrastructure scaling for tasks in an ECS cluster. They link Auto Scaling groups to container execution configurations.',
    mermaid: `graph TD
    Task[ECS Task Request] --> Prov[Capacity Provider]
    Prov -->|Scale Up| ASG[EC2 Auto Scaling Group]
    Prov -->|Serverless compute| Fargate[AWS Fargate]`,
    comparison: `| Compute Type | EC2 Instance Capacity | AWS Fargate |
| :--- | :--- | :--- |
| **Management** | Manual patches, host scaling configurations | Serverless, zero OS management |
| **Cost Model** | Billed per running EC2 instance | Billed per task CPU/Memory runtime |
| **Startup Speed** | Fast (if instances pre-warmed) | Moderate (takes seconds to boot container) |`,
    performance: 'Using Fargate Capacity Providers provides rapid scaling since there is no underlying OS VM boot latency to manage.',
    cost: 'Fargate Spot capacity providers offer up to a 70% discount compared to regular Fargate pricing, with interruption risk.',
    security: 'Isolate container networking using the `awsvpc` network mode, which assigns each task its own elastic network interface (ENI).',
    tips: 'Use ECS Cluster Auto Scaling (CAS) through Capacity Providers to automatically scale the EC2 host pool from zero based on task demand.',
    traps: 'Ensure target capacity tracking metrics are set correctly (e.g. 80-90%) to avoid constant scaling loops (thrashing).',
    clues: 'ECS auto scaling instance provider, Fargate Spot fallback, dynamic instance group mapping.'
  },
  {
    path: 'docs/01-developer-associate/4-aws-containers/ecs-autoscaling.md',
    title: 'ECS Auto Scaling',
    category: 'AWS Containers',
    analogy: 'A highway that automatically opens extra lanes (Tasks) during rush hour and closes them at midnight to keep traffic moving.',
    description: 'ECS Auto Scaling is the system that dynamically adjust the desired task count of an ECS Service in response to CPU/Memory utilization or custom CloudWatch metrics.',
    mermaid: `graph TD
    CW[CloudWatch Alarms] -->|CPU > 80%| Scale{ECS Service Auto Scaling}
    Scale -->|Add Task| Service[ECS Service Task Pool]`,
    comparison: `| Scaling Policy | Target Tracking | Step Scaling |
| :--- | :--- | :--- |
| **Metric Goal** | Maintains specific metric value (e.g., 70% CPU) | Responds based on step metrics (e.g., if CPU > 85%, add 3 tasks) |
| **Setup Complexity**| Very simple | Moderate |`,
    performance: 'Container metrics are evaluated by CloudWatch in 1-minute intervals, enabling reactive scaling configurations.',
    cost: 'Auto scaling itself is free; you only pay for the containers/instances launched.',
    security: 'Ensure IAM execution roles have permissions to publish metrics to CloudWatch for scaling decisions.',
    tips: 'Combine target tracking CPU scaling with target tracking Memory scaling to protect tasks against memory leaks.',
    traps: 'Always configure a cooldown period to allow newly launched tasks to boot and start handling load before calculating another scaling step.',
    clues: 'Dynamic task scaling, target tracking CPU utilization, ECS service scaling cooldowns.'
  },
  {
    path: 'docs/01-developer-associate/4-aws-containers/eks-fundamentals.md',
    title: 'EKS Fundamentals',
    category: 'AWS Containers',
    analogy: 'A centralized shipping port container yard supervisor (Kubernetes Control Plane) that organizes cargo bays managed by hired laborers.',
    description: 'Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service that runs Kubernetes control plane infrastructure across multiple Availability Zones.',
    mermaid: `graph LR
    Control[EKS Control Plane] -->|Manage| Workers[EKS Managed Node Groups]
    Workers -->|Run| Pods[Kubernetes Pods]`,
    comparison: `| Feature | Amazon ECS | Amazon EKS (Kubernetes) |
| :--- | :--- | :--- |
| **Ecosystem** | AWS Native, tight integration | Open-source Kubernetes APIs, high portability |
| **Configuration** | Simple Task Definitions | Complex YAML Manifests (Pods, Deployments) |
| **Management Cost** | Free (only pay for resources) | Control Plane fee ($0.10/hour) |`,
    performance: 'Use the AWS VPC CNI plugin to assign native VPC IP addresses to Kubernetes pods, providing line-rate networking speed.',
    cost: 'EKS charges $0.10 per hour per cluster for control plane management, in addition to worker node EC2/Fargate costs.',
    security: 'Use IAM Roles for Service Accounts (IRSA) to assign least-privilege IAM policies directly to individual Kubernetes pods.',
    tips: 'Use EKS managed node groups to automate the lifecycle management (creation, update, termination) of Kubernetes worker instances.',
    traps: 'Do not use hardcoded IAM access keys inside pod containers. Always use IRSA or instance profiles for AWS authentication.',
    clues: 'Kubernetes on AWS, managed control plane, IRSA pod authorization, pod networking CNI.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/monitoring-and-audit/cloudwatch-advanced.md',
    title: 'CloudWatch Advanced',
    category: 'Monitoring and Audit',
    analogy: 'A high-tech monitoring room with screens displaying live statistics (Metrics), log files scrolling (Logs), and loud alarms ringing (Alarms).',
    description: 'AWS CloudWatch is a monitoring and observability service that provides data and actionable insights for AWS resources and applications.',
    mermaid: `graph TD
    App[App Container] -->|Logs & Metrics| CW[CloudWatch Engine]
    CW -->|Filters| MetricFilters[Metric Filters]
    CW -->|Alarm Condition| Alarms[CloudWatch Alarms]
    Alarms -->|Trigger| SNS[Amazon SNS Notification]`,
    comparison: `| Feature | CloudWatch Logs | CloudWatch Metrics | CloudWatch Events (EventBridge) |
| :--- | :--- | :--- | :--- |
| **Data Type** | Text output log lines | Numeric time-series values | Structured JSON system events |
| **Retention** | Customizable (1 day to Infinite) | Up to 15 months | Ephemeral (unless archived) |`,
    performance: 'CloudWatch metrics are retrieved in intervals ranging from 1 second (high-resolution) to 1 minute (standard).',
    cost: 'Billed per custom metric, per GB of logs ingested/stored, and per alarm configured.',
    security: 'Encrypt logs at rest using AWS KMS Customer Managed Keys, and use IAM policies to restrict log group read access.',
    tips: 'Use CloudWatch Logs Metric Filters to search text log streams for specific strings (e.g. "ERROR") and increment a numeric metric.',
    traps: 'Metric filters do not process historical logs; they only count matches for logs ingested after the filter is created.',
    clues: 'Metric filters, custom namespace metrics, high-resolution alarm configuration, log group KMS encryption.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/monitoring-and-audit/xray-advanced.md',
    title: 'AWS X-Ray Advanced',
    category: 'Monitoring and Audit',
    analogy: 'An dye tracer test injected into a plumbing network to trace exactly which pipe gets blocked or experiences high pressure (Latency).',
    description: 'AWS X-Ray is a distributed tracing service that helps developers analyze and debug production, distributed applications, such as microservices.',
    mermaid: `graph LR
    Client[Client] -->|Request| APIGW[API Gateway]
    APIGW -->|Segment 1| Lambda[AWS Lambda]
    Lambda -->|Segment 2| Dynamo[DynamoDB Table]`,
    comparison: `| Telemetry | X-Ray Annotations | X-Ray Metadata |
| :--- | :--- | :--- |
| **Searchable** | Yes (Indexed by X-Ray query language) | No (Arbitrary JSON structure) |
| **Use Case** | Filter traces by UserID, TenantID, Stage | Raw stack traces, complete database responses |`,
    performance: 'To prevent application performance overhead, configure the X-Ray daemon to sample traffic (e.g., 5% of requests) instead of tracing 100%.',
    cost: 'Billed per million traces stored and scanned.',
    security: 'Traces contain application identifiers; use KMS key integration if traces contain sensitive database query telemetry.',
    tips: 'Use subsegments to trace specific database queries or HTTP calls made from within your Lambda function code.',
    traps: 'X-Ray annotations are restricted to string, integer, or boolean values; complex objects must be stored in metadata.',
    clues: 'Distributed tracing, trace segment vs subsegment, searchable annotations, non-indexed metadata, X-Ray daemon port 2000 UDP.'
  },
  {
    path: 'docs/01-developer-associate/5-others/cognito.md',
    title: 'AWS Cognito Integration',
    category: 'Security and Authentication',
    analogy: 'A festival gateway: User Pools checks your ID ticket at the entrance gate (Authentication), and Identity Pools exchanges it for a staff badge with keys to the supply closets (Authorization).',
    description: 'AWS Cognito provides authentication, authorization, and user management for web and mobile applications. It separates identity directories from temporary credentials.',
    mermaid: `graph TD
    Client[Mobile/Web App] -->|Login| CUP[Cognito User Pool]
    CUP -->>Client[JWT ID / Access Token]
    Client -->|Present JWT| CIP[Cognito Identity Pool]
    CIP -->|Request Temp Role| STS[AWS STS]
    STS -->>CIP[Temporary IAM Credentials]
    CIP -->>Client[Access S3/DynamoDB directly]`,
    comparison: `| Parameter | Cognito User Pools (CUP) | Cognito Identity Pools (CIP) |
| :--- | :--- | :--- |
| **Primary Output** | JSON Web Tokens (JWT) | Temporary AWS IAM Credentials |
| **Function** | User signup/login directory | Authorizes access to AWS resources |
| **Integrations** | API Gateway, ALB | S3, DynamoDB, STS |`,
    performance: 'JWT verification is done locally by APIs using public keys, saving a round-trip network call to Cognito.',
    cost: 'Billed per Monthly Active Users (MAUs), featuring a generous free tier of 50,000 MAUs.',
    security: 'Configure Advanced Security features in CUP to enable adaptive risk-based authentication and compromised credential detection.',
    tips: 'Use Lambda triggers to customize JWT claims, validate registration fields, or migrate users from legacy databases during login.',
    traps: 'Never expose raw IAM credentials on client applications. Always use Cognito Identity Pools to exchange login tokens for temporary session roles.',
    clues: 'User Directory database, User Pools vs Federated Identity Pools, JWT verification, Lambda auth triggers.'
  },
  {
    path: 'docs/01-developer-associate/5-others/jwt-and-authentication.md',
    title: 'JWT and Authentication',
    category: 'Security and Authentication',
    analogy: 'A signed luggage ticket: the airline agent writes the details and stamps it. Anyone can read the tag, but no one can alter it without breaking the stamp signature.',
    description: 'JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.',
    mermaid: `graph TD
    JWT[JWT String] --> Header[Header: Algorithm & Type]
    JWT --> Payload[Payload: Claims - UserID, Expiration]
    JWT --> Signature[Signature: Cryptographically Signed Hash]`,
    comparison: `| Token Type | ID Token | Access Token | Refresh Token |
| :--- | :--- | :--- | :--- |
| **Target Audience**| Client App (contains profile claims) | Resource Server (APIs, ALB) | Auth Server (reissues tokens) |
| **Lifespan** | Short-lived (e.g. 1 hour) | Short-lived (e.g. 1 hour) | Long-lived (e.g. 30 days) |`,
    performance: 'Zero database lookups are required for validation, as JWT contains expiration and signature verification keys locally.',
    cost: 'Token-based validation requires no operational infrastructure, reducing resource costs.',
    security: 'Always verify the JWT signature using the public JSON Web Key Set (JWKS) provided by the Identity Provider before extracting payload data.',
    tips: 'Store Refresh Tokens securely in HttpOnly cookies to protect them from cross-site scripting (XSS) attacks.',
    traps: 'JWTs are base64-encoded, not encrypted. Do not store sensitive info (like database passwords or API keys) inside the JWT payload.',
    clues: 'JSON Web Token sections header payload signature, JWKS public validation, stateless session architecture.'
  },
  {
    path: 'docs/01-developer-associate/5-others/sigv4.md',
    title: 'Signature Version 4 (SigV4)',
    category: 'Security and Authentication',
    analogy: 'A wax-sealed envelope with a stamp: if someone intercepts the mail and changes the message, the stamp seal is broken, alerting the receiver of tampering.',
    description: 'Signature Version 4 (SigV4) is the protocol AWS uses to authenticate API requests sent to AWS services. It uses cryptographic hashing to sign incoming payloads.',
    mermaid: `graph TD
    Req[Raw API Request] --> Canonical[Canonical Request String]
    Canonical --> Hashed[Create String to Sign]
    Hashed --> Signature[Generate Signature using Secret Access Key]
    Signature --> Header[Add to Authorization Header]`,
    comparison: `| Signing Protocol | Signature Version 4 (SigV4) | Signature Version 2 (Legacy) |
| :--- | :--- | :--- |
| **Hashing Algorithm** | SHA-256 | MD5 / SHA-1 (Deprecated) |
| **Security** | Highly secure (Scoped signature keys) | Less secure (Uses raw secret key directly) |`,
    performance: 'SDKs handle request signing locally in milliseconds, causing negligible CPU latency.',
    cost: 'No additional charge for request authentication.',
    security: 'SigV4 protects against man-in-the-middle attacks by including the request timestamp in the signed hash, preventing replay attacks.',
    tips: 'Use SigV4 signing headers to create S3 pre-signed URLs, allowing clients to securely upload files without AWS credentials.',
    traps: 'Signed requests are timestamp-sensitive; if the client clock drifts by more than 5 minutes from AWS servers, the request is rejected.',
    clues: 'AWS API request authentication, pre-signed URL validation, payload hashing, HMAC-SHA256, 5-minute clock drift rule.'
  },
  {
    path: 'docs/01-developer-associate/5-others/parameter-store-vs-secrets-manager.md',
    title: 'Parameter Store vs Secrets Manager',
    category: 'Security and Authentication',
    analogy: 'Parameter Store is a standard secure cabinet for office supplies (Variables/Passwords); Secrets Manager is an armored vault with a robotic guard that changes the locks every month (Auto Rotation).',
    description: 'SSM Parameter Store and Secrets Manager are AWS key-value configuration stores. Choosing between them depends on cost, rotation requirements, and secret size.',
    mermaid: `graph TD
    App[Application Node] -->|Fetch Secrets| SecretsMgr[Secrets Manager: Auto-Rotates Credentials via Lambda]
    App -->|Fetch Config| SSM[Parameter Store: Standard Secure Key-Value]`,
    comparison: `| Feature | SSM Parameter Store | AWS Secrets Manager |
| :--- | :--- | :--- |
| **Cost** | Free (Standard parameters) | $0.40 per secret per month |
| **Auto-Rotation** | Requires manual or custom scripts | Native integration with Lambda rotation |
| **API Limit** | High (Up to 10,000 TPS enabled) | Lower base limits (requires ticket/tuning) |
| **Cross-Account** | Difficult | Native support via resource policies |`,
    performance: 'Enable Parameter Store API throughput upgrades if you scale to thousands of concurrent container invocations.',
    cost: 'Secrets Manager costs $0.40 per secret per month plus $0.05 per 10,000 API requests. Parameter store is free for standard configurations.',
    security: 'Both support KMS encryption at rest. Secrets Manager integrates directly with RDS, Redshift, and DocumentDB secrets.',
    tips: 'Use Parameter Store for standard app configs (e.g. database hostnames) and Secrets Manager for sensitive access keys requiring rotation.',
    traps: 'Do not use Secrets Manager for non-sensitive settings (like build numbers), as it will unnecessarily inflate your monthly AWS bill.',
    clues: 'AWS database credential rotation, cross-account secret sharing, parameter store pricing compared to secrets manager.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/cloud9.md',
    title: 'AWS Cloud9 IDE',
    category: 'AWS Developer Tooling',
    analogy: 'A rented workstation setup pre-installed with every tool you need, accessible via a web browser from any computer.',
    description: 'AWS Cloud9 is a cloud-based integrated development environment (IDE) that lets you write, run, and debug code with just a browser.',
    mermaid: `graph TD
    Browser[Client Browser] -->|SSH / HTTPS| Cloud9[Cloud9 EC2 Workspace Environment]
    Cloud9 -->|IAM Role| AWS[AWS API Services]`,
    comparison: `| Environment | Cloud9 IDE | Local VS Code |
| :--- | :--- | :--- |
| **Pre-configurations**| AWS CLI, SDKs, Docker pre-installed | Requires manual setup |
| **Authentication** | Automatic IAM credential delegation | Requires manual profiles setup |`,
    performance: 'Cloud9 starts an EC2 instance to back the workspace. It pauses the EC2 instance automatically after a custom timeout (e.g. 30 mins) to save compute.',
    cost: 'No additional charge for the IDE software; you only pay for the backing EC2 instance and EBS storage volume.',
    security: 'Restricts workspace access using IAM policies. Workspace instances run in public or private subnets.',
    tips: 'Use the integrated terminal to run AWS CLI commands using the default Cloud9 temporary credentials.',
    traps: 'Cloud9 temporary credentials may block specific AWS operations like modifying IAM boundaries; disable them and attach an IAM role if needed.',
    clues: 'Browser-based IDE, EC2 auto-shutdown configuration, pre-loaded development environment, real-time code sharing.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/codeartifact.md',
    title: 'AWS CodeArtifact',
    category: 'AWS Developer Tooling',
    analogy: 'A private corporate warehouse that stores both proprietary building materials (Packages) and verifies external shipments before delivery to workers.',
    description: 'AWS CodeArtifact is a fully managed artifact repository service that makes it easy for organizations to securely store, publish, and share software packages.',
    mermaid: `graph LR
    npm[Public npm / PyPI] -->|Upstream Connection| Repo[CodeArtifact Repository]
    Repo -->|Fetch Dependency| Developer[Developer / CodeBuild]`,
    comparison: `| Tool | AWS CodeArtifact | Public npm registry |
| :--- | :--- | :--- |
| **Access Control** | IAM Policies, VPC Endpoint isolation | Public, token-based authentication |
| **Pricing** | Billed per GB stored + requests | Free for public, billing for private accounts |`,
    performance: 'Integrate CodeArtifact repositories with AWS VPC Endpoints to fetch package dependencies over the private AWS backbone, reducing latency.',
    cost: 'Billed per GB stored, and per million requests for package metadata.',
    security: 'Restricts package publication and ingestion using repository-level policies and KMS key encryption.',
    tips: 'Use Upstream Connections to configure CodeArtifact to automatically cache dependencies fetched from public registries like npm, Maven, or PyPI.',
    traps: 'Ensure to call the CodeArtifact authorization token command (`get-authorization-token`) to update local npm/pip tokens before running builds.',
    clues: 'Secure package registry on AWS, caching upstream dependencies, package token authentication.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/codecatalyst.md',
    title: 'Amazon CodeCatalyst',
    category: 'AWS Developer Tooling',
    analogy: 'A complete developer toolbox containing the project template, pipeline configuration, development environment, and task board in one package.',
    description: 'Amazon CodeCatalyst is a unified software development service for developer teams to configure pipelines, issues, dev environments, and deployments on AWS.',
    mermaid: `graph TD
    Developer[Developer] -->|Collaborate| Catalyst[CodeCatalyst Project Space]
    Catalyst --> DevEnv[Cloud Development Environments]
    Catalyst --> Pipelines[CI/CD Pipelines]
    Catalyst --> Deploy[AWS Target Account]`,
    comparison: `| Service | CodeCatalyst | CodeSuite (CodeCommit/Build/Deploy) |
| :--- | :--- | :--- |
| **Setup Complexity**| Very low (Single unified workspace) | High (Requires wiring distinct services together) |
| **Repository** | Git repos hosted inside CodeCatalyst or GitHub | AWS CodeCommit |`,
    performance: 'Pipelines run on managed runner containers, speeding up compile and deploy tasks.',
    cost: 'Free tier covers basic developers, storage, and build minutes; billing applies to advanced plans.',
    security: 'Integrates with AWS IAM Identity Center for enterprise developer login authentication.',
    tips: 'Use Cloud Development Environments (CDE) in CodeCatalyst to instantly spin up pre-configured workspaces.',
    traps: 'CodeCatalyst is a SaaS platform; configuration is separate from standard AWS CloudFormation configs.',
    clues: 'Unified developer service, project space setup, cloud development environment integration.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/appconfig.md',
    title: 'AWS AppConfig',
    category: 'AWS Developer Tooling',
    analogy: 'A remote control dimmer switch: you can dynamically adjust the brightness of lights (App Features) without replacing the lightbulbs (Code deployments).',
    description: 'AWS AppConfig is a capability of AWS Systems Manager used to create, manage, and quickly deploy application configurations independently of code.',
    mermaid: `graph LR
    Developer[Developer] -->|Update Toggle| AppConfig[AWS AppConfig]
    AppConfig -->|Linear Rollout| Instances[Application Containers]
    Instances -->|Validation Fail| Rollback[Automatic Rollback via Alarm]`,
    comparison: `| Configuration Method | AppConfig Deployment | Redeploying App Code |
| :--- | :--- | :--- |
| **Execution Time** | Seconds | Minutes (Requires full compilation/CI/CD loop) |
| **Risk Profile** | Low (Automatic alarm-based rollbacks) | High (Requires full service restart) |`,
    performance: 'AppConfig APIs cache configuration settings locally in application memory, avoiding repeated network requests to AWS.',
    cost: 'Billed per configuration retrieval API call.',
    security: 'Use IAM resource policies to restrict who can deploy configuration changes or flip feature flags.',
    tips: 'Configure AppConfig validators (JSON Schema or Lambda functions) to automatically verify configuration content before deploying.',
    traps: 'Configure CloudWatch Alarms inside AppConfig to monitor service errors; if an alarm fires during rollout, it initiates an automatic rollback.',
    clues: 'Feature flag management, linear rollout validation, automatic rollback via CloudWatch alarm.'
  },
  {
    path: 'docs/01-developer-associate/2-aws-deep-dive/cloudshell.md',
    title: 'AWS CloudShell',
    category: 'AWS Developer Tooling',
    analogy: 'A key to a developer shell: you log in to your console and click a button to get a terminal with full AWS CLI pre-authenticated keys.',
    description: 'AWS CloudShell is a browser-based shell that makes it easy to manage, explore, and interact with AWS resources securely.',
    mermaid: `graph TD
    Console[AWS Console User] -->|Click Terminal Icon| CS[AWS CloudShell Instance]
    CS -->|Pre-authenticated Role| AWS[AWS API Endpoint]`,
    comparison: `| CLI Environment | CloudShell | Local Terminal |
| :--- | :--- | :--- |
| **Authentication** | Automatic (Uses console user credentials) | Requires configuring credentials profiles |
| **Persistent Storage**| 1 GB persistent storage in home directory | Local disk drive storage |`,
    performance: 'Spins up a lightweight Linux container in seconds with major developer utilities pre-installed.',
    cost: 'Free service; you only pay for storage/resources outside the CloudShell container.',
    security: 'Enforces security by running instances in isolation and terminating them after sessions end.',
    tips: 'Use CloudShell to run quick ad-hoc scripts, upload files, or perform database queries without local tool requirements.',
    traps: 'Files stored outside the home directory (`$HOME`) are lost when the CloudShell session terminates or times out.',
    clues: 'Browser CLI terminal, pre-configured AWS CLI environment, persistent home directory storage.'
  }
];
