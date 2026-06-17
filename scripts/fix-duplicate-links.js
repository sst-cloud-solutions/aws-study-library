const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');

function getMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== '_assets' && file !== 'node_modules' && file !== '.docusaurus' && file !== '.git') {
        getMdFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getMdFiles(docsDir);

const replacements = [
  { old: 'Analytics/athena', new: 'Analytics/Interactive Query & Batch Processing/Amazon Athena' },
  { old: 'Analytics/glue', new: 'Analytics/Data Integration & Management/AWS Glue' },
  { old: 'Analytics/lake-formation', new: 'Analytics/Data Integration & Management/AWS Lake Formation' },
  { old: 'Analytics/emr', new: 'Analytics/Interactive Query & Batch Processing/Amazon EMR' },
  { old: 'Analytics/quicksight', new: 'Analytics/Visualization & Search/Amazon QuickSight' },
  { old: 'Application Integration/amazon-mq', new: 'Application Integration/Messaging & Eventing/Amazon MQ' },
  { old: 'Cloud Financial Management/compute-optimizer', new: 'Management & Governance/Operations & Optimization/AWS Compute Optimizer' },
  { old: 'Compute/outposts', new: 'Compute/Virtual Machines & Infrastructure/AWS Outposts' },
  { old: 'Compute/wavelength', new: 'Compute/Virtual Machines & Infrastructure/AWS Wavelength' },
  { old: 'Database/documentdb', new: 'Database/NoSQL Databases/Amazon DocumentDB' },
  { old: 'Database/neptune', new: 'Database/Specialized & In-Memory/Amazon Neptune' },
  { old: 'Database/timestream', new: 'Database/Specialized & In-Memory/Amazon Timestream' },
  { old: 'Management & Governance/audit-manager', new: 'Security, Identity & Compliance/Compliance & Governance/AWS Audit Manager' },
  { old: 'Management & Governance/control-tower-deep-dive', new: 'Management & Governance/Governance & Compliance/AWS Control Tower' },
  { old: 'Migration & Transfer/application-discovery-service', new: 'Migration & Transfer/Migration Tools/AWS Application Discovery Service' },
  { old: 'Storage/transfer-family', new: 'Migration & Transfer/File Transfer/AWS Transfer Family' },
  { old: 'Storage/datasync', new: 'Migration & Transfer/Migration Tools/AWS DataSync' },
  { old: 'Migration & Transfer/migration-evaluator', new: 'Migration & Transfer/Migration Tools/AWS Migration Evaluator' },
  { old: 'Migration & Transfer/migration-hub', new: 'Migration & Transfer/Migration Tools/AWS Migration Hub' },
  { old: 'Migration & Transfer/snow-family', new: 'Migration & Transfer/Physical & Offline Migration/AWS Snow Family' },
  { old: 'Networking & Content Delivery/privatelink', new: 'Networking & Content Delivery/Hybrid Connectivity/AWS PrivateLink' },
  { old: 'Networking & Content Delivery/network-firewall', new: 'Security, Identity & Compliance/Network Security/AWS Network Firewall' },
  { old: 'Security, Identity & Compliance/detective', new: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Detective' },
  { old: 'Security, Identity & Compliance/firewall-manager', new: 'Security, Identity & Compliance/Network Security/AWS Firewall Manager' },
  { old: 'Security, Identity & Compliance/guardduty', new: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon GuardDuty' },
  { old: 'Security, Identity & Compliance/verified-access', new: 'Security, Identity & Compliance/Identity & Access Management/AWS Verified Access' },
  { old: 'Security, Identity & Compliance/inspector', new: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Inspector' },
  { old: 'Security, Identity & Compliance/security-hub', new: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/AWS Security Hub' },
  { old: 'Storage/storage-gateway', new: 'Storage/Backup & Disaster Recovery/AWS Storage Gateway' }
];

console.log('Fixing links pointing to deleted duplicates...');
let fileCount = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  replacements.forEach(r => {
    // Escape special regex characters in the old path for matching
    const escapedOld = r.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // We match the old path with or without .md extension, URL encoded (%20) or raw spaces
    // Check if the file name contains %20 in URL encoded forms or standard spaces
    const regex1 = new RegExp(escapedOld + '(\\.md)?', 'g');
    const regex2 = new RegExp(escapedOld.replace(/ /g, '%20') + '(\\.md)?', 'g');
    const regex3 = new RegExp(escapedOld.replace(/ /g, 'and') + '(\\.md)?', 'g'); // to handle Networking and Content Delivery

    content = content.replace(regex1, r.new);
    content = content.replace(regex2, r.new.replace(/ /g, '%20'));
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated links in: ${path.relative(docsDir, file).replace(/\\/g, '/')}`);
    fileCount++;
  }
});

console.log(`Successfully fixed links in ${fileCount} files.`);
