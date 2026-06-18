# Compliance for AI

- [Compliance for AI](#compliance-for-ai)
  - [Regulated Workloads](#regulated-workloads)
  - [AI Standard Compliance Challenges](#ai-standard-compliance-challenges)
  - [AWS Compliance](#aws-compliance)
  - [Model Cards](#model-cards)

## Regulated Workloads

- Certain industries require a higher level of compliance due to strict regulatory and security requirements. These are known as regulated workloads and commonly include: Financial services, Healthcare, Aerospace
- If we need to comply with regulatory frameworks (audit, archival, special security requirements), then we have a regulated workload

## AI Standard Compliance Challenges

- **Complexity and Opacity**: AI models, especially deep learning systems, often operate as “black boxes,” making it difficult to understand or audit how decisions are made.
- **Dynamism and Adaptability**: AI systems are not static. They evolve over time as models are retrained or updated, which complicates ongoing compliance and validation.
- **Emergent Capabilities**: AI systems may exhibit unintended or unexpected behaviors that were not explicitly designed or anticipated.
- **Unique Risks**: algorithmic bias, privacy violations and misinformation
  - Algorithmic bias: Bias present in training data can be learned and amplified by the model
  - Human bias: Bias introduced by developers, data curators, or system designers
  - Privacy violations and misinformation
- **Algorithm Accountability**: algorithms should be transparent and explainable
  - Regulations in the EU "Artificial Intelligence Act" and US (several state and cities)
  - Promote fairness, non-discrimination and human rights

## AWS Compliance

- AWS supports are over 140 security standards and compliance certifications
- Examples:
  - National Institute of Standards and Technology (NIST)
  - European Union Agency for Cybersecurity (ENISA)
  - International Organization for Standardization (ISO)
  - AWS System and Organization Controls (SOC)
  - Health Insurance Portability and Accountability Act (HIPAA)
  - General Data Protection Regulation (GDPR)
  - Payment Card Industry Data Security Standard (PCI DSS)
- These certifications help customers meet regulatory requirements when building AI solutions on AWS.

## Model Cards

- Standardized format for documenting the key details about an ML model
- For GenAI models it can include source citations and data origin documentation
- Details about the dataset used, their sources, licenses and any known biases or quality issues in the training data
- Intended use, risk rating of a model, training details
- SageMaker Model Cards: document your ML model in a centralized place
- Helpful to support audit activities
- AWS AI Service Cards are examples

---

## Prerequisites

- [GenAI Capabilities and Challenges](genai-challenges.md)

## Recommended Next Topics

- [Governance for AI](governance.md)

## Related Topics

- [Responsible AI and Security](responsible-ai.md)
- [GenAI Capabilities and Challenges](genai-challenges.md)
- [Governance for AI](governance.md)
