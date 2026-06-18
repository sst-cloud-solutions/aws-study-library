# Amazon Mechanical Turk

- Provides a managed human task outsourcing system
- Distributed virtual workforce
- Provides a set of APIs and a marketplace to outsource jobs to human beings
- Allows requesters to post Human Intelligence Tasks (HITs) to a marketplace
- Tasks are completed by workers, who earn money for it
- Pay per task, perfect for tasks suited to humans rather than ML
- Qualification: worker attribute, we can require a test. A qualification can be a requirement to complete HITs
- Great for data collection, manual processing, image classification
- **Example**:
  - You have a dataset of 10,000,000 images and you want to labels these images
  - You distribute the task on Mechanical Turk and humans will tag those images
  - You set the reward per image (for example $0.10 per image)
- **Use cases**:
  - Image classification
  - Data collection
  - Business processing
- Integration with AI services like Amazon A2I and SageMaker Ground Truth to enhance its utility for labeling and reviewing data
- [Amazon Mechanical Turk official website](https://www.mturk.com/)

---

## Prerequisites

- [Amazon Kendra](aws-kendra.md)

## Recommended Next Topics

- [Amazon Augmented AI (A2I)](aws-augmented-ai.md)

## Related Topics

- [Introduction of AWS Managed AI Services](introduction-of-aws-managed-ai-services.md)
- [Amazon Comprehend](aws-comprehend.md)
- [Amazon Translate](aws-translate.md)
