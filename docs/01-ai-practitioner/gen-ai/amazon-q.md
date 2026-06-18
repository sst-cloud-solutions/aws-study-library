# Amazon Q

- [Amazon Q](#amazon-q)
  - [Amazon Q Business](#amazon-q-business)
    - [Key Capabilities](#key-capabilities)
    - [Data Connectors (Fully Managed)](#data-connectors-fully-managed)
    - [Plugins](#plugins)
    - [User Access and Authentication](#user-access-and-authentication)
    - [Admin Controls](#admin-controls)
    - [Security \& Data Privacy](#security--data-privacy)
  - [Amazon Q Apps](#amazon-q-apps)
  - [Amazon Q Developer](#amazon-q-developer)
    - [1. AWS Account Interaction](#1-aws-account-interaction)
    - [2. AI Code Companion for AWS-based development](#2-ai-code-companion-for-aws-based-development)

## Amazon Q Business

- Fully managed Gen-AI assistant designed specifically for employees
- Based entirely on company's knowledge and data
- Provide company-specific assistance that general foundation models cannot provide
- Amazon Bedrock (but users have less control over underlying models; uses multiple foundation models)
- Higher-level service focused on exposing internal data from Gen-AI perspective

### Key Capabilities

- **Answer questions**: Retrieve information from internal documents with source
- **Provide summaries**: Extract and summarize information from company data
- **Generate content**: Create job postings, social media posts, reports, etc. based on company data
- **Automate tasks**: Perform routine actions automatically
  - Example: Submit time-off requests, send meeting invites, create tickets
- **Document retrieval**: Similar to Retrieval-Augmented Generation (RAG); looks up documents and displays sources

### Data Connectors (Fully Managed)

- **Support** 40+ popular enterprise data sources
- **AWS Services**:
  - Amazon S3, Amazon RDS, Amazon Aurora
  - WorkDocs (document management)
- **Non-AWS Services**:
  - Microsoft 365, Salesforce, Google Drive, Gmail, Slack, SharePoint, etc.
- Automatically crawls sources to enable searching and querying without requiring individual configuration

### Plugins

- Enable interaction with third-party services beyond data retrieval
- **Pre-built Plugins** like Jira, ServiceNow, Zendesk, Salesforce
- Create custom plugins to connect to any third-party application using APIs
- **Example Use Case**: "Create a Jira issue" → Plugin automatically creates the ticket

### User Access and Authentication

- IAM Identity Center manages user access
- Sign-in interface with username and password
- IAM Identity Center ensures users can only access documents they're authorized to view
- **External Identity Providers**: Can integrate with:
  - Google Login
  - Microsoft Active Directory
  - Existing company credential systems
- Seamless, secure authentication aligned with company security infrastructure

### Admin Controls

- Customize responses based on organizational needs
- **Equivalent To** Bedrock Guardrails functionality
- **Capabilities**:
  - **Block specific topics or words**: Restrict queries on certain subjects (e.g., gaming consoles)
  - **Data source configuration**: Respond with only internal information or include external foundation model knowledge
  - **Topic-level or global controls**: Apply restrictions at specific topic level or across all topics
  - **Flexible management**: More control over content and responses

### Security & Data Privacy

- **Document-level access control**: Users only see responses from documents they have permission to access
- **No unauthorized access**: IAM Identity Center prevents unauthorized viewing of sensitive information
- **Admin oversight**: Admin controls ensure organizational policies are maintained

## Amazon Q Apps

- Create Gen-AI powered applications without coding, using only natural language
- Enable anyone in the company to build applications based on company data
- App development for non-technical users
- **Leverages** Company's internal data and plugins (e.g., Jira, Salesforce)
- Use Cases
  - Employee HR applications (time-off requests, benefits lookup)
  - Customer service tools (FAQ, document search, issue creation)
  - Business process automation (document processing, ticket creation)
  - Data analysis and reporting tools
  - Internal knowledge retrieval applications

## Amazon Q Developer

- Specialized AI assistant for AWS development and AWS account management
- **Two Main Functionalities**:
  1. AWS Account Interaction and Documentation Assistance
  2. AI Code Companion for AWS-based development

### 1. AWS Account Interaction

- Query AWS Resources
  - Ask about resources in AWS accounts
  - **Example**: "List all my Lambda functions" → Provides names, count, and region information
- CLI Command Generation
  - Suggest appropriate CLI commands for AWS operations
  - **Example**: "Change the timeout of a Lambda function named Test API1 in the Singapore region to 10 seconds"
  - Benefit: Eliminates need to memorize exact command syntax; generates correct, executable commands
- Cost Analysis & Troubleshooting
  - Analyze AWS spending patterns and cost drivers
  - **Example**: "What were the top three highest cost services in Q1 from my accounts?"
  - **Error Resolution**: Troubleshoot AWS errors and identify solutions

### 2. AI Code Companion for AWS-based development

- Specialized for building on AWS (like GitHub Copilot but AWS-specific)
- Supports many languages: Java, JavaScript, Python, TypeScript, C#, etc.
- It can give us real-time code suggestions and security scans
- It provides also a software agent to implement features, generate documentation and bootstrap new projects
- Works with several IDEs, such as VSCode, JetBrain suite, Visual Studio
- Beside all of this it can do the following:
  - Answer questions about AWS development
  - Do code completion and code generation
  - Scan code four vulnerabilities
  - Debugging, optimizations and improvements

---

## Prerequisites

- [Prompt Engineering](prompt-engineering.md)

## Recommended Next Topics

- [Introduction of AWS Managed AI Services](../aws-managed-ai-services/introduction-of-aws-managed-ai-services.md)

## Related Topics

- [GenAI Introduction](genai-introduction.md)
- [Amazon Bedrock](amazon-bedrock.md)
- [Prompt Engineering](prompt-engineering.md)
