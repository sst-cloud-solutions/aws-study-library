---
sidebar_position: 4
---

# Disaster Recovery Strategies

Disaster Recovery (DR) in AWS is about having a plan to restore your application's data and infrastructure in the event of a disaster. The choice of strategy depends on your business's Recovery Point Objective (RPO) and Recovery Time Objective (RTO).

## DR Strategies Comparison

| Strategy | RPO | RTO | Cost | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Backup & Restore** | Hours | Hours | $ | Data is backed up to S3. Infrastructure is provisioned after a disaster occurs. |
| **Pilot Light** | Minutes | Minutes | $$ | Data is kept live (e.g., DB replication). Core services are idle; other resources are scaled up during DR. |
| **Warm Standby** | Seconds | Minutes | $$$ | A scaled-down but functional version of the environment is always running. |
| **Multi-Site (Active/Active)** | Real-time | Real-time | $$$$ | Full environment running in two or more regions. Traffic is balanced between them. |

## 1. Backup & Restore
- **Process:** Regularly back up data and applications to S3. In a disaster, use CloudFormation or CDK to redeploy infrastructure and restore data from backups.
- **Best For:** Non-critical workloads where longer downtime is acceptable.
- **AWS Services:** AWS Backup, S3, EBS Snapshots.

## 2. Pilot Light
- **Process:** Keep a "pilot light" (core elements) of your application running in a second region. Usually, this means your database is replicated and up-to-date, but your application servers are not running (or just a minimal set are).
- **Best For:** Critical workloads that need to be back online in 10s of minutes.
- **AWS Services:** Aurora Global Database, RDS Read Replicas, Route 53.

## 3. Warm Standby
- **Process:** Maintain a scaled-down version of your full environment in a second region. It's always running and can handle a small amount of traffic. During a disaster, you scale up the environment to handle the full load.
- **Best For:** Business-critical applications where RTO/RPO is measured in minutes.
- **AWS Services:** ASG (with low min capacity), Route 53 Health Checks.

## 4. Multi-Site (Active/Active)
- **Process:** Your application runs in multiple regions simultaneously. Traffic is routed to the nearest or healthiest region. If one region fails, the others continue to serve traffic.
- **Best For:** Mission-critical applications where zero downtime is required.
- **AWS Services:** Global Accelerator, Route 53 (Latency/Geolocation routing), Aurora Global Database.

## Recovery Phase: Failover & Failback
- **Failover:** The process of switching to your DR site when your primary site fails.
- **Failback:** The process of returning to your primary site once it has been restored. **Note:** Failback requires syncing data changes that occurred in the DR site back to the primary site.

## 5. DNS Failover Automation with Route 53
Automating failover is crucial to achieving low RTO.
- **Active-Passive Failover:** Traffic is directed to the primary region. Route 53 monitors primary endpoint health checks. If the primary health check fails, Route 53 updates DNS queries to return the secondary (DR) region's IP.
- **Active-Active Failover:** Route 53 routes traffic based on latency or weight. If one region goes down, Route 53 excludes it from DNS responses and routes all traffic to the remaining healthy region(s).
- **DNS Caching & TTL Trade-off:**
    - Set the **TTL (Time to Live)** of DNS records to a low value (e.g., 60 seconds or less) during DR configurations. High TTLs cause clients/ISPs to cache the unhealthy IP, delaying the failover.
- **Routing Loop Safety:** Ensure health checks monitor a lightweight status page that checks dependent systems (e.g., database connectivity) and does not trigger circular dependency alerts.

## 6. Cross-Region Database DR Patterns
Relational and NoSQL databases require specific cross-region replication strategies.
1. **Aurora Global Database:**
    - Provides up to 5 replica regions with sub-second replication latency (typically < 150 ms).
    - **Failover Mechanics:** Supports **Managed failover** (cross-region role promotion) or manual failover.
    - **Write Forwarding:** Allows read replicas in secondary regions to forward SQL write requests directly to the primary writer instance, simplifying application architecture.
2. **Amazon RDS Cross-Region Read Replicas:**
    - Asynchronous replication to a replica DB instance in a different region.
    - **Promotion:** In a disaster, the replica must be manually promoted to a standalone database. This changes the DB connection endpoint, requiring an update to application configurations (e.g., SSM Parameter Store or Secrets Manager update).
3. **DynamoDB Global Tables:**
    - Multi-region, multi-active database. Active-Active writes can occur in any region.
    - **Conflict Resolution:** Uses **"Last Writer Wins" (LWW)** based on timestamps.
    - **Consistency:** Replicates changes asynchronously. Reads within the originating region are strongly consistent, but cross-region reads are eventually consistent.

## 7. AWS Elastic Disaster Recovery (DRS)
AWS DRS is the recommended service for physical, virtual, and cloud server recovery.
- **Continuous Replication:** Deploys a Replication Agent on the source server which replicates block-level data in real-time.
- **Staging Area:** Replicated data goes to low-cost EC2 instances and EBS volumes in a lightweight Staging Area subnet within the target region.
- **DR Drills:** Allows you to launch fully-functional target servers in the target region for testing **without interrupting continuous replication**.
- **Failback:** After the disaster is resolved, DRS synchronizes data changes back from the AWS DR site to the source server (physical, VMware, or EC2) to ensure zero data loss during failback.

## 8. DR Security & Key Management (KMS)
- **Cross-Region KMS Encryption:**
    - Standard KMS Customer Managed Keys (CMKs) are regional. Data encrypted in Region A cannot be decrypted in Region B unless it is re-encrypted, or you use **Multi-Region Keys**.
    - **Multi-Region KMS Keys:** Let you replicate keys across regions while maintaining the same Key ID and key material. This is crucial for encrypting database backups, EBS volumes, or S3 buckets that need immediate decryption in the DR region without re-encryption overhead.
- **IAM Cross-Region Roles:** Ensure IAM roles, instance profiles, and resource-based policies exist in the target DR region, pointing to local resources.

## 9. Well-Architected Framework: Reliability (REL13)
To align with the **Reliability Pillar (REL13)**:
- **Define RTO and RPO:** Establish business metrics for data loss and recovery times.
- **Test DR regularly:** Perform non-disruptive drills using AWS DRS.
- **Automate recovery:** Avoid manual steps using infrastructure-as-code (CDK/CloudFormation) to deploy recovery environments.
- **Monitor and alert:** Implement CloudWatch Alarms for replication lag and failover status.

