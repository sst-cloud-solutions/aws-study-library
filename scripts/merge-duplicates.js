const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../docs/02-solutions-architect-professional');

const duplicates = [
  { src: 'Analytics/athena.md', dest: 'Analytics/Interactive Query & Batch Processing/Amazon Athena.md' },
  { src: 'Analytics/glue.md', dest: 'Analytics/Data Integration & Management/AWS Glue.md' },
  { src: 'Analytics/lake-formation.md', dest: 'Analytics/Data Integration & Management/AWS Lake Formation.md' },
  { src: 'Analytics/emr.md', dest: 'Analytics/Interactive Query & Batch Processing/Amazon EMR.md' },
  { src: 'Analytics/quicksight.md', dest: 'Analytics/Visualization & Search/Amazon QuickSight.md' },
  { src: 'Application Integration/amazon-mq.md', dest: 'Application Integration/Messaging & Eventing/Amazon MQ.md' },
  { src: 'Cloud Financial Management/compute-optimizer.md', dest: 'Management & Governance/Operations & Optimization/AWS Compute Optimizer.md' },
  { src: 'Compute/outposts.md', dest: 'Compute/Virtual Machines & Infrastructure/AWS Outposts.md' },
  { src: 'Compute/wavelength.md', dest: 'Compute/Virtual Machines & Infrastructure/AWS Wavelength.md' },
  { src: 'Database/documentdb.md', dest: 'Database/NoSQL Databases/Amazon DocumentDB.md' },
  { src: 'Database/neptune.md', dest: 'Database/Specialized & In-Memory/Amazon Neptune.md' },
  { src: 'Database/timestream.md', dest: 'Database/Specialized & In-Memory/Amazon Timestream.md' },
  { src: 'Management & Governance/audit-manager.md', dest: 'Security, Identity & Compliance/Compliance & Governance/AWS Audit Manager.md' },
  { src: 'Management & Governance/control-tower-deep-dive.md', dest: 'Management & Governance/Governance & Compliance/AWS Control Tower.md' },
  { src: 'Migration & Transfer/application-discovery-service.md', dest: 'Migration & Transfer/Migration Tools/AWS Application Discovery Service.md' },
  { src: 'Storage/transfer-family.md', dest: 'Migration & Transfer/File Transfer/AWS Transfer Family.md' },
  { src: 'Storage/datasync.md', dest: 'Migration & Transfer/Migration Tools/AWS DataSync.md' },
  { src: 'Migration & Transfer/migration-evaluator.md', dest: 'Migration & Transfer/Migration Tools/AWS Migration Evaluator.md' },
  { src: 'Migration & Transfer/migration-hub.md', dest: 'Migration & Transfer/Migration Tools/AWS Migration Hub.md' },
  { src: 'Migration & Transfer/snow-family.md', dest: 'Migration & Transfer/Physical & Offline Migration/AWS Snow Family.md' },
  { src: 'Networking & Content Delivery/privatelink.md', dest: 'Networking & Content Delivery/Hybrid Connectivity/AWS PrivateLink.md' },
  { src: 'Networking & Content Delivery/network-firewall.md', dest: 'Security, Identity & Compliance/Network Security/AWS Network Firewall.md' },
  { src: 'Security, Identity & Compliance/detective.md', dest: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Detective.md' },
  { src: 'Security, Identity & Compliance/firewall-manager.md', dest: 'Security, Identity & Compliance/Network Security/AWS Firewall Manager.md' },
  { src: 'Security, Identity & Compliance/guardduty.md', dest: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon GuardDuty.md' },
  { src: 'Security, Identity & Compliance/verified-access.md', dest: 'Security, Identity & Compliance/Identity & Access Management/AWS Verified Access.md' },
  { src: 'Security, Identity & Compliance/inspector.md', dest: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/Amazon Inspector.md' },
  { src: 'Security, Identity & Compliance/security-hub.md', dest: 'Security, Identity & Compliance/Security Monitoring & Threat Detection/AWS Security Hub.md' },
  { src: 'Storage/storage-gateway.md', dest: 'Storage/Backup & Disaster Recovery/AWS Storage Gateway.md' }
];

function extractSection(content, headingPattern) {
  const lines = content.split('\n');
  let startIndex = -1;
  let endIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (headingPattern.test(lines[i])) {
      startIndex = i;
      break;
    }
  }

  if (startIndex === -1) return '';

  for (let i = startIndex + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) endIndex = lines.length;

  return lines.slice(startIndex + 1, endIndex).join('\n').trim();
}

duplicates.forEach(({ src, dest }) => {
  const srcPath = path.join(baseDir, src);
  const destPath = path.join(baseDir, dest);

  if (!fs.existsSync(srcPath)) {
    console.log(`Source file not found: ${srcPath}, skipping.`);
    return;
  }
  if (!fs.existsSync(destPath)) {
    console.log(`Destination file not found: ${destPath}, skipping.`);
    return;
  }

  console.log(`Merging ${src} into ${dest}...`);
  const srcContent = fs.readFileSync(srcPath, 'utf8');
  let destContent = fs.readFileSync(destPath, 'utf8');

  // Extract sections
  const overviewSection = extractSection(srcContent, /^##\s+1\.\s+Overview\s+/i);
  const archSection = extractSection(srcContent, /^##\s+2\.\s+Architecture\s+/i);
  const compSection = extractSection(srcContent, /^##\s+3\.\s+Comparison\s+/i);
  const considerSection = extractSection(srcContent, /^##\s+4\.\s+Key\s+Performance\s+/i);
  const tipsSection = extractSection(srcContent, /^##\s+5\.\s+Exam\s+tips\s+/i);

  // Extract Analogy
  let analogy = '';
  const analogyMatch = overviewSection.match(/\*\*Real-World Analogy:\*\*\s*(.+)/);
  if (analogyMatch) {
    analogy = analogyMatch[1].trim();
  }

  // Build the content to inject
  let mergedAdditions = '\n\n';

  if (compSection) {
    mergedAdditions += `## Comparison & Decision Guidance\n\n${compSection}\n\n---\n\n`;
  }

  if (considerSection) {
    mergedAdditions += `## Key Performance, Cost & Security Considerations\n\n${considerSection}\n\n---\n\n`;
  }

  if (tipsSection) {
    mergedAdditions += `## Exam Tips & Traps\n\n${tipsSection}\n`;
  }

  // Prepend Analogy to H1 Title
  if (analogy) {
    const analogyBlock = `\n> [!NOTE]\n> **Real-World Analogy:** ${analogy}\n`;
    
    // Find H1 header
    const h1Match = destContent.match(/^#\s+(.+)$/m);
    if (h1Match) {
      const h1Full = h1Match[0];
      destContent = destContent.replace(h1Full, `${h1Full}\n${analogyBlock}`);
    } else {
      // Prepend to start of file
      destContent = analogyBlock + destContent;
    }
  }

  // Insert Mermaid diagram into the destination.
  // We place it right after the first H2 header, or before the Conclusion/Summary
  if (archSection) {
    const mermaidBlock = `\n\n## Architecture Flow Diagram\n\n${archSection}\n\n`;
    // Find the first H2 header
    const firstH2Match = destContent.match(/^##\s+(.+)$/m);
    if (firstH2Match) {
      const firstH2Full = firstH2Match[0];
      destContent = destContent.replace(firstH2Full, `${mermaidBlock}${firstH2Full}`);
    } else {
      destContent = destContent + mermaidBlock;
    }
  }

  // Append other additions before the final section, or at the end
  destContent = destContent.trim() + mergedAdditions;

  // Save the destination file
  fs.writeFileSync(destPath, destContent, 'utf8');
  console.log(`Updated ${dest} with merged content.`);

  // Delete the source file
  fs.unlinkSync(srcPath);
  console.log(`Deleted redundant source file: ${src}`);
});

console.log('ALL DUPLICATES MERGED SUCCESSFULLY.');
