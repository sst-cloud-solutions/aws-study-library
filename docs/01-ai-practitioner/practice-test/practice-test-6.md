# Practice Test 6

1. A design company is using a foundation model (FM) on Amazon Bedrock to generate images for various projects. The company wants to have control over how detailed or abstract each generated image appears Which model parameter should the company modify?
    - A. Model checkpoint
    - B. Batch size
    - C. Generation step
    - D. Token length

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: The “generation step” parameter controls how detailed or abstract an image appears during generation. By adjusting the number of generation steps, you can influence the level of refinement and detail in the output more steps yield more detailed images, while fewer steps result in more abstract images.

</details>

2. A financial company has offices in different countries worldwide. The company requires that all API calls between generative AI applications and foundation models (FM) must not travel across the public internet. Which AWS service should the company use?
    - A. AWS PrivateLink
    - B. Amazon Q
    - C. Amazon CloudFront
    - D. AWS CloudTrail

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: AWS PrivateLink provides secure, private connectivity between VPCs and AWS services, ensuring that API calls do not traverse the public internet. This meets the requirement for private communication between generative AI applications and foundation models across global offices.

</details>

3. An ecommerce company is deploying a chatbot. The chatbot will give users the ability to ask questions about the company’s products and receive details on users’ orders. The company must implement safeguards for the chatbot to filter harmful content from the input prompts and chatbot responses. Which AWS feature or resource meets these requirements?
    - A. Amazon Bedrock Guardrails
    - B. Amazon Bedrock Agents
    - C. Amazon Bedrock inference APIs
    - D. Amazon Bedrock custom models

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon Bedrock Guardrails enable you to implement safeguards that filter out harmful or inappropriate content in both user input prompts and chatbot responses, ensuring safe and compliant chatbot interactions.

</details>

4. A company wants to learn about generative AI applications in an experimental environment.   Which solution will meet this requirement MOST cost-effectively?
    - A. Amazon Q Developer
    - B. Amazon SageMaker JumpStart
    - C. Amazon Bedrock PartyRock
    - D. Amazon Q Business

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Amazon Bedrock PartyRock provides a highly cost-effective and experimental environment for learning about generative AI applications, allowing users to quickly build, test, and iterate on AI apps without incurring significant costs.

</details>

5. A company needs to collect a large dataset to train an AI assistant in a specific content area. Which dataset will meet this requirement?
    - A. Diverse conversations that use relevant terminology
    - B. Time series data of general purpose historical sales
    - C. Sentiment analysis of news articles
    - D. Unique product IDs and corresponding user IDs

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: To train an AI assistant for a specific content area, you need a large dataset of diverse conversations that incorporate the relevant terminology and context for that area. This enables the assistant to learn how to respond accurately and appropriately within the targeted subject.

</details>

6. A financial company is developing a generative AI application for loan approval decisions. The company needs the application output to be responsible and fair. Which solution meets these requirements?
    - A. Review the training data to check for biases. Include data from all demographics in the training data.
    - B. Use a deep learning model with many hidden layers.
    - C. Keep the model’s decision-making process a secret to protect proprietary algorithms.
    - D. Continuously monitor the model’s performance on a static test dataset

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Reviewing the training data for biases and ensuring representation from all demographics is essential for developing a responsible and fair generative AI application, especially in sensitive domains like loan approval decisions. This approach helps reduce bias and supports ethical AI practices.

</details>

7. An AI practitioner who has minimal ML knowledge wants to predict employee attrition without writing code. Which Amazon SageMaker feature meets this requirement?
    - A. SageMaker Canvas
    - B. SageMaker Clarify
    - C. SageMaker Model Monitor
    - D. SageMaker Data Wrangler

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: SageMaker Canvas provides a no-code visual interface that allows users with minimal ML knowledge to build, train, and deploy models for predictions, such as employee attrition, without writing any code.

</details>

8. A company is using AI to improve its services. The company needs to ensure that the AI system is fair and explainable. The company wants to require training for members of the AI system development team. Which training will meet these requirements?
    - A. Training on advanced coding skills
    - B. Training on data privacy and encryption protocols
    - C. Training on bias awareness and responsible AI
    - D. Training on advanced ML algorithms

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Training on bias awareness and responsible AI equips the development team with the knowledge and practices necessary to ensure that AI systems are fair, unbiased, and explainable, which aligns with the company’s requirements.

</details>

9. A company has an ML model. The company wants to know how the model makes predictions. Which term refers to understanding model predictions?
    - A. Model interpretability
    - B. Model training
    - C. Model interoperability
    - D. Model performance

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Model interpretability refers to understanding how a model makes its predictions, providing insights into the reasoning behind the model’s outputs.

</details>

10. A company wants to identify groups for its customers based on the customers’ demographics and buying patterns. Which algorithm should the company use to meet this requirement?
    - A. K-nearest neighbors (k-NN)
    - B. K-means
    - C. Decision tree
    - D. Support vector machine

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: K-means is a clustering algorithm commonly used to identify and group customers based on shared characteristics such as demographics and buying patterns, making it suitable for customer segmentation tasks.

</details>

11. A company is using an Amazon Nova Canvas model to generate images. The model generates images successfully. The company needs to prevent the model from including specific items in the generated images. Which solution will meet this requirement?
    - A. Use a higher temperature value.
    - B. Use a more detailed prompt.
    - C. Use a negative prompt.
    - D. Use another foundation model (FM).

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: A negative prompt is used to specify items or characteristics that you want the image generation model to avoid including in the output, ensuring that specific items are excluded from generated images.

</details>

12. A company wants to label training datasets by using human feedback to fine-tune a foundation model (FM). The company does not want to develop labeling applications or manage a labeling workforce. Which AWS service or feature meets these requirements?
    - A. Amazon SageMaker Data Wrangler
    - B. Amazon SageMaker Ground Truth Plus
    - C. Amazon Transcribe
    - D. Amazon Macie

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon SageMaker Ground Truth Plus provides managed data labeling services, allowing you to label datasets using human feedback without developing labeling applications or managing a labeling workforce.

</details>

13. An online media streaming company wants to give its customers the ability to perform natural languagebased image search and filtering. The company needs a vector database that can help with similarity searches and nearest neighbor queries. Which AWS service meets these requirements?
    - A. Amazon Comprehend
    - B. Amazon Personalize
    - C. Amazon Polly
    - D. Amazon OpenSearch Service

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Amazon OpenSearch Service supports vector search capabilities, allowing you to perform similarity searches and nearest neighbor queries - key requirements for natural language-based image search and filtering.

</details>

14. A company is building a generative AI tool. The company will use internal documents to customize a foundation model (FM). Which approach will meet this requirement?
    - A. Classification
    - B. Continued pre-training
    - C. Distillation
    - D. Regression

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Continued pre-training involves further training a foundation model (FM) on internal documents, allowing the model to better understand and generate content specific to the company's context and requirements. This approach customizes the FM using the company’s own data.

</details>

15. A company is monitoring a predictive model by using Amazon SageMaker Model Monitor. The company notices data drift beyond a defined threshold. The company wants to mitigate a potentially adverse impact on the predictive model. Which solution will meet these requirements?
    - A. Restart the SageMaker AI endpoint.
    - B. Adjust the monitoring sensitivity.
    - C. Re-train the model with fresh data.
    - D. Set up experiments tracking.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: When Amazon SageMaker Model Monitor detects data drift beyond a defined threshold, it indicates that the current data differs from what the model was trained on. Retraining the model with recent data ensures it adapts to new patterns and maintains predictive accuracy.

</details>

16. A financial company uses a generative AI model to assign credit limits to new customers. The company wants to make the decision-making process of the model more transparent to its customers. Which solution meets these requirements?
    - A. Use a rule-based system instead of an ML model.
    - B. Apply explainable AI techniques to show customers which factors influenced the model’s decision.
    - C. Develop an interactive UI for customers and provide clear technical explanations about the system.
    - D. Increase the accuracy of the model to reduce the need for transparency.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Explainable AI techniques provide transparency by identifying and displaying the specific factors that influenced the generative AI model’s credit limit decisions, making the decision-making process understandable to customers.

</details>

17. A company deployed a model to production. After 4 months, the model inference quality degraded. The company wants to receive a notification if the model inference quality degrades. The company also wants to ensure that the problem does not happen again. Which solution will meet these requirements?
    - A. Retrain the model. Monitor model drift by using Amazon SageMaker Clarify.
    - B. Retrain the model. Monitor model drift by using Amazon SageMaker Model Monitor.
    - C. Build a new model. Monitor model drift by using Amazon SageMaker Feature Store.
    - D. Build a new model. Monitor model drift by using Amazon SageMaker JumpStart.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon SageMaker Model Monitor enables continuous monitoring of model inference quality and detects data/model drift in production. Setting up notifications ensures the company is alerted if quality degrades again, allowing timely intervention and retraining as needed.

</details>

18. Which option is an example of unsupervised learning?
    - A. A model that groups customers based on their purchase history
    - B. A model that classifies images as dogs or cats
    - C. A model that predicts a house’s price based on various features
    - D. A model that learns to play chess by using trial and error

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Grouping customers based on purchase history is an example of unsupervised learning, where the model discovers patterns or clusters in the data without using labeled outputs.

</details>

19. A company is evaluating several large language models (LLMs) for a text summarization task. The company needs to select a metric to evaluate the quality of the summaries that the LLMs generate. Which metric will meet this requirement?
    - A. Recall
    - B. Area under the ROC curve (AUC)
    - C. Recall-Oriented Understudy for Gisting Evaluation (ROUGE)
    - D. Mean squared error (MSE)

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: The ROUGE metric is widely used to evaluate the quality of summaries generated by language models, as it measures the overlap between the generated summary and reference summaries in terms of recall, precision, and F1-score for n-grams and sequences.

</details>

20. A research group wants to test different generative AI models to create research papers. The research group has defined a prompt and needs a method to assess the models’ output. The research group wants to use a team of scientists to perform the output assessments. Which solution will meet these requirements?
    - A. Use automatic evaluation on Amazon Personalize.
    - B. Use content moderation on Amazon Rekognition.
    - C. Use model evaluation on Amazon Bedrock.
    - D. Use sentiment analysis on Amazon Comprehend.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Amazon Bedrock provides model evaluation capabilities, allowing a team of scientists to manually assess and compare the outputs of different generative AI models based on defined prompts and criteria. This meets the requirement for human-in-the-loop model output evaluation.

</details>

21. An AI practitioner wants to evaluate ML models. The AI practitioner wants to provide explanations of model predictions to customers and stakeholders. Which AWS service or feature will meet these requirements?
    - A. Amazon QuickSight
    - B. Amazon Comprehend
    - C. AWS Trusted Advisor
    - D. Amazon SageMaker Clarify

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Amazon SageMaker Clarify provides tools to explain model predictions, allowing practitioners to generate and share interpretability reports with customers and stakeholders, improving transparency and trust in ML models.

</details>

22. Sentiment analysis is a subset of which broader field of AI?
    - A. Computer vision
    - B. Robotics
    - C. Natural language processing (NLP)
    - D. Time series forecasting

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Sentiment analysis is a subset of natural language processing (NLP), which focuses on analyzing and interpreting human language, including the detection of sentiment within text.

</details>

23. A company wants to set up private access to Amazon Bedrock APIs from the company’s AWS account. The company also wants to protect its data from internet exposure. Which solution meets these requirements?
    - A. Use Amazon CloudFront to restrict access to the company’s private content.
    - B. Use AWS Glue to set up data encryption across the company’s data catalog.
    - C. Use AWS Lake Formation to manage centralized data governance and cross-account data sharing.
    - D. Use AWS PrivateLink to configure a private connection between the company’s VPC and Amazon

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: AWS PrivateLink enables private connectivity between your VPC and Amazon Bedrock APIs without exposing data to the public internet, ensuring that all API calls and data transfers remain secure and private within your AWS account.

</details>

24. A company receives a large amount of unstructured user feedback in text format. The company wants to analyze the sentiment of the user feedback. Which solution will meet these requirements?
    - A. Use a large language model (LLM) to perform natural language processing (NLP) for sentiment analysis
    - B. Use a regression algorithm to classify the feedback based on predefined categories. Then, analyze user sentiment
    - C. Use a recommendation engine algorithm to detect user sentiment.
    - D. Use a time series algorithm to predict user sentiment based on past feedback.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: A large language model (LLM) can analyze unstructured text using NLP techniques to accurately determine the sentiment (positive, negative, or neutral) of user feedback. This approach is well-suited for handling large volumes of text data.

</details>

25. RAG improves LLMs by incorporating information from external data sources at query time. A company wants to create an AI solution to generate images and descriptions for a product catalog. The company needs to select a foundation model (FM) for this solution. The company must consider the output types of each FM. Which FM characteristic is the company evaluating?
    - A. Latency
    - B. Model size
    - C. Model customization
    - D. Modality

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Modality refers to the types of input and output data a foundation model can handle, such as text, images, or both. Evaluating modality ensures the selected FM can generate both images and text descriptions for the product catalog.

</details>

26. A company wants to use an ML model to analyze customer reviews on social media. The model must determine if each review has a neutral, positive, or negative sentiment. Which model evaluation strategy will meet these requirements?
    - A. Open-ended generation
    - B. Text summarization
    - C. Machine translation
    - D. Classification

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Classification is the evaluation strategy that assigns input data (such as customer reviews) to predefined categories - in this case, neutral, positive, or negative sentiment. This approach is standard for sentiment analysis tasks.

</details>

27. Which option is an example of unsupervised learning?
    - A. Clustering data points into groups based on their similarity
    - B. Training a model to recognize images of animals
    - C. Predicting the price of a house based on the house’s features
    - D. Generating human-like text based on a given prompt

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Clustering data points based on similarity is an example of unsupervised learning, where the algorithm groups data without using labeled examples.

</details>

28. An online learning company with large volumes of education materials wants to use enterprise search. Which AWS service meets these requirements?
    - A. Amazon Comprehend
    - B. Amazon Textract
    - C. Amazon Kendra
    - D. Amazon Personalize

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Amazon Kendra is an intelligent enterprise search service that enables organizations to search large volumes of unstructured data, such as educational materials, making it ideal for enterprise search needs.

</details>

29. A company creates video content. The company wants to use generative AI to generate new creative content and to reduce video creation time. Which solution will meet these requirements in the MOST operationally efficient way?
    - A. Use the Amazon Titan Image Generator model on Amazon Bedrock to generate intermediate images. Use video editing software to create videos.
    - B. Use the Amazon Nova Canvas model on Amazon Bedrock to generate intermediate images. Use video editing software to create videos.
    - C. Use the Amazon Nova Reel model on Amazon Bedrock to generate videos.
    - D. Use the Amazon Nova Pro model on Amazon Bedrock to generate videos.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: The Amazon Nova Reel model on Amazon Bedrock is specifically designed for generative video creation, enabling the company to efficiently generate new creative content and significantly reduce video creation time in an operationally efficient manner.

</details>

30. A company is training ML models on datasets. The datasets contain some classes that have more examples than other classes. The company wants to measure how well the model balances detecting and labeling the classes. Which metric should the company use?
    - A. Accuracy
    - B. Recall
    - C. Precision
    - D. F1 score

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: The F1 score is the harmonic mean of precision and recall, making it especially useful for evaluating model performance on datasets with class imbalance. It measures how well the model balances detecting (recall) and correctly labeling (precision) all classes.

</details>

31. A company is analyzing financial transaction records. The company categorizes the records as either personal or business. The company inserts the categories into the transaction records. Which data preparation step does this describe?
    - A. Data encoding
    - B. Data labeling
    - C. Data normalization
    - D. Data balancing

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Assigning categories such as "personal" or "business" to financial transaction records is an example of data labeling, where each data point is tagged with a specific label for use in machine learning or data analysis tasks.

</details>

32. A company wants to extract key insights from large policy documents to increase employee efficiency. Which generative AI strategy meets this requirement?
    - A. Regression
    - B. Clustering
    - C. Summarization
    - D. Classification

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Summarization is a generative AI strategy that extracts and condenses the key insights from large documents, such as policy documents, making it easier for employees to quickly understand and act on essential information.

</details>

33. A company is using Amazon SageMaker to deploy a model that identifies if social media posts contain certain topics. The company needs to show how different input features influence model behavior.   Which SageMaker feature meets these requirements?
    - A. SageMaker Canvas
    - B. SageMaker Clarify
    - C. SageMaker Feature Store
    - D. SageMaker Ground Truth

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: SageMaker Clarify provides tools for model interpretability, allowing you to visualize and understand how different input features influence the behavior and predictions of your deployed model.

</details>

34. A company wants to assess internet quality in remote areas of the world. The company needs to collect internet speed data and store the data in Amazon RDS. The company will analyze internet speed variation throughout each day. The company wants to create an AI model to predict potential internet disruptions. Which type of data should the company collect for this task?
    - A. Tabular data
    - B. Text data
    - C. Time series data
    - D. Audio data

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Time series data consists of measurements (such as internet speed) collected over time, which is essential for analyzing variations throughout the day and for building predictive models of potential internet disruptions.

</details>

35. A company wants to build an ML model to detect abnormal patterns in sensor data. The company does not have labeled data for training.     Which ML method will meet these requirements?
    - A. Linear regression
    - B. Classification
    - C. Decision tree
    - D. Autoencoders

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Autoencoders are a type of unsupervised learning method used to detect abnormal patterns (anomalies) in sensor data when labeled data is not available. They learn to reconstruct normal patterns, making deviations (anomalies) easily detectable.

</details>

36. A company uses Amazon Bedrock to implement a generative AI assistant on a website. The AI assistant helps customers with product recommendations and purchasing decisions. The company wants to measure the direct impact of the AI assistant on sales performance. Which metric will meet these requirements?
    - A. The conversion rate of customers who purchase products after AI assistant interactions.
    - B. The number of customer interactions with the AI assistant
    - C. Sentiment analysis scores from customer feedback after AI assistant interactions
    - D. Natural language understanding accuracy rates

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Conversion rate directly measures the impact of the AI assistant on sales performance by quantifying the percentage of customers who make a purchase after interacting with the assistant. This metric links AI engagement to actual sales outcomes.

</details>

37. Which AWS service or feature stores embeddings in a vector database for use with foundation models (FMs) and Retrieval Augmented Generation (RAG)?
    - A. Amazon SageMaker Ground Truth
    - B. Amazon OpenSearch Service
    - C. Amazon Transcribe
    - D. Amazon Textract

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon OpenSearch Service provides a vector database capability to store and search embeddings, which are essential for powering Retrieval Augmented Generation (RAG) workflows and integrating with foundation models (FMs) in generative AI solutions. T

</details>

38. Which scenario represents a practical use case for generative AI?
    - A. Using an ML model to forecast product demand
    - B. Employing a chatbot to provide human-like responses to customer queries in real time
    - C. Using an analytics dashboard to track website traffic and user behavior
    - D. Implementing a rule-based recommendation engine to suggest products to customers

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: A generative AI use case involves generating new content, such as natural language responses. A chatbot that provides human-like responses to customer queries uses generative AI models (like large language models) to dynamically create relevant answers, making this a practical example.

</details>

39. A company is using Amazon Bedrock for a generative AI solution. The solution must integrate a service with vector database storage and vector search capabilities. Which AWS service will meet these requirements?
    - A. Amazon DynamoDB
    - B. Amazon OpenSearch Service
    - C. Amazon ElastiCache
    - D. Amazon Redshift

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon OpenSearch Service supports vector database storage and vector search capabilities, which are essential for integrating with generative AI solutions like those on Amazon Bedrock that require efficient similarity search over embeddings.

</details>

40. A media streaming platform wants to provide movie recommendations to users based on the users’ account history. Which AWS service meets these requirements?
    - A. Amazon Polly
    - B. Amazon Comprehend
    - C. Amazon Transcribe
    - D. Amazon Personalize

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Amazon Personalize is an AWS service designed to deliver personalized recommendations, such as movie suggestions, to users based on their account history and preferences.

</details>

41. A company has developed an ML model to approve or reject loan applications. The model's decision-making process must be transparent and explainable to comply with regulatory requirements. The company must document the decision-making process for audit purposes. Which solution will meet these requirements?
    - A. Amazon Textract
    - B. Amazon SageMaker Model Card
    - C. AWS Cloud Formation
    - D. Amazon Comprehend

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon SageMaker Model Card enables you to document a model’s decision-making process, including transparency and explainability details, which helps meet regulatory and audit requirements for AI-driven decisions such as loan approvals.

</details>

42. Which considerations are important when designing prompts for generative AI? (Choose 2)
    - A. Providing clear context and instructions
    - B. Using as many words as possible
    - C. Including relevant examples when helpful
    - D. Always using technical jargon
    - E. Making prompts as vague as possible

<details>
<summary>Answer</summary>


Correct answer: A, C

Explanation:
Clear context and instructions help the model understand what's expected, while relevant examples (few-shot learning) can guide the model toward the desired output format and style.

</details>

43. What is the primary benefit of using Amazon SageMaker JumpStart?
    - A. To reduce inference costs
    - B. To access pre-trained models and solutions
    - C. To automatically label data
    - D. To monitor model performance

<details>
<summary>Answer</summary>


Correct answer: B

Explanation:
SageMaker JumpStart provides access to hundreds of pre-trained models, built-in algorithms, and end-to-end ML solutions, enabling faster time-to-market for ML projects.

</details>

44. Which factors should be considered when implementing MLOps practices? (Choose 2)
    - A. Model versioning and reproducibility
    - B. Automated testing and validation
    - C. Using only cloud-based services
    - D. Minimizing documentation
    - E. Avoiding monitoring in production

<details>
<summary>Answer</summary>


Correct answer: A, B

Explanation:
Model versioning ensures reproducibility and enables rollbacks, while automated testing validates models before deployment. These are core MLOps practices for reliable ML systems.

</details>

45. What is the purpose of embeddings in machine learning?
    - A. To compress images
    - B. To represent data as dense numerical vectors
    - C. To encrypt sensitive information
    - D. To reduce training time

<details>
<summary>Answer</summary>


Correct answer: B

Explanation:
Embeddings convert discrete data (like words, images, or categorical features) into dense numerical vectors that capture semantic relationships and can be processed by ML algorithms.

</details>

46. Which Amazon Bedrock features help with content filtering and safety? (Choose 2)
    - A. Guardrails for content filtering
    - B. Model customization options
    - C. Prompt management capabilities
    - D. Watermark detection for AI-generated content
    - E. Knowledge base integration

<details>
<summary>Answer</summary>


Correct answer: A, D

Explanation:
Guardrails filter harmful, inappropriate, or unwanted content in both inputs and outputs, ensuring that AI-generated responses align with ethical and safety standards. Watermark detection helps identify AI-generated content, which is crucial for maintaining transparency and accountability. By detecting watermarks, organizations can prevent misuse of AI-generated content, such as plagiarism or the spread of misinformation, thereby enhancing trust and safety in AI deployments.

</details>

47. What is the difference between discriminative and generative AI models?
    - A. Discriminative models are faster than generative models
    - B. Discriminative models classify/predict, generative models create new content
    - C. Discriminative models are more accurate than generative models
    - D. Discriminative models require more data than generative models

<details>
<summary>Answer</summary>


Correct answer: B

Explanation:
Discriminative models learn to distinguish between different classes or predict outcomes (classification/regression), while generative models learn to create new content similar to their training data.

</details>

48. Which metrics are commonly used to evaluate generative AI model performance? (Choose 2)
    - A. BLEU score for translation quality
    - B. CPU utilization
    - C. ROUGE score for summarization quality
    - D. Network latency
    - E. Storage capacity

<details>
<summary>Answer</summary>


Correct answer: A, C

Explanation:
BLEU (Bilingual Evaluation Understudy) score (A) is the standard metric for evaluating machine translation quality. It measures the precision of n-grams (word sequences) in machine translations compared to reference human translations, with scores ranging from 0 to 1 (higher is better). ROUGE (Recall-Oriented Understudy for Gisting Evaluation) (C) evaluates summarization quality by measuring the overlap between generated summaries and reference summaries, focusing on recall (how much of the reference appears in the generated summary). In AWS, you can implement these metrics in custom evaluation tests within Amazon Bedrock Model Evaluation or SageMaker.

Options B, D, and E are system performance metrics unrelated to output quality.

</details>

49. What is the primary purpose of Amazon Q for Business?
    - A. To train custom ML models
    - B. To provide AI-powered business intelligence and assistance
    - C. To store large datasets
    - D. To monitor infrastructure

<details>
<summary>Answer</summary>


Correct answer: B

Explanation:
Amazon Q for Business is an enterprise-grade, generative AI-powered assistant specifically designed for business use. It integrates with enterprise systems, applications, and data repositories to provide contextual assistance to employees. Key capabilities include: answering questions about company data and policies, generating content like emails and documents based on internal knowledge, providing summaries of documents and meetings, troubleshooting issues and offering solutions, assisting with software development tasks, all while respecting company security policies and access controls. Unlike general AI assistants, Q for Business is specifically trained on your organization's internal information and maintains privacy and security requirements, making it different from both standard ML training tools (A) and basic data storage (C) or monitoring (D) solutions.

</details>

50. Which capabilities of Amazon OpenSearch Service are most relevant for AI/ML workloads? (Choose 2)
    - A. Vector similarity search with k-NN
    - B. Website hosting
    - C. Vector database functionality
    - D. Email processing
    - E. Log analysis

<details>
<summary>Answer</summary>


Correct answer: A, C

Explanation:
Amazon OpenSearch Service provides essential capabilities for AI/ML workloads through:
- Vector similarity search (k-NN) for efficient similarity-based queries
- Vector database functionality for storing and querying embeddings

**Task Reference**: This is covered in Task Statement 3.1 regarding services for storing embeddings within vector databases.

</details>

---

## Prerequisites

- [Practice Test 5](practice-test-5.md)

## Recommended Next Topics

- [Practice Test 7](practice-test-7.md)

## Related Topics

- [Practice Tests](tests.md)
- [Practice Test 1](practice-test-1.md)
- [Practice Test 2](practice-test-2.md)
