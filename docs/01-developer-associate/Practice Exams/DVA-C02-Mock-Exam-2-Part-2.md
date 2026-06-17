---
sidebar_position: 3
sidebar_label: Part 2 (Questions 26-50)
---

# DVA-C02 Full Mock Exam 2 - Part 2 (Questions 26-50)

This is Part 2 of the Mock Exam 2 for the AWS Certified Developer – Associate (DVA-C02) certification.

---

## Question 26: Domain 2: Security

### Scenario
An application requires temporary AWS credentials to access S3 directly from a mobile client. The user must authenticate using Google sign-in. Which Cognito configuration should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Cognito User Pools federated with Google, combined with Cognito Identity Pools.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Cognito User Pools federated with Google, combined with Cognito Identity Pools. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 27: Domain 2: Security

### Scenario
A developer is configuring a Lambda function to decrypt files in an S3 bucket using a Customer Managed Key

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement CMK in AWS KMS. The execution role has S3 read permissions. What else is required?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement CMK in AWS KMS. The execution role has S3 read permissions. What else is required?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 28: Domain 2: Security

### Scenario
A developer is implementing envelope encryption for a client application. Which KMS API call should be made to retrieve both the plaintext and encrypted data key?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement KMS GenerateDataKey API.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement KMS GenerateDataKey API. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 29: Domain 2: Security

### Scenario
An application needs to store non-sensitive configuration values like database ports and hostnames. The developer wants a cost-effective, simple key-value store. Which service should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Systems Manager Parameter Store.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Systems Manager Parameter Store. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 30: Domain 2: Security

### Scenario
A developer needs to store database connection details securely in a multi-tenant environment. The credentials must be rotated automatically every 30 days. Which service should be chosen?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Secrets Manager with RDS integration.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Secrets Manager with RDS integration. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 31: Domain 2: Security

### Scenario
An application requires temporary AWS credentials to access S3 directly from a mobile client. The user must authenticate using Google sign-in. Which Cognito configuration should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Cognito User Pools federated with Google, combined with Cognito Identity Pools.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Cognito User Pools federated with Google, combined with Cognito Identity Pools. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 32: Domain 2: Security

### Scenario
A developer is configuring a Lambda function to decrypt files in an S3 bucket using a Customer Managed Key

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement CMK in AWS KMS. The execution role has S3 read permissions. What else is required?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement CMK in AWS KMS. The execution role has S3 read permissions. What else is required?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 33: Domain 2: Security

### Scenario
A developer is implementing envelope encryption for a client application. Which KMS API call should be made to retrieve both the plaintext and encrypted data key?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement KMS GenerateDataKey API.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement KMS GenerateDataKey API. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 34: Domain 2: Security

### Scenario
An application needs to store non-sensitive configuration values like database ports and hostnames. The developer wants a cost-effective, simple key-value store. Which service should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Systems Manager Parameter Store.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Systems Manager Parameter Store. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 35: Domain 2: Security

### Scenario
A developer needs to store database connection details securely in a multi-tenant environment. The credentials must be rotated automatically every 30 days. Which service should be chosen?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Secrets Manager with RDS integration.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Secrets Manager with RDS integration. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 36: Domain 2: Security

### Scenario
An application requires temporary AWS credentials to access S3 directly from a mobile client. The user must authenticate using Google sign-in. Which Cognito configuration should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Cognito User Pools federated with Google, combined with Cognito Identity Pools.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Cognito User Pools federated with Google, combined with Cognito Identity Pools. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 37: Domain 2: Security

### Scenario
A developer is configuring a Lambda function to decrypt files in an S3 bucket using a Customer Managed Key

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement CMK in AWS KMS. The execution role has S3 read permissions. What else is required?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement CMK in AWS KMS. The execution role has S3 read permissions. What else is required?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 38: Domain 2: Security

### Scenario
A developer is implementing envelope encryption for a client application. Which KMS API call should be made to retrieve both the plaintext and encrypted data key?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement KMS GenerateDataKey API.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement KMS GenerateDataKey API. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 39: Domain 2: Security

### Scenario
An application needs to store non-sensitive configuration values like database ports and hostnames. The developer wants a cost-effective, simple key-value store. Which service should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Systems Manager Parameter Store.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Systems Manager Parameter Store. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 40: Domain 2: Security

### Scenario
A developer needs to store database connection details securely in a multi-tenant environment. The credentials must be rotated automatically every 30 days. Which service should be chosen?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Secrets Manager with RDS integration.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Secrets Manager with RDS integration. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 41: Domain 2: Security

### Scenario
An application requires temporary AWS credentials to access S3 directly from a mobile client. The user must authenticate using Google sign-in. Which Cognito configuration should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Cognito User Pools federated with Google, combined with Cognito Identity Pools.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Cognito User Pools federated with Google, combined with Cognito Identity Pools. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 42: Domain 2: Security

### Scenario
A developer is configuring a Lambda function to decrypt files in an S3 bucket using a Customer Managed Key

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement CMK in AWS KMS. The execution role has S3 read permissions. What else is required?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement CMK in AWS KMS. The execution role has S3 read permissions. What else is required?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 43: Domain 2: Security

### Scenario
A developer is implementing envelope encryption for a client application. Which KMS API call should be made to retrieve both the plaintext and encrypted data key?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement KMS GenerateDataKey API.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement KMS GenerateDataKey API. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 44: Domain 2: Security

### Scenario
An application needs to store non-sensitive configuration values like database ports and hostnames. The developer wants a cost-effective, simple key-value store. Which service should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Systems Manager Parameter Store.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Systems Manager Parameter Store. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 45: Domain 3: Deployment

### Scenario
A developer wants to define Lambda functions and API Gateway endpoints using Infrastructure as Code

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement IaC. The developer prefers using a simplified YAML format specifically designed for serverless. Which framework is best?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement IaC. The developer prefers using a simplified YAML format specifically designed for serverless. Which framework is best?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 46: Domain 3: Deployment

### Scenario
A developer is writing a buildspec.yml for AWS CodeBuild. The build phase needs to use npm cache to reduce build execution times. How should the buildspec.yml be configured?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Add cache paths for node_modules in the buildspec cache section.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Add cache paths for node_modules in the buildspec cache section. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 47: Domain 3: Deployment

### Scenario
An application is deploying an update to an ECS Fargate cluster. The developer wants to route 10% of traffic to the new task version, monitor it for 10 minutes, and then shift all traffic. Which CodeDeploy deployment configuration matches this?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement CodeDeployLinear10PercentEvery10Minutes using ECS AppSpec hooks.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement CodeDeployLinear10PercentEvery10Minutes using ECS AppSpec hooks. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 48: Domain 3: Deployment

### Scenario
A developer is configuring a CodeDeploy deployment for an EC2 Auto Scaling group. The deployment must stop the running application, install the new files, and validate the service. Where are these scripts registered?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement In the hooks section of the appspec.yml file.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement In the hooks section of the appspec.yml file. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 49: Domain 3: Deployment

### Scenario
A developer wants to share private node packages across multiple development teams securely in AWS. Which service should they configure?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS CodeArtifact.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS CodeArtifact. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 50: Domain 3: Deployment

### Scenario
A developer wants to define Lambda functions and API Gateway endpoints using Infrastructure as Code

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement IaC. The developer prefers using a simplified YAML format specifically designed for serverless. Which framework is best?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement IaC. The developer prefers using a simplified YAML format specifically designed for serverless. Which framework is best?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Prerequisites

- [DVA-C02 Full Mock Exam 2 - Part 1 (Questions 1-25)](DVA-C02-Mock-Exam-2-Part-1.md)

## Recommended Next Topics

- [DVA-C02 Full Mock Exam 2 - Part 3 (Questions 51-75)](DVA-C02-Mock-Exam-2-Part-3.md)

## Related Topics

- [AWS Certified Developer – Associate (DVA-C02) Practice Mock Exams](DVA-C02-Mock-Exam.md)
- [DVA-C02 Full Mock Exam - Part 1 (Questions 1-25)](DVA-C02-Mock-Exam-Part-1.md)
- [DVA-C02 Full Mock Exam - Part 2 (Questions 26-50)](DVA-C02-Mock-Exam-Part-2.md)
