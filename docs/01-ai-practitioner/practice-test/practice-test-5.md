# Practice Test 5

1. An education company waftion. The application will give users the ability to enter text or provide a picture of a question. The application will respond with a written answer and an explanation of the written answer.
    - A. Computer vision model
    - B. Large multi-modal language model
    - C. Diffusion model
    - D. Text-to-speech model

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: A large multi-modal language model can natively ingest both text and images as inputs and generate text outputs, making it ideal for a system that accepts typed questions or photos of questions and returns written answers with explanations.

</details>

2. In which stage of the generative AI model lifecycle are tests performed to examine the model's accuracy?
    - A. Deployment
    - B. Data selection
    - C. Fine-tuning
    - D. Evaluation

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: The evaluation stage is when you run tests and benchmarks, such as accuracy, precision, and other performance metrics, to measure how well the generative AI model performs on hold-out or validation data before moving on to deployment.

</details>

3. Which statement correctly describes embeddings in generative AI?
    - A. Embeddings represent data as high-dimensional vectors that capture semantic relationships.
    - B. Embeddings is a technique that searches data to find the most helpful information to answer natural language questions.
    - C. Embeddings reduce the hardware requirements of a model by using a less precise data type for the weights and activations.
    - D. Embeddings provide the ability to store and retrieve data for generative AI applications.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Embeddings map inputs like words, sentences, or documents into continuous vector spaces where semantic similarity corresponds to geometric proximity, enabling models to reason about meaning and relationships mathematically.

</details>

4. A company wants to add generative AI functionality to its application by integrating a large language model (LLM). The responses from the LLM must be as deterministic and as stable as possible. Which solution meets these requirements?
    - A. Configure the application to automatically set the temperature parameter to 0 when submitting the prompt to the LLM.
    - B. Configure the application to automatically add "make your response deterministic" at the end of the prompt before submitting the prompt to the LLM.
    - C. Configure the application to automatically add "make your response deterministic" at the beginning of the prompt before submitting the prompt to the LLM.
    - D. Configure the application to automatically set the temperature parameter to 1 when submitting the prompt to the LLM.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: The temperature hyperparameter directly controls the randomness of the LLM’s token sampling: setting it to 0 forces greedy decoding, yielding the most likely next token every time and thus fully deterministic, stable outputs.

</details>

5. A company needs to select a generative AI model to build an application. The application must provide responses to users in real time. Which model characteristic should the company consider to meet these requirements?
    - A. Model complexity
    - B. Innovation speed
    - C. Inference speed
    - D. Training time

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: For real-time applications, the model’s inference speed - ability to generate responses with low latency - is the critical characteristic to ensure users receive answers promptly.

</details>

6. Which term refers to the instructions given to foundation models (FMs) so that the FMs provide a more accurate response to a question?
    - A. Prompt
    - B. Direction
    - C. Dialog
    - D. Translation

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: A prompt is the input instruction or query you provide to a foundation model to guide its response, ensuring the model understands the task and delivers a more accurate answer.

</details>

7. A retail company wants to build an ML model to recommend products to customers. The company wants to build the model based on responsible practices. Which practice should the company apply when collecting data to decrease model bias?
    - A. Use data from
    - B. Collect data from customers
    - C. Ensure that the data is
    - D. Ensure that the data is from a

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: By gathering training data that reflects the full spectrum of your customer population - across demographics, behaviors, and preferences - you reduce skew toward any one subgroup and help the recommender treat all users equitably.

</details>

8. A company is developing an ML model to predict customer churn. Which evaluation metric will assess the model's performance on a binary classification task such as predicting churn?
    - A. F1 score
    - B. Mean squared error (MSE)
    - C. R-squared
    - D. Time used to train the model

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: For binary classification tasks like churn prediction, the F1 score balances precision and recall into a single metric, making it ideal for evaluating how well the model identifies churners without over- or under-predicting.

</details>

9. An AI practitioner is evaluating the performance of an Amazon SageMaker model. The AI practitioner must choose a performance metric. The metric must show the ratio of the number of correctly classified items to the total number of correctly and incorrectly classified items. Which metric meets these requirements?
    - A. Accuracy
    - B. Precision
    - C. F1 score
    - D. Recall

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Accuracy is defined as the number of correctly classified items (both true positives and true negatives) divided by the total number of items evaluated (the sum of true positives, true negatives, false positives, and false negatives), matching exactly the ratio described.

</details>

10. An ecommerce company receives multiple gigabytes of customer data daily. The company uses the data to train an ML model to forecast future product demand. The company needs a solution to perform inferences once each day. Which inference type meets these requirements?
    - A. Batch inference
    - B. Asynchronous inference
    - C. Real-time inference
    - D. Serverless inference

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Batch inference is designed for high-volume, scheduled predictions: you can point it at the day’s gigabytes of data, run a job once daily, and generate all forecasts in one go without needing a persistent endpoint.

</details>

11. A company has developed a generative AI model for customer segmentation. The model has been deployed in the company's production environment for a long time. The company recently noticed some inconsistency in the model's responses. The company wants to evaluate model bias and drift. Which AWS service or feature meets these requirements?
    - A. Amazon SageMaker Model Monitor
    - B. Amazon SageMaker Clarify
    - C. Amazon SageMaker Model Cards
    - D. Amazon SageMaker Feature Store

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: SageMaker Model Monitor continuously collects inference and ground-truth data to automatically detect data drift, concept drift, and bias shifts in production models. By configuring baseline metrics and thresholds, the company can track inconsistencies in responses over time and receive alerts whenever bias or drift exceed acceptable limits.

</details>

12. A company has signed up for Amazon Bedrock access to build applications. The company wants to restrict employee access to specific models available on Amazon Bedrock. Which solution meets these requirements?
    - A. Use AWS Identity and Access Management (IAM) policies to restrict model access.
    - B. Use AWS Security Token Service (AWS STS) to generate temporary credentials for model use.
    - C. Use AWS Identity and Access Management (IAM) service roles to restrict model subscription.
    - D. Use Amazon Inspector to monitor model access.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: With IAM policies you can grant or deny Bedrock API actions scoped to specific model ARNs, ensuring employees can only invoke the exact models you authorize.

</details>

13. Which ML technique uses training data that is labeled with the correct output values?
    - A. Supervised learning
    - B. Unsupervised learning
    - C. Reinforcement learning
    - D. Transfer learning

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Supervised learning trains models on datasets where each example includes both input features and the correct output label, allowing the algorithm to learn the mapping from inputs to known targets.

</details>

14. Which large language model (LLM) parameter controls the number of possible next words or tokens considered at each step of the text generation process?
    - A. Maximum tokens
    - B. Top K
    - C. Temperature
    - D. Batch size

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: The Top K parameter limits token sampling at each generation step to the K most probable next tokens. By choosing how many of the highest-probability candidates to consider, Top K directly controls the breadth of options the model evaluates when generating each token.

</details>

15. A company is making a chatbot. The chatbot uses Amazon Lex and Amazon OpenSearch Service. The chatbot uses the company's private data to answer questions. The company needs to convert the data into a vector representation before storing the data in a database. Which type of foundation model (FM) meets these requirements?
    - A. Text completion model
    - B. Instruction following model
    - C. Text embeddings model
    - D. Image generation model

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Text embeddings models transform input text into high-dimensional vector representations, making them ideal for storing and retrieving your private data in a vector database for the chatbot.

</details>

16. A company wants to use a large language model (LLM) to generate product descriptions. The company wants to give the model example descriptions that follow a format. Which prompt engineering technique will generate descriptions that match the format?
    - A. Zero-shot prompting
    - B. Chain-of-thought prompting
    - C. One-shot prompting
    - D. Few-shot prompting

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Few-shot prompting provides the model with several example product descriptions that follow your desired format, enabling it to learn the pattern and generate new descriptions in the same style without further training.

</details>

17. A bank is fine-tuning a large language model (LLM) on Amazon Bedrock to assist customers with questions about their loans. The bank wants to ensure that the model does not reveal any private customer data. Which solution meets these requirements?
    - A. Use Amazon Bedrock Guardrails.
    - B. Remove personally identifiable information (PII) from the customer data before fine-tuning the LLM.
    - C. Increase the Top-K parameter of the LLM.
    - D. Store customer data in Amazon S3. Encrypt the data before fine-tuning the LLM.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Preprocessing your fine-tuning dataset to strip out names, account numbers, and other PII prevents the model from ever ingesting - or later regurgitating - private customer information. This data sanitization step is the most reliable way to guarantee that sensitive details aren’t embedded into the model.

</details>

18. A grocery store wants to create a chatbot to help customers find products in the store. The chatbot must check the inventory in real time and provide the product location in the store. Which prompt engineering technique should the store use to build the chatbot?
    - A. Zero-shot prompting
    - B. Few-shot prompting
    - C. Least-to-most prompting
    - D. Reasoning and acting (ReAct) prompting

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: ReAct prompting interleaves the model’s chain-of-thought reasoning with explicit “actions” (such as calling your real-time inventory API), then uses the API response to inform its final answer. By structuring your prompts to have the LLM think, choose the “CheckInventory” action with the product name, receive the live location data, and then respond to the user, you seamlessly integrate real-time lookups and precise product locations into the chatbot’s replies.

</details>

19. A company uses a third-party model on Amazon Bedrock to analyze confidential documents. The company is concerned about data privacy. Which statement describes how Amazon Bedrock protects data privacy?
    - A. User inputs and model outputs are anonymized and shared with third-party model providers.
    - B. User inputs and model outputs are not shared with any third-party model providers.
    - C. User inputs are kept confidential, but model outputs are shared with third-party model providers.
    - D. User inputs and model outputs are redacted before the inputs and outputs are shared with third-party

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon Bedrock processes your data entirely within AWS’s secure environment and does not forward your inputs or the generated outputs back to the model vendor, ensuring that your confidential documents remain private.

</details>

20. An animation company wants to provide subtitles for its content. Which AWS service meets this requirement?
    - A. Amazon Comprehend
    - B. Amazon Polly
    - C. Amazon Transcribe
    - D. Amazon Translate

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Amazon Transcribe converts spoken audio into accurate, time-stamped text transcripts, making it the ideal service for generating subtitles from your animation audio tracks.

</details>

21. An ecommerce company wants to group customers based on their purchase history and preferences to personalize the user experience of the company's application. Which ML technique should the company use?
    - A. Classification
    - B. Clustering
    - C. Regression
    - D. Content generation

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Clustering is an unsupervised learning technique that automatically groups data points - in this case, customers with similar purchase histories and preferences - into segments without needing predefined labels, enabling personalized experiences.

</details>

22. A company wants to control employee access to publicly available foundation models (FMs). Which solution meets these requirements?
    - A. Analyze cost and usage reports in AWS Cost Explorer.
    - B. Download AWS security and compliance documents from AWS Artifact.
    - C. Configure Amazon SageMaker JumpStart to restrict discoverable FMs.
    - D. Build a hybrid search solution by using Amazon OpenSearch Service.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation:   SageMaker JumpStartlets you curate which publicly available foundation models appear inyour account’s model catalog. By using JumpStart’s employees from discovering or deploying any FMs you haven’t explicitly allowed.

</details>

23. A company has set up a translation tool to help its customer service team handle issues from customers around the world. The company wants to evaluate the performance of the translation tool. The company sets up a parallel data process that compares the responses from the tool to responses from actual humans. Both sets of responses are generated on the same set of documents. Which strategy should the company use to evaluate the translation tool?
    - A. Use the Bilingual Evaluation Understudy (BLEU) score to estimate the absolute translation quality of the two methods.
    - B. Use the Bilingual Evaluation Understudy (BLEU) score to estimate the relative translation quality of the two methods.
    - C. Use the BERTScore to estimate the absolute translation quality of the two methods.
    - D. Use the BERTScore to estimate the relative translation quality of the two methods.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: BLEU measures n-gram overlap between a candidate translation and one or more reference translations. When you apply it to both the tool’s outputs and the human outputs on the same source documents, you get comparable scores that let you directly assess which approach yields better translations.

</details>

24. An AI practitioner wants to generate more diverse and more creative outputs from a large language model (LLM). How should the AI practitioner adjust the inference parameter?
    - A. Increase the temperature value.
    - B. Decrease the Top K value.
    - C. Increase the response length.
    - D. Decrease the prompt length.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Raising the temperature softens the model’s probability distribution, increasing the chance of sampling lesslikely tokens and thus producing more varied and creative responses.

</details>

25. A company has developed custom computer vision models. The company needs a user-friendly interface for data labeling to minimize model mistakes on new real-world data. Which AWS service, feature, or tool meets these requirements?
    - A. Amazon SageMaker Ground Truth
    - B. Amazon SageMaker Canvas
    - C. Amazon Bedrock playground
    - D. Amazon Bedrock Agents

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: SageMaker Ground Truth provides a built-in, easy-to-use labeling console with workflows and quality controls specifically for computer vision tasks, enabling you to efficiently generate high-quality labeled data and reduce model errors on real-world images.

</details>

26. A company is integrating AI into its employee recruitment and hiring solution. The company wants to mitigate bias risks and ensure responsible AI practices while prioritizing equitable hiring decisions. Which core dimensions of responsible AI should the company consider? (Choose two.)
    - A. Fairness
    - B. Tolerance
    - C. Flexibility
    - D. Open source
    - E. Transparency

<details>
<summary>Answer</summary>

Correct answer: AE

Explanation: Fairness - Ensuring equitable outcomes across all demographic groups helps mitigate bias risks in hiring decisions. Transparency - Providing clear explanations of how the AI makes decisions builds trust and allows auditing for bias.

</details>

27. A financial company has deployed an ML model to predict customer churn. The model has been running in production for 1 week. The company wants to evaluate how accurately the model predicts churn compared to actual customer behavior. Which metric meets these requirements?
    - A. Root mean squared error (RMSE)
    - B. Return on investment (ROI)
    - C. F1 score
    - D. Bilingual Evaluation Understudy (BLEU) score

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: The F1 score combines precision (how many predicted churners actually churned) and recall (how many actual churners were correctly identified) into a single metric, making it ideal for measuring your model’s accuracy on the binary churn‐ prediction task.

</details>

28. A company has a generative AI application that uses a pre-trained foundation model (FM) on Amazon Bedrock. The company wants the FM to include more context by using company information. Which solution meets these requirements MOST cost-effectively?
    - A. Use Amazon Bedrock Knowledge Bases.
    - B. Choose a different FM on Amazon Bedrock.
    - C. Use Amazon Bedrock Agents.
    - D. Deploy a custom model on Amazon Bedrock.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon Bedrock Knowledge Bases let you index and retrieve your company’s documents at inference time, injecting relevant context into the pre-trained FM’s prompts without the cost or complexity of re-training or fine-tuning a custom model. This retrieval-augmented approach delivers up-to-date, domain-specific information in responses while keeping costs low.

</details>

29. A food service company wants to collect a dataset to predict customer food preferences. The company wants to ensure that the food preferences of all demographics are included in the data. Which dataset characteristic does this scenario present?
    - A. Accuracy
    - B. Diversity
    - C. Recency bias
    - D. Reliability

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Ensuring representation of all demographic groups addresses the dataset’s diversity, so the model learns from a wide range of customer preferences.

</details>

30. A company wants to create a chatbot that answers questions about human resources policies. The company is using a large language model (LLM) and has a large digital documentation base. Which technique should the company use to optimize the generated responses?
    - A. Use Retrieval Augmented Generation (RAG).
    - B. Use few-shot prompting.
    - C. Set the temperature to 1.
    - D. Decrease the token size.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: RAG lets the chatbot pull in precise, up-to-date passages from your HR documentation at inference time, grounding its answers in the actual policy text and ensuring accuracy without overloading the LLM’s context window.

</details>

31. An education company is building a chatbot whose target audience is teenagers. The company is training a custom large language model (LLM). The company wants the chatbot to speak in the target audience's language style by using creative spelling and shortened words. Which metric will assess the LLM's performance?
    - A. F1 score
    - B. BERTScore
    - C. Recall-Oriented Understudy for Gisting Evaluation (ROUGE)
    - D. Bilingual Evaluation Understudy (BLEU) score

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: BLEU evaluates surface-level n-gram overlap between the LLM’s outputs and reference examples—in this case, targets written in creative spelling and shorthand, making it well suited to measure how closely the model’s style matches the teenager-oriented language.

</details>

32. A customer service team is developing an application to analyze customer feedback and automatically classify the feedback into different categories. The categories include product quality, customer service, and delivery experience. Which AI concept does this scenario present?
    - A. Computer vision
    - B. Natural language processing (NLP)
    - C. Recommendation systems
    - D. Fraud detection

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Automatically analyzing and classifying free-text feedback into thematic categories is a core NLP task (text classification).

</details>

33. A financial services company must ensure that its generative AI-powered chatbot provides factual responses for regulatory compliance. Which solution prevents the underlying foundation model (FM) from hallucinating?
    - A. Use AWS Config to query compliance metadata by using natural language.
    - B. Configure Amazon Bedrock Guardrails to evaluate user inputs and model responses.
    - C. Use Amazon Fraud Detector to detect potentially fraudulent online activities.
    - D. Use AWS Audit Manager to prepare IT audit and compliance reports.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon Bedrock Guardrails allows you to define rules and policies that evaluate and constrain both user inputs and model responses. By configuring guardrails, you can prevent the generative AI model from producing hallucinated or non-factual outputs, ensuring the chatbot adheres to compliance requirements and provides factual responses. This directly addresses the need to control hallucinations in generative AI systems for regulatory compliance.

</details>

34. A company has created multiple ML models. The company needs a solution for storing, managing, and versioning the models. Which AWS service or feature meets these requirements?
    - A. AWS Audit Manager
    - B. Amazon SageMaker Model Monitor
    - C. Amazon SageMaker Model Registry
    - D. Amazon SageMaker Canvas

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Amazon SageMaker Model Registry is the AWS service designed to store, manage, and version machine learning models. It provides a central repository for tracking model versions and managing their deployment status throughout the ML lifecycle.

</details>

35. An AI practitioner is building an ML model. The AI practitioner wants to provide model transparency and explainability to stakeholders. Which solution will meet these requirements?
    - A. Present the model Shapley values.
    - B. Provide the model accuracy measure.
    - C. Provide the model confusion matrix.
    - D. Provide a secure model inference endpoint.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Presenting the model Shapley values provides transparency and explainability by showing how each feature contributes to individual predictions, helping stakeholders understand the reasoning behind the model’s outputs.

</details>

36. A company is developing an ML application. The application must automatically group similar customers and products based on their characteristics. Which ML strategy should the company use to meet these requirements?
    - A. Unsupervised learning
    - B. Supervised learning
    - C. Reinforcement learning
    - D. Semi-supervised learning

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Unsupervised learning is used to automatically group or cluster similar customers and products based on their characteristics without the need for labeled data. This strategy fits scenarios where the goal is to discover patterns or groupings in the data.

</details>

37. A news agency publishes articles in English. The agency wants to make articles available in other languages.   Which solution meets these requirements?
    - A. Add Amazon Transcribe to the company’s website.
    - B. Use the Amazon Translate real-time translation feature.
    - C. Add Amazon Personalize to the company’s website.
    - D. Use the Amazon Textract real-time document processing feature.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon Translate provides real-time translation of text, making it suitable for automatically translating articles from English into other languages for publication.

</details>

38. A bank is building a chatbot to answer customer questions about opening a bank account. The chatbot will use public bank documents to generate responses. The company will use Amazon Bedrock and prompt engineering to improve the chatbot’s responses. Which prompt engineering technique meets these requirements?
    - A. Complexity-based prompting
    - B. Zero-shot prompting
    - C. Few-shot prompting
    - D. Directional stimulus prompting

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Few-shot prompting involves providing the generative AI model with several examples (drawn from public bank documents) to guide it in generating more accurate and relevant responses. This technique helps the chatbot better align its answers with the desired content and format.

</details>

39. A company wants to fine-tune an ML model that is hosted on Amazon Bedrock. The company wants to use its own sensitive data that is stored in private databases in a VPC. The data needs to stay within the company’s private network. Which solution will meet these requirements?
    - A. Restrict access to Amazon Bedrock by using an AWS Identity and Access Management (IAM) service
    - B. Restrict access to Amazon Bedrock by using an AWS Identity and Access Management (IAM) resource
    - C. Use AWS PrivateLink to connect the VPC and Amazon Bedrock.
    - D. Use AWS Key Management Service (AWS KMS) keys to encrypt the data.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: AWS PrivateLink enables secure, private connectivity between your VPC and Amazon Bedrock without exposing data to the public internet, ensuring that sensitive data stays within your private network during fine-tuning.

</details>

40. A documentary filmmaker wants to reach more viewers. The filmmaker wants to automatically add subtitles and voice-overs in multiple languages to their films. Which combination of steps will meet these requirements? (Choose two.)
    - A. Use Amazon Transcribe and Amazon Translate to generate subtitles in other languages.
    - B. Use Amazon Textract and Amazon Translate to generate subtitles in other languages.
    - C. Use Amazon Polly to generate voice-overs in other languages.
    - D. Use Amazon Translate to generate voice-overs in other languages.

<details>
<summary>Answer</summary>

Correct answer: AC

Explanation: Use Amazon Transcribe and Amazon Translate to generate subtitles in other languages: Amazon Transcribe converts spoken dialogue to text (subtitles), and Amazon Translate can then translate these subtitles into multiple languages. Use Amazon Polly to generate voice-overs in other languages: Amazon Polly converts translated text into lifelike speech, enabling the creation of multilingual voice-overs.

</details>

41. A company wants to create a chatbot to answer employee questions about company policies. Company policies are updated frequently. The chatbot must reflect the changes in near real time. The company wants to choose a large language model (LLM). Which solution meets these requirements?
    - A. Fine-tune an LLM on the company policy text by using Amazon SageMaker.
    - B. Select a foundation model (FM) from Amazon Bedrock to build an application.
    - C. Create a Retrieval Augmented Generation (RAG) workflow by using Amazon Bedrock Knowledge
    - D. Use Amazon Q Business to build a custom Q App.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: A RAG workflow with Amazon Bedrock Knowledge Bases allows the chatbot to access the most recent company policy documents dynamically, ensuring responses reflect policy updates in near real time without the need to retrain or fine-tune the LLM each time content changes.

</details>

42. A company is using supervised learning to train an AI model on a small labeled dataset that is specific to a target task. Which step of the foundation model (FM) lifecycle does this describe?
    - A. Fine-tuning
    - B. Data selection
    - C. Pre-training
    - D. Evaluation

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Fine-tuning is the process of training a pre-existing foundation model on a smaller, labeled dataset that is specific to a target task, allowing the model to adapt to the company's requirements.

</details>

43. A company is introducing a new feature for its application. The feature will refine the style of output messages. The company will fine-tune a large language model (LLM) on Amazon Bedrock to implement the feature. Which type of data does the company need to meet these requirements?
    - A. Samples of only input messages
    - B. Samples of only output messages
    - C. Samples of pairs of input and output messages
    - D. Separate samples of input and output messages

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Fine-tuning a large language model to refine the style of output messages requires training data consisting of paired input and output messages. These pairs allow the model to learn the relationship between the input provided and the desired styled output, ensuring the fine-tuned model produces responses with the intended style.

</details>

44. A healthcare company is building an AI solution to predict patient readmission within 30 days of patient discharge. The company has trained a model on historical patient data including medical history, demographics, and treatment specifications, to provide readmission predictions in real time. Which task describes AI model inference in this scenario?
    - A. Gather historical patient readmission data.
    - B. Use appropriate metrics and assess model performance.
    - C. Use data to identify patient patterns and correlations.
    - D. Use a trained model to predict patient readmission.

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Model inference refers to the process of applying a trained model to new data—in this case, using the trained model to make real-time predictions about whether a patient will be readmitted within 30 days of discharge.

</details>

45. A financial company wants to build workflows for human review of ML predictions. The company wants to define confidence thresholds for its use case and adjust the thresholds over time. Which AWS service meets these requirements?
    - A. Amazon Personalize
    - B. Amazon Augmented AI (Amazon A2I)
    - C. Amazon Inspector
    - D. AWS Audit Manager

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon Augmented AI (Amazon A2I) enables you to build workflows for human review of machine learning predictions, allowing you to define and adjust confidence thresholds for when human intervention is required.

</details>

46. A company wants to develop an AI assistant for employees to query internal data. Which AWS service will meet this requirement?
    - A. Amazon Rekognition
    - B. Amazon Textract
    - C. Amazon Lex
    - D. Amazon Q Business

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Amazon Q Business is designed to build generative AI assistants for querying and interacting with internal organizational data, making it the ideal service for creating an AI assistant for employees to access company information.

</details>

47. A company wants to build and deploy ML models on AWS without writing any code. Which AWS service or feature meets these requirements?
    - A. Amazon SageMaker Canvas
    - B. Amazon Rekognition
    - C. AWS DeepRacer
    - D. Amazon Comprehend

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon SageMaker Canvas allows users to build, train, and deploy machine learning models using a nocode visual interface, meeting the requirement to create ML solutions without writing any code.

</details>

48. What is the primary advantage of using Amazon Aurora with pgvector for AI applications?
    - A. It provides serverless computing capabilities
    - B. It enables vector similarity search within a relational database
    - C. It automatically generates AI models
    - D. It provides pre-trained language models

<details>
<summary>Answer</summary>


Correct answer: B

Explanation:
Amazon Aurora with pgvector enables vector similarity search operations within a relational database, allowing organizations to:
- Store embeddings alongside structured data
- Perform vector similarity searches using SQL
- Maintain ACID compliance while working with vector data
- Scale vector operations efficiently

**Task Reference**: Referenced in Task Statement 3.1 as one of the AWS services that help store embeddings within databases.

</details>

49. Which features make Amazon Kendra most valuable for enterprise search applications? (Choose 2)
    - A. Natural language understanding
    - B. Website hosting capabilities
    - C. Semantic search functionality
    - D. Email server functionality
    - E. Network monitoring

<details>
<summary>Answer</summary>


Correct answer: A, C

Explanation:
Amazon Kendra provides advanced search capabilities through:
- Natural language understanding that interprets user intent
- Semantic search that understands context and meaning
- Integration with enterprise data sources
- Learning from user interactions and feedback

**Task Reference**: This service is mentioned in Task Statement 1.2 under AWS managed AI services, particularly for intelligent search applications.

</details>

50. Which parameters are commonly used for controlling the output diversity in generative AI models? (Choose 2)
    - A. Top-k sampling
    - B. Model size
    - C. Top-p (nucleus) sampling
    - D. Training dataset size
    - E. Hardware configuration

<details>
<summary>Answer</summary>


Correct answer: A, C

Explanation:
Top-k and Top-p sampling are key parameters for controlling output generation:
- Top-k limits token selection to the k most likely next tokens
- Top-p (nucleus) sampling selects from tokens that sum to probability p
Both help balance between diversity and quality of generated content.

**Task Reference**: These concepts relate to Task Statement 3.1 regarding inference parameters' effects on model responses.

</details>

---

## Prerequisites

- [Practice Test 4](practice-test-4.md)

## Recommended Next Topics

- [Practice Test 6](practice-test-6.md)

## Related Topics

- [Practice Tests](tests.md)
- [Practice Test 1](practice-test-1.md)
- [Practice Test 2](practice-test-2.md)
