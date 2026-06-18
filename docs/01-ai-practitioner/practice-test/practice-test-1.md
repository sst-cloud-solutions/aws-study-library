# Practice Test 1

1. A company makes forecasts each quarter to decide how to optimize operations to meet expected demand. The company uses ML models to make these forecasts. An AI practitioner is writing a report about the trained ML models to provide transparency and explainability to company stakeholders. What should the AI practitioner include in the report to meet the transparency and explainability requirements?
    - A. Code for model training
    - B. Partial dependence plots (PDPs)
    - C. Sample data for training
    - D. Model convergence tables

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Partial Dependence Plots (PDPs) are a powerful tool for understanding and explaining how the features in a machine learning model impact predictions. They are often used to meet transparency and explainability requirements for stakeholders. Let's go over why this is the correct choice, along with why the other options are less suitable: Partial Dependence Plots (PDPs) Purpose: PDPs show the relationship between a feature (or multiple features) and the model's predicted output, which helps to explain the effect of each feature on the model’s predictions. Explainability: By visualizing how each feature influences the prediction, stakeholders can better understand how the model works and why it makes certain predictions. This level of interpretability is essential for gaining trust from non-technical stakeholders. Transparency: PDPs improve transparency by providing an intuitive way to analyze and present the effects of individual features.

</details>

2. A law firm wants to build an AI application by using large language models (LLMs). The application will read legal documents and extract key points from the documents. Which solution meets these requirements?
    - A. Build an automatic named entity recognition system.
    - B. Create a recommendation engine.
    - C. Develop a summarization chatbot.
    - D. Develop a multi-language translation system.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: A summarization chatbot can effectively read legal documents and generate concise versions that highlight key points. This directly addresses the requirement of extracting essential information, unlike the other options, which focus on different tasks.

</details>

3. A company wants to classify human genes into 20 categories based on gene characteristics. The company needs an ML algorithm to document how the inner mechanism of the model affects the output. Which ML algorithm meets these requirements?
    - A. Decision trees
    - B. Linear regression
    - C. Logistic regression
    - D. Neural networks

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Decision trees provide clear transparency into how the model makes decisions, allowing easy documentation of how the inner mechanism influences the output. The other options do not offer this level of interpretability.

</details>

4. A company has built an image classification model to predict plant diseases from photos of plant leaves. The company wants to evaluate how many images the model classified correctly. Which evaluation metric should the company use to measure the model's performance?
    - A. R-squared score
    - B. Accuracy
    - C. Root mean squared error (RMSE)
    - D. Learning rate

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Accuracy measures how many images were correctly classified out of the total images, making it the appropriate metric for evaluating the performance of an image classification model. The other metrics are either not suitable for classification tasks or not used for performance evaluation.

</details>

5. A company is using a pre-trained large language model (LLM) to build a chatbot for product recommendations. The company needs the LLM outputs to be short and written in a specific language. Which solution will align the LLM response quality with the company's expectations?
    - A. Adjust the prompt.
    - B. Choose an LLM of a different size.
    - C. Increase the temperature.
    - D. Increase the Top K value.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Adjusting the prompt allows you to specify the desired length and language of the LLM's responses, making it suitable for tailoring the output to meet the company's needs. The other options do not directly control response length or language.

</details>

6. A company uses Amazon SageMaker for its ML pipeline in a production environment. The company has large input data sizes up to 1 GB and processing times up to 1 hour. The company needs near real-time latency. Which SageMaker inference option meets these requirements?
    - A. Real-time inference
    - B. Serverless inference
    - C. Asynchronous inference
    - D. Batch transform

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Asynchronous inference is suitable for handling large input data and long processing times while still providing responses without blocking other requests. It allows for near real-time latency, whereas the other options are less suitable given the input size and processing time constraints.

</details>

7. A company is using domain-specific models. The company wants to avoid creating new models from the beginning. The company instead wants to adapt pre-trained models to create models for new, related tasks. Which ML strategy meets these requirements?
    - A. Increase the number of epochs.
    - B. Use transfer learning.
    - C. Decrease the number of epochs.
    - D. Use unsupervised learning.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Transfer learning allows the company to adapt pre-trained models for new, related tasks, saving time and resources compared to training models from scratch. The other options do not address the goal of reusing existing models.

</details>

8. A company is building a solution to generate images for protective eyewear. The solution must have high accuracy and must minimize the risk of incorrect annotations. Which solution will meet these requirements?
    - A. Human-in-the-loop validation by using Amazon SageMaker Ground Truth Plus
    - B. Data augmentation by using an Amazon Bedrock knowledge base
    - C. Image recognition by using Amazon Rekognition
    - D. Data summarization by using Amazon QuickSight Q

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Human-in-the-loop validation ensures high accuracy by involving human reviewers to verify and correct annotations, minimizing the risk of errors in the generated images. The other options are not directly relevant for ensuring annotation accuracy in image generation.

</details>

9. A company wants to create a chatbot by using a foundation model (FM) on Amazon Bedrock. The FM needs to access encrypted data that is stored in an Amazon S3 bucket. The data is encrypted with Amazon S3 managed keys (SSE-S3). The FM encounters a failure when attempting to access the S3 bucket data. Which solution will meet these requirements?
    - A. Ensure that the role that Amazon Bedrock assumes has permission to decrypt data with the correct encryption key.
    - B. Set the access permissions for the S3 buckets to allow public access to enable access over the internet.
    - C. Use prompt engineering techniques to tell the model to look for information in Amazon S3.
    - D. Ensure that the S3 data does not contain sensitive information.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: The foundation model needs the appropriate permissions to decrypt the encrypted data in the S3 bucket. Ensuring that the role used by Amazon Bedrock has permission to access and decrypt the data will resolve the access failure. The other options are not suitable for addressing the encryption and permission issue.

</details>

10. A company wants to use language models to create an application for inference on edge devices. The inference must have the lowest latency possible. Which solution will meet these requirements?
    - A. Deploy optimized small language models (SLMs) on edge devices.
    - B. Deploy optimized large language models (LLMs) on edge devices.
    - C. Incorporate a centralized small language model (SLM) API for asynchronous communication with edge
    - D. Incorporate a centralized large language model (LLM) API for asynchronous communication with edge

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Deploying optimized small language models (SLMs) directly on edge devices provides low latency for inference since the computation happens locally, avoiding the delays associated with network communication. The other options either increase latency or are less suitable for edge deployment.

</details>

11. A company wants to build an ML model by using Amazon SageMaker. The company needs to share and manage variables for model development across multiple teams. Which SageMaker feature meets these requirements?
    - A. Amazon SageMaker Feature Store
    - B. Amazon SageMaker Data Wrangler
    - C. Amazon SageMaker Clarify
    - D. Amazon SageMaker Model Cards

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon SageMaker Feature Store is a centralized repository for storing and managing features, allowing multiple teams to share and reuse variables (features) for model development. The other options serve different purposes, such as data preprocessing or model documentation.

</details>

12. A company wants to use generative AI to increase developer productivity and software development. The company wants to use Amazon Q Developer. What can Amazon Q Developer do to help the company meet these requirements?
    - A. Create software snippets, reference tracking, and open source license tracking.
    - B. Run an application without provisioning or managing servers.
    - C. Enable voice commands for coding and providing natural language search.
    - D. Convert audio files to text documents by using ML models.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon Q Developer is designed to assist developers by generating software snippets, tracking references, and managing open source licenses, which aligns with the company's goal of increasing productivity in software development. The other options do not match the intended use of Amazon Q Developer.

</details>

13. A financial institution is using Amazon Bedrock to develop an AI application. The application is hosted in a VPC. To meet regulatory compliance standards, the VPC is not allowed access to any internet traffic. Which AWS service or feature will meet these requirements?
    - A. AWS PrivateLink
    - B. Amazon Macie
    - C. Amazon CloudFront
    - D. Internet gateway

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: AWS PrivateLink allows secure, private connectivity between VPCs and AWS services without needing internet access, making it suitable for meeting regulatory compliance standards. The other options either do not provide private connectivity or require internet access.

</details>

14. A company wants to develop an educational game where users answer questions such as the following: "A jar contains six red, four green, and three yellow marbles. What is the probability of choosing a green marble from the jar?" Which solution meets these requirements with the LEAST operational overhead?
    - A. Use supervised learning to create a regression model that will predict probability.
    - B. Use reinforcement learning to train a model to return the probability.
    - C. Use code that will calculate probability by using simple rules and computations.
    - D. Use unsupervised learning to create a model that will estimate probability density.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Calculating probability in this scenario involves straightforward arithmetic, making it most efficient to use simple rules and computations. This approach requires the least operational overhead compared to using complex ML models, which are unnecessary for such basic tasks.

</details>

15. Which metric measures the runtime efficiency of operating AI models?
    - A. Customer satisfaction score (CSAT)
    - B. Training time for each epoch
    - C. Average response time
    - D. Number of training instances

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Average response time measures how quickly an AI model produces an output, which reflects the runtime efficiency of the model. The other options do not directly measure the efficiency of operating AI models.

</details>

16. A company is building a contact center application and wants to gain insights from customer conversations. The company wants to analyze and extract key information from the audio of the customer calls. Which solution meets these requirements?
    - A. Build a conversational chatbot by using Amazon Lex.
    - B. Transcribe call recordings by using Amazon Transcribe.
    - C. Extract information from call recordings by using Amazon SageMaker Model Monitor.
    - D. Create classification labels by using Amazon Comprehend.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon Transcribe converts audio recordings into text, which allows for further analysis and extraction of key information from customer conversations. The other options do not directly handle audio transcription or extraction of information from audio.

</details>

17. A company has petabytes of unlabeled customer data to use for an advertisement campaign. The company wants to classify its customers into tiers to advertise and promote the company's products. Which methodology should the company use to meet these requirements?
    - A. Supervised learning
    - B. Unsupervised learning
    - C. Reinforcement learning
    - D. Reinforcement learning from human feedback (RLHF)

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Unsupervised learning is suitable for analyzing unlabeled data and grouping it into clusters or tiers, which aligns with the company’s goal of classifying customers. The other methods require labeled data or are used for different types of problems.

</details>

18. An AI practitioner wants to use a foundation model (FM) to design a search application. The search application must handle queries that have text and images. Which type of FM should the AI practitioner use to power the search application?
    - A. Multi-modal embedding model
    - B. Text embedding model
    - C. Multi-modal generation model
    - D. Image generation model

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: A multi-modal embedding model can handle both text and image queries by embedding them into a shared space, enabling the search application to process and relate different data types. The other options are not suitable for handling both text and image inputs effectively.

</details>

19. A company uses a foundation model (FM) from Amazon Bedrock for an AI search tool. The company wants to fine-tune the model to be more accurate by using the company's data. Which strategy will successfully fine-tune the model?
    - A. Provide labeled data with the prompt field and the completion field.
    - B. Prepare the training dataset by creating a .txt file that contains multiple lines in .csv format.
    - C. Purchase Provisioned Throughput for Amazon Bedrock.
    - D. Train the model on journals and textbooks.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Fine-tuning a foundation model involves training it with labeled data that contains both input prompts and corresponding expected completions to adjust the model’s behavior to fit the company’s needs. The other options are not directly related to the fine-tuning process using specific labeled data.

</details>

20. A company wants to use AI to protect its application from threats. The AI solution needs to check if an IP address is from a suspicious source. Which solution meets these requirements?
    - A. Build a speech recognition system.
    - B. Create a natural language processing (NLP) named entity recognition system.
    - C. Develop an anomaly detection system.
    - D. Create a fraud forecasting system.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: An anomaly detection system can identify suspicious behavior, such as IP addresses that deviate from expected patterns, which helps in protecting the application from threats. The other options are not designed for detecting suspicious IP addresses.

</details>

21. Which feature of Amazon OpenSearch Service gives companies the ability to build vector database applications?
    - A. Integration with Amazon S3 for object storage
    - B. Support for geospatial indexing and queries
    - C. Scalable index management and nearest neighbor search capability
    - D. Ability to perform real-time analysis on streaming data

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: The scalable index management and nearest neighbor search capability in Amazon OpenSearch Service enables companies to build vector database applications, which are crucial for tasks like similarity search in AI models. The other options do not specifically provide the vector search functionality.

</details>

22. Which option is a use case for generative AI models?
    - A. Improving network security by using intrusion detection systems
    - B. Creating photorealistic images from text descriptions for digital marketing
    - C. Enhancing database performance by using optimized indexing
    - D. Analyzing financial data to forecast stock market trends

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Generative AI models are used to create new content, such as photorealistic images from text descriptions, which is useful for digital marketing. The other options involve tasks better suited for analytical or detection systems rather than generative models.

</details>

23. A company wants to build a generative AI application by using Amazon Bedrock and needs to choose a foundation model (FM). The company wants to know how much information can fit into one prompt.   Which consideration will inform the company's decision?
    - A. Temperature
    - B. Context window
    - C. Batch size
    - D. Model size

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: The context window determines how much information can fit into a single prompt. It specifies the number of tokens the foundation model can process at once, affecting the length of input that can be provided. The other options do not directly relate to prompt size.

</details>

24. A company wants to make a chatbot to help customers. The chatbot will help solve technical problems without human intervention. The company chose a foundation model (FM) for the chatbot. The chatbot needs to produce responses that adhere to company tone. Which solution meets these requirements?
    - A. Set a low limit on the number of tokens the FM can produce.
    - B. Use batch inferencing to process detailed responses.
    - C. Experiment and refine the prompt until the FM produces the desired responses.
    - D. Define a higher number for the temperature parameter.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Experimenting and refining the prompt allows you to guide the FM to produce responses that align with the company's desired tone. This approach helps to shape the behavior of the chatbot. The other options do not directly ensure adherence to company tone.

</details>

25. A company wants to use a large language model (LLM) on Amazon Bedrock for sentiment analysis. The company wants to classify the sentiment of text passages as positive or negative. Which prompt engineering strategy meets these requirements?
    - A. Provide examples of text passages with corresponding positive or negative labels in the prompt followed
    - B. Provide a detailed explanation of sentiment analysis and how LLMs work in the prompt.
    - C. Provide the new text passage to be classified without any additional context or examples.
    - D. Provide the new text passage with a few examples of unrelated tasks, such as text summarization or

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Providing examples with labels in the prompt helps the LLM understand the context of sentiment analysis, improving its accuracy in classifying the new text passage as positive or negative. The other options do not effectively guide the LLM for sentiment analysis.

</details>

26. A security company is using Amazon Bedrock to run foundation models (FMs). The company wants to ensure that only authorized users invoke the models. The company needs to identify any unauthorized access attempts to set appropriate AWS Identity and Access Management (IAM) policies and roles for future iterations of the FMs.   Which AWS service should the company use to identify unauthorized users that are trying to access Amazon Bedrock?
    - A. AWS Audit Manager
    - B. AWS CloudTrail
    - C. Amazon Fraud Detector
    - D. AWS Trusted Advisor

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: AWS CloudTrail records API activity and provides a log of access attempts, which helps identify unauthorized users trying to access Amazon Bedrock. The other services are not specifically used for tracking unauthorized access attempts in this context.

</details>

27. A company has developed an ML model for image classification. The company wants to deploy the model to production so that a web application can use the model. The company needs to implement a solution to host the model and serve predictions without managing any of the underlying infrastructure. Which solution will meet these requirements?
    - A. Use Amazon SageMaker Serverless Inference to deploy the model.
    - B. Use Amazon CloudFront to deploy the model.
    - C. Use Amazon API Gateway to host the model and serve predictions.
    - D. Use AWS Batch to host the model and serve predictions.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon SageMaker Serverless Inference allows the company to deploy the ML model without managing any underlying infrastructure, making it suitable for hosting the model and serving predictions. The other options do not directly provide serverless model deployment capabilities.

</details>

28. An AI company periodically evaluates its systems and processes with the help of independent software vendors (ISVs). The company needs to receive email message notifications when an ISV's compliance reports become available. Which AWS service can the company use to meet this requirement?
    - A. AWS Audit Manager
    - B. AWS Artifact
    - C. AWS Trusted Advisor
    - D. AWS Data Exchange

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: AWS Artifact provides access to compliance reports, including those from independent software vendors (ISVs). The company can use AWS Artifact to receive notifications when new compliance reports are available. The other services are not used for accessing and notifying about compliance reports.

</details>

29. A company wants to use a large language model (LLM) to develop a conversational agent. The company needs to prevent the LLM from being manipulated with common prompt engineering techniques to perform undesirable actions or expose sensitive information. Which action will reduce these risks?
    - A. Create a prompt template that teaches the LLM to detect attack patterns.
    - B. Increase the temperature parameter on invocation requests to the LLM.
    - C. Avoid using LLMs that are not listed in Amazon SageMaker.
    - D. Decrease the number of input tokens on invocations of the LLM.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Creating a prompt template that helps the LLM detect common attack patterns can reduce the risk of prompt injection and other undesirable manipulations. The other options do not effectively address the risk of prompt manipulation or unauthorized use.

</details>

30. A company is using the Generative AI Security Scoping Matrix to assess security responsibilities for its solutions. The company has identified four different solution scopes based on the matrix. Which solution scope gives the company the MOST ownership of security responsibilities?
    - A. Using a third-party enterprise application that has embedded generative AI features.
    - B. Building an application by using an existing third-party generative AI foundation model (FM).
    - C. Refining an existing third-party generative AI foundation model (FM) by fine-tuning the model by using data specific to the business.
    - D. Building and training a generative AI model from scratch by using specific data that a customer owns.

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Building and training a generative AI model from scratch gives the company the most ownership of security responsibilities, as it involves full control over data, training, deployment, and security measures. The other options involve varying levels of dependency on third-party tools and services, which reduces the company's ownership of security.

</details>

31. An AI practitioner has a database of animal photos. The AI practitioner wants to automatically identify and categorize the animals in the photos without manual human effort. Which strategy meets these requirements?
    - A. Object detection
    - B. Anomaly detection
    - C. Named entity recognition
    - D. Inpainting

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Object detection is used to automatically identify and categorize objects (in this case, animals) in photos. It can detect the presence of animals and classify them accordingly. The other strategies are not suitable for identifying and categorizing animals in images.

</details>

32. A company wants to create an application by using Amazon Bedrock. The company has a limited budget and prefers flexibility without long-term commitment. Which Amazon Bedrock pricing model meets these requirements?
    - A. On-Demand
    - B. Model customization
    - C. Provisioned Throughput
    - D. Spot Instance

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: The On-Demand pricing model provides flexibility without requiring a long-term commitment, allowing the company to pay only for the resources used, which fits well with a limited budget. The other options are either not relevant to pricing flexibility or involve specific resource commitments.

</details>

33. Which AWS service or feature can help an AI development team quickly deploy and consume a foundation model (FM) within the team's VPC?
    - A. Amazon Personalize
    - B. Amazon SageMaker JumpStart
    - C. PartyRock, an Amazon Bedrock Playground
    - D. Amazon SageMaker endpoints

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon SageMaker JumpStart provides pre-built models, including foundation models, that can be quickly deployed and consumed within a VPC, helping teams get started faster. The other options are not designed for deploying foundation models in this context.

</details>

34. How can companies use large language models (LLMs) securely on Amazon Bedrock?
    - A. Configure AWS Identity and Access Management (IAM) roles and policies by using least privilege
    - B. Enable AWS Audit Manager for automatic model evaluation jobs.
    - C. Enable Amazon Bedrock automatic model evaluation jobs.
    - D. Use Amazon CloudWatch Logs to make models explainable and to monitor for bias.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Designing clear prompts using IAM roles with least privilege access ensures secure LLMs on Amazon Bedrock by minimizing directly address securing the use of LLMs.

</details>

35. A company has terabytes of data in a database that the company can use for business analysis. The company wants to build an AI-based application that can build a SQL query from input text that employees provide. The employees have minimal experience with technology. Which solution meets these requirements?
    - A. Generative pre-trained transformers (GPT)
    - B. Residual neural network
    - C. Support vector machine
    - D. WaveNet

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: GPT models are well-suited for converting natural language input into structured queries like SQL, making them ideal for building an AI-based application that translates employee-provided text into SQL queries. The other options are not designed for natural language understanding and query generation tasks.

</details>

36. A company built a deep learning model for object detection and deployed the model to production. Which AI process occurs when the model analyzes a new image to identify objects?
    - A. Training
    - B. Inference
    - C. Model deployment
    - D. Bias correction

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Inference is the process where the model analyzes new data (in this case, a new image) to make predictions or identify objects. The other options are related to different stages of the AI lifecycle, such as building or preparing the model.

</details>

37. An AI practitioner is building a model to generate images of humans in various professions. The AI practitioner discovered that the input data is biased and that specific attributes affect the image generation and create bias in the model. Which technique will solve the problem?
    - A. Data augmentation for imbalanced classes
    - B. Model monitoring for class distribution
    - C. Retrieval Augmented Generation (RAG)
    - D. Watermark detection for images

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Data augmentation forimbalanced classes helps address bias by creating a more balanced dataset, ensuring that different attributes The other options do not directly address data

</details>

38. A company is using an Amazon Titan foundation model (FM) in Amazon Bedrock. The company needs to supplement the model by using relevant data from the company's private data sources. Which solution will meet this requirement?
    - A. Use a different FM.
    - B. Choose a lower temperature value.
    - C. Create an Amazon Bedrock knowledge base.
    - D. Enable model invocation logging.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Creating an Amazon Bedrock knowledge base allows the company to supplement the foundation model with relevant data from their private data sources. This ensures that the model has access to the additional, context-specific information needed. The other options do not directly address supplementing the model with private data.

</details>

39. A medical company is customizing a foundation model (FM) for diagnostic purposes. The company needs the model to be transparent and explainable to meet regulatory requirements. Which solution will meet these requirements?
    - A. Configure the security and compliance by using Amazon Inspector.
    - B. Generate simple metrics, reports, and examples by using Amazon SageMaker Clarify.
    - C. Encrypt and secure training data by using Amazon Macie.
    - D. Gather more data. Use Amazon Rekognition to add custom labels to the data.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon SageMaker Clarify helps with transparency and explainability by generating metrics, reports, and examples that show how the model makes decisions, which is essential for meeting regulatory requirements. The other options are not directly related to improving the model's transparency or explainability.

</details>

40. A company wants to deploy a conversational chatbot to answer customer questions. The chatbot is based on a fine-tuned Amazon SageMaker JumpStart model. The application must comply with multiple regulatory frameworks. Which capabilities can the company show compliance for? (Choose 2)
    - A. Auto scaling inference endpoints
    - B. Threat detection
    - C. Data protection
    - D. Cost optimization
    - E. Loosely coupled microservices

<details>
<summary>Answer</summary>

Correct answer: B, C

Explanation: Threat detection: Ensuring security measures are in place to detect threats is important for compliance with regulatory frameworks. Data protection: Proper data handling and protection measures are key compliance aspects, especially in applications dealing with sensitive customer information. The other options (auto scaling, cost optimization, and loosely coupled microservices) are more related to performance and architecture rather than regulatory compliance.

</details>

41. A company is training a foundation model (FM). The company wants to increase the accuracy of the model up to a specific acceptance level. Which solution will meet these requirements?
    - A. Decrease the batch size.
    - B. Increase the epochs.
    - C. Decrease the epochs.
    - D. Increase the temperature parameter.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Increasing the number of epochs allows the model to train for more iterations, improving its accuracy until the model reaches an optimal level. The other options are either less effective or unrelated to improving accuracy.

</details>

42. A company is building a large language model (LLM) question answering chatbot. The company wants to decrease the number of actions call center employees need to take to respond to customer questions. Which business objective should the company use to evaluate the effect of the LLM chatbot?
    - A. Website engagement rate
    - B. Average call duration
    - C. Corporate social responsibility
    - D. Regulatory compliance

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Reducing the average call duration directly indicates how effectively the LLM chatbot is helping call center employees answer customer questions, thus reducing the number of actions needed. The other options are not directly related to the performance of a call center chatbot.

</details>

43. Which functionality does Amazon SageMaker Clarify provide?
    - A. Integrates a Retrieval Augmented Generation (RAG) workflow
    - B. Monitors the quality of ML models in production
    - C. Documents critical details about ML models
    - D. Identifies potential bias during data preparation

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Amazon SageMaker Clarify helps detect potential bias in datasets and models during data preparation, training, and deployment. It also provides tools for explainability. The other options are functionalities that do not directly match SageMaker Clarify's core features.

</details>

44. A company is developing a new model to predict the prices of specific items. The model performed well on the training dataset. When the company deployed the model to production, the model's performance decreased significantly. What should the company do to mitigate this problem?
    - A. Reduce the volume of data that is used in training.
    - B. Add hyperparameters to the model.
    - C. Increase the volume of data that is used in training.
    - D. Increase the model training time.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Increasing the volume of data used in training helps the model generalize better to new, unseen data, reducing overfitting and improving performance in production. The other options either do not address the issue of model generalization or are unlikely to effectively solve the problem.

</details>

45. An ecommerce company wants to build a solution to determine customer sentiments based on written customer reviews of products. Which AWS services meet these requirements? (Choose 2)
    - A. Amazon Lex
    - B. Amazon Comprehend
    - C. Amazon Polly
    - D. Amazon Bedrock
    - E. Amazon Rekognition

<details>
<summary>Answer</summary>

Correct answer: B, D

Explanation: Amazon Comprehend: This service is specifically designed for natural language processing (NLP) tasks, including sentiment analysis, making it ideal for analyzing customer reviews. Amazon Bedrock: Bedrock can be used to leverage foundation models, which can also be employed for sentiment analysis tasks. The other options are not suitable for sentiment analysis of written customer reviews.

</details>

46. A company wants to use large language models (LLMs) with Amazon Bedrock to develop a chat interface for the company's product manuals. The manuals are stored as PDF files.  Which solution meets these requirements MOST cost-effectively?
    - A. Use prompt engineering to add one PDF file as context to the user prompt when the prompt is submitted to Amazon Bedrock.
    - B. Use prompt engineering to add all the PDF files as context to the user prompt when the prompt is submitted to Amazon Bedrock.
    - C. Use all the PDF documents to fine-tune a model with Amazon Bedrock. Use the fine-tuned model to process user prompts.
    - D. Upload PDF documents to an Amazon Bedrock knowledge base. Use the knowledge base to provide context when users submit prompts to Amazon Bedrock

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Using an Amazon Bedrock knowledge base allows the model to efficiently access relevant information from the PDF manuals when needed, reducing the cost compared to continuously fine-tuning a model or providing all PDFs as context in each prompt. This approach ensures that only necessary context is provided, making it cost-effective.

</details>

47. A social media company wants to use a large language model (LLM) for content moderation. The company wants to evaluate the LLM outputs for bias and potential discrimination against specific groups or individuals. Which data source should the company use to evaluate the LLM outputs with the LEAST administrative effort?
    - A. User-generated content
    - B. Moderation logs
    - C. Content moderation guidelines
    - D. Benchmark datasets

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Benchmark datasets are standardized datasets specifically designed for evaluating models for bias and fairness, allowing for efficient assessment with minimal administrative effort. The other options would require more manual processing and might not provide a consistent basis for evaluating bias and discrimination.

</details>

48. A company wants to use a pre-trained generative AI model to generate content for its marketing campaigns. The company needs to ensure that the generated content aligns with the company's brand voice and messaging requirements. Which solution meets these requirements?
    - A. Optimize the model's architecture and hyperparameters to improve the model's overall performance.
    - B. Increase the model's complexity by adding more layers to the model's architecture.
    - C. Create effective prompts that provide clear instructions and context to guide the model's generation.
    - D. Select a large, diverse dataset to pre-train a new generative model.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Creating effective prompts helps guide the pre-trained generative AI model to produce content that aligns with the company's brand voice and messaging. The other options either involve model architecture changes or require extensive training, which are not necessary for aligning content generation.

</details>

49. A loan company is building a generative AI-based solution to offer new applicants discounts based on specific business criteria. The company wants to build and use an AI model responsibly to minimize bias that could negatively affect some customers.     Which actions should the company take to meet these requirements? (Choose 2)
    - A. Detect imbalances or disparities in the data.
    - B. Ensure that the model runs frequently.
    - C. Evaluate the model's behavior so that the company can provide transparency to stakeholders.
    - D. Use the Recall-Oriented Understudy for Gisting Evaluation (ROUGE) technique to ensure that the model
    - E. Ensure that the model's inference time is within the accepted limits.

<details>
<summary>Answer</summary>

Correct answer: A, C

Explanation: Detect imbalances or disparities in the data: Identifying and addressing data imbalances helps minimize biases that could negatively affect customers. Evaluate the model's behavior so that the company can provide transparency to stakeholders: Evaluating the model and ensuring transparency is important for responsible AI usage, as it helps stakeholders understand how decisions are made. The other options are either not directly related to minimizing bias or do not address responsible AI development.

</details>

50. A company is using an Amazon Bedrock base model to summarize documents for an internal use case. The company trained a custom model to improve the summarization quality. Which action must the company take to use the custom model through Amazon Bedrock?
    - A. Purchase Provisioned Throughput for the custom model.
    - B. Deploy the custom model in an Amazon SageMaker endpoint for real-time inference.
    - C. Register the model with the Amazon SageMaker Model Registry.
    - D. Grant access to the custom model in Amazon Bedrock.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: [Model Customization Use](https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-use.html?form=MG0AV3)

</details>

---

## Prerequisites

- [Practice Tests](tests.md)

## Recommended Next Topics

- [Practice Test 2](practice-test-2.md)

## Related Topics

- [Practice Tests](tests.md)
- [Practice Test 2](practice-test-2.md)
- [Practice Test 3](practice-test-3.md)
