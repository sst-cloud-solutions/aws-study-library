---
sidebar_position: 4
---

# Global Traffic Management

When designing global architectures, AWS provides two primary services to optimize the delivery of your application to a worldwide audience: **Amazon CloudFront** and **AWS Global Accelerator**. While both leverage the AWS global network and edge locations, they serve different purposes.

## CloudFront vs. Global Accelerator

| Feature | Amazon CloudFront | AWS Global Accelerator |
| :--- | :--- | :--- |
| **Primary Goal** | Cache content at the edge for faster delivery. | Optimize the network path to your application. |
| **Layer** | Layer 7 (HTTP/HTTPS). | Layer 4 (TCP/UDP). |
| **Caching** | Yes (static and dynamic content). | No (traffic is just routed). |
| **IP Addresses** | Uses a large number of dynamic IP addresses. | Provides **two static Anycast IP addresses**. |
| **Best For** | Images, videos, APIs, web applications. | Non-HTTP workloads (gaming, VoIP), disaster recovery, IP whitelisting. |
| **Termination** | Terminates TCP/TLS at the edge. | Terminates TCP/TLS at the edge (improves handshake time). |

## 1. Amazon CloudFront
- **Mechanism:** Caches data in edge locations. When a user requests content, it is served from the nearest edge location.
- **Dynamic Content:** Even for non-cacheable content, CloudFront improves performance by routing requests over the AWS private network instead of the public internet.
- **Security:** Integrated with AWS WAF and Shield. Supports field-level encryption.

## 2. AWS Global Accelerator
- **Mechanism:** Uses Anycast to route traffic from the edge location to the nearest healthy application endpoint (ALB, NLB, or EC2).
- **Static IPs:** Provides two static IP addresses that stay the same even if your application endpoints change. This is critical for firewall whitelisting.
- **Failover:** Performs health checks and automatically reroutes traffic to the next closest healthy region within seconds.
- **Traffic Dial:** Allows you to shift traffic between regions for blue/green deployments or testing.

## 3. Architecture Selection
- **Choose CloudFront if:** Your application is HTTP/HTTPS based and can benefit from caching (e.g., a React app, media streaming, or REST API).
- **Choose Global Accelerator if:** Your application uses non-HTTP protocols (e.g., MQTT, RDP, custom TCP), you need static IP addresses for client firewalls, or you need rapid regional failover.

## 4. Route 53 Advanced Routing Policies
Route 53 offers several routing options tailored for different global architectures:
- **Latency Routing:** Routes requests to the AWS region that provides the lowest round-trip time for the client.
- **Geolocation Routing:** Routes traffic based on the geographic location of the client (e.g., sending all European users to EU servers for compliance/localization).
- **Geoproximity Routing:** Routes traffic based on the geographic distance of resources to users. You can expand or shrink the size of a geographic region using a **Bias** value (1 to 99 to expand, -1 to -99 to shrink).
- **Weighted Routing:** Directs traffic to multiple resources in specified proportions (e.g., 90% to version A, 10% to version B for canary testing).
- **Failover Routing:** Configures active-passive failover based on Route 53 health check status.

## 5. Hybrid DNS with Route 53 Resolver Endpoints
For hybrid architectures, you must resolve DNS across on-premises and AWS:
- **Route 53 Inbound Resolver Endpoints:** 
    - Enables on-premises DNS servers to query Route 53 hosted zones.
    - Set up as ENIs in your VPC subnets with private IP addresses. On-premises DNS forwards queries to these IPs.
- **Route 53 Outbound Resolver Endpoints:**
    - Enables AWS resources to query on-premises DNS servers.
    - Uses **Forwarding Rules** associated with target domains (e.g., forward all queries for `*.corp.internal` to on-premises DNS server IPs).

## 6. DNSSEC (Domain Name System Security Extensions)
- **Purpose:** Protects your domain from DNS spoofing and cache poisoning attacks by cryptographically signing your DNS records.
- **Implementation in Route 53:**
    1. Enable DNSSEC signing for your public hosted zone.
    2. Route 53 uses customer managed customer keys in AWS KMS to sign the zone records.
    3. Export the Delegation Signer (DS) record from Route 53 and configure it in your domain registrar to establish a cryptographic chain of trust.

## 7. Global Accelerator Failover & Latency Optimization
- **Edge Termination:** Global Accelerator terminates the TCP connection and TLS handshake at the AWS edge location closest to the user. This cuts down the round-trip times (RTT) required to establish a secure connection (improving handshake speed by up to 60%).
- **Anycast IP Routing:** Traffic enters the AWS global network at the edge location via one of two Anycast static IPs. Once in the AWS backbone, the traffic is routed with minimal latency to your endpoints.
- **Health Checks & Failover:** Global Accelerator continuously monitors endpoint health. If an endpoint becomes unhealthy, it redirects traffic to the next closest healthy endpoint in another region, typically within 10-15 seconds.

---

## Prerequisites

- [AWS Route 53](AWS Route 53.md)

## Recommended Next Topics

- [Route 53 Resolvers (Hybrid DNS)](../route53-resolver.md)

## Related Topics

- [Amazon CloudFront](Amazon CloudFront.md)
- [AWS Route 53](AWS Route 53.md)
