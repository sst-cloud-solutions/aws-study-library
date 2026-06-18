# Responsible AI and Security

- [Responsible AI and Security](#responsible-ai-and-security)
  - [Overview](#overview)
  - [Core Dimensions of Responsible AI](#core-dimensions-of-responsible-ai)
  - [AWS Services for Responsible AI](#aws-services-for-responsible-ai)
  - [AWS AI Service Cards](#aws-ai-service-cards)
  - [Interpretability vs Explainability](#interpretability-vs-explainability)
  - [High Interpretability Models – Decision Trees](#high-interpretability-models--decision-trees)
  - [Partial Dependence Plots (PDP)](#partial-dependence-plots-pdp)
  - [Human-Centered Design (HCD) for Explainable AI](#human-centered-design-hcd-for-explainable-ai)

## Overview

- **Responsible AI**
  - **Responsible AI** focuses on building AI systems that are **ethical, transparent, fair, and trustworthy**.
  - The objective is to **identify, reduce, and mitigate risks** such as bias, misuse, hallucinations, or harmful outputs.
  - Responsible AI must be applied **across the entire AI lifecycle**, including:
    - **Design**: defining ethical goals and constraints
    - **Development**: selecting data, models, and evaluation methods
    - **Deployment**: ensuring safe real-world usage
    - **Monitoring & Evaluation**: continuously assessing performance, bias, and drift
- **Security**
  - Security ensures the **Confidentiality, Integrity, and Availability (CIA triad)** of AI systems.
  - Protects: Training data, Model artifacts, Inference results, Underlying infrastructure
  - Prevents risks such as data leakage, model tampering, unauthorized access, and service disruption.
- **Governance**
  - Governance defines **how AI systems are managed, controlled, and audited** within an organization.
  - Includes Policies for acceptable AI usage, Approval and review processes, Clear ownership and accountability
  - Ensures AI systems comply with **business goals, legal requirements, and ethical standards**.
  - Strong governance improves **stakeholder trust and transparency**.
- **Compliance**
  - Compliance ensures AI systems **adhere to laws, regulations, and industry standards**.
  - Especially critical in regulated industries such as:
    - Healthcare (HIPAA)
    - Finance (risk, fraud, fairness)
    - Legal and public sector
  - Helps organizations avoid legal penalties and reputational damage.

## Core Dimensions of Responsible AI

- **Fairness**: Ensures AI systems treat all individuals and groups equitably and do not reinforce historical or societal biases.
- **Explainability**: Enables humans to understand **why a model produced a specific output**, increasing trust and accountability.
- **Transparency**: Provides visibility into how AI systems are built, trained, evaluated, and used, including their limitations.
- **Privacy & Security**: Ensures personal and sensitive data is protected, anonymized, or redacted, and used only with proper consent.
- **Veracity & Robustness**: Ensures AI systems are reliable, accurate, and resilient, even when exposed to noisy or unexpected inputs.
- **Governance**: Establishes policies, controls, and enforcement mechanisms to maintain responsible AI practices.
- **Safety**: Prevents AI systems from producing harmful, dangerous, or misleading outcomes for individuals or society.
- **Controllability**: Ensures humans can guide, override, or stop AI systems when behavior deviates from intended goals.

## AWS Services for Responsible AI

- **Amazon Bedrock**:
  - Provides **foundation models with built-in evaluation tools**.
  - Supports both **automatic and human-based evaluation** to assess quality, bias, and safety of generated outputs.
- **Guardrails for Amazon Bedrock**:
  - Allows organizations to **define safety boundaries** for generative AI.
  - Capabilities include:
    - Filtering toxic or harmful content
    - Redacting PII
    - Blocking sensitive or undesirable topics
  - Helps enforce responsible AI usage at inference time.
- **Amazon SageMaker Clarify**:
  - Detects **bias in training data and model predictions**.
  - Evaluates: Model accuracy, Robustness, Toxicity
  - Helps explain predictions and identify skewed data (e.g., gender or demographic bias).
- **SageMaker Data Wrangler**:
  - Used for **data preparation and bias mitigation**.
  - Can:
    - Balance datasets
    - Generate synthetic data for underrepresented groups
  - Helps improve fairness before model training.
- **SageMaker Model Monitor**:
  - Continuously monitors models in production.
  - Detects: Data drift, Model quality degradation
  - Ensures models remain reliable over time.
- **Amazon Augmented AI (A2I)**:
  - Enables **human-in-the-loop workflows**.
  - Routes low-confidence predictions to humans for review.
  - Commonly used in moderation, fraud detection, and compliance-heavy workflows.
- **Governance Tools in SageMaker**:
  - **SageMaker Role Manager**: controls access and permissions
  - **Model Cards**: standardized documentation describing model purpose, risks, and limitations
  - **Model Dashboard**: centralized visibility into model governance and compliance

## AWS AI Service Cards

- Official AWS documentation for responsible AI usage of managed services.
- Available for services like:
  - Amazon Rekognition
  - Amazon Textract
- Describes: Intended use cases, Limitations and risks, Responsible design considerations, Deployment best practices
- [AWS AI Service Cards](https://aws.amazon.com/ai/responsible-ai/resources/)

## Interpretability vs Explainability

- **Interpretability**:
- Measures how easily a human can **understand a model’s decision-making process**.
- Highly interpretable models expose their logic directly.
- Trade-off:
  - **High interpretability → simpler models → lower performance**
  - **Low interpretability → complex models → higher performance**
- **Explainability**:
  - Provides insight into model behavior **without fully exposing internal logic**.
  - Through model agnostic methods (for example, partial dependence plots, SHapley Additive exPlanations (SHAP) dependence plots, or surrogate models) we can discover meaning between input data attributions and model outputs, which enables us to explain the nature and behavior of an ML model
  - Explainability can sometimes be enough

## High Interpretability Models – Decision Trees

- Supervised learning models used for **classification and regression** tasks.
- Decisions are made through **clear, rule-based splits**.
- Splits data into branches based on feature values
- Splitting can be simple rules such as "is the feature greater than 10?"
- Advantages: Easy to visualize and understand
- Disadvantages: Can overfit when trees become too deep
- Example: Decision tree illustrates a risk assessment logic where **Income acts** as the primary filter and **Credit History** serves as a secondary qualifier to classify individuals into Low, Moderate, or High risk categories.

```text
INCOME
│
├── More than $50K
│   ├── Credit History: Good ─── [LOW RISK]
│   ├── Credit History: Bad ──── [MODERATE RISK]
│   └── Credit History: Unknown ─ [MODERATE RISK]
│
├── More than $20-50K
│   ├── Credit History: Good ─── [LOW RISK]
│   ├── Credit History: Bad ──── [HIGH RISK]
│   └── Credit History: Unknown ─ [HIGH RISK]
│
└── Less than $20K
    └── [HIGH RISK]
```

## Partial Dependence Plots (PDP)

- Show how changes in a single feature affect **predictions**.
- Show how a single feature can influence the predicted outcome, while holding other features constant
- Especially useful for explaining **black-box models** like neural networks
- Helps with interpretability and explainability

## Human-Centered Design (HCD) for Explainable AI

- Emphasizes designing AI systems around **human needs and decision-making processes**.
- **Design for Amplified Decision-Making**
  - Minimize risk and errors in a stressful or high-pressure environments
  - Design for clarity, simplicity and usability
  - Design for reflexivity (reflect on decision-making process) and accountability
- **Design for Unbiased Decision-Making**
  - Decision process is free of bias
  - Encourages training and processes to identify and mitigate bias.
- **Design for Human & AI Learning**
  - Cognitive apprenticeship: AI systems learn from human instructors and experts
  - Personalization: meet the specific needs and preferences of a human learner
  - User-centered design: accessible to wide range of users

---

## Prerequisites

- [Amazon SageMaker](../sagemaker/aws-sagemaker.md)

## Recommended Next Topics

- [GenAI Capabilities and Challenges](genai-challenges.md)

## Related Topics

- [GenAI Capabilities and Challenges](genai-challenges.md)
- [Compliance for AI](compliance.md)
- [Governance for AI](governance.md)
