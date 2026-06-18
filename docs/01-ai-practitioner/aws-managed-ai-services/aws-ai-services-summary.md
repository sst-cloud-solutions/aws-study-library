# AWS Managed AI Services - Quick Revision Summary

## Amazon Comprehend

- **Key Points**: Fully managed NLP service that **extracts entities, analyzes sentiment, and identifies key phrases from text**. Supports custom classification and medical text analysis (Comprehend Medical).
- **Main Use Case**: Customer interaction analysis, content organization, and extracting insights from unstructured text documents.

## Amazon Translate

- **Key Points**: Deep learning-based **language translation** service with automatic language detection. Supports custom terminology for brand names and proper nouns.
- **Main Use Case**: Website/app localization, multilingual content translation, and enabling international user experiences.

## Amazon Transcribe

- **Key Points**: Converts **speech to text** using ASR (Automatic Speech Recognition). Supports real-time streaming, speaker identification, PII redaction, and custom vocabularies/language models.
- **Main Use Case**: Call center transcription, subtitling, medical dictation (Transcribe Medical), and converting audio/video to searchable text.

## Amazon Polly

- **Key Points**: **Text-to-speech** service with multiple voices and languages. Supports SSML for pronunciation control and lexicons for custom word pronunciations.
- **Main Use Case**: Voice-enabled applications, accessibility features, automated announcements, and generating lifelike speech from text.

## Amazon Rekognition

- **Key Points**: **Image and video analysis** service that **detects objects, people, faces, text, and scenes**. Supports custom labels training and content moderation.
- **Main Use Case**: Facial recognition, content moderation, image labeling, celebrity detection, and video analysis for security and media applications.

## Amazon Lex

- **Key Points**: **Natural language chatbot** engine that builds conversational interfaces using intents, utterances, and slots. Integrates with Lambda functions to fulfill user requests.
- **Main Use Case**: Building voice and text chatbots for customer service, ordering systems, and conversational applications.

## Amazon Personalize

- **Key Points**: Fully managed **recommendation engine** (same as Amazon.com) that provides real-time personalized recommendations via API.
- **Main Use Case**: Personalized product recommendations, content ranking, and customized marketing for retail and media applications.

## Amazon Textract

- **Key Points**: **Extracts text, handwriting, and structured data (forms, tables)** from scanned documents using OCR and ML. Supports synchronous (real-time) and asynchronous processing.
- **Main Use Case**: Document digitization, form processing, invoice extraction, and extracting data from receipts, IDs, and financial documents.

## Amazon Kendra

- **Key Points**: **ML-powered intelligent enterprise search** that extracts answers from documents using natural language queries. Learns from user interactions to improve results.
- **Main Use Case**: Enterprise search and FAQ chatbots that provide accurate answers from document collections (S3, Confluence, SharePoint, etc.).

## Amazon Mechanical Turk

- **Key Points**: Managed **human task outsourcing marketplace** where requesters post HITs (Human Intelligence Tasks) and workers complete them for payment.
- **Main Use Case**: Data labeling, image classification, and tasks requiring human intelligence that are difficult for ML models.

## Amazon Augmented AI (A2I)

- **Key Points**: **Human-in-the-loop** service for reviewing **low-confidence ML predictions**. Integrates with Textract, Rekognition, and SageMaker.
- **Main Use Case**: Quality assurance for ML predictions by routing uncertain results to human reviewers for validation.

## AI Hardware (Trainium & Inferentia)

- **Key Points**:
  - **Trainium**: ML chip for training **large models (100B+ parameters)** with **50% cost reduction** on Trn1 instances.
  - **Inferentia**: ML chip for inference with **4x throughput** and **70% cost reduction** on Inf1/Inf2 instances.
- **Main Use Case**: Cost-effective training and inference for deep learning models at scale.

---

## Prerequisites

- [Hardware for AI](ai-hardware.md)

## Recommended Next Topics

- [Amazon SageMaker](../sagemaker/aws-sagemaker.md)

## Related Topics

- [Introduction of AWS Managed AI Services](introduction-of-aws-managed-ai-services.md)
- [Amazon Comprehend](aws-comprehend.md)
- [Amazon Translate](aws-translate.md)
