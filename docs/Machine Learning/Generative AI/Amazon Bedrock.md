---
sidebar_position: 1
---

# Amazon Bedrock

Amazon Bedrock is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Mistral AI, Stability AI, and Amazon, along with a broad set of capabilities to build generative AI applications with security, privacy, and responsible AI.

## Key Features

- **Choice of Models:** Access FMs from multiple providers via a single API.
- **Serverless Experience:** No infrastructure to manage; deploy and scale generative AI applications easily.
- **Guardrails for Amazon Bedrock:** Implement safeguards to filter harmful content and protect sensitive information (PII).
- **Knowledge Bases:** Securely connect FMs to your internal data sources for Retrieval-Augmented Generation (RAG).
- **Agents for Amazon Bedrock:** Execute multistep tasks by connecting FMs to your company systems and APIs.
- **Model Evaluation:** Compare and evaluate models based on metrics like accuracy and robustness.

## Architecture & Integration

- **Security:** Data is encrypted at rest and in transit. Your data is **not** used to train the underlying base models.
- **VPC Support:** Use VPC endpoints (AWS PrivateLink) to establish a private connection between your VPC and Amazon Bedrock.
- **IAM Integration:** Control access to specific models and features using IAM policies.
- **Governance:** Integrated with AWS CloudTrail for monitoring API activity and AWS Config for compliance.

## Use Cases

- **Text Generation:** Create blog posts, emails, and marketing copy.
- **Chatbots/Virtual Assistants:** Build conversational interfaces for customer support.
- **Search & Summarization:** Summarize long documents and provide relevant answers from large datasets.
- **Image Generation:** Create realistic images for advertising and design.

## Exam Tips (SAP-C02)

- **Data Privacy:** Remember that data used with Bedrock is not used for training base models, ensuring compliance with strict data residency and privacy requirements.
- **RAG vs. Fine-Tuning:** Bedrock Knowledge Bases provide an easy way to implement RAG without the overhead of fine-tuning models.
- **Agents:** Use Bedrock Agents when the requirement involves taking actions (e.g., booking a flight, updating a database) based on natural language input.
- **Guardrails:** Essential for enterprise-grade AI to ensure safety and compliance.
