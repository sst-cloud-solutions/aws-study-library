# Amazon Rekognition

- [Amazon Rekognition](#amazon-rekognition)
  - [Overview](#overview)
  - [Recognition Custom Labels](#recognition-custom-labels)
  - [Content Moderation](#content-moderation)

## Overview

- Find objects, people, text, scenes in images and videos using ML
- We can do facial analysis and facial search to do user verification, people counting
- We can create a database of "familiar faces" or compare against celebrities
- Use cases:
  - Image moderation
  - Image labeling
  - Image content moderation
  - Facial analysis
  - Text Detection
  - Celebrity recognition
  - Face detection and analysis (gender, age range, emotions…)
  - Video analysis (object/people/celebrities marked on a timeline, people pathing)
- Input images can come from S3 or provided as bytes as part of the request
- Facial recognition depends on good lightning, angle, visibility of eyes, resolution
- Video must come from Kinesis Video Streams
- Commonly integrated with AWS Lambda: Example: trigger image analysis automatically when an image is uploaded to S3

## Recognition Custom Labels

- Allows you to train Rekognition with your own labeled images
- Useful for detecting custom products, logos, or objects
- **Workflow**:
  - Label training images
  - Store images in Amazon S3
  - Train Rekognition to create a **Custom Labels model**
  - Analyze new images to detect trained items
- **Example**: NFL uses custom labels to identify team logos, pylons and foam fingers in images

## Content Moderation

- Automatically detects inappropriate, unwanted, or offensive content
- **Common use cases**:
  - Social media image filtering
  - Broadcast media
  - Advertising verification
  - Child-safe platforms
- Integrates with Amazon Augmented AI (Amazon A2I) for human review
- **Custom Moderation Adaptor**:
  - Extends Rekognition capabilities by providing our own labeled set of images
  - We can enhance the accuracy of Content Moderation or create a specific use case of moderation
  - Workflow:
    - Label images
    - Train a Custom Moderation Adapter
    - Images pass/fail automatically
    - Uncertain cases → Amazon A2I
    - Feedback improves future moderation
- Example: Content Moderation API
- **Scenario**: chatbot generates images for users
  - Before returning the image:
    - Call DetectModerationLabels API
    - Rekognition analyzes image safety
    - If safe → return image
    - If unsafe → block or send for human review

---

## Prerequisites

- [Amazon Polly](aws-polly.md)

## Recommended Next Topics

- [Amazon Lex](aws-lex.md)

## Related Topics

- [Introduction of AWS Managed AI Services](introduction-of-aws-managed-ai-services.md)
- [Amazon Comprehend](aws-comprehend.md)
- [Amazon Translate](aws-translate.md)
