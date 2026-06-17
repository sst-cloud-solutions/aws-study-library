---
sidebar_position: 6
---

# Hybrid Connectivity & Sharing (RAM)

In large-scale enterprise environments, you often need to share resources across accounts and optimize hybrid connectivity using private endpoints.

## 1. AWS Resource Access Manager (RAM)

AWS RAM allows you to share AWS resources with any AWS account or within your AWS Organization.

### Key Concepts
- **Resource Owner:** The account that creates the resource and shares it.
- **Resource Consumer (Participant):** The account that uses the shared resource.
- **AZ ID Consistency:** While AZ names (e.g., `us-east-1a`) can differ between accounts, **AZ IDs** (e.g., `use1-az1`) are consistent across all accounts. Use AZ IDs to ensure high availability when sharing resources.

### Shared VPC (Subnet Sharing)
- **Mechanism:** The VPC owner shares subnets with participant accounts in the same organization.
- **Participant Actions:** Can launch resources (EC2, RDS, Lambda) into the shared subnets.
- **Security:** Participants cannot see or manage resources owned by other participants or the VPC owner, but they can communicate over the same network.
- **Benefit:** Simplifies network management, reduces the number of VPCs, and optimizes IP address usage.

## 2. VPC Endpoints (PrivateLink)

VPC Endpoints allow you to connect your VPC to supported AWS services and VPC endpoint services without an Internet Gateway, NAT device, VPN, or Direct Connect.

### Gateway Endpoints
- **Services:** **S3** and **DynamoDB** only.
- **Mechanism:** Updates the subnet route table with a prefix list.
- **Cost:** Free.
- **Access:** Accessible only from within the VPC (cannot be reached via VPN/DX).

### Interface Endpoints (PrivateLink)
- **Services:** Most AWS services (including S3 now), and custom services.
- **Mechanism:** Creates an Elastic Network Interface (ENI) with a private IP in your subnet.
- **Cost:** Hourly charge + data processing fees.
- **Access:** Accessible from on-premises via VPN or Direct Connect.
- **Security:** Uses Security Groups to control access to the endpoint.

## 3. Hybrid DNS (Route 53 Resolver)

To resolve DNS names between on-premises and AWS VPCs:
- **Inbound Endpoint:** Allows on-premises servers to resolve AWS resources (e.g., `my-db.vpc.internal`).
- **Outbound Endpoint:** Allows AWS resources to resolve on-premises names (e.g., `my-server.corp.com`) via **Forwarding Rules**.

## 4. AWS Direct Connect (DX) Failover Architectures
For critical workloads, on-premises to cloud connectivity must be highly available.
- **High Resiliency (99.9% SLA):** Uses two Direct Connect connections to a single Direct Connect location. Connections are terminated on separate customer routers and separate AWS devices.
- **Maximum Resiliency (99.99% SLA):** Uses two Direct Connect connections terminated at **two different Direct Connect locations** (for disaster recovery from location-level outages). Connections are routed to separate customer routers.
- **BGP Traffic Control:**
    - **Inbound Traffic (On-premises to AWS):** Influence AWS routing using **AS-Path Prepending** (making one path look longer, forcing AWS to prefer the other) or **BGP Community Tags** (Local Preference).
    - **Outbound Traffic (AWS to On-premises):** Influence customer routing by advertising more specific CIDR blocks or configuring BGP Local Preference on customer routers.

## 5. Transit Gateway (TGW) and Direct Connect Gateway (DXGW)
To connect multiple VPCs in different regions and accounts to an on-premises datacenter via Direct Connect:
- **Direct Connect Gateway (DXGW):** A global resource that allows you to connect a Direct Connect connection to VPCs in any AWS Region (except China).
- **Transit Gateway (TGW) Integration:**
    - Connect a TGW in each region to the DXGW.
    - Requires creating a **Transit VIF** on the Direct Connect connection.
    - One Transit VIF can connect to one DXGW, which can then associate with up to 6 Transit Gateways (one per region).
    - This simplifies routing by aggregating VPC traffic through the Transit Gateway.

## 6. Comparison of Direct Connect Virtual Interfaces (VIFs)

| VIF Type | Purpose | Connects To |
| :--- | :--- | :--- |
| **Private VIF** | Access private resources using private IPs. | A Virtual Private Gateway (VGW) in a single VPC, or a Direct Connect Gateway (DXGW) associated with up to 10 VGWs. |
| **Public VIF** | Access public AWS endpoints (S3, DynamoDB, SQS, EC2 public IPs) over Direct Connect. | Public AWS services in any region. Traffic does not traverse the public internet. |
| **Transit VIF** | Access multiple VPCs connected via Transit Gateways. | A Direct Connect Gateway associated with up to 6 Transit Gateways. |

## 7. Backup Connectivity: VPN Over DX or Internet
- **IPSec VPN as Backup:** Deploy a Site-to-Site VPN over the public internet as a lower-cost backup for a Direct Connect connection.
- **Routing Configuration:** Configure dynamic BGP routing on both connections. Advertise the same prefixes over both. Since Direct Connect has a preferred routing path (lower metric/administrative distance) over VPN, AWS automatically routes traffic over Direct Connect when healthy, and fails over to the VPN within seconds if DX fails.
- **VPN over Direct Connect (Private VIF):** For environments requiring IPsec encryption over the private Direct Connect link, establish a VPN connection terminating on the Virtual Private Gateway using a Private VIF.

---

## Prerequisites

- [AWS PrivateLink](AWS PrivateLink.md)

## Recommended Next Topics

- [AWS Elastic Load Balancing](../Traffic Management/AWS Elastic Load Balancing.md)

## Related Topics

- [AWS PrivateLink](AWS PrivateLink.md)
