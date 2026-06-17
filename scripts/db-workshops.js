module.exports = [
  {
    path: 'docs/04-architecture-workshops/enterprise-landing-zone.md',
    title: 'Workshop 1: Enterprise Landing Zone',
    scenario: 'You are the Lead Cloud Architect at an enterprise with 100+ developers. You must design and deploy a multi-account AWS Landing Zone that enforces baseline security guardrails, centralizes logging, manages identities via Single Sign-On, and automates account creation.',
    mermaid: `graph TD
    CT[AWS Control Tower] -->|Deploys| Org[AWS Organizations]
    Org --> Shared[Shared Services OU]
    Org --> Core[Core Security OU]
    Core --> Log[Log Archive Account - S3]
    Core --> Audit[Security Audit Account]
    Org --> Workloads[Workloads OU]
    Workloads --> Dev[Dev Account]
    Workloads --> Prod[Prod Account]`,
    step_by_step: `1. **Initialize Control Tower:** Log into the Management account, navigate to the AWS Control Tower console, and execute the Landing Zone setup. Configure the Core OU name to "Security" and the custom log archive retention parameters.
2. **Configure Security Hub & GuardDuty:** In the Audit account, enable Amazon GuardDuty and AWS Security Hub. Set the Audit account as the delegated administrator for the entire organization to aggregate finding databases.
3. **Set Up IAM Identity Center (SSO):** Map IAM Identity Center to your enterprise identity directory (OIDC or Okta). Create permission sets: "AdministratorAccess" (billing/admin) and "ViewOnlyAccess" (audit).
4. **Deploy Service Control Policies (SCPs):** Attach an SCP to the Workloads OU that prevents member accounts from disabling CloudTrail logs or modifying Control Tower resource groups.
5. **Launch Account Factory:** Go to Service Catalog, select the Account Factory product, specify parameters for the new "Billing-Dev" account, and execute deployment.`,
    verification: `- Log into the newly created "Billing-Dev" account and attempt to disable CloudTrail. Verify that the operation is blocked with an AccessDenied error from the SCP.
- Check the central Log Archive S3 bucket and confirm that audit logs from the dev account are streaming into the log prefix.`,
    cleanup: `- Decommission accounts created by Account Factory by executing account closure rules in the AWS Organizations console.
- Terminate Control Tower configurations if a complete decommissioning is required, deleting baseline log archive buckets.`
  },
  {
    path: 'docs/04-architecture-workshops/global-saas-platform.md',
    title: 'Workshop 2: Global SaaS Platform',
    scenario: 'You are designing a high-throughput, global Software-as-a-Service (SaaS) web application. The platform must serve users in the US and Europe with low network latency, survive the failure of an entire AWS Region, and maintain consistent database records globally.',
    mermaid: `graph LR
    UserUS[User US] -->|HTTP| CF[Amazon CloudFront]
    UserEU[User Europe] -->|HTTP| CF
    CF -->|Route US| ALB1[ALB US-East-1]
    CF -->|Route EU| ALB2[ALB EU-West-1]
    ALB1 --> Lambda1[Lambda Compute]
    ALB2 --> Lambda2[Lambda Compute]
    Lambda1 & Lambda2 <--> DB[(DynamoDB Global Tables)]`,
    step_by_step: `1. **Create DynamoDB Global Table:** Provision a DynamoDB table named "SaaS-Metadata" in us-east-1. Add replica regions in eu-west-1. Enable DynamoDB Streams and configure PITR backups.
2. **Build Serverless Compute APIs:** Deploy matching Lambda functions and API Gateway REST endpoints in both us-east-1 and eu-west-1, linking them to local DynamoDB table partitions.
3. **Configure Application Load Balancers:** Deploy ALBs in both regions pointing to your compute container pools (ECS/Fargate) to balance active server runs.
4. **Deploy Amazon CloudFront Distribution:** Create a global CloudFront distribution. Configure origin groups pointing to both the US ALB and Europe ALB. Set up failover routing policies using CloudFront origin failover rules.
5. **Configure Route 53 Geoproximity Rules:** Route DNS records to CloudFront, enabling health-check based regional failover.`,
    verification: `- Perform a curl request to the CloudFront distribution from a US-located proxy and verify the headers confirm routing through the us-east-1 ALB.
- Terminate all ECS tasks in us-east-1 and verify that subsequent requests failover automatically to the eu-west-1 endpoint within 10 seconds.`,
    cleanup: `- Delete the CloudFront distribution.
- Terminate the ALBs and associated EC2 target groups in both regions.
- Delete the DynamoDB Global Table, confirming deletion of replica regions.`
  },
  {
    path: 'docs/04-architecture-workshops/hybrid-enterprise-network.md',
    title: 'Workshop 3: Hybrid Enterprise Network',
    scenario: 'Your company is migrating core business servers to AWS. You must connect on-premises data centers to multiple AWS VPCs across accounts, enabling DNS resolution of local corp names from the cloud and ensuring high-availability network connections.',
    mermaid: `graph TD
    subgraph AWS Cloud [AWS Cloud]
      TGW[Transit Gateway] --> VPC1[App VPC A]
      TGW --> VPC2[Db VPC B]
      TGW --> OutboundResolver[Route 53 Outbound Resolver]
    end
    subgraph On-Premises [On-Premises Data Center]
      Router[Core Router] <--> DNS[Local DNS Server]
    end
    TGW <-->|Direct Connect / Active VPN| Router
    OutboundResolver -->|Forward *.corp queries| DNS`,
    step_by_step: `1. **Deploy AWS Transit Gateway:** Create a Transit Gateway (TGW) in your network account. Attach the App VPC and Database VPC to the TGW, ensuring subnets have correct route tables.
2. **Configure Direct Connect & VPN Backup:** Set up an AWS Direct Connect (DX) link to your local data center router. Provision a site-to-site VPN connection over the internet as an active backup route. Configure BGP routing to advertise paths.
3. **Configure TGW Route Tables:** Set up a central TGW route table. Enable route propagation so that TGW dynamically learns local on-premises IP networks.
4. **Deploy Route 53 Resolver Endpoints:** In your shared VPC, create a Route 53 Inbound Endpoint and an Outbound Endpoint. Assign static IP addresses from the subnet range.
5. **Configure DNS Forwarding Rules:** Create an outbound resolver rule for the domain "corp.internal" pointing to the IP addresses of your on-premises DNS servers. Associate this rule with all VPCs.`,
    verification: `- Run a nslookup query from an EC2 instance inside the App VPC for a local server: \`nslookup database.corp.internal\`. Verify that the outbound resolver forwards the request and returns the correct local IP.
- Simulate a DX link outage by dropping BGP sessions. Verify that traffic automatically switches to the backup VPN connection route within 15 seconds.`,
    cleanup: `- Delete the DNS resolver rules and endpoints.
- Delete the Transit Gateway attachments and terminate the Transit Gateway instance.
- Terminate the VPN connection and release Direct Connect virtual interfaces.`
  },
  {
    path: 'docs/04-architecture-workshops/multi-region-dr.md',
    title: 'Workshop 4: Multi-Region Disaster Recovery',
    scenario: 'You are the Lead Reliability Architect. You must design and implement a Multi-Region Disaster Recovery pipeline for a critical database application, targeting a Recovery Time Objective (RTO) under 5 minutes and a Recovery Point Objective (RPO) under 1 minute.',
    mermaid: `graph LR
    subgraph Primary Region [US-East-1]
      DB1[(Aurora Primary)]
    end
    subgraph Secondary Region [US-West-2]
      DB2[(Aurora Global Replica)] -->|Promote| DB2Primary[(New Primary DB)]
    end
    DB1 -.->|Global DB Replication| DB2`,
    step_by_step: `1. **Deploy Aurora Global Database:** Provision an Amazon Aurora PostgreSQL database cluster in us-east-1. Add a secondary replica cluster in us-west-2, configuring global database replication.
2. **Configure AWS Application Migration Service (MGN):** Install the replication agent on your application servers. Set us-west-2 as the target disaster recovery region.
3. **Deploy Route 53 Application Recovery Controller (ARC):** Create routing controls for both regions. Set up health checks that monitor compute and database state flags.
4. **Configure Automated Failover Scripts:** Write a Lambda function or configure AWS ARC to promote the Aurora replica in us-west-2 to primary database status during failovers.
5. **Execute DR Drill:** Trigger a mock primary region outage by blocking outbound database access in us-east-1.`,
    verification: `- Run the recovery script. Verify that the secondary Aurora cluster in us-west-2 is promoted to primary status within 2 minutes (meeting RTO).
- Check replication logs to verify that the replication lag was under 5 seconds prior to the drill (meeting RPO).`,
    cleanup: `- Convert the secondary promoted database back to a global replica under the primary region.
- Terminate active replication instances inside AWS MGN staging subnets.`
  },
  {
    path: 'docs/04-architecture-workshops/media-streaming-platform.md',
    title: 'Workshop 5: Media Streaming Platform',
    scenario: 'You are building a high-speed video-on-demand (VOD) streaming application. The platform must process raw video uploads, transcode them into multiple resolution formats (1080p, 720p, 480p), and deliver them to users worldwide with minimum latency.',
    mermaid: `graph LR
    User[Client Browser] -->|Upload video| S31[Upload S3 Bucket]
    S31 -->|Trigger event| Lambda[Lambda Transcoder Trigger]
    Lambda -->|Start Job| EMC[Elemental MediaConvert]
    EMC -->|Write MP4/HLS streams| S32[Publish S3 Bucket]
    S32 -->|Distribution Edge| CF[Amazon CloudFront]
    CF -->|Stream| User`,
    step_by_step: `1. **Set Up S3 Buckets:** Create two S3 buckets: "vod-uploads-source" and "vod-delivery-publish". Enable versioning and KMS encryption.
2. **Configure MediaConvert Job Template:** Go to AWS Elemental MediaConvert, create a custom job template specifying output groups for Apple HLS (HTTP Live Streaming) at 1080p, 720p, and 480p.
3. **Write Lambda Orchestrator:** Write a Lambda function triggered by S3 \`ObjectCreated\` events on the source bucket. The function parses the file path and submits a job to MediaConvert using the template.
4. **Deploy Amazon CloudFront:** Create a CloudFront distribution with "vod-delivery-publish" as the S3 origin. Configure origin access control (OAC) to secure media files.
5. **Set Up HLS Player Client:** Configure a web-based video player to stream media directly using the CloudFront HLS master playlist URL.`,
    verification: `- Upload a raw MP4 video named "test-sample.mp4" to the source S3 bucket.
- Monitor the MediaConvert console and verify the job status transitions to "COMPLETE".
- Verify that HLS segment files (.ts) and playlists (.m3u8) appear in the publish S3 bucket, and play the video via the CloudFront stream link.`,
    cleanup: `- Delete the CloudFront distribution.
- Empty and delete both the upload and publish S3 buckets.
- Remove active MediaConvert job templates.`
  },
  {
    path: 'docs/04-architecture-workshops/iot-platform.md',
    title: 'Workshop 6: IoT Platform',
    scenario: 'You must design a streaming telemetry platform for 10,000 IoT temperature sensors. The platform must ingest millions of metric events per minute, index them for real-time dashboards, and store historical data in a cold data lake.',
    mermaid: `graph LR
    Sensors[10,000 IoT Sensors] -->|MQTT| IoT[AWS IoT Core]
    IoT -->|Rule Engine| Kinesis[Kinesis Firehose]
    Kinesis -->|Batch writes| S3[Cold S3 Data Lake]
    Kinesis -->|Real-time index| OS[Amazon OpenSearch Service]`,
    step_by_step: `1. **Configure IoT Core Registry:** Create an IoT Core Thing group named "TempSensors". Generate device certificates and policies for MQTT connection authorization.
2. **Deploy Kinesis Data Firehose:** Provision a Kinesis Data Firehose delivery stream. Configure S3 as the destination target for cold storage logs.
3. **Set Up OpenSearch Cluster:** Deploy an Amazon OpenSearch cluster. Add a secondary output configuration in Kinesis Firehose to index incoming telemetry files.
4. **Configure IoT SQL Rule:** Write an IoT Rule matching MQTT topics: \`SELECT temperature, timestamp, device_id FROM 'sensors/#'\`. Set the rule action to write records directly to the Kinesis Firehose stream.
5. **Simulate IoT Telemetry Traffic:** Run a local Python script simulating multiple MQTT clients publishing telemetry logs.`,
    verification: `- Verify that the IoT rule execution metrics register successful publishes.
- Open the OpenSearch Dashboard interface and confirm that temperature records are indexed in real-time.
- Check the cold S3 bucket to verify that Kinesis Firehose partitions data folders chronologically.`,
    cleanup: `- Terminate the OpenSearch cluster.
- Delete the Kinesis Firehose delivery stream.
- Delete the IoT Core rules and disable active device certificates.`
  }
];
