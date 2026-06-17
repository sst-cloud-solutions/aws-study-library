---
sidebar_position: 4
sidebar_label: Part 3 (Questions 51-75)
---

# DVA-C02 Full Mock Exam - Part 3 (Questions 51-75)

This is Part 3 of the Mock Exam 1 for the AWS Certified Developer – Associate (DVA-C02) certification.

---

## Question 51: Domain 3: Deployment

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

## Question 52: Domain 3: Deployment

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

## Question 53: Domain 3: Deployment

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

## Question 54: Domain 3: Deployment

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

## Question 55: Domain 3: Deployment

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

## Question 56: Domain 3: Deployment

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

## Question 57: Domain 3: Deployment

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

## Question 58: Domain 3: Deployment

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

## Question 59: Domain 3: Deployment

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

## Question 60: Domain 3: Deployment

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

## Question 61: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is configuring AWS X-Ray tracing. They want to add a searchable, indexable key-value pair to the trace data. How should this be added?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Add an X-Ray Annotation.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Add an X-Ray Annotation. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 62: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is writing a Lambda function that queries a DynamoDB table. The queries are consuming high Read Capacity Units

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement RCUs. What can the developer do to optimize read performance and reduce RCUs?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement RCUs. What can the developer do to optimize read performance and reduce RCUs?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 63: Domain 4: Troubleshooting and Optimization

### Scenario
A serverless application logs errors to CloudWatch. The developer wants to receive an SNS notification whenever the logs contain the word 'FATAL'. How should this be configured?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Create a CloudWatch Metric Filter on the log group and set up an alarm.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Create a CloudWatch Metric Filter on the log group and set up an alarm. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 64: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is querying a DynamoDB table containing millions of records. The query returns a pagination limit error. How should the developer fetch the rest of the records?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Read the LastEvaluatedKey from the response and pass it as the ExclusiveStartKey in the next query.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Read the LastEvaluatedKey from the response and pass it as the ExclusiveStartKey in the next query. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 65: Domain 4: Troubleshooting and Optimization

### Scenario
An application experiences latency spikes. The developer wants to trace the request execution path through API Gateway, Lambda, and DynamoDB, identifying where bottlenecks occur. Which service should be instrumented?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS X-Ray with segment/subsegment tracing.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS X-Ray with segment/subsegment tracing. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 66: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is configuring AWS X-Ray tracing. They want to add a searchable, indexable key-value pair to the trace data. How should this be added?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Add an X-Ray Annotation.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Add an X-Ray Annotation. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 67: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is writing a Lambda function that queries a DynamoDB table. The queries are consuming high Read Capacity Units

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement RCUs. What can the developer do to optimize read performance and reduce RCUs?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement RCUs. What can the developer do to optimize read performance and reduce RCUs?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 68: Domain 4: Troubleshooting and Optimization

### Scenario
A serverless application logs errors to CloudWatch. The developer wants to receive an SNS notification whenever the logs contain the word 'FATAL'. How should this be configured?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Create a CloudWatch Metric Filter on the log group and set up an alarm.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Create a CloudWatch Metric Filter on the log group and set up an alarm. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 69: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is querying a DynamoDB table containing millions of records. The query returns a pagination limit error. How should the developer fetch the rest of the records?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Read the LastEvaluatedKey from the response and pass it as the ExclusiveStartKey in the next query.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Read the LastEvaluatedKey from the response and pass it as the ExclusiveStartKey in the next query. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 70: Domain 4: Troubleshooting and Optimization

### Scenario
An application experiences latency spikes. The developer wants to trace the request execution path through API Gateway, Lambda, and DynamoDB, identifying where bottlenecks occur. Which service should be instrumented?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS X-Ray with segment/subsegment tracing.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS X-Ray with segment/subsegment tracing. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 71: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is configuring AWS X-Ray tracing. They want to add a searchable, indexable key-value pair to the trace data. How should this be added?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Add an X-Ray Annotation.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Add an X-Ray Annotation. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 72: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is writing a Lambda function that queries a DynamoDB table. The queries are consuming high Read Capacity Units

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement RCUs. What can the developer do to optimize read performance and reduce RCUs?.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement RCUs. What can the developer do to optimize read performance and reduce RCUs?. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 73: Domain 4: Troubleshooting and Optimization

### Scenario
A serverless application logs errors to CloudWatch. The developer wants to receive an SNS notification whenever the logs contain the word 'FATAL'. How should this be configured?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Create a CloudWatch Metric Filter on the log group and set up an alarm.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Create a CloudWatch Metric Filter on the log group and set up an alarm. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 74: Domain 4: Troubleshooting and Optimization

### Scenario
A developer is querying a DynamoDB table containing millions of records. The query returns a pagination limit error. How should the developer fetch the rest of the records?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Read the LastEvaluatedKey from the response and pass it as the ExclusiveStartKey in the next query.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Read the LastEvaluatedKey from the response and pass it as the ExclusiveStartKey in the next query. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 75: Domain 4: Troubleshooting and Optimization

### Scenario
An application experiences latency spikes. The developer wants to trace the request execution path through API Gateway, Lambda, and DynamoDB, identifying where bottlenecks occur. Which service should be instrumented?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS X-Ray with segment/subsegment tracing.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS X-Ray with segment/subsegment tracing. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Prerequisites

- [DVA-C02 Full Mock Exam - Part 2 (Questions 26-50)](DVA-C02-Mock-Exam-Part-2.md)

## Recommended Next Topics

- [DVA-C02 Full Mock Exam 2 - Part 1 (Questions 1-25)](DVA-C02-Mock-Exam-2-Part-1.md)

## Related Topics

- [AWS Certified Developer – Associate (DVA-C02) Practice Mock Exams](DVA-C02-Mock-Exam.md)
- [DVA-C02 Full Mock Exam - Part 1 (Questions 1-25)](DVA-C02-Mock-Exam-Part-1.md)
- [DVA-C02 Full Mock Exam - Part 2 (Questions 26-50)](DVA-C02-Mock-Exam-Part-2.md)
