# Amazon Polly

- **Turn text into lifelike speech using deep learning**
- Provides many voices and languages
- **Lexicons**: we can customize pronunciations of specific words and phrases
  - Define how to read certain specific pieces of text
  - AWS => "Amazon Web Services"
  - W3C => "World Wide Web Consortium"
- **SSML format**: **Speech Synthesis Markup Language**
  - Markup for our text to indicate how to pronounce it
  - Gives control over emphasis, pronunciations, breathing, whispering, speech rate, pitch, pauses
  - Example: `<speak>`Hello, `<break />` how are yoy?`</speak>`
- **Voice engine**: generative, long-form, neural, standard
- **Speech Marks**:
  - Can encode when sentence/word starts or ends in the audio stream
  - Useful for lip-synching animation or highlighting words as they're spoken

---

## Prerequisites

- [Amazon Transcribe](aws-transcribe.md)

## Recommended Next Topics

- [Amazon Rekognition](aws-rekognition.md)

## Related Topics

- [Introduction of AWS Managed AI Services](introduction-of-aws-managed-ai-services.md)
- [Amazon Comprehend](aws-comprehend.md)
- [Amazon Translate](aws-translate.md)
