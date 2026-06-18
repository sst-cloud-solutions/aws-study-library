# Amazon Transcribe

- [Amazon Transcribe](#amazon-transcribe)
  - [Overview](#overview)
  - [Improving Accuracy](#improving-accuracy)
  - [Toxicity Detection](#toxicity-detection)
  - [Amazon Transcribe Medical](#amazon-transcribe-medical)
  - [Use Cases](#use-cases)

## Overview

- **Automatically converts speech to text**
- Uses a deep learning process called **Automatic Speech Recognition (ASR)** to convert speech to text quickly and accurately
- Accepts audio input in **FLAC, MP3, MP4, or WAV** formats
- Supports **batch transcription** and **real-time streaming** (HTTP/2, WebSockets)
- Streaming audio is supported for **English, French, and Spanish**
- Can **automatically detect the dominant language** spoken in the audio
- Can **identify and distinguish speakers** (speaker diarization)
- Supports **channel identification**
  - Example: two callers on a call can be transcribed separately
- Supports **PII Redaction**
  - Automatically removes personally identifiable information such as names, age, or social security numbers

## Improving Accuracy

- Custom Vocabulary (for words)
  - Helps Transcribe recognize **domain-specific or non-standard terms**
  - Useful for **technical words, acronyms, jargon**, etc.
  - Two types:
    - **Vocabulary Lists**: simple list of special words
    - **Vocabulary Tables**: advanced control using `SoundsLike`, `IPA` and `DisplayAs`
  - Example:
    - Without custom vocabulary: "AWS Microservices" → "USA my crow services"
    - With custom vocabulary: "AWS Microservices" → correct transcription
- Custom Language Models (for context)
  - Provide **context**, not new words
  - Train the Transcribe model using **your own domain-specific text data**
  - Helps Transcribe choose the correct meaning based on industry or use case
  - Example:
    - "microservice":
      - Bird context → "my crow service"
      - IT context → "microservice"
- **Using both custom vocabularies and custom language models provides the highest transcription accuracy**

## Toxicity Detection

- Amazon Transcribe includes a **machine learning-powered toxicity detection feature**
- Detects toxicity using two types of cues:
  - **Speech cues**: tone, pitch, and emotion (e.g., angry or aggressive tone)
  - **Text-based cues**: transcription analysis for profanities, hate speech, etc.
- Toxicity Categories: Sexual harassment, Hate speech, Threats, Abuse, Profanity, Insults, Graphic content

## Amazon Transcribe Medical

- Automatically converts medical-related speech to text (HIPAA compliant)
- Has the ability to transcribe medical terminologies such as:
  - Medicine names
  - Procedures
  - Conditions and diseases
- Supports both real-time (microphone) and batch (upload multiple files) transcriptions

- Automatically converts medical-related speech to text (HIPAA compliant)
- Specialized version trained on **medical terminology**
- Has ability to transcribe medical terminologies such as:
  - Medicine names
  - Procedures
  - Conditions and diseases
- Supports:
  - **Real-time transcription** (microphone)
  - **Batch transcription** (uploaded audio files)

## Use Cases

- Call Analytics:
  - Trained specifically for customer service and sales calls
  - Real-time transcriptions and insights
  - Sentiment, talk speed, interruptions, look for specific phrases
- Medical:
  - Trained on medical terminology
  - HIPAA-eligible
- Subtitling & Media
  - Live subtitle output
  - Generates metadata for media assets
  - Enables **searchable media archives**

---

## Prerequisites

- [Amazon Translate](aws-translate.md)

## Recommended Next Topics

- [Amazon Polly](aws-polly.md)

## Related Topics

- [Introduction of AWS Managed AI Services](introduction-of-aws-managed-ai-services.md)
- [Amazon Comprehend](aws-comprehend.md)
- [Amazon Translate](aws-translate.md)
