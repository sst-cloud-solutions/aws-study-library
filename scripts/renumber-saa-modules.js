const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');
const saaDir = path.join(docsDir, '01-solutions-architect-associate');

// Define SAA directories to rename
const dirsToRename = [
  { oldName: '02-IAM', newName: '01-IAM' },
  { oldName: '03-Compute', newName: '02-Compute' },
  { oldName: '04-Storage', newName: '03-Storage' },
  { oldName: '05-Database', newName: '04-Database' },
  { oldName: '06-Networking', newName: '05-Networking' },
  { oldName: '07-Security', newName: '06-Security' },
  { oldName: '08-Application-Integration', newName: '07-Application-Integration' },
  { oldName: '09-Monitoring', newName: '08-Monitoring' },
  { oldName: '10-Migration', newName: '09-Migration' },
  { oldName: '11-Analytics', newName: '10-Analytics' },
  { oldName: '12-Architecture-Patterns', newName: '11-Architecture-Patterns' },
  { oldName: '13-Cost-Optimization', newName: '12-Cost-Optimization' },
  { oldName: '14-Practice', newName: '13-Practice' }
];

// Get all markdown files under docs/ recursively
function getMdFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getMdFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allMdFiles = getMdFiles(docsDir);

console.log(`Found ${allMdFiles.length} markdown files in the repository.`);

// Perform content replacements inside markdown files
allMdFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Relocate folder links (e.g. 02-IAM -> 01-IAM)
  dirsToRename.forEach(({ oldName, newName }) => {
    // Replace exact folder path in links, e.g. /02-IAM/ -> /01-IAM/ or (02-IAM/ -> (01-IAM/
    const pathRegex = new RegExp(`(?<=[\\(/])${oldName}(?=[\\/\\)])`, 'g');
    content = content.replace(pathRegex, newName);
  });

  // 2. Perform textual replacements for "Module XX" in descending order to avoid overlap
  // For each module number from 14 down to 02, shift by -1
  for (let i = 14; i >= 2; i--) {
    const oldNumPad = i.toString().padStart(2, '0');
    const newNumPad = (i - 1).toString().padStart(2, '0');
    
    // Case-insensitive replacement for "Module 02" -> "Module 01", etc.
    const regexPad = new RegExp(`Module\\s*${oldNumPad}\\b`, 'gi');
    content = content.replace(regexPad, `Module ${newNumPad}`);

    // Replace unpadded if present, e.g., "Module 2" -> "Module 1"
    const regexUnpad = new RegExp(`Module\\s*${i}\\b`, 'gi');
    content = content.replace(regexUnpad, `Module ${i - 1}`);
  }

  // 3. Specific cleanup for "Module 01" references to AWS Fundamentals
  // Since AWS Fundamentals was Module 01, we want to remove the "Module 01" label from it
  // and refer to it as "AWS Fundamentals" or similar.
  content = content.replace(/Module 01: AWS Fundamentals/gi, 'AWS Fundamentals');
  content = content.replace(/Module 01 - AWS Fundamentals/gi, 'AWS Fundamentals');
  content = content.replace(/Module\s*0?1\s*:\s*(AWS\s+Fundamentals|Identity\s+and\s+Access\s+Management)/gi, (match, p1) => {
    if (p1.toLowerCase().includes('identity')) {
      return 'Module 01: Identity and Access Management';
    }
    return 'AWS Fundamentals';
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated content & links in: ${path.relative(docsDir, file)}`);
  }
});

// Rename SAA roadmap specific edits
const roadmapPath = path.join(saaDir, 'saa-roadmap.md');
if (fs.existsSync(roadmapPath)) {
  let content = fs.readFileSync(roadmapPath, 'utf8');

  // Remove AWS Fundamentals from Study Modules Table
  // E.g., remove the row: | 01 | [AWS Fundamentals]...
  const tableRowRegex = /^\|\s*0?1\s*\|\s*\[AWS\s+Fundamentals\][\s\S]*?\n/m;
  content = content.replace(tableRowRegex, '');

  // Shift module numbers in table rows: change | 02 | ... to | 01 | ...
  for (let i = 2; i <= 14; i++) {
    const oldNum = i.toString().padStart(2, '0');
    const newNum = (i - 1).toString().padStart(2, '0');
    const rowNumRegex = new RegExp(`^\\|\\s*${oldNum}\\s*\\|`, 'm');
    content = content.replace(rowNumRegex, `| ${newNum} |`);
  }

  // Under Step-by-Step Study Phases: remove AWS Fundamentals links under Phase 1
  // Phase 1 section:
  const phase1Regex = /### Phase 1: AWS Fundamentals & IAM[\s\S]*?(?=### Phase 2:|$)/;
  content = content.replace(phase1Regex, (match) => {
    // Keep only IAM links
    const lines = match.split('\n');
    const filteredLines = lines.filter(line => {
      return !line.toLowerCase().includes('fundamentals');
    });
    // Rename Phase header
    filteredLines[0] = '### Phase 1: Identity & Access Management (IAM) (5 Hours)';
    return filteredLines.join('\n');
  });

  fs.writeFileSync(roadmapPath, content, 'utf8');
  console.log(`Roadmap specific edits completed on: ${path.relative(docsDir, roadmapPath)}`);
}

// Physically rename directories
dirsToRename.forEach(({ oldName, newName }) => {
  const oldPath = path.join(saaDir, oldName);
  const newPath = path.join(saaDir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed directory: ${oldName} -> ${newName}`);
  } else {
    console.log(`Directory not found (already renamed?): ${oldName}`);
  }
});

console.log('SAA module renumbering script execution finished successfully!');
