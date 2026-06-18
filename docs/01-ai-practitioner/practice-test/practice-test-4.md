# Practice Test 4

1. A company wants to identify harmful language in the comments section of social media posts by using an ML model. The company will not use labeled data to train the model. Which strategy should the company use to identify harmful language?
    - A. Use Amazon Rekognition moderation.
    - B. Use Amazon Comprehend toxicity detection.
    - C. Use Amazon SageMaker built-in algorithms to train the model.
    - D. Use Amazon Polly to monitor comments.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon Comprehend provides pre-trained NLP models, including toxicity detection, to analyze text for harmful language. Since the company does not plan to use labeled data for training, Amazon Comprehend is a suitable choice because it does not require custom training and can automatically detect toxic or harmful content in comments.

</details>

2. A media company wants to analyze viewer behavior and demographics to recommend personalized content. The company wants to deploy a customized ML model in its production environment. The company also wants to observe if the model quality drifts over time. Which AWS service or feature meets these requirements?
    - A. Amazon Rekognition
    - B. Amazon SageMaker Clarify
    - C. Amazon Comprehend
    - D. Amazon SageMaker Model Monitor

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Amazon SageMaker Model Monitor continuously tracks deployed ML models in production to detect data drift, model drift, and quality degradation over time. This is essential for ensuring that the recommendation model remains accurate as viewer behavior and demographics change. Model Monitor helps detect anomalies and provides alerts when model performance deviates from expected trends, allowing the company to take corrective action.

</details>

3. A company is deploying AI/ML models by using AWS services. The company wants to offer transparency into the models’ decision-making processes and provide explanations for the model outputs. Which AWS service or feature meets these requirements?
    - A. Amazon SageMaker Model Cards
    - B. Amazon Rekognition
    - C. Amazon Comprehend
    - D. Amazon Lex

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon SageMaker Model Cards help provide transparency into AI/ML models by documenting key details such as model purpose, training data, performance metrics, and limitations. This documentation enables organizations to explain model outputs and decision-making processes, ensuring accountability and compliance with responsible AI principles.

</details>

4. A manufacturing company wants to create product descriptions in multiple languages. Which AWS service will automate this task?
    - A. Amazon Translate
    - B. Amazon Transcribe
    - C. Amazon Kendra
    - D. Amazon Polly

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon Translate is an AWS service that automates language translation using neural machine translation (NMT). It enables businesses to generate product descriptions in multiple languages quickly and accurately, making it the best choice for this task.

</details>

5. Which AWS feature records details about ML instance data for governance and reporting?
    - A. Amazon SageMaker Model Cards
    - B. Amazon SageMaker Debugger
    - C. Amazon SageMaker Model Monitor
    - D. Amazon SageMaker JumpStart

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon SageMaker Model Cards record key details about machine learning models, including intended use, training data, evaluation metrics, and compliance information. They support governance and reporting by providing a standardized way to document model information throughout its lifecycle.

</details>

6. A financial company is using ML to help with some of the company’s tasks. Which option is a use of generative AI models?
    - A. Summarizing customer complaints
    - B. Classifying customers based on product usage
    - C. Segmenting customers based on type of investments
    - D. Forecasting revenue for certain products

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Generative AI models are designed to generate new content such as text, images, or audio. Summarizing customer complaints involves generating concise versions of longer texts, which is a task well-suited for generative AI models like large language models.

</details>

7. A medical company wants to develop an AI application that can access structured patient records, extract relevant information, and generate concise summaries. Which solution will meet these requirements?
    - A. Use Amazon Comprehend Medical to extract relevant medical entities and relationships. Apply rulebased logic to structure and format summaries.
    - B. Use Amazon Personalize to analyze patient engagement patterns. Integrate the output with a general
    - C. Use Amazon Textract to convert scanned documents into digital text. Design a keyword extraction
    - D. Implement Amazon Kendra to provide a searchable index for medical records. Use a template-based

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Amazon Comprehend Medical is specifically designed to extract structured medical information (such as medication, condition, test results) from unstructured text. By applying rule-based logic afterward, relevant data can be formatted into concise summaries, meeting both the extraction and summarization needs.

</details>

8. Which option describes embeddings in the context of AI?
    - A. A method for compressing large datasets
    - B. An encryption method for securing sensitive data
    - C. A method for visualizing high-dimensional data
    - D. A numerical method for data representation in a reduced dimensionality space

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Embeddings are numerical representations of data, such as words, images, or items, in a lowerdimensional vector space. They capture semantic relationships and patterns in the data, enabling models to process and compare inputs efficiently.

</details>

9. A company is building an AI application to summarize books of varying lengths. During testing, the application fails to summarize some books. Why does the application fail to summarize some books?
    - A. The temperature is set too high.
    - B. The selected model does not support fine-tuning.
    - C. The Top P value is too high.
    - D. The input tokens exceed the model’s context size.

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Language models have a maximum context size, which limits the number of input tokens they can process at once. If a book's length exceeds this limit, the model cannot handle the full input, leading to failure in summarization.

</details>

10. An airline company wants to build a conversational AI assistant to answer customer questions about flight schedules, booking, and payments. The company wants to use large language models (LLMs) and a knowledge base to create a text-based chatbot interface. Which solution will meet these requirements with the LEAST development effort?
    - A. Train models on Amazon SageMaker Autopilot.
    - B. Develop a Retrieval Augmented Generation (RAG) agent by using Amazon Bedrock.
    - C. Create a Python application by using Amazon Q Developer.
    - D. Fine-tune models on Amazon SageMaker Jumpstart.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon Bedrock allows quick integration of large language models with a knowledge base using RAG architecture, enabling accurate and dynamic responses based on up-to-date information. This approach requires minimal development effort while leveraging powerful generative capabilities.

</details>

11. What is tokenization used for in natural language processing (NLP)?
    - A. To encrypt text data
    - B. To compress text files
    - C. To break text into smaller units for processing
    - D. To translate text between languages

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Tokenization is the process of dividing text into smaller units, such as words, subwords, or characters, which can then be analyzed or processed by NLP models. It is a foundational step in preparing text data for machine learning.

</details>

12. Which option is a characteristic of transformer-based language models?
    - A. Transformer-based language models use convolutional layers to apply filters across an input to capture local patterns through filtered views.
    - B. Transformer-based language models can process only text data.
    - C. Transformer-based language models use self-attention mechanisms to capture contextual relationships.
    - D. Transformer-based language models process data sequences one element at a time in cyclic iterations.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: A key characteristic of transformer models is their use of self-attention mechanisms, which allow the model to weigh the importance of different words in a sequence relative to each other, enabling a deep understanding of context and meaning across the entire input.

</details>

13. A financial company is using AI systems to obtain customer credit scores as part of the loan application process. The company wants to expand to a new market in a different geographic area. The company must ensure that it can operate in that geographic area. Which compliance laws should the company review?
    - A. Local health data protection laws
    - B. Local payment card data protection laws
    - C. Local education privacy laws
    - D. Local algorithm accountability laws

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: When deploying AI systems that affect individuals, such as credit scoring, companies must comply with local algorithm accountability laws. These laws regulate the fairness, transparency, and impact of automated decision-making, ensuring ethical use of AI in new geographic regions.

</details>

14. A company uses Amazon Bedrock for its generative AI application. The company wants to use Amazon Bedrock Guardrails to detect and filter harmful user inputs and model-generated outputs. Which content categories can the guardrails filter? (Choose two.)
    - A. Hate
    - B. Politics
    - C. Violence
    - D. Gambling

<details>
<summary>Answer</summary>

Correct answer: AC

Explanation: Amazon Bedrock Guardrails provide configurable content filters to detect and block harmful content in generative AI applications. Specifically, they include filters for categories such as Hate and Violence, among others. These filters can be applied to both user inputs and model-generated outputs to ensure that the AI application adheres to responsible AI practices and organizational policies.

</details>

15. Which scenario describes a potential risk and limitation of prompt engineering in the context of a generative AI model?
    - A. Prompt engineering does not ensure that the model always produces consistent and deterministic outputs, eliminating the need for validation.
    - B. Prompt engineering could expose the model to vulnerabilities such as prompt injection attacks.
    - C. Properly designed prompts reduce but do not eliminate the risk of data poisoning or model hijacking.
    - D. Prompt engineering does not ensure that the model will consistently generate highly reliable outputs when working with real-world data.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: A key risk in prompt engineering is prompt injection, where attackers manipulate input prompts to alter a model's behavior or produce unintended outputs. This vulnerability arises from the model's sensitivity to input structure and content, making it a critical limitation in secure prompt design.

</details>

16. A publishing company built a Retrieval Augmented Generation (RAG) based solution to give its users the ability to interact with published content. New content is published daily. The company wants to provide a near real-time experience to users. Which steps in the RAG pipeline should the company implement by using offline batch processing to meet these requirements? (Choose two.)
    - A. Generation of content embeddings
    - B. Generation of embeddings for user queries
    - C. Creation of the search index
    - D. Retrieval of relevant content

<details>
<summary>Answer</summary>

Correct answer: AC

Explanation: Generation of content embeddings New or updated documents can be converted to vector representations in periodic batches (e.g., hourly, nightly). Because a document’s embedding remains fixed until the document itself changes, this step does not have to run for every user query, making it ideal for offline processing. Creation of the search index After new embeddings are produced, the vector (or hybrid) index can be rebuilt or incrementally updated in batch mode. Index construction is computationally intensive but happens infrequently relative to user requests, so running it offline avoids adding latency to real-time interactions.

</details>

17. Which technique breaks a complex task into smaller subtasks that are sent sequentially to a large language model (LLM)?
    - A. One-shot prompting
    - B. Prompt chaining
    - C. Tree of thoughts
    - D. Retrieval Augmented Generation (RAG)

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Prompt chaining involves breaking a complex task into smaller, manageable subtasks and passing them sequentially to a large language model. Each step builds upon the previous one, enabling more structured reasoning and improved task execution.

</details>

18. An AI practitioner needs to improve the accuracy of a natural language generation model. The model uses rapidly changing inventory data. Which technique will improve the model's accuracy?
    - A. Transfer learning
    - B. Federated learning
    - C. Retrieval Augmented Generation (RAG)
    - D. One-shot prompting

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: RAG enhances a language model by fetching up-to-date, domain-specific data (e.g., current inventory) at inference time and conditioning the generation on those facts, ensuring the output reflects the latest information and improving accuracy without retraining the core model.

</details>

19. A company wants to collaborate with several research institutes to develop an AI model. The company needs standardized documentation of model version tracking and a record of model development. Which solution meets these requirements?
    - A. Track the model changes by using Git.
    - B. Track the model changes by using Amazon Fraud Detector.
    - C. Track the model changes by using Amazon SageMaker Model Cards.
    - D. Track the model changes by using Amazon Comprehend.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: SageMaker Model Cards provide a built-in framework for capturing and versioning key metadata, such as training data details, performance metrics, lineage, and intended use, for each model iteration. This standardized documentation and history of development fulfills requirements for model version tracking and auditable records.

</details>

20. A company that uses multiple ML models wants to identify changes in original model quality so that the company can resolve any issues. Which AWS service or feature meets these requirements?
    - A. Amazon SageMaker JumpStart
    - B. Amazon SageMaker HyperPod
    - C. Amazon SageMaker Data Wrangler
    - D. Amazon SageMaker Model Monitor

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: SageMaker Model Monitor continuously measures data and prediction quality in production, detects deviations from your model’s baseline (such as data drift or accuracy degradation), and alerts you so you can investigate and resolve issues promptly.

</details>

21. What is the purpose of chunking in Retrieval Augmented Generation (RAG)?
    - A. To avoid database storage limitations for large text documents by storing parts or chunks of the text
    - B. To improve efficiency by avoiding the need to convert large text into vector embeddings
    - C. To improve the contextual relevancy of results retrieved from the vector index
    - D. To decrease the cost of storage by storing parts or chunks of the text

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: By splitting large documents into smaller, semantically coherent chunks, the retrieval system can match and return only the most context-relevant segments for a given query, enhancing the precision and accuracy of the generated responses.

</details>

22. A company is developing an editorial assistant application that uses generative AI. During the pilot phase, usage is low and application performance is not a concern. The company cannot predict application usage after the application is fully deployed and wants to minimize application costs. Which solution will meet these requirements?
    - A. Use GPU-powered Amazon EC2 instances.
    - B. Use Amazon Bedrock with Provisioned Throughput.
    - C. Use Amazon Bedrock with On-Demand Throughput.
    - D. Use Amazon SageMaker JumpStart.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: On-Demand Throughput in Bedrock charges only for the inference calls you actually make, with no upfront capacity commitment. This lets you start with minimal pilot usage and elastically handle unpredictable future load while keeping costs as low as possible.

</details>

23. A company deployed a Retrieval Augmented Generation (RAG) application on Amazon Bedrock that gathers financial news to distribute in daily newsletters. Users have recently reported politically influenced ideas in the newsletters.   Which Amazon Bedrock guardrail can identify and filter this content?
    - A. Word filters
    - B. Denied topics
    - C. Sensitive information filters
    - D. Content filters

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: The Denied topics guardrail lets you define high-level categories (such as politics) that the model must avoid. Bedrock enforces these rules during generation, filtering out any content related to politically influenced ideas.

</details>

24. A financial company is developing a fraud detection system that flags potential fraud cases in credit card transactions. Employees will evaluate the flagged fraud cases. The company wants to minimize the amount of time the employees spend reviewing flagged fraud cases that are not actually fraudulent. Which evaluation metric meets these requirements?
    - A. Recall
    - B. Accuracy
    - C. Precision
    - D. Lift chart

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Precision measures the proportion of flagged cases that are truly fraudulent (TP / [TP + FP]). Maximizing precision reduces the number of false positives employees must review, cutting down wasted effort on nonfraudulent cases.

</details>

25. A company designed an AI-powered agent to answer customer inquiries based on product manuals. Which strategy can improve customer confidence levels in the AI-powered agent's responses?
    - A. Writing the confidence level in the response
    - B. Including referenced product manual links in the response
    - C. Designing an agent avatar that looks like a computer
    - D. Training the agent to respond in the company's language style

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Providing direct links to the exact sections of the product manual that support each answer lets customers verify and trust the information, boosting confidence in the AI agent’s responses.

</details>

26. A hospital developed an AI system to provide personalized treatment recommendations for patients. The AI system must provide the rationale behind the recommendations and make the insights accessible to doctors and patients.     Which human-centered design principle does this scenario present?
    - A. Explainability
    - B. Privacy and security
    - C. Fairness
    - D. Data governance

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Explainability ensures that the AI system reveals the reasoning behind its recommendations in an understandable way, making insights transparent and accessible to both doctors and patients.

</details>

27. Which statement presents an advantage of using Retrieval Augmented Generation (RAG) for natural language processing (NLP) tasks?
    - A. RAG can use external knowledge sources to generate more accurate and informative responses.
    - B. RAG is designed to improve the speed of language model training.
    - C. RAG is primarily used for speech recognition tasks.
    - D. RAG is a technique for data augmentation in computer vision tasks.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: By retrieving relevant documents or data at inference time and conditioning the generation on that external knowledge, RAG enriches model outputs with up-to-date, domain-specific information, boosting accuracy and informativeness without retraining the core model.

</details>

28. A company has created a custom model by fine-tuning an existing large language model (LLM) from Amazon Bedrock. The company wants to deploy the model to production and use the model to handle a steady rate of requests each minute. Which solution meets these requirements MOST cost-effectively?
    - A. Deploy the model by using an Amazon EC2 compute optimized instance.
    - B. Use the model with on-demand throughput on Amazon Bedrock.
    - C. Store the model in Amazon S3 and host the model by using AWS Lambda.
    - D. Purchase Provisioned Throughput for the model on Amazon Bedrock.

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Provisioned Throughput is priced lower per request when you have a predictable, steady volume of calls. By committing to a fixed throughput level, you secure the necessary capacity at a reduced unit cost compared to on-demand, making it the most cost-effective choice for steady-minute usage.

</details>

29. Which technique involves training AI models on labeled datasets to adapt the models to specific industry terminology and requirements?
    - A. Data augmentation
    - B. Fine-tuning
    - C. Model quantization
    - D. Continuous pre-training

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Fine-tuning takes a pre-trained model and continues training it on a labeled, domain-specific dataset so the model learns industry terminology and task nuances directly from that specialized data.

</details>

30. A company is creating an agent for its application by using Amazon Bedrock Agents. The agent is performing well, but the company wants to improve the agent’s accuracy by providing some specific examples. Which solution meets these requirements?
    - A. Modify the advanced prompts for the agent to include the examples.
    - B. Create a guardrail for the agent that includes the examples.
    - C. Use Amazon SageMaker Ground Truth to label the examples.
    - D. Run a script in AWS Lambda that adds the examples to the training dataset.

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Embedding specific input–output examples directly into the agent’s advanced prompt (few-shot prompting) guides the model toward more accurate behavior without retraining or additional tooling.

</details>

31. Which option is a benefit of using infrastructure as code (IaC) in machine learning operations (MLOps)?
    - A. IaC eliminates the need for hyperparameter tuning.
    - B. IaC always provisions powerful compute instances, contributing to the training of more accurate models.
    - C. IaC streamlines the deployment of scalable and consistent ML workloads in cloud environments.
    - D. IaC minimizes overall expenses by deploying only low-cost instances.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: By describing infrastructure in code, teams can version, automate, and repeatably provision resources, ensuring that ML training and inference environments are consistent, scalable, and easy to reproduce across development, testing, and production.

</details>

32. A company wants to fine-tune a foundation model (FM) to answer questions for a specific domain. The company wants to use instruction-based fine-tuning. How should the company prepare the training data?
    - A. Gather company internal documents and industry-specific materials. Merge the documents and
    - B. Collect external company reviews from various online sources. Manually label each review as either
    - C. Create pairs of questions and answers that specifically address topics related to the company's industry
    - D. Create few-shot prompts to instruct the model to answer only domain knowledge.

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Instruction-based fine-tuning requires a dataset of instruction–response examples. By curating question– answer pairs focused on the company’s domain, you teach the model exactly how to interpret domainspecific queries and generate the correct responses during inference.

</details>

33. Which ML technique ensures data compliance and privacy when training AI models on AWS?
    - A. Reinforcement learning
    - B. Transfer learning
    - C. Federated learning
    - D. Unsupervised learning

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Federated learning lets you train a global model across multiple data holders (for example, different AWS accounts or edge devices) without moving raw data to a central location. Each participant trains locally on its own private dataset and only shares model updates, preserving data privacy and ensuring compliance.

</details>

34. A manufacturing company has an application that ingests consumer complaints from publicly available sources. The application uses complex hard-coded logic to process the complaints. The company wants to scale this logic across markets and product lines. Which advantage do generative AI models offer for this scenario?
    - A. Predictability of outputs
    - B. Adaptability
    - C. Less sensitivity to changes in inputs
    - D. Explainability

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Generative AI models can generalize learned patterns to new domains and formats with minimal manual reconfiguration. This adaptability lets you extend complaint-processing logic across different markets and product lines without rewriting complex hard-coded rules.

</details>

35. A financial company wants to flag all credit card activity as possibly fraudulent or non-fraudulent based on transaction data. Which type of ML model meets these requirements?
    - A. Regression
    - B. Diffusion
    - C. Binary classification
    - D. Multi-class classification

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Binary classification models are designed to distinguish between two classes - fraudulent versus nonfraudulent transactions - making them the appropriate choice for this use case.

</details>

36. A hospital wants to use a generative AI solution with speech-to-text functionality to help improve employee skills in dictating clinical notes. Which AWS service meets these requirements?
    - A. Amazon Q Developer
    - B. Amazon Polly
    - C. Amazon Rekognition
    - D. AWS HealthScribe

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: AWS HealthScribe is specifically designed for healthcare workflows, providing accurate speech-to-text transcription of clinical conversations and generating structured clinical notes, meeting the hospital’s need to improve employee dictation of clinical documentation.

</details>

37. Which type of AI model makes numeric predictions?
    - A. Diffusion
    - B. Regression
    - C. Transformer
    - D. Multi-modal

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Regression models are designed to predict continuous numerical values (for example, forecasting sales figures or estimating house prices), making them the appropriate choice for numeric predictions.

</details>

38. What is the purpose of vector embeddings in a large language model (LLM)?
    - A. Splitting text into manageable pieces of data
    - B. Grouping a set of characters to be treated as a single unit
    - C. Providing the ability to mathematically compare texts
    - D. Providing the count of every word in the input

<details>
<summary>Answer</summary>

Correct answer: C

Explanation: Embeddings convert text into high-dimensional vectors that capture semantic relationships, allowing you to compute distances or similarities between pieces of text for tasks like retrieval or clustering.

</details>

39. A company wants to fine-tune a foundation model (FM) by using AWS services. The company needs to ensure that its data stays private, safe, and secure in the source AWS Region where the data is stored. Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)
    - A. Host the model on premises by using AWS Outposts.
    - B. Use the Amazon Bedrock API.
    - C. Use AWS PrivateLink and a VPC.
    - D. Host the Amazon Bedrock API on premises.

<details>
<summary>Answer</summary>

Correct answer: BC

Explanation: Use the Amazon Bedrock API: You’ll call Bedrock’s managed fine-tuning endpoints directly in your AWS Region, so your data never leaves that region. Use AWS PrivateLink and a VPC: Front Bedrock API traffic through a VPC endpoint via PrivateLink to keep all network traffic on the AWS backbone and within your account’s private network.

</details>

40. A financial company uses AWS to host its generative AI models. The company must generate reports to show adherence to international regulations for handling sensitive customer data. Which AWS service meets these requirements?
    - A. Amazon Macie
    - B. AWS Artifact
    - C. AWS Secrets Manager
    - D. AWS Config

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: AWS Artifact provides on-demand access to AWS’s compliance reports and certifications (for example, ISO, SOC, GDPR), enabling the company to demonstrate its generative AI workloads and data handling practices adhere to international regulatory requirements.

</details>

41. A medical company wants to modernize its onsite information processing application. The company wants to use generative AI to respond to medical questions from patients.     Which AWS service should the company use to ensure responsible AI for the application?
    - A. Guardrails for Amazon Bedrock
    - B. Amazon Inspector
    - C. Amazon Rekognition
    - D. AWS Trusted Advisor

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Guardrails for Amazon Bedrock let you define and enforce safety, compliance, and bias controls on generative AI workloads. By embedding these guardrails into your application, you can ensure that patientfacing responses meet medical accuracy, privacy, and regulatory requirements without having to build custom monitoring or filtering pipelines yourself.

</details>

42. Which metric is used to evaluate the performance of foundation models (FMs) for text summarization tasks?
    - A. F1 score
    - B. Bilingual Evaluation Understudy (BLEU) score
    - C. Accuracy
    - D. Mean squared error (MSE)

<details>
<summary>Answer</summary>

Correct answer: A

Explanation: Text summarization quality is most commonly assessed using ROUGE metrics, which report recall, precision, and an F1-score that balances the two. The ROUGE-F1 (often simply called the F1 score in this context) measures how well the model’s summary overlaps with reference summaries, making it the standard choice for evaluating foundation models on summarization tasks.

</details>

43. What is the benefit of fine-tuning a foundation model (FM)?
    - A. Fine-tuning reduces the FM's size and complexity and enables slower inference.
    - B. Fine-tuning uses specific training data to retrain the FM from scratch to adapt to a specific use case.
    - C. Fine-tuning keeps the FM's knowledge up to date by pre-training the FM on more recent data.
    - D. Fine-tuning improves the performance of the FM on a specific task by further training the FM on new

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: By updating the model’s weights with task-relevant examples, fine-tuning sharpens its understanding of domain-specific language and objectives, yielding higher accuracy and relevance on that particular task.

</details>

44. A company wants to improve its chatbot's responses to match the company's desired tone. The company has 100 examples of high-quality conversations between customer service agents and customers. The company wants to use this data to incorporate company tone into the chatbot's responses.  Which solution meets these requirements?
    - A. Use Amazon Personalize to generate responses.
    - B. Create an Amazon SageMaker HyperPod pre-training job.
    - C. Host the model by using Amazon SageMaker. Use TensorRT for large language model (LLM)
    - D. Create an Amazon Bedrock fine-tuning job.

<details>
<summary>Answer</summary>

Correct answer: D

Explanation: Bedrock’s fine-tuning lets you adapt a foundation model on your own conversation examples—in this case, the 100 high-quality transcripts to instill your company’s tone directly into the model’s response generation.

</details>

45. An ecommerce company is using a chatbot to automate the customer order submission process. The chatbot is powered by AI and is available to customers directly from the company's website 24 hours a day, 7 days a week. Which option is an AI system input vulnerability that the company needs to resolve before the chatbot is made available?
    - A. Data leakage
    - B. Prompt injection
    - C. Large language model (LLM) hallucinations
    - D. Concept drift

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Prompt injection is an input-level attack where a user crafts malicious input to override or manipulate the chatbot’s instructions or behavior. Addressing this vulnerability by sanitizing and constraining user prompts ensures the chatbot won’t execute unintended or harmful instructions when it goes live.

</details>

46. A social media company wants to prevent users from posting discriminatory content on the company's application. The company wants to use Amazon Bedrock as part of the solution. How can the company use Amazon Bedrock to meet these requirements?
    - A. Give users the ability to interact based on user preferences.
    - B. Block interactions related to predefined topics.
    - C. Restrict user conversations to predefined topics.
    - D. Provide a variety of responses to select from for user engagement.

<details>
<summary>Answer</summary>

Correct answer: B

Explanation: Amazon Bedrock’s built-in content moderation lets you define categories or keywords (e.g., hate speech, discriminatory language) and automatically block or filter any user inputs or outputs that fall under those topics. By configuring Bedrock’s safety filters with your predefined “disallowed” categories, the application will prevent discriminatory content from ever being posted.

</details>

47. Which statements about model latent space are correct? (Choose 2)
    - A. It represents the model's internal understanding of relationships
    - B. It is only used for image processing
    - C. It enables semantic similarities between different inputs
    - D. It requires human supervision to maintain
    - E. It must be stored in a specific database type

<details>
<summary>Answer</summary>


Correct answer: A, C

Explanation:
Model latent space:
- Represents the model's internal understanding and organization of concepts
- Enables computation of semantic similarities between different inputs
- Facilitates transfer learning and generalization
- Supports various types of data representations

**Task Reference**: This concept is referenced in Task Statement 3.2 under concepts of prompt engineering and model architecture.

</details>

48. What are the primary use cases for storing embeddings in a vector database like Amazon OpenSearch Service? (Choose 2)
    - A. Semantic search implementation
    - B. Website content management
    - C. Similarity-based recommendations
    - D. Email routing
    - E. Network traffic analysis

<details>
<summary>Answer</summary>


Correct answer: A, C

Explanation:
Vector databases are essential for:
- Implementing semantic search by finding similar vectors
- Building recommendation systems based on content similarity
- Supporting RAG (Retrieval Augmented Generation)
- Enabling efficient nearest neighbor search at scale

**Task Reference**: This aligns with Task Statement 3.1 regarding vector database applications and RAG implementations.

</details>

49. How does top-p (nucleus) sampling differ from traditional temperature-based sampling?
    - A. It samples from the smallest possible token set
    - B. It selectively samples from tokens that sum to probability p
    - C. It always produces deterministic output
    - D. It only works with specific model architectures

<details>
<summary>Answer</summary>


Correct answer: B

Explanation:
Top-p (nucleus) sampling:
- Dynamically selects tokens based on cumulative probability
- More adaptive than fixed temperature or top-k approaches
- Balances quality and diversity
- Helps prevent unlikely token combinations

**Task Reference**: This relates to Task Statement 3.1 regarding inference parameters and their effects on model outputs.

</details>

50. Which features of Amazon Aurora with pgvector are most important for AI applications? (Choose 2)
    - A. Vector similarity search capabilities
    - B. Traditional SQL operations
    - C. Integration with structured data
    - D. Web hosting features
    - E. Email processing

<details>
<summary>Answer</summary>


Correct answer: A, C

Explanation:
Key features include:
- Vector similarity search for finding related content
- Ability to combine traditional structured data with vector operations
- SQL interface for vector operations
- Scalable vector storage and querying

**Task Reference**: This relates to Task Statement 3.1 regarding storage and querying of embeddings in databases.

</details>

---

## Prerequisites

- [Practice Test 3](practice-test-3.md)

## Recommended Next Topics

- [Practice Test 5](practice-test-5.md)

## Related Topics

- [Practice Tests](tests.md)
- [Practice Test 1](practice-test-1.md)
- [Practice Test 2](practice-test-2.md)
