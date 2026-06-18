# AWS AI Practitioner Test Study Notes - Glossary

- [AWS AI Practitioner Test Study Notes - Glossary](#aws-ai-practitioner-test-study-notes---glossary)
  - [Core AI and ML Concepts](#core-ai-and-ml-concepts)
  - [Learning Types](#learning-types)
  - [Model Training and Optimization](#model-training-and-optimization)
  - [Model Evaluation Metrics](#model-evaluation-metrics)
  - [Model Behavior and Risks](#model-behavior-and-risks)
  - [Prompting Techniques](#prompting-techniques)
  - [Data Concepts](#data-concepts)
  - [Inference and Deployment](#inference-and-deployment)
  - [Retrieval and Vector Search](#retrieval-and-vector-search)
  - [AWS AI and ML Services](#aws-ai-and-ml-services)
  - [Security, Governance and Pricing](#security-governance-and-pricing)

## Core AI and ML Concepts

- **Accuracy:** A common evaluation metric for classification models that measures how many predictions were correct out of all predictions made. It works well when classes are balanced.
- **Algorithm:** A defined set of steps or rules that a machine learning model follows to learn patterns from data and make predictions.
- **Artificial Intelligence (AI):** The broader field of creating systems capable of performing tasks that typically require human intelligence, such as reasoning, perception, and language understanding.
- **Machine Learning (ML):** A subset of AI where systems automatically learn patterns from data without being explicitly programmed for each rule.
- **Deep Learning:** A branch of ML that uses multi-layer neural networks to process complex data like images, audio, and text.
- **Generative AI:** AI systems designed to create new content such as text, images, videos, music, or code instead of just predicting outcomes.
- **Foundation Model:** Very large models trained on massive and diverse datasets that can be adapted to many downstream tasks through prompting or fine-tuning.
- **Large Language Model (LLM):** A type of foundation model trained on large volumes of text to understand and generate human-like language.
- **Small Language Model (SLM):** A compact language model optimized for efficiency, often used on edge devices where compute and memory are limited.
- **Multi-modal Model:** A model capable of understanding and processing multiple data types (text, image, audio) together.
- **Neural Network:** A computational model made of interconnected layers that transform input data into predictions, inspired by the human brain.

---

## Learning Types

- **Supervised Learning:** The model is trained using labeled data, learning a direct mapping between inputs and correct outputs.
- **Unsupervised Learning:** The model analyzes unlabeled data to find hidden structures or patterns without predefined answers.
- **Semi-Supervised Learning:** Uses a small amount of labeled data along with a large amount of unlabeled data to improve learning efficiency.
- **Self-Supervised Learning:** A technique where the model creates its own labels from raw data, reducing the need for human annotation.
- **Reinforcement Learning (RL):** The model (agent) learns by interacting with an environment and receiving rewards or penalties.
- **Reinforcement Learning from Human Feedback (RLHF):** A refinement of RL where humans rank or score model outputs to better align them with human expectations.

---

## Model Training and Optimization

- **Pre-trained Model:** A model already trained on large, general-purpose datasets and reused for specific tasks.
- **Fine-tuning:** Further training a pre-trained model on a smaller, task-specific dataset to improve performance.
- **Instruction-Based Fine-Tuning:** Uses labeled prompt–response pairs to train models to follow instructions better.
- **Continued Pre-training:** Trains a model further using domain-specific unlabeled data to gain deeper subject knowledge.
- **Transfer Learning:** Reusing knowledge learned from one task and applying it to a related task.
- **Hyperparameters:** Configurable values that control how a model learns, such as learning rate and batch size.
- **Learning Rate:** Controls how much the model updates its weights during each training step.
- **Batch Size:** Number of training samples processed together before updating model weights.
- **Epoch:** One complete iteration through the entire training dataset.
- **Regularization:** Techniques used to reduce overfitting by limiting model complexity.

---

## Model Evaluation Metrics

- **Precision:** Measures how many positive predictions were actually correct; important when false positives are costly.
- **Recall:** Measures how many actual positive cases were correctly identified; important when missing positives is risky.
- **F1 Score:** Combines precision and recall into a single metric, useful for imbalanced datasets.
- **Confusion Matrix:** A table that shows true positives, false positives, true negatives, and false negatives.
- **MAE (Mean Absolute Error):** Measures average absolute difference between predicted and actual values.
- **RMSE (Root Mean Squared Error):** Similar to MAE but punishes bigger errors more harshly.
- **R² (R-Squared):** Shows how much of the variation in results your model can explain - closer to 1 is better.
- **Perplexity:** Measures how surprised a language model is by text - lower is better because it means more confident predictions.
- **BLEU (Bilingual Evaluation Understudy):** An automated metric used to evaluate the quality of text that has been machine-translated from one language to another by comparing it to high-quality human translations.
- **ROUGE (Recall-Oriented Understudy for Gisting Evaluation):** Measures how good a summary is by comparing it to human-written summaries.

---

## Model Behavior and Risks

- **Overfitting:** When a model memorizes the training data too well and can't handle new examples it hasn't seen.
- **Underfitting:** When a model is too simple and can't learn the patterns in the data properly.
- **Bias:** A systematic error in an AI system that results in unfair or discriminatory outcomes, often stemming from unrepresentative training data.
- **Fairness:** The ethical goal of ensuring that an AI model's predictions do not create discriminatory or unjust outcomes for different demographic groups.
- **Hallucination:** A phenomenon where a generative AI model produces text that is plausible and well-written but is factually incorrect, invented, or nonsensical.
- **Explainability:** Being able to explain why a model made a certain decision in simple terms people can understand.
- **Interpretability:** How easily humans can understand a model’s internal decision process.
- **Opaque Model (Black-box):** A complex model, such as a deep neural network, whose internal decision-making process is not easily understood by humans.
- **Transparent Model (White-box):** A model, such as a decision tree, whose internal decision-making process is easily understood by humans.
- **Nondeterminism:** A characteristic of generative AI models where asking the same prompt multiple times can produce different, non-identical responses.
- **Toxicity:** Harmful, offensive, or inappropriate content in AI outputs.
- **Jailbreaking:** Attempts to bypass AI safety mechanisms.
- **Prompt Injection:** Malicious instructions embedded in prompts to override system behavior.
- **Prompt Poisoning:** Injecting harmful data into prompts or training data to influence outputs.
- **IP Infringement:** Risk of generating outputs that resemble copyrighted material.

---

## Prompting Techniques

- **Prompt Engineering:** Designing effective prompts to guide model outputs.
- **Zero-shot Prompting:** Asking the model to perform a task without examples.
- **Single-shot Prompting:** Providing one example in the prompt.
- **Few-shot Prompting:** Providing multiple examples to guide responses.
- **System Prompt:** Initial instructions that set how the AI should behave throughout the entire conversation.

---

## Data Concepts

- **Structured Data:** Organized data in neat rows and columns like spreadsheets or databases.
- **Unstructured Data:** Data that does not have a predefined organizational structure, such as the text of an email, an audio file, a video, or an image.
- **Labeled Data:** Data where each example is tagged with the correct answer or "label." It is the required input for supervised learning.
- **Unlabeled Data:** Raw data with no predefined answers or labels. It is the required input for unsupervised learning.
- **Feature Engineering:** The process of selecting, transforming, and creating input variables ("features") from raw data to improve the performance of a machine learning model.
- **Exploratory Data Analysis (EDA):** The initial process of analyzing a dataset to understand its main characteristics, discover patterns, and spot anomalies.
- **Data Drift:** When the real-world data starts looking different from what the model was trained on, making it less accurate.
- **Model Drift:** When a model becomes less accurate over time because the world has changed since it was trained.
- **Data Lineage:** The practice of tracking the origin, movement, and transformation of data throughout its lifecycle. Crucial for reproducibility and auditing.
- **Data Residency:** The requirement that certain data must be physically stored within a specific geographical location to comply with local laws and regulations.
- **Data Retention:** A policy that defines how long data must be kept for legal, regulatory, or business reasons.
- **Encryption:** The process of encoding data to protect it from unauthorized access. Can be "at rest" (when stored) or "in transit" (when moving over a network).

---

## Inference and Deployment

- **Inference:** Using a trained model to make predictions.
- **Real-time Inference:** Low-latency predictions for live applications.
- **Batch Inference:** Run predictions on a huge pile of data all at once when you don't need instant results.
- **Asynchronous Inference:** Run predictions that take a long time on big files, and get the results back when they're ready.
- **Serverless Inference:** Only pay when predictions are running, scales to zero when idle - great for unpredictable traffic.
- **Edge Inference:** Running AI models directly on devices like phones or cameras instead of sending data to the cloud..
- **Latency:** How long it takes to get a response back after you send a request.

---

## Retrieval and Vector Search

- **Embedding:** Converting text or images into numbers that capture their meaning, so similar things have similar numbers.
- **Vector Database:** Special database built for storing embeddings and finding similar items super fast.
- **Vector Search (Similarity Search):** Finding items that are most similar to what you're looking for based on their embeddings.
- **RAG (Retrieval Augmented Generation):** Give the model access to external information to look up facts before answering, reducing hallucinations.
- **pgvector:** Add-on for PostgreSQL databases that lets you store and search through embeddings.

---

## AWS AI and ML Services

- **Amazon Bedrock:** A fully managed AWS service that provides access to a variety of high-performing Foundation Models from leading AI companies via a single API, simplifying the development of generative AI applications.
- **Bedrock Agents:** Smart assistants in Bedrock that can figure out complex tasks and execute them automatically.
- **Guardrails for Bedrock:** A safety feature that allows you to implement policies to control the types of content your generative AI application will generate, by defining denied topics and content filters.
- **Amazon SageMaker:** Complete toolkit for building, training, and running your own custom machine learning models.
- **SageMaker Studio:** All-in-one workspace where you do everything related to machine learning.
- **SageMaker Canvas:** Build ML models without writing any code using a visual drag-and-drop interface.
- **SageMaker JumpStart:** A feature of SageMaker that provides access to a wide range of publicly available, open-source Foundation Models, offering one-click deployment for fine-tuning and inference.
- **SageMaker Pipelines:** A service to build, automate, and manage end-to-end ML workflows (CI/CD for ML).
- **SageMaker Model Monitor:** A feature of SageMaker that automatically detects data drift and model quality degradation in deployed models.
- **SageMaker Clarify:** A feature of SageMaker that helps improve ML models by detecting potential bias in data and explaining how models make predictions.
- **SageMaker Ground Truth:** Get humans to label your data or review model outputs to make them better.
- **SageMaker Model Cards:** A feature of SageMaker that provides a standardized way to document critical information about an ML model, acting as a "nutrition label" for transparency and governance.

---

## Security, Governance and Pricing

- **IAM (Identity and Access Management):** The foundational AWS service for securely controlling access to AWS services and resources by managing users, groups, and permissions.
- **AWS CloudTrail:** Records every action taken in your AWS account so you can see who did what and when.
- **AWS Config:** Keeps track of how your AWS resources are set up and checks if they meet your rules.
- **AWS Artifact:** A service that provides on-demand access to AWS's security and compliance reports, such as ISO certifications and SOC reports.
- **AWS Audit Manager:** A service that helps you continuously audit your AWS usage to simplify how you assess risk and compliance with regulations and industry standards.
- **AWS PrivateLink:** A networking service that provides private, secure connectivity between your VPCs and AWS services, without exposing your traffic to the public internet.
- **Shared Responsibility Model:** The AWS security framework where AWS is responsible for the **security OF the cloud** (infrastructure, managed services), and the customer is responsible for **security IN the cloud** (data, access configuration, responsible AI).
- **On-Demand Pricing:** Pay-per-use pricing model.
- **Provisioned Throughput:** A pricing model for AI services where you purchase dedicated capacity for a fixed price to ensure consistent performance and potentially lower costs for high-volume, stable workloads.
- **Batch Pricing:** Lower-cost processing with delayed results.

---

## Prerequisites

- [AWS Certified AI Practitioner (AIF-C01) Study Guide](study-guide.md)

## Recommended Next Topics

- [Practice Tests](practice-test/tests.md)

## Related Topics

- [AI Practitioner Study Plan & Roadmap](aif-roadmap.md)
- [AWS Certified AI Practitioner (AIF-C01) Study Guide](study-guide.md)
