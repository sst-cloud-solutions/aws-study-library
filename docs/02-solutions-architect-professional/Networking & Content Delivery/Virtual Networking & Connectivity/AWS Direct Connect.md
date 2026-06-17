# AWS Direct Connect

## 1. Introduction

In today’s era of cloud computing, many organizations are embracing a hybrid strategy in which critical workloads and data are split between on‑premises data centers and cloud environments. AWS Direct Connect plays a pivotal role in this strategy by offering a dedicated physical network link that bypasses the public Internet. This chapter begins by introducing the importance of hybrid connectivity, explains the unique characteristics of Direct Connect, and discusses its role in modern enterprise architectures.

Direct Connect is not a “virtual” service you can simply spin up on a console—it requires physical network ports, fiber connections, and coordination with third‑party colocation facilities. These realities mean that while many cloud services (like creating a VPC) are software‑defined, Direct Connect involves tangible, physical infrastructure. In today’s competitive market, where latency and consistent bandwidth can be critical to performance, the benefits of a dedicated link are significant: reduced latency, lower data transfer costs, and improved network reliability.

In the following sections, we will describe in detail the concepts and procedures you need to understand before you plan your Direct Connect deployment. We will explain the technical requirements, describe the different connection types available (dedicated versus hosted), and cover every aspect from physical wiring and cross‑connects to virtual interfaces and routing mechanisms.

## 2. Core Concepts and Requirements

AWS Direct Connect is built on well‑established networking principles. In this section, we cover the fundamental requirements—from the physical layer up through the network protocols—that enable Direct Connect to function seamlessly in a hybrid environment.

### 2.1 Introduction to AWS Direct Connect: Use Cases and Benefits

AWS Direct Connect is used to create a private, dedicated connection between an organization’s corporate data center and the AWS Cloud. Some of its primary benefits include:

- **Consistent Bandwidth and Low Latency:** By avoiding the variability of the public Internet, Direct Connect ensures that the connection has predictable performance.
- **Cost Savings:** Data transfer rates via Direct Connect are typically lower than standard Internet data transfer charges, which is especially significant for large‑scale or high‑volume data movements.
- **Enhanced Security:** Since the connection is private, the risk associated with Internet‑exposed links is mitigated.
- **Support for Hybrid Architectures:** Direct Connect is essential for scenarios where on‑premises systems must reliably connect to AWS services (both public services such as S3 and private resources inside a VPC).

These benefits make Direct Connect an indispensable component of any hybrid network design where predictable performance and security are paramount.

### 2.2 Network Requirements for Direct Connect

Before provisioning Direct Connect, organizations must meet several technical prerequisites:

- **Physical Connectivity:** A dedicated fiber link must be provisioned from your data center to an AWS Direct Connect location. This connection uses single‑mode fiber cables, with the exact cable type determined by the port speed (e.g., 1 Gbps, 10 Gbps, or 100 Gbps).
- **Layer 2 Considerations:** The connection uses Ethernet at layer 2. In particular, the 802.1Q standard for VLAN tagging is used to segregate traffic. VLAN tags let you divide a single physical link into multiple logical interfaces (Virtual Interfaces, or VIFs).
- **Port Configuration:** For connections with speeds greater than 1 Gbps, auto‑negotiation on the ports must be disabled to ensure that both endpoints agree on speed and duplex mode.
- **IP and BGP Requirements:** A valid IP addressing scheme must be in place. AWS uses Border Gateway Protocol (BGP) to exchange routes between your on‑premises router and AWS devices. Your equipment must support BGP, including MD5 authentication for added security. Optionally, Bidirectional Forwarding Detection (BFD) may be enabled for rapid failure detection.
- **Routing Protocols:** BGP is used not only for route exchange but also for path selection (using attributes such as AS_PATH, MED, and local preference). Familiarity with these concepts is essential for configuring and troubleshooting Direct Connect.

### 2.3 BGP Fundamentals: Autonomous Systems (AS) and ASNs

BGP plays a central role in Direct Connect. In BGP terminology, an Autonomous System (AS) is a collection of IP prefixes under a common routing policy. An Autonomous System Number (ASN) uniquely identifies your AS. Key points include:

- **Public vs. Private ASNs:** Public ASNs are allocated by IANA and are globally unique. For Direct Connect, you may use either a public ASN (if you already own one) or a private ASN. The choice can affect how your routes are advertised and filtered.
- **16‑bit vs. 32‑bit ASNs:** Historically, ASNs were 16 bits; however, 32‑bit ASNs are now supported. AWS may have limitations on which ranges can be used on specific interfaces.
- **BGP Peering:** When you create a VIF, BGP is used to establish a peering session between your router and the AWS endpoint. The correct configuration of ASNs is critical to ensure that BGP routes are exchanged reliably.

### 2.4 AWS Public IP Ranges: Using `ip‑ranges.json`

AWS publishes its public IP ranges in a machine‑readable JSON file ([ip‑ranges.json](https://ip-ranges.amazonaws.com/ip-ranges.json)). This file lists all the public IP prefixes used by AWS services and is essential for several reasons:

- **Firewall Configuration:** If you plan to restrict access to AWS services from your on‑premises network (or vice versa), you can use ip‑ranges.json to configure precise firewall rules.
- **Route Filtering:** The file can help you filter which AWS IP ranges are reachable over your Direct Connect connection, allowing you to enforce policies about regional or service‑specific connectivity.
- **Dynamic Updates:** As AWS expands its infrastructure, ip‑ranges.json is updated. Automation (for example, using SNS notifications and Lambda functions) can help keep your network policies up to date.

## 3. Direct Connect Connection Types and Setup

Once you understand the physical and protocol requirements, you must decide how to provision your Direct Connect connection. There are two primary options: dedicated connections and hosted connections.

### 3.1 Connection Types: Dedicated vs. Hosted Connections

#### Dedicated Connections

A dedicated connection is a physical port allocated to you in an AWS Direct Connect location. Key characteristics include:

- **Bandwidth Options:** Dedicated connections are available in standard capacities—typically 1 Gbps, 10 Gbps, or 100 Gbps.
- **Physical Port Ownership:** When you order a dedicated connection, you effectively reserve a port on an AWS Direct Connect router.
- **Ordering Process:** You initiate the request in the AWS Direct Connect console. AWS then provisions a port at the chosen location and provides a Letter of Authorization and Connecting Facility Assignment (LOA‑CFA). This document is necessary for you (or your chosen network provider) to complete the physical cross‑connect at the colocation facility.
- **Setup Time:** Because this involves physical port provisioning and a cross‑connect, it can take several weeks (typically 4–12 weeks) to complete.
- **VIF Flexibility:** On a dedicated connection, you can create multiple virtual interfaces (up to 50 per connection). This means you can logically subdivide the connection into public, private, or transit VIFs to meet different connectivity needs.

#### Hosted Connections

Hosted connections provide sub‑1 Gbps connectivity (such as 50 Mbps, 100 Mbps, or other smaller increments). Their key features include:

- **Indirect Provisioning:** You do not own the underlying physical connection; instead, an AWS Direct Connect partner (or “host”) allocates bandwidth from their dedicated connection and sub‑divides it among multiple customers.
- **Single VIF Limitation:** Each hosted connection can support only one virtual interface. If you need multiple VIFs, you must request additional hosted connections.
- **Billing Model:** Because the hosted connection is shared, AWS implements traffic policing to ensure that you do not exceed your allocated bandwidth.
- **Ideal Use Cases:** Hosted connections are ideal for organizations that do not need high‑bandwidth connectivity or who want to test Direct Connect without the cost or lead time of a dedicated connection.

### 3.2 Step‑by‑Step Guide: Provisioning a Direct Connect Connection

Whether you choose a dedicated or hosted connection, the provisioning process follows several key steps:

1. **Select an AWS Region and Direct Connect Location:**  
    Decide which AWS region you want to connect to and choose a Direct Connect location nearest to your corporate data center. The selection affects latency and cost.
    
2. **Initiate the Connection Request:**  
    For dedicated connections, log in to the AWS Direct Connect console and request a new connection by specifying the location, port speed, and other parameters. For hosted connections, contact your Direct Connect partner with your 12‑digit AWS account number and required bandwidth.
    
3. **Receive the LOA‑CFA (for Dedicated Connections):**  
    AWS will provision a port and provide you with the LOA‑CFA. This document contains details such as the AWS device’s port and demarcation information. You must forward the LOA‑CFA to your colocation provider or network service partner to set up the cross‑connect.
    
4. **Complete the Physical Cross‑Connect:**  
    At the Direct Connect location, a cross‑connect is established between your equipment (or your partner’s equipment) and the AWS router. If you already have a presence at the facility, you may perform the cross‑connect yourself; otherwise, your Direct Connect partner can assist.
    
5. **Verify Signal and Connectivity:**  
    After the cross‑connect is complete, verify that you are receiving proper Tx (transmit) and Rx (receive) optical signals. These signals are typically measured in decibels per milliwatt (dBm) and should fall within acceptable ranges (e.g., –18 to –25 dBm).
    
6. **Create Virtual Interfaces (VIFs):**  
    With the physical connection established, log back in to the AWS console to create one or more virtual interfaces. You will specify whether the VIF is public, private, or transit; assign a unique VLAN tag; and configure BGP parameters (such as peer IP addresses, ASN, and optional MD5 authentication).
    
7. **Configure BGP and Routing:**  
    Establish the BGP peering session between your router and the AWS endpoint. Verify that the correct routes are exchanged, and that the expected number of prefixes (up to 1,000 for public VIFs and 100 for private VIFs) is received.
    
8. **Test Connectivity:**  
    Once the BGP session is active and the VIF is provisioned, test connectivity from your on‑premises network to your AWS resources. Monitor routing tables and performance metrics to ensure that the setup meets your requirements.
    
9. **Begin Data Transfer and Monitor Billing:**  
    After successful testing, start using your Direct Connect connection in production. Remember that you will be billed (by port‑hour and data transfer out) as soon as the connection is active.

## 3. Direct Connect Security: MACsec

MACsec (IEEE 802.1AE) provides Layer 2 encryption for Direct Connect links.

- **Hop-by-Hop:** Encryption occurs between the customer router and the AWS Direct Connect router. It is **not** end-to-end.
- **High Speed:** Supports 10 Gbps and 100 Gbps speeds without the cryptographic overhead of IPsec.
- **Key Requirements:** Requires Layer 2 adjacency (a direct physical or pseudo-wire connection) and compatible hardware.
- **Comparison with IPsec:** Use MACsec for high-speed, line-rate encryption; use IPsec for end-to-end encryption over the internet or DX.

## 4. Direct Connect Virtual Interfaces (VIFs)

VIFs allow you to separate traffic into different Layer 3 networks over a single physical connection.

- **Private VIF:** Connects to a VPC via a Virtual Private Gateway (VGW). Used for private IP communication.
- **Public VIF:** Connects to all AWS public services (S3, DynamoDB, etc.) globally.
- **Transit VIF:** Connects to a Transit Gateway (TGW) via a Direct Connect Gateway. Required for multi-VPC hub-and-spoke architectures.

## 5. Direct Connect Gateway (Global Connectivity)

A Direct Connect Gateway is a global resource that allows you to connect a single Direct Connect connection to VPCs in any AWS Region.

- **VGW Association:** Connect up to 10 VGWs (10 VPCs) across different regions to a single DX Gateway.
- **Transit Gateway Association:** Connect a DX Gateway to a TGW (Transit VIF required).
- **No Transitive Routing:** A DX Gateway does not allow communication between the VPCs attached to it. Communication only occurs between on-premises and the VPCs.

## 6. Resilience & High Availability

For the SAP-C02 exam, always prioritize high availability for DX:

- **Maximum Resilience:** Two DX connections in two different DX locations, with two different on-premises routers.
- **High Resilience:** Two DX connections in a single DX location, using two different AWS devices.
- **Backup:** Use a Site-to-Site VPN as a lower-cost backup for a Direct Connect connection.

## 8. Security and Performance

Security and performance are always top priorities when connecting critical on‑premises systems to the cloud. This section explains the available encryption options and performance optimizations.

### 8.1 Direct Connect Security & Encryption

Direct Connect provides a private network link; however, by default, traffic is not encrypted. Organizations that require an extra layer of security have several options:

#### Encryption Options

- **Layer 4 Encryption (VPN over Direct Connect):**  
    You can run an IPsec VPN over your Direct Connect connection. In this scenario, your traffic is encrypted at the network layer (layer 3/4). This is particularly common if you require encryption but still want the performance benefits of Direct Connect. The VPN terminates at a Virtual Private Gateway or Transit Gateway using public IP addresses.
- **Layer 2 Encryption (MACSec):**  
    MAC Security (MACSec) is an IEEE 802.1 standard that provides encryption at the data link layer (layer 2). With MACSec, traffic is encrypted from the moment it enters your dedicated connection. Note that MACSec is available only on dedicated connections (and only at select Direct Connect locations) and may require that both the AWS endpoint and your on‑premises router support MACSec.
- **Application‑Layer Security:**  
    In many cases, end‑to‑end encryption can also be achieved by using application‑layer protocols (such as TLS/SSL). While this does not protect the network link itself, it ensures that sensitive data is encrypted as it traverses the network.

#### Security Best Practices

- **Implement Strict ACLs and Firewall Policies:**  
    Use the ip‑ranges.json file to configure your firewalls so that only traffic destined for approved AWS public services is allowed.
- **BGP MD5 Authentication:**  
    Always configure BGP with MD5 authentication on both your and AWS endpoints. This prevents BGP session hijacking and route spoofing.
- **Network Segmentation:**  
    Use VLAN tagging to separate traffic logically. Public VIFs should only carry traffic destined for AWS public endpoints, whereas private VIFs should carry only internal traffic.
- **Monitoring and Alerting:**  
    Set up CloudWatch alarms to monitor for anomalies (such as unexpected BGP session flaps or abnormal error rates) and integrate with your incident response plan.

### 8.2 Performance Optimization: MTU and Jumbo Frames Support

Optimizing performance is critical, especially in environments where large amounts of data are transferred. One important parameter is the Maximum Transmission Unit (MTU):

- **Standard MTU:**  
    By default, the MTU for Direct Connect is 1,500 bytes.
- **Jumbo Frames:**  
    AWS now supports jumbo frames on Direct Connect connections (post‑2018). Jumbo frames reduce overhead by allowing larger packets (up to 9,001 bytes on private VIFs and up to 8,500 bytes on transit VIFs). This reduces CPU overhead on routers and increases throughput.
- **Configuration Requirements:**  
    Ensure that both your on‑premises equipment and the underlying Direct Connect connection (or LAG) are configured to support jumbo frames. Note that public VIFs do not support jumbo frames.
- **Routing Considerations:**  
    Only propagated routes (those learned via BGP) will have jumbo frame support; static routes will typically use the default 1,500‑byte MTU.

## 9. Monitoring, Pricing, and Troubleshooting

Operational excellence requires not only a robust network design but also the ability to monitor, manage costs, and quickly troubleshoot issues. This section covers CloudWatch metrics, the Direct Connect pricing model, and best practices for diagnosing problems.

### 9.1 Monitoring with Amazon CloudWatch

Amazon CloudWatch provides a range of metrics that can help you monitor the health and performance of your Direct Connect connection and its associated virtual interfaces:

- **ConnectionState:**  
    Indicates whether the physical connection is up (1) or down (0). Setting up alarms on this metric ensures that you are immediately notified of outages.
- **Traffic Metrics (BPS and PPS):**
    - **Ingress and Egress BPS:** Measure the bits per second of inbound and outbound traffic.
    - **Packet Per Second (PPS):** Tracks the number of packets per second, which can help diagnose congestion or performance issues.
- **Error Metrics:**  
    Monitor error counts to detect physical layer issues or disruptions in the BGP session.
- **Optical Signal Levels:**  
    Metrics such as LightLevelTx and LightLevelRx provide insight into the health of the optical fiber connection.
- **Encryption State:**  
    If MACSec is enabled, the ConnectionEncryptionState metric indicates whether traffic is being encrypted as expected.

By setting up detailed dashboards and alarms in CloudWatch, you can proactively monitor the performance of your Direct Connect connection and quickly respond to anomalies.

### 9.2 Direct Connect Pricing Model: Cost Considerations

AWS Direct Connect charges fall into two broad categories:

#### Port‑Hour Charges

- **Definition:**  
    You are billed per hour for the capacity of the Direct Connect port. This charge is incurred regardless of whether data is actively flowing.
- **Dedicated vs. Hosted:**  
    The hourly rate depends on the port speed (e.g., 1 Gbps, 10 Gbps, 100 Gbps) and whether you have a dedicated connection or a hosted connection. (Note that pricing may vary by geographic region; for example, rates in Japan can differ from those in other regions.)
- **Billing Start:**  
    For a dedicated connection, billing begins once your connection is in the “available” state. For hosted connections, billing starts once you accept the connection in your AWS account.

#### Data Transfer Out (DTO) Charges

- **Definition:**  
    Charges are applied to data flowing from AWS to your on‑premises network (data transfer out). Data coming into AWS (ingress) is not charged.
- **Dependence on Location:**  
    DTO charges depend on the AWS region from which data is transferred and the Direct Connect location. For example, transferring data from a US‑based region to a Direct Connect location in the US might cost $0.02 per GB, while transfers from regions further away may be more expensive.
- **Responsibility:**  
    In multi‑account environments, the account that owns the resource (such as an S3 bucket or EC2 instance) is typically responsible for DTO charges.

### 9.3 Troubleshooting Direct Connect: Layer 1 to Layer 4 Issues

Even the best‑designed networks encounter problems. Troubleshooting Direct Connect issues involves checking multiple layers:

#### Physical Layer (Layer 1)

- **Cross‑Connect Verification:**  
    Ensure that the cross‑connect at the colocation facility has been completed correctly by your Direct Connect provider.
- **Optical Signal Levels:**  
    Verify that the Tx (transmit) and Rx (receive) optical signals are within acceptable ranges. A significant deviation could indicate fiber damage or hardware issues.
- **Hardware Checks:**  
    Confirm that both your on‑premises router and the AWS router are powered on and correctly configured.

#### Data Link Layer (Layer 2)

- **VLAN Tagging:**  
    Check that the correct 802.1Q VLAN tags are configured and that there are no conflicts. If multiple VIFs share the same physical connection, each must have a unique VLAN ID.
- **Auto‑Negotiation Settings:**  
    Verify that auto‑negotiation is disabled for connections above 1 Gbps to ensure consistent port settings.

#### Network Layer (Layer 3)

- **BGP Session:**  
    Examine the status of your BGP session. Ensure that BGP peer IP addresses, ASNs, and MD5 authentication keys are correctly configured.
- **Prefix Advertisement:**  
    Verify that the correct number of prefixes is being advertised (up to 100 for private VIFs and 1,000 for public VIFs). Over‑advertising can cause session flaps.
- **Routing Table Consistency:**  
    Ensure that static and dynamically learned routes (via BGP) are correct and that the intended longest prefix match is being applied.

#### Transport Layer (Layer 4)

- **TCP Port 179:**  
    Confirm that firewalls are not blocking TCP port 179, which is required for BGP.
- **Connection Timing:**  
    Check that there are no issues with packet fragmentation or latency that might disrupt TCP sessions.

If troubleshooting steps at each layer do not resolve the issue, review CloudWatch logs and consider contacting AWS Support or your Direct Connect provider.

## 10. Best Practices for Scalable and Resilient Designs

When architecting with AWS Direct Connect, consider these best practices:

- **Design for Redundancy:**  
    Always provision at least two Direct Connect connections in separate locations or on separate AWS devices. For mission‑critical workloads, consider maximum resiliency options (e.g., dual connections in two different Direct Connect locations).
- **Use LAGs for Increased Bandwidth and Resiliency:**  
    Aggregate multiple dedicated connections using LAGs to achieve higher throughput and to provide redundancy at the physical layer.
- **Separate Traffic Types:**  
    Use different VIFs for different traffic types. For example, segregate public traffic (to access AWS public services) from private traffic (to access VPC resources). This minimizes the risk of mis‑routing and simplifies troubleshooting.
- **Employ BGP Communities and Route Engineering:**  
    Use BGP attributes (local preference, AS_PATH manipulation, MED) and community tags to control routing and to establish active‑active or active‑passive configurations as needed.
- **Monitor Continuously:**  
    Set up comprehensive CloudWatch dashboards and alerts. Proactively monitor both the physical (optical signal strength, error counts) and logical layers (BGP session status, traffic metrics).
- **Plan for Growth:**  
    Design your network with future expansion in mind. Use Direct Connect Gateways and Transit Gateways to simplify the addition of new VPCs or AWS accounts.
- **Integrate Security Best Practices:**  
    Always enforce MD5 authentication on BGP sessions and restrict route advertisement using ip‑ranges.json–based filtering. If encryption is required, choose the appropriate layer of protection (VPN over Direct Connect for layer 3/4, or MACSec for layer 2).
- **Document and Test Thoroughly:**  
    Before going into production, conduct extensive testing in a pre‑production environment. Validate failover scenarios (using BFD and active‑passive configurations) and document your configuration for future troubleshooting.

## 11. Conclusion

AWS Direct Connect is a powerful service that enables secure, high‑performance hybrid connectivity between on‑premises networks and the AWS Cloud. By understanding the physical and logical components—from dedicated fiber connections and VLAN tagging to BGP routing, VIF configuration, and gateway integration—organizations can design robust architectures that meet both performance and security requirements.

---

## Prerequisites

- [AWS Virtual Private Cloud (VPC)](Amazon VPC.md)

## Recommended Next Topics

- [AWS Local Zone](AWS Local Zones.md)

## Related Topics

- [AWS Virtual Private Cloud (VPC)](Amazon VPC.md)
- [AWS Local Zone](AWS Local Zones.md)
- [AWS Transit Gateway](AWS Transit Gateway.md)
