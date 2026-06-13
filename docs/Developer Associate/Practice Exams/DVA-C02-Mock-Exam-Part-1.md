---
sidebar_position: 2
sidebar_label: Part 1 (Questions 1-25)
---

# DVA-C02 Full Mock Exam - Part 1 (Questions 1-25)

This is Part 1 of the Mock Exam 1 for the AWS Certified Developer – Associate (DVA-C02) certification.

---

## Question 1: Domain 1: Development with AWS Services

### Scenario
A developer is building a serverless backend API that receives client data and triggers an AWS Lambda function. During high-traffic events, the Lambda execution experiences throttle errors due to account-level concurrency limits. What is the most effective way to protect the Lambda execution from being throttled by other functions in the account?

### Options
*   A. Enable Provisioned Concurrency for the Lambda function.
*   B. Configure Reserved Concurrency for the Lambda function.
*   C. Increase the timeout of the Lambda function.
*   D. Use an Amazon SQS queue to store events and trigger Lambda via Event Source Mapping.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Reserved Concurrency allocates a dedicated pool of concurrent executions specifically to that function. This ensures that the function always has concurrency available to it, and prevents it from scaling beyond that number, protecting the rest of the account and the function itself from sharing limits.
</details>

---

## Question 2: Domain 1: Development with AWS Services

### Scenario
An application needs to process files uploaded to an Amazon S3 bucket. The developer wants to trigger an AWS Lambda function asynchronously whenever a new PDF file is uploaded. How should the developer configure the Lambda integration?

### Options
*   A. Set the invocation type header to 'RequestResponse' in the S3 configuration.
*   B. Set the invocation type header to 'Event' when configuring S3 Event Notifications.
*   C. Configure a custom S3 Gateway Endpoint to execute Lambda directly.
*   D. Set the invocation type header to 'DryRun' in S3 Event Notifications.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
S3 Event Notifications invoke Lambda asynchronously by default. In the AWS SDK, setting the InvocationType to 'Event' routes the request as an asynchronous invocation, queueing the event for processing.
</details>

---

## Question 3: Domain 1: Development with AWS Services

### Scenario
A developer is configuring an API Gateway endpoint that triggers a Lambda function using Lambda Proxy Integration. The client application requires custom HTTP headers to be returned from the API. How should the developer return these headers?

### Options
*   A. Configure Integration Responses in the API Gateway Console to map headers.
*   B. Define the headers inside the Lambda function's handler return object under the 'headers' key.
*   C. Use a Velocity Template Language (VTL) mapping template to inject headers into the client response.
*   D. Create an API Gateway Method Response containing the header keys.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
Under Lambda Proxy Integration (`AWS_PROXY`), API Gateway expects the Lambda function to return a structured JSON response containing the status code, headers, and body. Therefore, the developer must define custom headers directly inside the Lambda return object under the `headers` key.
</details>

---

## Question 4: Domain 1: Development with AWS Services

### Scenario
A developer is configuring a DynamoDB table for an e-commerce order processing system. The table needs to support 50 writes per second. Each order item size is 2.5 KB. How many Write Capacity Units (WCUs) should the developer provision for standard writes?

### Options
*   A. 50 WCUs
*   B. 100 WCUs
*   C. 150 WCUs
*   D. 300 WCUs

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: C**

### Explanation:
One WCU represents 1 KB of data write per second. The item size of 2.5 KB must be rounded up to the next integer, which is 3 KB. Therefore, each write requires 3 WCUs. For 50 writes per second: 50 * 3 = 150 WCUs.
</details>

---

## Question 5: Domain 1: Development with AWS Services

### Scenario
A developer is querying a DynamoDB table and needs to perform strongly consistent reads on items of size 6 KB. The application expects 100 reads per second. How many Read Capacity Units (RCUs) should the developer provision?

### Options
*   A. 100 RCUs
*   B. 200 RCUs
*   C. 300 RCUs
*   D. 400 RCUs

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
One RCU represents 1 strongly consistent read per second for an item up to 4 KB. The item size of 6 KB must be rounded up to the next multiple of 4 KB, which is 8 KB. Thus, each read requires 8 KB / 4 KB = 2 RCUs. For 100 reads per second: 100 * 2 = 200 RCUs.
</details>

---

## Question 6: Domain 1: Development with AWS Services

### Scenario
A retail application uses an API Gateway REST API. The developer wants to configure custom response messages for validation errors before the request reaches the Lambda backend. How can this be done?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Configure Gateway Responses in API Gateway.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Configure Gateway Responses in API Gateway. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 7: Domain 1: Development with AWS Services

### Scenario
A developer wants to coordinate multiple Lambda functions running in a serverless workflow. Some tasks run in parallel, while others require human approval steps. Which service should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Step Functions Standard Workflows.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Step Functions Standard Workflows. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 8: Domain 1: Development with AWS Services

### Scenario
An application is writing messages to SQS. The messages must be processed in the exact order they were received. Which queue type and configuration should be selected?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement SQS FIFO Queue with MessageGroupId.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement SQS FIFO Queue with MessageGroupId. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 9: Domain 1: Development with AWS Services

### Scenario
A developer is configuring a Lambda function to process a high-throughput Kinesis Data Stream. The function experiences error timeouts on specific bad records, stalling the stream. How can this be avoided?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Configure BisectBatchOnError and MaximumRecordAgeInSeconds in Event Source Mapping.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Configure BisectBatchOnError and MaximumRecordAgeInSeconds in Event Source Mapping. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 10: Domain 1: Development with AWS Services

### Scenario
A developer is using AWS SDK to write data to DynamoDB. The write operations are failing with ProvisionedThroughputExceededException. What is the best practice to handle this exception in code?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Implement exponential backoff and jitter in retry logic.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Implement exponential backoff and jitter in retry logic. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 11: Domain 1: Development with AWS Services

### Scenario
A retail application uses an API Gateway REST API. The developer wants to configure custom response messages for validation errors before the request reaches the Lambda backend. How can this be done?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Configure Gateway Responses in API Gateway.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Configure Gateway Responses in API Gateway. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 12: Domain 1: Development with AWS Services

### Scenario
A developer wants to coordinate multiple Lambda functions running in a serverless workflow. Some tasks run in parallel, while others require human approval steps. Which service should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Step Functions Standard Workflows.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Step Functions Standard Workflows. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 13: Domain 1: Development with AWS Services

### Scenario
An application is writing messages to SQS. The messages must be processed in the exact order they were received. Which queue type and configuration should be selected?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement SQS FIFO Queue with MessageGroupId.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement SQS FIFO Queue with MessageGroupId. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 14: Domain 1: Development with AWS Services

### Scenario
A developer is configuring a Lambda function to process a high-throughput Kinesis Data Stream. The function experiences error timeouts on specific bad records, stalling the stream. How can this be avoided?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Configure BisectBatchOnError and MaximumRecordAgeInSeconds in Event Source Mapping.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Configure BisectBatchOnError and MaximumRecordAgeInSeconds in Event Source Mapping. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 15: Domain 1: Development with AWS Services

### Scenario
A developer is using AWS SDK to write data to DynamoDB. The write operations are failing with ProvisionedThroughputExceededException. What is the best practice to handle this exception in code?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Implement exponential backoff and jitter in retry logic.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Implement exponential backoff and jitter in retry logic. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 16: Domain 1: Development with AWS Services

### Scenario
A retail application uses an API Gateway REST API. The developer wants to configure custom response messages for validation errors before the request reaches the Lambda backend. How can this be done?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Configure Gateway Responses in API Gateway.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Configure Gateway Responses in API Gateway. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 17: Domain 1: Development with AWS Services

### Scenario
A developer wants to coordinate multiple Lambda functions running in a serverless workflow. Some tasks run in parallel, while others require human approval steps. Which service should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Step Functions Standard Workflows.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Step Functions Standard Workflows. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 18: Domain 1: Development with AWS Services

### Scenario
An application is writing messages to SQS. The messages must be processed in the exact order they were received. Which queue type and configuration should be selected?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement SQS FIFO Queue with MessageGroupId.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement SQS FIFO Queue with MessageGroupId. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 19: Domain 1: Development with AWS Services

### Scenario
A developer is configuring a Lambda function to process a high-throughput Kinesis Data Stream. The function experiences error timeouts on specific bad records, stalling the stream. How can this be avoided?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Configure BisectBatchOnError and MaximumRecordAgeInSeconds in Event Source Mapping.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Configure BisectBatchOnError and MaximumRecordAgeInSeconds in Event Source Mapping. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 20: Domain 1: Development with AWS Services

### Scenario
A developer is using AWS SDK to write data to DynamoDB. The write operations are failing with ProvisionedThroughputExceededException. What is the best practice to handle this exception in code?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Implement exponential backoff and jitter in retry logic.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Implement exponential backoff and jitter in retry logic. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 21: Domain 1: Development with AWS Services

### Scenario
A retail application uses an API Gateway REST API. The developer wants to configure custom response messages for validation errors before the request reaches the Lambda backend. How can this be done?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Configure Gateway Responses in API Gateway.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Configure Gateway Responses in API Gateway. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 22: Domain 1: Development with AWS Services

### Scenario
A developer wants to coordinate multiple Lambda functions running in a serverless workflow. Some tasks run in parallel, while others require human approval steps. Which service should be used?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement AWS Step Functions Standard Workflows.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement AWS Step Functions Standard Workflows. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 23: Domain 1: Development with AWS Services

### Scenario
An application is writing messages to SQS. The messages must be processed in the exact order they were received. Which queue type and configuration should be selected?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement SQS FIFO Queue with MessageGroupId.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement SQS FIFO Queue with MessageGroupId. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 24: Domain 1: Development with AWS Services

### Scenario
A developer is configuring a Lambda function to process a high-throughput Kinesis Data Stream. The function experiences error timeouts on specific bad records, stalling the stream. How can this be avoided?

### Options
*   A. Use a custom script to handle this operation.
*   B. Implement Configure BisectBatchOnError and MaximumRecordAgeInSeconds in Event Source Mapping.
*   C. Increase the timeout limit of the calling service.
*   D. Configure an S3 event trigger to run a recovery process.

<details>
<summary><b>Show Answer & Architectural Explanation</b></summary>

**Correct Answer: B**

### Explanation:
The scenario describes a typical AWS development issue where the correct approach is to implement Configure BisectBatchOnError and MaximumRecordAgeInSeconds in Event Source Mapping. This complies with AWS developer best practices for performance, security, and scalability under the DVA-C02 objectives.
</details>

---

## Question 25: Domain 2: Security

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

