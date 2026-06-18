# Amazon Personalize

- Fully managed ML-service to build apps with real-time personalized recommendations
- It is the same recommendation engine that is used on Amazon websites
- Example: personalized product recommendations/re-ranking, customized direct marketing
  - Example: User bought gardening tools, provide recommendations on the next one to buy
- Integrates into existing websites, applications, SMS, email marketing systems, etc
- Implement in days, not months (you don't need to build, train, and deploy ML solutions)
- **Use cases**: retail stores, media and entertainment…
- It is primarily used through an API:
  - We feed in data (purchases, ratings, impressions, cart adds, etc.) via S3 or API integration
  - We provide an explicit schema for the data in Avro format
  - After this it can be used via JavaScript or SDK:
    - `GetRecommendations`
    - `GetPersonalizedRanking`
- Provides console and CLI access

---

## Prerequisites

- [Amazon Lex](aws-lex.md)

## Recommended Next Topics

- [Amazon Textract](aws-textract.md)

## Related Topics

- [Introduction of AWS Managed AI Services](introduction-of-aws-managed-ai-services.md)
- [Amazon Comprehend](aws-comprehend.md)
- [Amazon Translate](aws-translate.md)
