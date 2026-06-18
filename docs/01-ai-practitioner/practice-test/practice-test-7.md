# Practice Test 7

1. A company is using large language models (LLMs) to develop online tutoring applications. The company needs to apply configurable safeguards to the LLMs. These safeguards must ensure that the LLMs follow standard safety rules when creating applications. Which solution will meet these requirements with the LEAST effort?
    - A. Amazon Bedrock playgrounds
    - B. Amazon SageMaker Clarify
    - C. Amazon Bedrock Guardrails
    - D. Amazon SageMaker Jumpstart

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Amazon Bedrock Guardrails provide configurable safeguards that enforce standard safety rules on large language models (LLMs) with minimal effort, making it easy to ensure safe and compliant AI application development.

</details>

2. A company is exploring Amazon Nova models in Amazon Bedrock. The company needs a multimodal model that supports multiple languages. Which Nova model will meet these requirements MOST cost-effectively?
    - A. Nova Lite
    - B. Nova Pro
    - C. Nova Canvas
    - D. Nova Reel

<details>
<summary>Answer</summary>

Correct answer: A

Explanation:   Nova Lite is a multimodal model in Amazon Bedrock that supports multiple languages andis designed the most cost-effective option among the Nova models, making it suitable for organizations seeking efficient, scalable, and economical

</details>

3. A company is building a new generative AI chatbot. The chatbot uses an Amazon Bedrock foundation model (FM) to generate responses. During testing, the company notices that the chatbot is prone to prompt injection attacks. What can the company do to secure the chatbot with the LEAST implementation effort?
    - A. Fine-tune the FM to avoid harmful responses.
    - B. Use Amazon Bedrock Guardrails content filters and denied topics.
    - C. Change the FM to a more secure FM.
    - D. Use chain-of-thought prompting to produce secure responses.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Using Amazon Bedrock Guardrails' content filters and denied topics is the quickest and least effort solution to mitigate prompt injection attacks. These guardrails can be configured without model retraining, helping to automatically filter or block unsafe prompts and responses.

</details>

4. What does inference refer to in the context of AI?
    - A. The process of creating new AI algorithms
    - B. The use of a trained model to make predictions or decisions on unseen data
    - C. The process of combining multiple AI models into one model
    - D. The method of collecting training data for AI systems

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Inference in AI refers to applying a trained model to new, unseen data to generate predictions or decisions, leveraging the patterns learned during training.

</details>

5. A company wants to build an AI assistant to provide responses to user queries. The AI assistant must evaluate specific data sources, query external APIs, generate response options, and compare and prioritize response options. Which Amazon Bedrock feature or resource will meet these requirements?
    - A. Prompt Management
    - B. Response streaming
    - C. Knowledge Bases
    - D. Agents

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Amazon Bedrock Agents enable AI assistants to interact with specific data sources, query external APIs, generate and compare response options, and prioritize results, making them the ideal feature for building advanced, task-oriented chatbots with decision-making and orchestration capabilities.

</details>

6. An AI practitioner notices a large language model (LLM) is generating different responses for the same input across multiple invocations. Which risk of AI does this describe?
    - A. Hallucinations
    - B. Nondeterminism
    - C. Accuracy
    - D. Multimodality

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Nondeterminism refers to the property where a large language model generates different responses for the same input due to inherent randomness or stochasticity in the generation process. This can lead to varying outputs on multiple invocations with identical inputs.

</details>

7. A company is building a generative AI application on AWS. The application will help improve reading comprehension for students. The application must give students the ability to add illustrations to stories. Which solution will meet this requirement?
    - A. Use Amazon Bedrock Stable Diffusion 3.5 Large to generate images based on text inputs.
    - B. Use Amazon Polly to create an audiobook based on story texts.
    - C. Use Amazon Rekognition to analyze image contents and detect text attributes.
    - D. Create a standard prompt template. Use Amazon Q Business to illustrate stories.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon Bedrock Stable Diffusion 3.5 Large is a generative AI model designed to create high-quality images from text prompts, allowing students to add custom illustrations to their stories and enhancing reading comprehension through visual aids.

</details>

8. A healthcare company wants to analyze patient data. The data was gathered over the previous year to detect patterns in disease outbreaks. The company needs to create a trend analysis report for each month to present to public health officials. The company must provide insights into patient data from the most recent month of the current year. Which inference method will meet these requirements MOST cost-effectively?
    - A. Real-time inference
    - B. Batch transform
    - C. Serverless inference
    - D. Asynchronous inference

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Batch transform is the most cost-effective inference method for analyzing large amounts of data collected over a period (such as monthly patient data). It allows you to process and generate reports on all historical data in batches, rather than incurring the higher costs of real-time or serverless inference.

</details>

9. A company acquires International Organization for Standardization (ISO) accreditation to manage AI risks and to use AI responsibly. What does this accreditation reflect about the company?
    - A. All members of the company are ISO certified.
    - B. All AI systems that the company uses are ISO certified.
    - C. All AI application team members are ISO certified.
    - D. The company’s development framework is ISO certified.

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: ISO accreditation for managing AI risks means that the company’s development processes, controls, and frameworks for AI are certified to meet ISO standards. It does not certify individual employees or AI systems, but rather the organizational framework and practices.

</details>

10. A company is developing an ML model to predict heart disease risk. The model uses patient data, such as age, cholesterol, blood pressure, smoking status, and exercise habits. The dataset includes a target value that indicates whether a patient has heart disease. Which ML technique will meet these requirements?
    - A. Unsupervised learning
    - B. Supervised learning
    - C. Reinforcement learning
    - D. Semi-supervised learning

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Supervised learning is used when the dataset includes both input features (like age, cholesterol, blood pressure, etc.) and a target value indicating the presence of heart disease. The model learns to predict the target value from labeled examples.

</details>

11. A company has guidelines for data storage and deletion.  Which data governance strategy does this describe?
    - A. Data de-identification
    - B. Data quality standards
    - C. Data retention
    - D. Log storage

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Data retention refers to the policies and practices that define how long data is stored and when it should be deleted, ensuring compliance with organizational guidelines and regulatory requirements.

</details>

12. A company needs to apply numerical transformations to a set of images to transpose and rotate the images. Which solution will meet these requirements in the MOST operationally efficient way?
    - A. Create a deep neural network by using the images as input.
    - B. Create an AWS Lambda function to perform the transformations.
    - C. Use an Amazon Bedrock large language model (LLM) with a high temperature.
    - D. Use AWS Glue Data Quality to make corrections to each image.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: An AWS Lambda function can efficiently perform numerical image transformations such as transposing and rotating images at scale without the need to build or train a neural network, making it the most operationally efficient solution.

</details>

13. An AI practitioner is writing software code. The AI practitioner wants to quickly develop a test case and create documentation for the code. Which solution will meet these requirements with the LEAST effort?
    - A. Upload the code to an online coding assistant.
    - B. Develop an application to use foundation models (FMs).
    - C. Use Amazon Q Developer in an integrated development environment (IDE).
    - D. Research and write test cases. Then, create test cases and add documentation.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Amazon Q Developer integrated with an IDE can automatically generate test cases and create documentation for code, minimizing manual effort and accelerating development compared with building custom solutions or manual research.

</details>

14. A company is developing a generative AI application to automatically generate product descriptions for an ecommerce website. The product descriptions must consist of paragraphs of text that are consistent in style and tone. The application must generate thousands of unique descriptions each day. Which type of generative model will meet these requirements?
    - A. A variational autoencoder (VAE) model
    - B. A transformer-based model
    - C. A diffusion model
    - D. A generative adversarial network (GAN) model

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Transformer-based models, such as large language models, are designed to generate coherent and contextually consistent text at scale. They are well-suited for creating thousands of unique, styled product descriptions daily.

</details>

15. An AI practitioner has trained a model on a training dataset. The model performs well on the training data. However, the model does not perform well on evaluation data. What is the MOST likely cause of this issue?
    - A. The model is underfit.
    - B. The model requires prompt engineering.
    - C. The model is biased.
    - D. The model is overfit.

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Overfitting occurs when a model learns the training data too well, including noise and details that do not generalize. As a result, it performs well on training data but poorly on unseen evaluation data.

</details>

16. What is the primary difference between AI and ML?
    - A. AI is a subset of ML
    - B. ML is a subset of AI
    - C. They are completely unrelated fields
    - D. AI and ML are the same thing

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: ML is a subset of AI. The study guide mentions that understanding the similarities and differences between AI, ML, and deep learning is important.

The main difference is that Artificial Intelligence (AI) is the broad concept of machines mimicking human intelligence, while Machine Learning (ML) is a subset of AI that specifically enables systems to learn from data and improve without explicit programming, acting as a core tool within the larger AI field. Think of AI as the whole universe of smart systems, and ML as one powerful way (using algorithms to find patterns) to build those systems, alongside other AI approaches like expert systems or rule-based logi

</details>

17. Which of the following is NOT a type of machine learning?
    - A. Supervised learning
    - B. Unsupervised learning
    - C. Reinforcement learning
    - D. Diagnostic learning

<details>
<summary>Answer</summary>


Correct answer: D

Explanation: The study guide mentions supervised, unsupervised, and reinforcement learning as types of machine learning. Diagnostic learning is not a standard type of ML.

</details>

18. What type of data is most suitable for training a computer vision model?
    - A. Tabular data
    - B. Time-series data
    - C. Image data
    - D. Text data

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Image data is most suitable for computer vision models. The study guide mentions different types of data used in AI models, including image data

</details>

19. Which AWS service is best suited for natural language processing tasks?
    - A. Amazon SageMaker
    - B. Amazon Comprehend
    - C. Amazon Polly
    - D. Amazon Transcribe

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: Amazon Comprehend is specifically designed for natural language processing tasks. The study guide lists various AWS managed AI/ML services and their capabilities.

</details>

20. What is the primary purpose of exploratory data analysis (EDA) in the ML development lifecycle?
    - A. To train the model
    - B. To deploy the model
    - C. To understand the characteristics of the data
    - D. To monitor the model in production

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: EDA is used to understand the characteristics of the data before model training. The study guide mentions EDA as a component of an ML pipeline.

</details>

21. Which of the following is NOT a typical stage in an ML pipeline?
    - A. Data collection
    - B. Feature engineering
    - C. Model training
    - D. Customer acquisition

<details>
<summary>Answer</summary>


Correct answer: D

Explanation: Customer acquisition is not a typical stage in an ML pipeline. The study guide lists the components of an ML pipeline, which do not include customer acquisition.

</details>

22. What does AUC stand for in the context of model performance metrics?
    - A. Average User Cost
    - B. Area Under the Curve
    - C. Automated Universal Calculation
    - D. Augmented Use Case

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: AUC stands for Area Under the Curve (specifically, the ROC curve). The study guide mentions AUC as one of the model performance metrics.

AUC (Area Under the Curve) is a performance metric that measures the area under the ROC (Receiver Operating Characteristic) curve. It indicates how well a model can distinguish between classes, with values ranging from 0 to 1, where:
- 1.0 represents perfect classification
- 0.5 represents random chance
- \< 0.5 represents worse than random

basically you are maximizing the area under the curve. if its a flat line at 0.5, you are doing no better than random guessing.

</details>

23. Which type of learning is most appropriate when you have a large dataset of labeled examples?
    - A. Unsupervised learning
    - B. Reinforcement learning
    - C. Supervised learning
    - D. Semi-supervised learning

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Supervised learning is most appropriate when you have labeled data. The study guide describes supervised learning as one of the types of machine learning.

</details>

24. What is the main advantage of using pre-trained models?
    - A. They always perform better than custom models
    - B. They require less computational resources to train
    - C. They are always more accurate
    - D. They can be used immediately without any training data

<details>
<summary>Answer</summary>


Correct answer: D

Explanation: Pre-trained models can be used immediately without training data, which is their main advantage. The study guide mentions pre-trained models as a source of ML models.

</details>

25. Which AWS service is best suited for automating the process of identifying the best hyperparameters for a model?
    - A. Amazon SageMaker Autopilot
    - B. Amazon Comprehend
    - C. Amazon Polly
    - D. Amazon Transcribe

<details>
<summary>Answer</summary>


Correct answer: A

Explanation: Amazon SageMaker Autopilot is designed for automating the process of finding the best hyperparameters. While not explicitly mentioned in the study guide, it falls under the SageMaker suite of tools.

</details>

26. What does MLOps stand for?
    - A. Machine Learning Operations
    - B. Multiple Learning Optimizations
    - C. Model Learning Objectives
    - D. Managed Learning Outputs

<details>
<summary>Answer</summary>


Correct answer: A

Explanation: MLOps stands for Machine Learning Operations. The study guide mentions MLOps and its fundamental concepts

</details>

27. Which of the following is NOT a typical business metric for evaluating ML models?
    - A. Cost per user
    - B. Development costs
    - C. Customer feedback
    - D. F1 score

<details>
<summary>Answer</summary>


Correct answer: D

Explanation: F1 score is a **model performance metric**, not a business metric. Typical business metrics include Cost per user, Development costs, and Customer feedback, which relate to real-world impact rather than prediction quality.

</details>

28. Which of the following are considered business metrics for AI model evaluation? (Choose 2)
    - A. Precision score
    - B. Customer satisfaction score
    - C. Mean Average Precision
    - D. Time-to-value
    - E. Root Mean Square Error

<details>
<summary>Answer</summary>


Correct answer: B and D

Explanation: Customer satisfaction score and Time-to-value focus on real-world impact and business value delivery, whereas precision, MAP, and RMSE are technical performance metrics.

</details>

29. When evaluating an AI solution's success, what types of metrics should be considered? (Choose 2)
    - A. Only technical performance metrics
    - B. Return on Investment (ROI)
    - C. Only user feedback
    - D. Model inference latency
    - E. Impact on business processes

<details>
<summary>Answer</summary>


Correct answer: B and E

Explanation: Both financial return (ROI) and impact on business processes measure actual business value and operational improvements, complementing technical evaluation.

</details>

30. What type of learning is most appropriate when you want an agent to learn from its interactions with an environment?
    - A. Supervised learning
    - B. Unsupervised learning
    - C. Reinforcement learning
    - D. Transfer learning

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Reinforcement learning involves learning through interaction with an environment via rewards and penalties.

</details>

31. Which AWS service is best suited for converting text to speech?
    - A. Amazon Comprehend
    - B. Amazon Translate
    - C. Amazon Transcribe
    - D. Amazon Polly

<details>
<summary>Answer</summary>


Correct answer: D

Explanation: Amazon Polly is a text-to-speech service that converts written text into spoken audio.

</details>

32. What is the primary purpose of feature engineering in the ML development lifecycle?
    - A. To collect more data
    - B. To create new features or transform existing ones to improve model performance
    - C. To evaluate the model’s performance
    - D. To deploy the model to production

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: Feature engineering involves creating and transforming input features to improve accuracy and model performance.

</details>

33. Which of the following is an example of unsupervised learning?
    - A. Spam detection
    - B. Image classification
    - C. Clustering customer segments
    - D. Predicting house prices

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Clustering is unsupervised learning because no labels guide the grouping process.

</details>

34. What is the main difference between batch inferencing and real-time inferencing?
    - A. Batch inferencing is always more accurate
    - B. Real-time inferencing can only be done on small datasets
    - C. Batch inferencing processes multiple inputs at once, while real-time inferencing processes individual inputs as they arrive
    - D. Real-time inferencing is always faster than batch inferencing

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Batch inferencing processes groups of data at once, whereas real-time inferencing handles single inputs immediately.

</details>

35. Which AWS service is best suited for managing the entire machine learning lifecycle?
    - A. Amazon Comprehend
    - B. Amazon SageMaker
    - C. Amazon Polly
    - D. Amazon Translate

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: Amazon SageMaker supports data preparation, training, tuning, deployment, and monitoring across the ML lifecycle.

</details>

36. What is the primary purpose of model monitoring in production?
    - A. To train new models
    - B. To collect more data
    - C. To detect issues like model drift or data drift
    - D. To perform feature engineering

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Model monitoring detects shifts in data or model performance after deployment.

</details>

37. Which of the following is NOT a typical use case for AI/ML?
    - A. Fraud detection
    - B. Recommendation systems
    - C. Manual data entry
    - D. Speech recognition

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Manual data entry is not an AI use case, as AI aims to automate or assist tasks.

</details>

38. What is a token in the context of generative AI?
    - A. A security feature
    - B. A unit of text processed by the model
    - C. A type of neural network
    - D. A model evaluation metric

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: A token is the basic unit of text (like a word or subword) processed and generated by the model.

</details>

39. Which of the following is NOT a typical use case for generative AI models?
    - A. Image generation
    - B. Summarization
    - C. Data encryption
    - D. Code generation

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Data encryption is not a generative task, whereas summarization and generation tasks are typical examples.

</details>

40. What is the primary advantage of generative AI’s adaptability?
    - A. It can only work with structured data
    - B. It can handle a wide range of tasks and domains
    - C. It always produces perfect results
    - D. It eliminates the need for human oversight

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: Adaptability refers to the ability of generative models to tackle diverse tasks across domains.

</details>

41. What is a hallucination in the context of generative AI?
    - A. A visual output produced by the model
    - B. A type of model architecture
    - C. An incorrect or fabricated output presented as fact
    - D. A method of model training

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: A hallucination is an output that is incorrect but presented as factual by the generative model.

</details>

42. Which AWS service is designed specifically for developing generative AI applications?
    - A. Amazon EC2
    - B. Amazon S3
    - C. Amazon Bedrock
    - D. Amazon RDS

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Amazon Bedrock provides access to foundation models and tools for building generative AI applications.

</details>

43. What is a foundation model in generative AI?
    - A. A model that can only generate text
    - B. A large, pre-trained model that can be adapted for various tasks
    - C. A model specifically designed for image generation
    - D. A model that requires no training data

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: A foundation model is a large-scale, pre-trained model trained on vast amounts of data. It can be adapted or fine-tuned for many different downstream tasks such as text generation, summarization, question answering, or image generation. These models serve as a base upon which specialized AI applications are built.

</details>

44. Which of the following is NOT a stage in the foundation model lifecycle?
    - A. Data selection
    - B. Pre-training
    - C. Deployment
    - D. Marketing

<details>
<summary>Answer</summary>


Correct answer: D

Explanation: The foundation model lifecycle typically includes data selection, pre-training, fine-tuning or customization, evaluation, and deployment. Marketing is a business activity and not part of the technical lifecycle of developing and managing a foundation model.

</details>

45. What is the primary advantage of using AWS generative AI services for building applications?
    - A. They are always free
    - B. They provide a lower barrier to entry
    - C. They guarantee 100% accuracy
    - D. They eliminate the need for any coding

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: AWS generative AI services reduce the complexity of building AI solutions by providing managed infrastructure, pre-trained foundation models, and APIs. This lowers the barrier to entry by removing the need to build and train large models from scratch while still allowing customization and scalability.

</details>

46. What is prompt engineering in the context of generative AI?
    - A. A method of hardware optimization
    - B. A technique for designing the physical structure of AI models
    - C. The process of crafting effective input prompts to guide model outputs
    - D. A way to reduce energy consumption in AI systems

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Prompt engineering is the practice of carefully designing and refining input instructions (prompts) to guide a generative model toward producing accurate, relevant, and structured outputs. It can involve adding context, constraints, examples, or formatting instructions.

</details>

47. Which of the following is a potential disadvantage of generative AI solutions?
    - A. Adaptability
    - B. Responsiveness
    - C. Inaccuracy
    - D. Simplicity

<details>
<summary>Answer</summary>


Correct answer: C

Explanation: Generative AI models can sometimes produce inaccurate, biased, or fabricated information (hallucinations). This inaccuracy is a known limitation and requires validation, monitoring, and human oversight in production systems.

</details>

48. What is the difference between zero-shot, one-shot, and few-shot learning in generative AI?
    - A. They refer to different model architectures
    - B. They refer to the number of examples provided in the prompt
    - C. They refer to different training datasets
    - D. They refer to different inference speeds

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: These terms describe how many examples are included in the prompt:
- Zero-shot learning: No examples are provided, only instructions.
- One-shot learning: One example is provided to guide the model.
- Few-shot learning: A small number of examples (typically 2–5) are provided to establish a pattern for the model to follow.
These techniques help influence output behavior without retraining the model.

</details>

49. Which AWS services can be used for document analysis and information extraction? (Choose 2)
    - A. Amazon Textract
    - B. Amazon Comprehend
    - C. Amazon Polly
    - D. Amazon Translate
    - E. Amazon Transcribe

<details>
<summary>Answer</summary>


Correct answer: A, B

Explanation: Amazon Textract extracts text, forms, and structured data from scanned documents using OCR and document analysis capabilities. Amazon Comprehend analyzes text to identify entities, sentiment, key phrases, and other linguistic insights. Together, these services enable end-to-end document understanding and information extraction.

</details>

50. What is the purpose of Amazon SageMaker Model Monitor?
    - A. To train models faster
    - B. To detect data drift and model performance degradation
    - C. To serve models for inference
    - D. To create training datasets

<details>
<summary>Answer</summary>


Correct answer: B

Explanation: Amazon SageMaker Model Monitor continuously monitors deployed machine learning models in production. It detects data drift, model drift, bias drift, and feature distribution changes. This helps ensure that model performance remains reliable over time and alerts teams when retraining or investigation is needed.

</details>

---

## Prerequisites

- [Practice Test 6](practice-test-6.md)

## Recommended Next Topics

- Congratulations! You have completed the AI Practitioner track.

## Related Topics

- [Practice Tests](tests.md)
- [Practice Test 1](practice-test-1.md)
- [Practice Test 2](practice-test-2.md)
