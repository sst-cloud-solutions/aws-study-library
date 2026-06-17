const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');

const rootCategories = {
  '00-it-foundation': { label: '00 / IT Foundation', position: 1, desc: 'Core foundational concepts in IT, systems, networks, and databases for cloud engineering.' },
  '01-developer-associate': { label: '01 / Developer Associate', position: 2, desc: 'Preparation material and deep dives for the AWS Certified Developer - Associate (DVA-C02) exam.' },
  '01-solutions-architect-associate': { label: '01 / Solutions Architect Associate', position: 3, desc: 'Preparation material and deep dives for the AWS Certified Solutions Architect - Associate (SAA-C03) exam.' },
  '02-solutions-architect-professional': { label: '02 / Solutions Architect Professional', position: 4, desc: 'Advanced architecture patterns, security compliance, and migration strategies for the AWS Certified Solutions Architect - Professional (SAP-C02) exam.' },
  '03-architecture-decision-frameworks': { label: '03 / Decision Frameworks', position: 5, desc: 'Comparative analysis matrices to guide critical architecture decisions on AWS.' },
  '04-architecture-workshops': { label: '04 / Workshops', position: 6, desc: 'Hands-on guided architecture workshops and deployment walkthroughs for enterprise scenarios.' },
  '05-exam-strategy': { label: '05 / Exam Strategy', position: 7, desc: 'Strategic frameworks and proven strategies to decompose and tackle the SAP-C02 exam questions.' }
};

const sapCategories = {
  'Compute': 1,
  'Containers': 2,
  'Database': 3,
  'Storage': 4,
  'Networking & Content Delivery': 5,
  'Security, Identity & Compliance': 6,
  'Management & Governance': 7,
  'Cloud Financial Management': 8,
  'Application Integration': 9,
  'Developer Tools': 10,
  'Analytics': 11,
  'Machine Learning': 12,
  'Migration & Transfer': 13,
  'Business Applications': 14,
  'End User Computing': 15,
  'Frontend Web & Mobile': 16,
  'Internet of Things': 17,
  'Media Services': 18,
  'Blockchain': 19,
  'Practice Exams': 20
};

// Generates a human-friendly description from category label
function getCategoryDescription(label) {
  if (label.includes('IT Foundation')) return rootCategories['00-it-foundation'].desc;
  if (label.includes('Developer Associate')) return rootCategories['01-developer-associate'].desc;
  if (label.includes('Solutions Architect Associate')) return rootCategories['01-solutions-architect-associate'].desc;
  if (label.includes('Solutions Architect Professional')) return rootCategories['02-solutions-architect-professional'].desc;
  if (label.includes('Decision Frameworks')) return rootCategories['03-architecture-decision-frameworks'].desc;
  if (label.includes('Workshops')) return rootCategories['04-architecture-workshops'].desc;
  if (label.includes('Exam Strategy')) return rootCategories['05-exam-strategy'].desc;

  if (label === 'Compute') return 'Deep dive into AWS compute options including EC2, Spot, Capacity Reservations, and serverless compute scaling.';
  if (label === 'Containers') return 'Enterprise container orchestration, microservices deployment, and container registries using ECS, EKS, and ECR.';
  if (label === 'Database') return 'Evaluating relational, NoSQL, in-memory, and specialized purpose-built databases on AWS.';
  if (label === 'Storage') return 'Comprehensive analysis of AWS object, block, file, and backup storage solutions.';
  if (label === 'Networking & Content Delivery') return 'Designing secure, high-performance, and hybrid enterprise networking topologies on AWS.';
  if (label === 'Security, Identity & Compliance') return 'AWS identity management, encryption, key management, compliance frameworks, threat detection, and incident response.';
  if (label === 'Management & Governance') return 'Multi-account management, compliance standards, policy enforcement, observability, and audit tooling.';
  if (label === 'Cloud Financial Management') return 'AWS cloud economics, cost monitoring, cost allocation, budgeting, showback models, and savings optimizations.';
  if (label === 'Application Integration') return 'Orchestrating microservices, queue messaging, pub/sub notification, and workflow APIs on AWS.';
  if (label === 'Developer Tools') return 'Setting up secure continuous integration, pipelines, artifact storage, and observability solutions.';
  if (label === 'Analytics') return 'Data ingestion, pipelines, interactive querying, real-time analytics, data lakes, and visualization dashboards.';
  if (label === 'Machine Learning') return 'Harnessing AWS machine learning platforms, computer vision, natural language processing, and Generative AI service integrations.';
  if (label === 'Migration & Transfer') return 'Formulating AWS migration strategies, physical offline transfers, and hybrid migration tools.';
  
  return `Comprehensive guides, architecture blueprints, and exam preparation resources for AWS ${label} services.`;
}

function processDirectory(dir, depth = 0) {
  const dirname = path.basename(dir);
  if (dirname === '_assets' || dirname === 'node_modules' || dirname === '.docusaurus' || dirname === '.git') return;

  const files = fs.readdirSync(dir);
  const hasSubdirs = files.some(file => fs.statSync(path.join(dir, file)).isDirectory());
  const hasMdFiles = files.some(file => file.endsWith('.md'));

  // If this is a directory with markdown files or subdirectories, we create _category_.json
  if (depth > 0 && (hasMdFiles || hasSubdirs)) {
    let label = dirname;
    let position = 50; // Default fallback position

    // If it is a root directory
    if (depth === 1 && rootCategories[dirname]) {
      label = rootCategories[dirname].label;
      position = rootCategories[dirname].position;
    } else if (depth === 2 && path.basename(path.dirname(dir)) === '02-solutions-architect-professional') {
      // If it is a first-level category inside Solutions Architect Professional
      if (sapCategories[dirname] !== undefined) {
        label = dirname;
        position = sapCategories[dirname];
      }
    } else {
      // General heuristics for subfolders
      // Strip starting digit prefixes like "1-" or "2-" and use for position
      const numMatch = dirname.match(/^(\d+)-(.*)$/);
      if (numMatch) {
        position = parseInt(numMatch[1], 10);
        label = numMatch[2].replace(/-/g, ' ');
      } else {
        label = dirname.replace(/-/g, ' ');
      }

      // Title-case formatting
      label = label.split(' ').map(word => {
        // Keep acronyms uppercase
        if (['aws', 'iam', 'vpc', 'dns', 'cdn', 'ecs', 'eks', 'ecr', 'nosql', 'db', 'jwt', 'ml', 'iot', 'mq', 's3', 'kms', 'sts', 'cur', 'ri', 'asg', 'elb', 'dva', 'sap'].includes(word.toLowerCase())) {
          return word.toUpperCase();
        }
        if (word.toLowerCase() === 'and') return 'and';
        if (word.toLowerCase() === 'or') return 'or';
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    }

    // Replace "&" in folder name formatting or ensure spacing
    label = label.replace(/\s*&\s*/g, ' & ');

    const catJsonPath = path.join(dir, '_category_.json');
    const catData = {
      label: label,
      position: position,
      link: {
        type: 'generated-index',
        description: getCategoryDescription(label)
      }
    };

    fs.writeFileSync(catJsonPath, JSON.stringify(catData, null, 2), 'utf8');
    console.log(`Generated _category_.json for: ${path.relative(docsDir, catJsonPath).replace(/\\/g, '/')}`);
  }

  // Recurse into subdirectories
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath, depth + 1);
    }
  });
}

console.log('Starting metadata generation...');
processDirectory(docsDir, 0);
console.log('ALL CATEGORY METADATA COMPLETED.');
