---
sidebar_position: 3
---

# Cost Optimization Tools

For the SAP-C02 exam, you must understand how to monitor, analyze, and optimize costs across a multi-account organization.

## 1. AWS Trusted Advisor
- **Purpose:** Provides recommendations in five categories: Cost Optimization, Performance, Security, Fault Tolerance, and Service Limits.
- **Cost Optimization Checks:**
    - Low utilization EC2 instances.
    - Idle Load Balancers.
    - Underutilized EBS volumes.
    - Unassociated Elastic IP addresses.
- **Access:** Basic/Developer (7 checks), Business/Enterprise (Full set of 100+ checks).

## 2. AWS Compute Optimizer
- **Purpose:** Uses machine learning to analyze historical utilization metrics and recommend the optimal AWS resources for your workloads.
- **Supported Resources:** EC2 instances, EBS volumes, Lambda functions, and Fargate.
- **Recommendations:** "Over-provisioned" (scale down to save money), "Under-provisioned" (scale up to improve performance), or "Optimized".

## 3. AWS Cost Explorer
- **Purpose:** Visualize and analyze your AWS cost and usage over time.
- **Key Features:**
    - **Right Sizing Recommendations:** Specifically for EC2 and RDS.
    - **Savings Plans/RI Recommendations:** Suggests purchasing commitments based on usage.
    - **Forecasting:** Predicts future costs based on historical trends.

## 4. AWS Budgets
- **Purpose:** Set custom budgets that alert you when your costs or usage exceed (or are forecasted to exceed) your budgeted amount.
- **Budget Types:** Cost, Usage, RI utilization, and RI coverage.
- **Actions:** Can trigger automated actions via IAM policies or Service Control Policies (SCPs) when thresholds are hit (e.g., stopping instances).

## 5. Cost Allocation Tags
- **Purpose:** Use tags (e.g., `Project`, `CostCenter`) to organize your costs on your billing report.
- **Activation:** Must be activated in the Billing and Cost Management console to appear in Cost Explorer and the Cost & Usage Report (CUR).

## 6. AWS Billing Conductor
- **Purpose:** Enables AWS Solution Providers and enterprise customers to customize billing and allocate costs to internal business units or end-customers.
- **Key Concepts:**
    - **Billing Groups:** Logical groupings of accounts that share the same financial parameters.
    - **Custom Pricing Plans:** Define custom pricing rules (e.g., markups, discounts, tiering) that override public AWS rates.
    - **Custom Line Items:** Add non-AWS costs or credits (e.g., support fees, managed service fees, flat-rate discounts).
    - **Pro-ration:** Distribute flat charges or credits across billing group accounts proportionally.
- **Exam / Production Tip:** Billing Conductor generates a *pro forma* billing view. It allows billing isolation without splitting your AWS Organization.

## 7. AWS Cost and Usage Report (CUR)
- **Purpose:** The most detailed source of AWS cost and usage data available, delivered as CSV/Parquet files to an S3 bucket up to 3 times a day.
- **Architecture Integration:**
    - **Amazon Athena:** Query CUR using standard SQL.
    - **Amazon QuickSight:** Visualize query results for custom BI dashboards.
    - **Amazon Redshift:** Load CUR data for deep data warehousing analytics.
- **Production Tip:** Enable **hourly granularity** and include **Resource IDs** to track individual resource level usage, though it increases file size and S3 storage costs.

## 8. Consolidated Billing & Credits Sharing
AWS Organizations offers Consolidated Billing, enabling a single management account to pay for all member accounts.
- **Credit & Discount Sharing Rules:**
    - By default, Savings Plans and Reserved Instances (RI) discounts are shared across all accounts in the Organization.
    - This maximizes resource utilization (if one account underutilizes a reservation, another account automatically consumes it).
- **Architectural Trade-Off:**
    - **Sharing Enabled (Default):** Maximizes cost savings.
    - **Sharing Disabled:** Keeps accounts financially isolated. You must explicitly **turn off credit and RI sharing** in the Management account billing preferences if you have independent business units or external customers who should not benefit from other units' unused commitments.

## 9. Tag Enforcement Strategies
Cost allocation tags are useless if teams do not apply them. Enforce tagging via:
1. **Service Control Policies (SCPs):** Prevent the creation of resources (e.g., EC2, S3) unless specific tags (e.g., `CostCenter`) are present:
   ```json
   {
     "Sid": "EnforceCostCenterTag",
     "Effect": "Deny",
     "Action": "ec2:RunInstances",
     "Resource": "arn:aws:ec2:*:*:instance/*",
     "Condition": {
       "Null": {
         "aws:RequestTag/CostCenter": "true"
       }
     }
   }
   ```
2. **AWS Tag Policies:** Standardize tag keys and allowed case-sensitive values (e.g., only allowing `Production` or `Staging` for `Environment`). Non-compliant resource creation is blocked.
3. **AWS Config Rules:** Audit existing resources for compliance and auto-remediate (e.g., triggering a Lambda to notify the resource owner).

## 10. Architect's Decision Matrix: Savings Plans vs. Reserved Instances

| Commitment Type | Scope of Coverage | Flexibility | Recommended Use Case |
| :--- | :--- | :--- | :--- |
| **Compute Savings Plans** | EC2, Lambda, Fargate | **Highest** (applies regardless of instance family, size, OS, region, or tenancy) | Dynamic, multi-service workloads with frequent architectural evolution. |
| **EC2 Instance Savings Plans** | EC2 only | **Medium** (locked to instance family and region, but flexible on size, OS, and tenancy) | Workloads with stable instance families in a single region (e.g., long-term `m5` in `us-east-1`). |
| **Standard RIs** | EC2, RDS, ElastiCache, Redshift | **Low** (restricted to specific region and instance family; size flexibility depends on attributes) | Highly stable relational databases or caching nodes. Can be sold on the RI Marketplace. |
| **Convertible RIs** | EC2 only | **Medium** (allows exchange for different family/OS/tenancy but requires manual execution) | Obsolete; generally replaced by Compute Savings Plans due to management overhead. |

## 11. Well-Architected Framework: Cost Optimization Guidance
Aligned with the **Cost Optimization Pillar**, architects must implement:
- **Practice Cloud Financial Management (CFM):** Define cost ownership, establish FinOps teams, and use tools like AWS Budgets.
- **Expenditure Awareness:** Use Cost Categories and Billing Conductor to track cost ownership.
- **Cost-effective Resources:** Leverage Compute Optimizer to scale down over-provisioned systems.
- **Manage Demand and Resource Scale:** Use Auto Scaling and serverless technologies to match demand dynamically.
- **Optimize Over Time:** Schedule regular reviews of Trusted Advisor checks and adjust Savings Plans commitments.

## 12. Professional Services Architect Considerations

### 12.1. Security Considerations
- **KMS Encryption:** Always encrypt S3 buckets containing CUR reports using **Customer Managed KMS Keys** (SSE-KMS) with tight KMS Key Policies.
- **Access Control:** Enforce least privilege using IAM policies that separate billing access from resource management. Use `aws:SourceIp` conditions to restrict billing console access.
- **Organizational Protection:** Apply SCPs to restrict member accounts from modifying cost anomaly alerts, deleting CUR delivery configurations, or changing billing preferences.

### 12.2. Migration Cost Considerations
- **Migration Evaluator (formerly TSO Logic):** Use prior to migration to build a business case, analyzing server configurations and utilization to project AWS Total Cost of Ownership (TCO) and right-size resources before they are migrated.
- **Double-Bubble Cost Pattern:** Plan for the temporary cost increase during the active migration phase when running workloads concurrently on-premises and on AWS (the "double-bubble"). Optimize this by using short-term, elastic AWS resources or promotional credits.

### 12.3. Disaster Recovery (DR) Cost Trade-offs
- **Failover Cost Optimization:**
    - *Backup & Restore:* Minimal cost ($), high RTO/RPO.
    - *Pilot Light:* Active replication database running ($$), application servers are off (0 instances in ASG).
    - *Warm Standby:* Small footprint running ($$$), scale up on demand.
    - *Active-Active:* 100% compute running in both regions ($$$$), zero RTO.
- **Cross-Region Data Transfer Costs:** Account for the cost of continuous database replication and file synchronization across AWS regions. Use compression and limit replication frequency where acceptable.

---

## Prerequisites

- [AWS Trusted Advisor](../Operations & Optimization/AWS Trusted Advisor.md)

## Recommended Next Topics

- [Amazon Aurora](../../Database/Relational & Data Warehouse/Amazon Aurora.md)

## Related Topics

- [AWS Organizations](../Governance & Compliance/AWS Organizations.md)
- [AWS Control Tower](../Governance & Compliance/AWS Control Tower.md)
- [AWS Config](../Governance & Compliance/AWS Config.md)
