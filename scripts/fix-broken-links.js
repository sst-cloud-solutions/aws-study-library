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
  { old: /foundation-bridge/g, new: '00-it-foundation' },
  { old: /Developer Associate/g, new: '01-developer-associate' },
  { old: /Developer%20Associate/g, new: '01-developer-associate' },
  { old: /Solutions Architect Professional/g, new: '02-solutions-architect-professional' },
  { old: /Solutions%20Architect%20Professional/g, new: '02-solutions-architect-professional' },
  { old: /Architecture Decision Frameworks/g, new: '03-architecture-decision-frameworks' },
  { old: /Architecture%20Decision%20Frameworks/g, new: '03-architecture-decision-frameworks' },
  { old: /Architecture Workshops/g, new: '04-architecture-workshops' },
  { old: /Architecture%20Workshops/g, new: '04-architecture-workshops' },
  { old: /Exam Strategy/g, new: '05-exam-strategy' },
  { old: /Exam%20Strategy/g, new: '05-exam-strategy' },
  // Casing update for categories inside SAP path
  { old: /Networking and Content Delivery/g, new: 'Networking & Content Delivery' },
  { old: /Networking%20and%20Content%20Delivery/g, new: 'Networking & Content Delivery' },
  { old: /Security, Identity, and Compliance/g, new: 'Security, Identity & Compliance' },
  { old: /Security,%20Identity,%20and%20Compliance/g, new: 'Security, Identity & Compliance' },
  { old: /Management and Governance/g, new: 'Management & Governance' },
  { old: /Management%20and%20Governance/g, new: 'Management & Governance' },
  { old: /Migration and Transfer/g, new: 'Migration & Transfer' },
  { old: /Migration%20and%20Transfer/g, new: 'Migration & Transfer' },
  { old: /Frontend Web and Mobile/g, new: 'Frontend Web & Mobile' },
  { old: /Frontend%20Web%20and%20Mobile/g, new: 'Frontend Web & Mobile' }
];

console.log('Fixing internal links in markdown files...');

let fixCount = 0;
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  replacements.forEach(r => {
    content = content.replace(r.old, r.new);
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    const rel = path.relative(docsDir, file).replace(/\\/g, '/');
    console.log(`Fixed links in: ${rel}`);
    fixCount++;
  }
});

console.log(`Successfully updated links in ${fixCount} files.`);
