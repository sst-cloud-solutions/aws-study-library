const fs = require('fs');
const path = require('path');

const dbDir = path.resolve(__dirname);

// Helper function to update database paths
function updateFile(filePath, callback) {
  if (!fs.existsSync(filePath)) {
    console.log(`Database file not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  content = callback(content);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated database: ${path.basename(filePath)}`);
}

// 1. Update db-dva.js
updateFile(path.join(dbDir, 'db-dva.js'), content => {
  return content.replace(/docs\/Developer Associate\//g, 'docs/01-developer-associate/');
});

// 2. Update db-matrices.js
updateFile(path.join(dbDir, 'db-matrices.js'), content => {
  return content.replace(/docs\/Architecture Decision Frameworks\//g, 'docs/03-architecture-decision-frameworks/');
});

// 3. Update db-workshops.js
updateFile(path.join(dbDir, 'db-workshops.js'), content => {
  return content.replace(/docs\/Architecture Workshops\//g, 'docs/04-architecture-workshops/');
});

// 4. Update db-strategy.js
updateFile(path.join(dbDir, 'db-strategy.js'), content => {
  return content.replace(/docs\/Exam Strategy\//g, 'docs/05-exam-strategy/');
});

// 5. Update db-sap.js
updateFile(path.join(dbDir, 'db-sap.js'), content => {
  // First, convert the parent path
  let updated = content.replace(/docs\/Solutions Architect Professional\//g, 'docs/02-solutions-architect-professional/');

  // Convert old category names in paths to the new names
  updated = updated.replace(/Networking and Content Delivery\//g, 'Networking & Content Delivery/');
  updated = updated.replace(/Security, Identity, and Compliance\//g, 'Security, Identity & Compliance/');
  updated = updated.replace(/Management and Governance\//g, 'Management & Governance/');
  updated = updated.replace(/Migration and Transfer\//g, 'Migration & Transfer/');

  // Now, map the specific 29 duplicate pages
  const replacements = [
    { old: 'Analytics/athena.md', new: 'Analytics/Interactive Query & Batch Processing/Amazon Athena.md' },
    { old: 'Analytics/glue.md', new: 'Analytics/Data Integration & Management/AWS Glue.md' },
    { old: 'Analytics/lake-formation.md', new: 'Analytics/Data Integration & Management/AWS Lake Formation.md' },
    { old: 'Analytics/emr.md', new: 'Analytics/Interactive Query & Batch Processing/Amazon EMR.md' },
    { old: 'Analytics/quicksight.md', new: 'Analytics/Visualization & Search/Amazon QuickSight.md' },
    { old: 'Application Integration/amazon-mq.md', new: 'Application Integration/Messaging & Eventing/Amazon MQ.md' },
    { old: 'Cloud Financial Management/compute-optimizer.md', new: 'Management & Governance/Operations & Optimization/AWS Compute Optimizer.md' },
    { old: 'Compute/outposts.md', new: 'Compute/Virtual Machines & Infrastructure/AWS Outposts.md' },
    { old: 'Compute/wavelength.md', new: 'Compute/Virtual Machines & Infrastructure/AWS Wavelength.md' },
    { old: 'Database/documentdb.md', new: 'Database/NoSQL Databases/Amazon DocumentDB.md' },
    { old: 'Database/neptune.md', new: 'Database/Specialized & In-Memory/Amazon Neptune.md' },
    { old: 'Database/timestream.md', new: 'Database/Specialized & In-Memory/Amazon Timestream.md' },
    { old: 'Management & Governance/audit-manager.md', new: 'Security, Identity & Compliance/Compliance & Governance/AWS Audit Manager.md' },
    { old: 'Management & Governance/control-tower-deep-dive.md', new: 'Management & Governance/Governance & Compliance/AWS Control Tower.md' },
    { old: 'Migration & Transfer/application-discovery-service.md', new: 'Migration & Transfer/Migration Tools/AWS Application Discovery Service.md' },
    { old: 'Storage/transfer-family.md', new: 'Migration & Transfer/File Transfer/AWS Transfer Family.md' },
    { old: 'Storage/datasync.md', new: 'Migration & Transfer/Migration Tools/AWS DataSync.md' },
    { old: 'Migration & Transfer/migration-evaluator.md', new: 'Migration & Transfer/Migration Tools/AWS Migration Evaluator.md' },
    { old: 'Migration & Transfer/migration-hub.md', new: 'Migration & Transfer/Migration Tools/AWS Migration Hub.md' },
    { old: 'Migration & Transfer/snow-family.md', new: 'Migration & Transfer/Physical & Offline Migration/AWS Snow Family.md' },
    { old: 'Networking & Content Delivery/privatelink.md', new: 'Networking & Content Delivery/Hybrid Connectivity/AWS PrivateLink.md' },
    { old: 'Networking & Content Delivery/network-firewall.md', new: 'Security, Identity & Compliance/Network Security/AWS Network Firewall.md' },
    { old: 'Security, Identity & Compliance/detective.md', new: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Detective.md' },
    { old: 'Security, Identity & Compliance/firewall-manager.md', new: 'Security, Identity & Compliance/Network Security/AWS Firewall Manager.md' },
    { old: 'Security, Identity & Compliance/guardduty.md', new: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon GuardDuty.md' },
    { old: 'Security, Identity & Compliance/verified-access.md', new: 'Security, Identity & Compliance/Identity & Access Management/AWS Verified Access.md' },
    { old: 'Security, Identity & Compliance/inspector.md', new: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Inspector.md' },
    { old: 'Security, Identity & Compliance/security-hub.md', new: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/AWS Security Hub.md' },
    { old: 'Storage/storage-gateway.md', new: 'Storage/Backup & Disaster Recovery/AWS Storage Gateway.md' }
  ];

  replacements.forEach(({ old: oldFile, new: newFile }) => {
    const oldPathStr = `path: 'docs/02-solutions-architect-professional/${oldFile}'`;
    const newPathStr = `path: 'docs/02-solutions-architect-professional/${newFile}', isDetailed: true`;
    if (updated.includes(oldPathStr)) {
      updated = updated.replace(oldPathStr, newPathStr);
    } else {
      console.log(`Could not find path string: ${oldPathStr}`);
    }
  });

  return updated;
});
