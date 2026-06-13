# AWS Backup

## 1. Introduction

AWS Backup is a fully managed service designed to simplify and centralize the protection of your data across a wide range of AWS services. This chapter provides an in-depth technical overview of AWS Backup, detailing its core features, strategies, and best practices to ensure a resilient backup strategy for enterprise environments.

## 2. AWS Backup Overview

AWS Backup is a fully managed service that centralizes and automates data protection for your AWS and hybrid workloads. It lets you create backup policies—called backup plans—to automatically schedule and manage backups for various AWS resources such as Amazon EBS, RDS, DynamoDB, EFS, FSx, and more. With AWS Backup, you can enforce retention rules, leverage incremental backups to save storage space, and securely store your backups in encrypted backup vaults. This centralized approach not only simplifies backup management and compliance but also helps ensure rapid recovery in case of data loss or disasters.

Key supported services include:

- **Compute and Storage:** Amazon EC2, Amazon EBS, and Amazon S3.
- **Database Services:** Amazon RDS (including all supported database engines), Aurora, DynamoDB, DocumentDB, and Amazon Neptune.
- **File Systems and Other Services:** Amazon EFS, Amazon FSx (including Lustre), Windows File Server, and AWS Storage Gateway (e.g., Volume Gateway).

AWS Backup centralizes backup management by automatically managing and securing backups, storing them in dedicated internal Amazon S3 buckets. This centralized approach simplifies compliance and operational tasks, ensuring that your critical data is consistently protected.

## 3. Core Features and Strategies

### 3.1. Automated, Centralized Backup Management

One of the primary strengths of AWS Backup is its ability to manage backups across various services from a single interface. The service eliminates the complexity associated with maintaining custom backup scripts or manual processes. Instead, administrators benefit from a centralized view and control of the backup strategy, which enhances operational efficiency and reduces the risk of human error.

Key aspects include:

- **Unified Control:** A single dashboard to monitor, manage, and automate backups across supported AWS services.
- **Operational Simplicity:** Reduction in manual intervention through automated processes, ensuring consistency and adherence to backup policies.

### 3.2. Cross-Region and Cross-Account Backups (Exam Tip)
For organizations with a multi-region or multi-account strategy, AWS Backup offers robust support for:
- **Cross-Region Backups:** Automatically copy backups to another AWS region within a backup plan. This is a critical pattern for regional disaster recovery (DR).
- **Cross-Account Backups (Replication):** Centrally aggregate and copy backups from member accounts to a secure, isolated central backup account within an AWS Organization.
- **Setup Requirements for Cross-Account Copying:**
    1. **Organizations Integration:** Enable cross-account backup capabilities in the AWS Backup console under Settings.
    2. **Destination Vault Access Policy:** The destination backup vault in Account B must have a resource-based **Vault Access Policy** allowing the `backup:CopyIntoBackupVault` action from the source account (Account A) or the organization:
       ```json
       {
         "Version": "2012-10-17",
         "Statement": [
           {
             "Sid": "AllowCopyFromSourceAccount",
             "Effect": "Allow",
             "Principal": {
               "AWS": "arn:aws:iam::Source_Account_A_ID:root"
             },
             "Action": "backup:CopyIntoBackupVault",
             "Resource": "*"
           }
         ]
       }
       ```
    3. **KMS Encryption sharing:** Since backups are encrypted using KMS keys, you must share the KMS key of the source vault with the destination account, or use a custom KMS key that both accounts have permissions to use. Note that default AWS-managed keys (`aws/backup`) **cannot** be shared across accounts; you must use a **Customer Managed Key (CMK)**.

### 3.3. On-Demand, Scheduled, and Point-in-Time Recovery

AWS Backup provides flexible recovery options tailored to various operational needs:

- **On-Demand Backups:** Administrators can initiate backups at any time, ensuring that critical changes are captured immediately.
- **Scheduled Backups:** Through defined backup plans, backups can be automatically performed at regular intervals (e.g., every 12 hours, weekly, monthly). This scheduled approach minimizes manual oversight and ensures that data is consistently protected.
- **Point-in-Time Recovery:** For services that support this feature, such as Amazon Aurora, AWS Backup allows restoration of data to a specific point in time. This capability is crucial for recovering from logical errors or data corruption that may not be immediately detected.

### 3.4. Tag-Based Backup Policies and Backup Plans

AWS Backup supports sophisticated backup strategies through the use of tag-based policies and customizable backup plans. Administrators can:

- **Tag-Based Policies:** Apply tags (such as “production” or other business-specific labels) to selectively target resources for backup. This ensures that only the most critical data is backed up according to organizational priorities.
- **Backup Plans:** Define comprehensive backup policies that include parameters such as backup frequency, backup window, transition policies to cold storage, and retention periods. These plans enable granular control over how, when, and where backups are stored and retained, ensuring that data protection strategies align with compliance and operational requirements.

### 3.5. Vault Lock and the WORM Policy (WORM Compliance)
Data immutability is essential to protect backups from ransomware and malicious insider deletion. AWS Backup **Vault Lock** enforces a Write-Once-Read-Many (WORM) policy on backup vaults.
- **Two Vault Lock Modes:**
    - **Governance Mode:** Locks the vault but allows users with specific IAM administrative permissions (`backup:DeleteBackupVault`, `backup:PutBackupVaultLockConfiguration`) to delete recovery points or remove the lock. This is ideal for testing and administrative flexibility.
    - **Compliance Mode:** Permanently locks the vault. **No one, including the AWS account root user or AWS Support, can delete the backups or remove the lock** once it is locked. 
- **Grace Period (Cool-down Period):** When configuring Compliance Mode, you specify a cool-down period (minimum 3 days). During this period, the lock can be deleted or modified. After the cool-down period expires, **the lock becomes permanent and irreversible**.
- **Retention Guardrails:** You configure a minimum and maximum retention period on the vault. AWS Backup will reject any backup job or manual copy that specifies a retention period outside these boundaries, preventing users from bypassing the lock by creating backups that expire immediately.

## 4. Conclusion

AWS Backup provides a comprehensive, centralized solution for managing and automating backups across a diverse set of AWS services. Its core features—ranging from automated management and cross-region/account capabilities to flexible recovery options and robust data immutability with Vault Lock—make it an indispensable tool for modern cloud environments. By integrating tag-based policies and detailed backup plans, AWS Backup ensures that organizations can implement a secure, scalable, and compliant backup strategy that meets both operational and regulatory requirements.

Through this chapter, we have explored the technical and operational nuances of AWS Backup, laying the foundation for implementing best practices in data protection and disaster recovery within your AWS environment.