import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  foundationSidebar: [
    'it-foundation/beginner-roadmap',
    'it-foundation/intro',
    'it-foundation/how-computers-work',
    'it-foundation/linux-fundamentals',
    'it-foundation/networking-fundamentals',
    'it-foundation/programming-fundamentals',
    'it-foundation/databases',
    'it-foundation/web-application-fundamentals',
    'it-foundation/servers-infrastructure',
    'it-foundation/devops-foundations',
    'it-foundation/security-foundations'
  ],

  dvaSidebar: [
    'developer-associate/dva-roadmap',
    {
      type: 'category',
      label: 'Phase 1: AWS Fundamentals',
      collapsed: false,
      items: [
    'developer-associate/aws-fundamentals/iam',
    'developer-associate/aws-fundamentals/security-groups',
    'developer-associate/aws-fundamentals/vpc',
    'developer-associate/aws-fundamentals/ec2',
    'developer-associate/aws-fundamentals/elb',
    'developer-associate/aws-fundamentals/asg',
    'developer-associate/aws-fundamentals/s3',
    'developer-associate/aws-fundamentals/ebs',
    'developer-associate/aws-fundamentals/rds',
    'developer-associate/aws-fundamentals/elasticache',
    'developer-associate/aws-fundamentals/route53'
      ]
    },
    {
      type: 'category',
      label: 'Phase 2: AWS Deep Dive & Deployment',
      collapsed: false,
      items: [
    'developer-associate/aws-deep-dive/cli',
    'developer-associate/aws-deep-dive/sdk',
    'developer-associate/aws-deep-dive/elastic-beanstalk',
    'developer-associate/aws-deep-dive/cloud9',
    'developer-associate/aws-deep-dive/codeartifact',
    'developer-associate/aws-deep-dive/codecatalyst',
    'developer-associate/aws-deep-dive/appconfig',
    'developer-associate/aws-deep-dive/cloudshell',
    'developer-associate/aws-deep-dive/cicd/cicd',
    'developer-associate/aws-deep-dive/cicd/codecommit',
    'developer-associate/aws-deep-dive/cicd/codebuild',
    'developer-associate/aws-deep-dive/cicd/codedeploy',
    'developer-associate/aws-deep-dive/cicd/codepipeline',
    'developer-associate/aws-deep-dive/cloudformation/cloudformation',
    'developer-associate/aws-deep-dive/yaml',
    'developer-associate/aws-deep-dive/integration-and-messaging/intro',
    'developer-associate/aws-deep-dive/integration-and-messaging/sqs',
    'developer-associate/aws-deep-dive/integration-and-messaging/sns',
    'developer-associate/aws-deep-dive/integration-and-messaging/kinesis',
    'developer-associate/aws-deep-dive/monitoring-and-audit/cloudwatch',
    'developer-associate/aws-deep-dive/monitoring-and-audit/cloudwatch-advanced',
    'developer-associate/aws-deep-dive/monitoring-and-audit/cloudtrail',
    'developer-associate/aws-deep-dive/monitoring-and-audit/config',
    'developer-associate/aws-deep-dive/monitoring-and-audit/xray',
    'developer-associate/aws-deep-dive/monitoring-and-audit/xray-advanced',
    'developer-associate/aws-deep-dive/iam-deep-dive/iam-permission-boundaries',
    'developer-associate/aws-deep-dive/iam-deep-dive/iam-policy-evaluation',
    'developer-associate/aws-deep-dive/iam-deep-dive/iam-cross-account-access',
    'developer-associate/aws-deep-dive/iam-deep-dive/iam-abac',
    'developer-associate/aws-deep-dive/iam-deep-dive/iam-access-analyzer',
    'developer-associate/aws-deep-dive/cloudfront',
    'developer-associate/aws-deep-dive/monitoring-and-audit/cloudsomething_difference'
      ]
    },
    {
      type: 'category',
      label: 'Phase 3: AWS Serverless',
      collapsed: false,
      items: [
    'developer-associate/aws-serverless/serverless',
    'developer-associate/aws-serverless/lambda',
    'developer-associate/aws-serverless/lambda-advanced',
    'developer-associate/aws-serverless/apigateway',
    'developer-associate/aws-serverless/api-gateway-advanced',
    'developer-associate/aws-serverless/dynamodb',
    'developer-associate/aws-serverless/dynamodb-advanced',
    'developer-associate/aws-serverless/stepfunctions',
    'developer-associate/aws-serverless/eventbridge-deep-dive',
    'developer-associate/aws-serverless/sam',
    'developer-associate/aws-serverless/cognito',
    'developer-associate/aws-serverless/appsync'
      ]
    },
    {
      type: 'category',
      label: 'Phase 4: Docker & Containerization',
      collapsed: false,
      items: [
    'developer-associate/aws-containers/ecs',
    'developer-associate/aws-containers/ecs-capacity-providers',
    'developer-associate/aws-containers/ecs-autoscaling',
    'developer-associate/aws-containers/eks-fundamentals',
    'developer-associate/aws-containers/ecr',
    'developer-associate/aws-containers/fargate'
      ]
    },
    {
      type: 'category',
      label: 'Phase 5: Security & Encryption',
      collapsed: false,
      items: [
    'developer-associate/others/kms',
    'developer-associate/others/secret-manager',
    'developer-associate/others/cognito',
    'developer-associate/others/jwt-and-authentication',
    'developer-associate/others/sigv4',
    'developer-associate/others/parameter-store-vs-secrets-manager'
      ]
    }
  ],

  dvaPracticeSidebar: [
    'developer-associate/Practice Exams/DVA-C02-Mock-Exam',
    {
      type: 'category',
      label: 'Mock Exam 1 (75 Questions)',
      collapsed: false,
      items: [
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-Part-1',
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-Part-2',
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-Part-3'
      ]
    },
    {
      type: 'category',
      label: 'Mock Exam 2 (75 Questions)',
      collapsed: true,
      items: [
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-2-Part-1',
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-2-Part-2',
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-2-Part-3'
      ]
    },
    {
      type: 'category',
      label: 'Mock Exam 3 (75 Questions - Advanced)',
      collapsed: true,
      items: [
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-3-Part-1',
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-3-Part-2',
        'developer-associate/Practice Exams/DVA-C02-Mock-Exam-3-Part-3'
      ]
    }
  ],

  saaSidebar: [
    'solutions-architect-associate/saa-roadmap',
    {
      type: 'category',
      label: 'Phase 1: AWS Fundamentals & IAM',
      collapsed: false,
      items: [
    'solutions-architect-associate/AWS-Fundamentals/README',
    'solutions-architect-associate/AWS-Fundamentals/FAST-LEARN',
    'solutions-architect-associate/AWS-Fundamentals/ULTRA-FAST-LEARN',
    'solutions-architect-associate/AWS-Fundamentals/DIAGRAMS',
    'solutions-architect-associate/AWS-Fundamentals/PRACTICE-QUESTIONS',
    'solutions-architect-associate/IAM/README',
    'solutions-architect-associate/IAM/FAST-LEARN',
    'solutions-architect-associate/IAM/ULTRA-FAST-LEARN',
    'solutions-architect-associate/IAM/DIAGRAMS',
    'solutions-architect-associate/IAM/PRACTICE-QUESTIONS'
      ]
    },
    {
      type: 'category',
      label: 'Phase 2: Compute & Storage',
      collapsed: true,
      items: [
    'solutions-architect-associate/Compute/README',
    'solutions-architect-associate/Compute/FAST-LEARN',
    'solutions-architect-associate/Compute/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Compute/DIAGRAMS',
    'solutions-architect-associate/Compute/PRACTICE-QUESTIONS',
    'solutions-architect-associate/Storage/README',
    'solutions-architect-associate/Storage/FAST-LEARN',
    'solutions-architect-associate/Storage/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Storage/DIAGRAMS',
    'solutions-architect-associate/Storage/PRACTICE-QUESTIONS'
      ]
    },
    {
      type: 'category',
      label: 'Phase 3: Database & Network Infrastructure',
      collapsed: true,
      items: [
    'solutions-architect-associate/Database/README',
    'solutions-architect-associate/Database/FAST-LEARN',
    'solutions-architect-associate/Database/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Database/DIAGRAMS',
    'solutions-architect-associate/Database/PRACTICE-QUESTIONS',
    'solutions-architect-associate/Networking/README',
    'solutions-architect-associate/Networking/FAST-LEARN',
    'solutions-architect-associate/Networking/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Networking/DIAGRAMS',
    'solutions-architect-associate/Networking/PRACTICE-QUESTIONS'
      ]
    },
    {
      type: 'category',
      label: 'Phase 4: Security, Integration & Monitoring',
      collapsed: true,
      items: [
    'solutions-architect-associate/Security/README',
    'solutions-architect-associate/Security/FAST-LEARN',
    'solutions-architect-associate/Security/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Security/DIAGRAMS',
    'solutions-architect-associate/Security/PRACTICE-QUESTIONS',
    'solutions-architect-associate/Application-Integration/README',
    'solutions-architect-associate/Application-Integration/FAST-LEARN',
    'solutions-architect-associate/Application-Integration/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Application-Integration/DIAGRAMS',
    'solutions-architect-associate/Application-Integration/PRACTICE-QUESTIONS',
    'solutions-architect-associate/Monitoring/README',
    'solutions-architect-associate/Monitoring/FAST-LEARN',
    'solutions-architect-associate/Monitoring/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Monitoring/DIAGRAMS',
    'solutions-architect-associate/Monitoring/PRACTICE-QUESTIONS'
      ]
    },
    {
      type: 'category',
      label: 'Phase 5: Migrations, Analytics & Design Patterns',
      collapsed: true,
      items: [
    'solutions-architect-associate/Migration/README',
    'solutions-architect-associate/Migration/FAST-LEARN',
    'solutions-architect-associate/Migration/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Migration/DIAGRAMS',
    'solutions-architect-associate/Migration/PRACTICE-QUESTIONS',
    'solutions-architect-associate/Analytics/README',
    'solutions-architect-associate/Analytics/FAST-LEARN',
    'solutions-architect-associate/Analytics/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Analytics/DIAGRAMS',
    'solutions-architect-associate/Analytics/PRACTICE-QUESTIONS',
    'solutions-architect-associate/Architecture-Patterns/README',
    'solutions-architect-associate/Architecture-Patterns/FAST-LEARN',
    'solutions-architect-associate/Architecture-Patterns/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Architecture-Patterns/DIAGRAMS',
    'solutions-architect-associate/Architecture-Patterns/PRACTICE-QUESTIONS',
    'solutions-architect-associate/Analytics/AWS-ML-SERVICES-NOTES'
      ]
    },
    {
      type: 'category',
      label: 'Phase 6: Cost Design & Supplementary Guides',
      collapsed: true,
      items: [
    'solutions-architect-associate/Cost-Optimization/README',
    'solutions-architect-associate/Cost-Optimization/FAST-LEARN',
    'solutions-architect-associate/Cost-Optimization/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Cost-Optimization/DIAGRAMS',
    'solutions-architect-associate/Cost-Optimization/PRACTICE-QUESTIONS',
    'solutions-architect-associate/docs/study-guides/ULTRA-FAST-LEARNING-INDEX',
    'solutions-architect-associate/docs/study-guides/FAST-LEARN-GUIDE',
    'solutions-architect-associate/docs/study-guides/QUICK-STUDY-NOTES',
    'solutions-architect-associate/docs/study-guides/FLASHCARDS',
    'solutions-architect-associate/docs/reference/DIAGRAMS-INDEX',
    'solutions-architect-associate/docs/reference/QUICK-REFERENCE',
    'solutions-architect-associate/docs/reference/VISUAL-GUIDE',
    'solutions-architect-associate/docs/reference/QUICK-START',
    'solutions-architect-associate/docs/study-guides/STUDY-ROADMAP',
    'solutions-architect-associate/docs/exam-analysis/EXAM-COVERAGE-ANALYSIS',
    'solutions-architect-associate/docs/exam-analysis/QUICK-REFERENCE-NEW-TOPICS',
    'solutions-architect-associate/docs/exam-analysis/COVERAGE-UPDATE-SUMMARY',
    'solutions-architect-associate/docs/README',
    'solutions-architect-associate/docs/reference/SAA-ARCHITECTURE-PATTERN-MASTER-SHEET',
    'solutions-architect-associate/docs/study-guides/INCORRECT-AREAS-FLASHCARDS',
    'solutions-architect-associate/docs/study-guides/INCORRECT-AREAS-PRACTICE-QUESTIONS',
    'solutions-architect-associate/docs/study-guides/PRACTICE-TEST-4-INCORRECT-STUDY-GUIDE'
      ]
    }
  ],

  saaPracticeSidebar: [
    {
      type: 'category',
      label: 'Phase 7: Exam Practice Reviews',
      collapsed: false,
      items: [
    'solutions-architect-associate/Practice/README',
    'solutions-architect-associate/Practice/FAST-LEARN',
    'solutions-architect-associate/Practice/ULTRA-FAST-LEARN',
    'solutions-architect-associate/Practice/PRACTICE-QUESTIONS',
    'solutions-architect-associate/exam-reviews/README',
    'solutions-architect-associate/exam-reviews/complete-reviews/Practice-Test-1-Review',
    'solutions-architect-associate/exam-reviews/complete-reviews/Practice-Test-2-Review',
    'solutions-architect-associate/exam-reviews/complete-reviews/Practice-Test-3-Review',
    'solutions-architect-associate/exam-reviews/complete-reviews/Practice-Test-4-Review',
    'solutions-architect-associate/exam-reviews/complete-reviews/Practice-Test-5-Review',
    'solutions-architect-associate/exam-reviews/complete-reviews/Practice-Test-6-Review',
    'solutions-architect-associate/exam-reviews/complete-reviews/Practice-Test-7-Review',
    'solutions-architect-associate/exam-reviews/REINFORCEMENT-QUESTIONS-ALL-TESTS',
    'solutions-architect-associate/Practice/FLASHCARDS',
    'solutions-architect-associate/Practice/SERVICE-QUESTION-MAPPING',
    'solutions-architect-associate/Practice/STUDY-NOTES',
    'solutions-architect-associate/Practice/TEST-RESULTS-TRACKER',
    'solutions-architect-associate/exam-reviews/attempt/SAA_C03_PRACTICE_TEST_5_ATTEMPT_2_REVIEW',
    'solutions-architect-associate/exam-reviews/attempt/SAA_C03_PRACTICE_TEST_5_QUICK_STUDY_GUIDE',
    'solutions-architect-associate/exam-reviews/condensed-reviews/Practice-Test-1-Review-Condensed',
    'solutions-architect-associate/exam-reviews/condensed-reviews/Practice-Test-2-Review-Condensed',
    'solutions-architect-associate/exam-reviews/condensed-reviews/Practice-Test-3-Review-Condensed',
    'solutions-architect-associate/exam-reviews/condensed-reviews/Practice-Test-4-Review-Condensed',
    'solutions-architect-associate/exam-reviews/condensed-reviews/Practice-Test-5-Review-Condensed',
    'solutions-architect-associate/exam-reviews/condensed-reviews/Practice-Test-6-Review-Condensed',
    'solutions-architect-associate/exam-reviews/condensed-reviews/Practice-Test-7-Review-Condensed',
    'solutions-architect-associate/exam-reviews/master-guides/ALL-TESTS-MASTER-QUICK-REFERENCE',
    'solutions-architect-associate/exam-reviews/master-guides/COMPLETE-EXAM-REVIEW',
    'solutions-architect-associate/exam-reviews/navigation/CATEGORIZATION-INDEX',
    'solutions-architect-associate/exam-reviews/navigation/CATEGORY-QUICK-REFERENCE',
    'solutions-architect-associate/exam-reviews/navigation/CONDENSED-REVIEWS-README',
    'solutions-architect-associate/exam-reviews/navigation/DOCUMENT-SELECTION-MATRIX',
    'solutions-architect-associate/exam-reviews/navigation/FOLDER-STRUCTURE',
    'solutions-architect-associate/exam-reviews/navigation/NEW-FOLDER-STRUCTURE',
    'solutions-architect-associate/exam-reviews/navigation/POCKET-GUIDE',
    'solutions-architect-associate/exam-reviews/navigation/QUICK-ACCESS-INDEX',
    'solutions-architect-associate/exam-reviews/navigation/QUICK-NAVIGATION',
    'solutions-architect-associate/exam-reviews/navigation/VISUAL-SUMMARY',
    'solutions-architect-associate/exam-reviews/quick-reference/PERCENT-COVERAGE-SUMMARY',
    'solutions-architect-associate/exam-reviews/quick-reference/MEMORY-CARDS',
    'solutions-architect-associate/exam-reviews/quick-reference/ULTRA-QUICK-REFERENCE-CARD',
    'solutions-architect-associate/exam-reviews/quick-reference/ULTRA-SHORT-EXAM-DAY',
    'solutions-architect-associate/exam-reviews/START-HERE',
    'solutions-architect-associate/exam-reviews/STUDY-PROGRESS-TRACKER'
      ]
    }
  ],

  tutorialSidebar: [
    'solutions-architect-professional/sap-roadmap',
    'solutions-architect-professional/well-architected-framework',
    {
      type: 'category',
      label: 'Phase 1: High-Scale Compute & Storage',
      collapsed: false,
      items: [
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/AWS Outposts',
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/AWS Wavelength',
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/EC2/Amazon EC2',
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/EC2/Amazon EC2 - Auto Scaling',
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/EC2/Amazon EC2 - Fleets',
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/EC2/Amazon EC2 - Monitoring',
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/EC2/Amazon EC2 - Networking',
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/EC2/Amazon EC2 - Security',
    'solutions-architect-professional/Compute/Virtual Machines & Infrastructure/EC2 Image Builder',
    'solutions-architect-professional/Compute/placement-groups',
    'solutions-architect-professional/Compute/dedicated-hosts',
    'solutions-architect-professional/Compute/capacity-reservations',
    'solutions-architect-professional/Compute/spot-fleet',
    'solutions-architect-professional/Compute/launch-templates',
    'solutions-architect-professional/Compute/warm-pools',
    'solutions-architect-professional/Compute/Serverless & Managed Compute/AWS Lambda',
    'solutions-architect-professional/Compute/Serverless & Managed Compute/AWS Elastic Beanstalk',
    'solutions-architect-professional/Compute/Serverless & Managed Compute/AWS App Runner',
    'solutions-architect-professional/Compute/Scaling & Batch Processing/AWS Auto Scaling',
    'solutions-architect-professional/Compute/Scaling & Batch Processing/AWS Batch',
    'solutions-architect-professional/Compute/Simplified Compute/Amazon Lightsail',
    'solutions-architect-professional/Storage/Object, Block, & File Storage/Amazon S3',
    'solutions-architect-professional/Storage/Object, Block, & File Storage/Amazon Elastic Block Storage',
    'solutions-architect-professional/Storage/Object, Block, & File Storage/Amazon Elastic File System',
    'solutions-architect-professional/Storage/efs-performance-modes',
    'solutions-architect-professional/Storage/Object, Block, & File Storage/Amazon FSx',
    'solutions-architect-professional/Storage/fsx-windows',
    'solutions-architect-professional/Storage/fsx-lustre',
    'solutions-architect-professional/Storage/fsx-ontap',
    'solutions-architect-professional/Storage/fsx-openzfs',
    'solutions-architect-professional/Compute/local-zones'
      ]
    },
    {
      type: 'category',
      label: 'Phase 2: Hybrid & Global Networking',
      collapsed: true,
      items: [
    'solutions-architect-professional/Networking & Content Delivery/Virtual Networking & Connectivity/Amazon VPC',
    'solutions-architect-professional/Networking & Content Delivery/Virtual Networking & Connectivity/AWS Direct Connect',
    'solutions-architect-professional/Networking & Content Delivery/Virtual Networking & Connectivity/AWS Local Zones',
    'solutions-architect-professional/Networking & Content Delivery/Virtual Networking & Connectivity/AWS Transit Gateway',
    'solutions-architect-professional/Networking & Content Delivery/Virtual Networking & Connectivity/AWS VPN',
    'solutions-architect-professional/Networking & Content Delivery/CDN & DNS/Amazon CloudFront',
    'solutions-architect-professional/Networking & Content Delivery/CDN & DNS/AWS Route 53',
    'solutions-architect-professional/Networking & Content Delivery/CDN & DNS/Global Traffic Management',
    'solutions-architect-professional/Networking & Content Delivery/route53-resolver',
    'solutions-architect-professional/Networking & Content Delivery/Hybrid Connectivity/AWS PrivateLink',
    'solutions-architect-professional/Networking & Content Delivery/Hybrid Connectivity/Hybrid Connectivity & RAM',
    'solutions-architect-professional/Networking & Content Delivery/Traffic Management/AWS Elastic Load Balancing',
    'solutions-architect-professional/Networking & Content Delivery/Traffic Management/AWS VPC Lattice',
    'solutions-architect-professional/Networking & Content Delivery/gateway-load-balancer',
    'solutions-architect-professional/Networking & Content Delivery/cloud-wan',
    'solutions-architect-professional/Networking & Content Delivery/transit-gateway-route-tables',
    'solutions-architect-professional/Networking & Content Delivery/transit-gateway-appliance-mode',
    'solutions-architect-professional/Networking & Content Delivery/ipv6-architectures',
    'solutions-architect-professional/Networking & Content Delivery/vpc-lattice'
      ]
    },
    {
      type: 'category',
      label: 'Phase 3: Multi-Account Governance, Security & Compliance',
      collapsed: true,
      items: [
    'solutions-architect-professional/Security, Identity & Compliance/Identity & Access Management/Amazon Cognito',
    'solutions-architect-professional/Security, Identity & Compliance/Identity & Access Management/AWS Directory Services',
    'solutions-architect-professional/Security, Identity & Compliance/Identity & Access Management/AWS IAM Identity Center',
    'solutions-architect-professional/Security, Identity & Compliance/Identity & Access Management/AWS Identity and Access Management',
    'solutions-architect-professional/Security, Identity & Compliance/Identity & Access Management/Amazon Verified Permissions',
    'solutions-architect-professional/Security, Identity & Compliance/Identity & Access Management/AWS Verified Access',
    'solutions-architect-professional/Security, Identity & Compliance/active-directory-integration',
    'solutions-architect-professional/Security, Identity & Compliance/Data Protection & Encryption/AWS Certificate Manager',
    'solutions-architect-professional/Security, Identity & Compliance/Data Protection & Encryption/AWS CloudHSM',
    'solutions-architect-professional/Security, Identity & Compliance/Data Protection & Encryption/AWS Key Management Service',
    'solutions-architect-professional/Security, Identity & Compliance/Data Protection & Encryption/AWS Secrets Manager',
    'solutions-architect-professional/Security, Identity & Compliance/Data Protection & Encryption/AWS Macie',
    'solutions-architect-professional/Security, Identity & Compliance/macie',
    'solutions-architect-professional/Security, Identity & Compliance/Network Security/AWS Firewall Manager',
    'solutions-architect-professional/Security, Identity & Compliance/Network Security/AWS Network Firewall',
    'solutions-architect-professional/Security, Identity & Compliance/Network Security/AWS Shield',
    'solutions-architect-professional/Security, Identity & Compliance/Network Security/AWS WAF',
    'solutions-architect-professional/Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon GuardDuty',
    'solutions-architect-professional/Security, Identity & Compliance/Security Monitoring & Threat Detection/AWS Security Hub',
    'solutions-architect-professional/Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Detective',
    'solutions-architect-professional/Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Inspector',
    'solutions-architect-professional/Security, Identity & Compliance/shield-advanced',
    'solutions-architect-professional/Management & Governance/Governance & Compliance/AWS Organizations',
    'solutions-architect-professional/Management & Governance/Governance & Compliance/AWS Control Tower',
    'solutions-architect-professional/Management & Governance/account-factory',
    'solutions-architect-professional/Security, Identity & Compliance/Compliance & Governance/AWS Resource Access Manager',
    'solutions-architect-professional/Management & Governance/Governance & Compliance/AWS Config',
    'solutions-architect-professional/Management & Governance/config-aggregators',
    'solutions-architect-professional/Management & Governance/Governance & Compliance/AWS Service Catalog',
    'solutions-architect-professional/Management & Governance/Governance & Compliance/AWS Service Quotas',
    'solutions-architect-professional/Management & Governance/Governance & Compliance/AWS Well-Architected Tool',
    'solutions-architect-professional/Security, Identity & Compliance/Compliance & Governance/AWS Artifact',
    'solutions-architect-professional/Security, Identity & Compliance/Compliance & Governance/AWS Audit Manager',
    'solutions-architect-professional/Management & Governance/Monitoring & Observability/Amazon CloudWatch',
    'solutions-architect-professional/Management & Governance/Monitoring & Observability/AWS CloudTrail',
    'solutions-architect-professional/Management & Governance/Monitoring & Observability/AWS Personal Health Dashboard',
    'solutions-architect-professional/Management & Governance/Infrastructure Automation/AWS CloudFormation',
    'solutions-architect-professional/Management & Governance/Infrastructure Automation/AWS Cloud Development Kit',
    'solutions-architect-professional/Management & Governance/Operations & Optimization/AWS Compute Optimizer',
    'solutions-architect-professional/Management & Governance/Operations & Optimization/AWS Systems Manager',
    'solutions-architect-professional/Management & Governance/Operations & Optimization/AWS Trusted Advisor',
    'solutions-architect-professional/Management & Governance/Cost Management/Cost Optimization Tools',
    'solutions-architect-professional/Security, Identity & Compliance/waf'
      ]
    },
    {
      type: 'category',
      label: 'Phase 4: Database Scaling & Migration',
      collapsed: true,
      items: [
    'solutions-architect-professional/Database/Relational & Data Warehouse/Amazon Aurora',
    'solutions-architect-professional/Database/aurora-serverless',
    'solutions-architect-professional/Database/aurora-cloning',
    'solutions-architect-professional/Database/aurora-backtracking',
    'solutions-architect-professional/Database/Relational & Data Warehouse/Amazon RDS',
    'solutions-architect-professional/Database/rds-proxy',
    'solutions-architect-professional/Database/Relational & Data Warehouse/Amazon Redshift',
    'solutions-architect-professional/Database/NoSQL Databases/Amazon DocumentDB',
    'solutions-architect-professional/Database/NoSQL Databases/Amazon DynamoDB',
    'solutions-architect-professional/Database/dax',
    'solutions-architect-professional/Database/NoSQL Databases/Amazon Keyspaces',
    'solutions-architect-professional/Database/Specialized & In-Memory/Amazon ElastiCache',
    'solutions-architect-professional/Database/Specialized & In-Memory/Amazon Neptune',
    'solutions-architect-professional/Database/Specialized & In-Memory/Amazon Timestream',
    'solutions-architect-professional/Database/memorydb',
    'solutions-architect-professional/Application Integration/API & Workflow Integration/AWS AppSync',
    'solutions-architect-professional/Application Integration/API & Workflow Integration/AWS Step Functions',
    'solutions-architect-professional/Application Integration/Messaging & Eventing/Amazon EventBridge',
    'solutions-architect-professional/Application Integration/Messaging & Eventing/Amazon MQ',
    'solutions-architect-professional/Application Integration/amazon-msk',
    'solutions-architect-professional/Application Integration/appflow',
    'solutions-architect-professional/Application Integration/Messaging & Eventing/Amazon SNS',
    'solutions-architect-professional/Application Integration/Messaging & Eventing/Amazon SQS',
    'solutions-architect-professional/Cloud Financial Management/Cost Allocation & Savings/AWS Cost Allocation Tags',
    'solutions-architect-professional/Cloud Financial Management/Cost Allocation & Savings/Savings Plans',
    'solutions-architect-professional/Cloud Financial Management/cost-and-usage-reports',
    'solutions-architect-professional/Cloud Financial Management/savings-plans-modeling',
    'solutions-architect-professional/Cloud Financial Management/reserved-instance-strategy',
    'solutions-architect-professional/Cloud Financial Management/chargeback-showback',
    'solutions-architect-professional/Cloud Financial Management/Cost Monitoring & Budgeting/AWS Budgets',
    'solutions-architect-professional/Cloud Financial Management/Cost Monitoring & Budgeting/AWS Cost Explorer',
    'solutions-architect-professional/Containers/Container Orchestration/Amazon ECS',
    'solutions-architect-professional/Containers/Container Orchestration/Amazon EKS',
    'solutions-architect-professional/Containers/eks-architecture',
    'solutions-architect-professional/Containers/eks-networking',
    'solutions-architect-professional/Containers/eks-security',
    'solutions-architect-professional/Containers/app-mesh',
    'solutions-architect-professional/Containers/ingress-controllers',
    'solutions-architect-professional/Containers/Container Registry/Amazon ECR',
    'solutions-architect-professional/Developer Tools/CICD & Code Quality/Amazon CodeGuru',
    'solutions-architect-professional/Developer Tools/CICD & Code Quality/AWS CodeBuild, AWS CodeDeploy, AWS CodePipeline, AWS CodeArtifact',
    'solutions-architect-professional/Developer Tools/Observability & Testing/AWS Fault Injection Simulator',
    'solutions-architect-professional/Developer Tools/Observability & Testing/AWS X-Ray',
    'solutions-architect-professional/Frontend Web & Mobile/API Management/Amazon API Gateway',
    'solutions-architect-professional/Frontend Web & Mobile/Development Platforms/AWS Amplify',
    'solutions-architect-professional/Frontend Web & Mobile/Development Platforms/AWS Device Farm',
    'solutions-architect-professional/Frontend Web & Mobile/User Engagement/Amazon Pinpoint',
    'solutions-architect-professional/End User Computing/Amazon AppStream 2.0',
    'solutions-architect-professional/End User Computing/Amazon WorkSpaces',
    'solutions-architect-professional/Migration & Transfer/Migration Tools/AWS Application Discovery Service',
    'solutions-architect-professional/Migration & Transfer/Migration Tools/AWS Application Migration Service',
    'solutions-architect-professional/Migration & Transfer/Migration Tools/AWS Database Migration Service',
    'solutions-architect-professional/Migration & Transfer/Migration Tools/AWS DataSync',
    'solutions-architect-professional/Migration & Transfer/Migration Tools/AWS Migration Evaluator',
    'solutions-architect-professional/Migration & Transfer/Migration Tools/AWS Migration Hub',
    'solutions-architect-professional/Migration & Transfer/Migration Tools/Migration Strategies',
    'solutions-architect-professional/Migration & Transfer/Physical & Offline Migration/AWS Snow Family',
    'solutions-architect-professional/Cloud Financial Management/cost-allocation-tags'
      ]
    },
    {
      type: 'category',
      label: 'Phase 5: Business Continuity & Disaster Recovery',
      collapsed: true,
      items: [
    'solutions-architect-professional/Storage/Backup & Disaster Recovery/Disaster Recovery Strategies',
    'solutions-architect-professional/Storage/Backup & Disaster Recovery/AWS Elastic Disaster Recovery',
    'solutions-architect-professional/Storage/Backup & Disaster Recovery/AWS Backup',
    'solutions-architect-professional/Analytics/Data Integration & Management/AWS Data Exchange',
    'solutions-architect-professional/Analytics/Data Integration & Management/AWS Glue',
    'solutions-architect-professional/Analytics/Data Integration & Management/AWS Lake Formation',
    'solutions-architect-professional/Analytics/Interactive Query & Batch Processing/Amazon Athena',
    'solutions-architect-professional/Analytics/Interactive Query & Batch Processing/Amazon EMR',
    'solutions-architect-professional/Analytics/Streaming Data & Real-Time Analytics/Amazon Data Firehose',
    'solutions-architect-professional/Analytics/Streaming Data & Real-Time Analytics/Amazon Kinesis Data Streams',
    'solutions-architect-professional/Analytics/Streaming Data & Real-Time Analytics/Amazon Managed Service for Apache Flink',
    'solutions-architect-professional/Analytics/Streaming Data & Real-Time Analytics/Amazon Managed Streaming for Apache Kafka',
    'solutions-architect-professional/Analytics/opensearch',
    'solutions-architect-professional/Analytics/Visualization & Search/Amazon OpenSearch Serverless',
    'solutions-architect-professional/Analytics/Visualization & Search/Amazon QuickSight',
    'solutions-architect-professional/Machine Learning/Generative AI/Amazon Bedrock',
    'solutions-architect-professional/Machine Learning/Generative AI/Amazon Q',
    'solutions-architect-professional/Machine Learning/Computer Vision & Document Processing/Amazon Rekognition',
    'solutions-architect-professional/Machine Learning/Computer Vision & Document Processing/Amazon Textract',
    'solutions-architect-professional/Machine Learning/ML Platform/Amazon SageMaker',
    'solutions-architect-professional/Machine Learning/Natural Language & Speech/Amazon Comprehend',
    'solutions-architect-professional/Machine Learning/Natural Language & Speech/Amazon Lex',
    'solutions-architect-professional/Machine Learning/Natural Language & Speech/Amazon Transcribe',
    'solutions-architect-professional/Machine Learning/Natural Language & Speech/Amazon Translate',
    'solutions-architect-professional/Machine Learning/Search & Personalization/Amazon Kendra',
    'solutions-architect-professional/Machine Learning/Search & Personalization/Amazon Personalize',
    'solutions-architect-professional/Machine Learning/Speech Synthesis/Amazon Polly',
    'solutions-architect-professional/Business Applications/Contact Center & Email/Amazon Connect',
    'solutions-architect-professional/Business Applications/Contact Center & Email/Amazon SES',
    'solutions-architect-professional/Business Applications/Voice & Collaboration/AWS Alexa for Business',
    'solutions-architect-professional/Internet of Things/AWS IoT Services',
    'solutions-architect-professional/Media Services/Amazon Kinesis Video Streams',
    'solutions-architect-professional/Blockchain/Amazon Managed Blockchain',
    'solutions-architect-professional/Analytics/Visualization & Search/Amazon OpenSearch',
    'solutions-architect-professional/Storage/Backup & Disaster Recovery/AWS Storage Gateway'
      ]
    },
    {
      type: 'category',
      label: 'Phase 6: Decision Matrices & Guided Workshops',
      collapsed: true,
      items: [
    'architecture-decision-frameworks/alb-vs-nlb-vs-gwlb',
    'architecture-workshops/enterprise-landing-zone',
    'architecture-workshops/hybrid-enterprise-network',
    'architecture-workshops/multi-region-dr'
      ]
    }
  ],

  practiceSidebar: [
    'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam',
    {
      type: 'category',
      label: 'Mock Exam 1 (75 Questions)',
      collapsed: false,
      items: [
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam - Part 1',
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam - Part 2',
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam - Part 3'
      ]
    },
    {
      type: 'category',
      label: 'Mock Exam 2 (75 Questions)',
      collapsed: true,
      items: [
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam 2 - Part 1',
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam 2 - Part 2',
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam 2 - Part 3'
      ]
    },
    {
      type: 'category',
      label: 'Mock Exam 3 (75 Questions - Advanced)',
      collapsed: true,
      items: [
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam 3 - Part 1',
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam 3 - Part 2',
        'solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam 3 - Part 3'
      ]
    }
  ],

  matricesSidebar: [
    'architecture-decision-frameworks/alb-vs-nlb-vs-gwlb',
    'architecture-decision-frameworks/aurora-vs-rds',
    'architecture-decision-frameworks/cloudfront-vs-global-accelerator',
    'architecture-decision-frameworks/dms-vs-mgn',
    'architecture-decision-frameworks/ecs-vs-eks',
    'architecture-decision-frameworks/efs-vs-fsx',
    'architecture-decision-frameworks/sns-vs-eventbridge',
    'architecture-decision-frameworks/sqs-vs-mq',
    'architecture-decision-frameworks/transit-gateway-vs-cloud-wan'
  ],

  workshopsSidebar: [
    'architecture-workshops/enterprise-landing-zone',
    'architecture-workshops/hybrid-enterprise-network',
    'architecture-workshops/multi-region-dr',
    'architecture-workshops/global-saas-platform',
    'architecture-workshops/iot-platform',
    'architecture-workshops/media-streaming-platform'
  ],

  strategySidebar: [
    'exam-strategy/intro'
  ]
};

export default sidebars;
