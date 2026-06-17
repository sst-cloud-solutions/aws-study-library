# Route 53

Route 53 is a managed DNS (Domain Name System)

DNS is a collection of rules and records which helps clients understand how to reach a server through URLs.

In AWS, the most common records are:
* A: URL to IPv4
* AAAA: URL to IPv6
* CNAME: URL to URL (ONLY FOR **NON** ROOT DOMAIN)
* ALIAS: URL to AWS resource

Route 53 can use:
* Public domain names you own
* Private domain names that can be resolved by your instances in your VPCs

Route53 has advanced features such as:
* Load balancing (through DNS - also called client load balancing)
* Health checks (although limited…)
* Routing policy: simple, failover, geolocation, geoproximity, latency, weighted

Prefer Alias over CNAME for AWS resources (for performance reasons)

---

## Prerequisites

- [ElastiCache](elasticache.md)

## Recommended Next Topics

- [CLI: Command Line Interface](../2-aws-deep-dive/cli.md)

## Related Topics

- [IAM: Identity and Access Management](iam.md)
- [Security Groups](security-groups.md)
- [VPC: Virtual Private Cloud](vpc.md)
