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

// Define category positions to sort files
const rootOrder = {
  '00-it-foundation': 1,
  '01-developer-associate': 2,
  '02-solutions-architect-professional': 3,
  '03-architecture-decision-frameworks': 4,
  '04-architecture-workshops': 5,
  '05-exam-strategy': 6
};

const sapOrder = {
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

const dvaOrder = {
  '1-aws-fundamentals': 1,
  '2-aws-deep-dive': 2,
  '3-aws-serverless': 3,
  '4-aws-containers': 4,
  '5-others': 5,
  'Practice Exams': 6
};

// Custom sort to arrange files in the exact learning path sequence
allFiles.sort((a, b) => {
  const relA = path.relative(docsDir, a).replace(/\\/g, '/');
  const relB = path.relative(docsDir, b).replace(/\\/g, '/');
  
  const partsA = relA.split('/');
  const partsB = relB.split('/');
  
  // 1. Root category check
  const orderA = rootOrder[partsA[0]] || 99;
  const orderB = rootOrder[partsB[0]] || 99;
  if (orderA !== orderB) return orderA - orderB;
  
  // 2. Sort within root folders
  if (partsA[0] === '01-developer-associate') {
    const dvaOrdA = dvaOrder[partsA[1]] || 99;
    const dvaOrdB = dvaOrder[partsB[1]] || 99;
    if (dvaOrdA !== dvaOrdB) return dvaOrdA - dvaOrdB;
  } else if (partsA[0] === '02-solutions-architect-professional') {
    const sapOrdA = sapOrder[partsA[1]] || 99;
    const sapOrdB = sapOrder[partsB[1]] || 99;
    if (sapOrdA !== sapOrdB) return sapOrdA - sapOrdB;
  }
  
  // 3. Fallback to full string sort
  return relA.localeCompare(relB);
});

console.log(`Curriculum sequence built. Total files: ${allFiles.length}`);

// Clean up existing Navigation Sections
function stripNavigation(content) {
  // Matches ## Prerequisites and anything after it until the end or next H2
  const navSectionRegex = /##\s+Prerequisites[\s\S]*$/m;
  return content.replace(navSectionRegex, '').trim();
}

function getTitle(content, filename) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    const lines = fmMatch[1].split('\n');
    for (const line of lines) {
      if (line.startsWith('title:')) {
        return line.split(':')[1].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) return titleMatch[1].trim();
  return filename.replace(/\.md$/, '');
}

// Map files to their titles for linking
const titleMap = {};
allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  titleMap[f] = getTitle(content, path.basename(f));
});

// Run through all files and inject
allFiles.forEach((file, index) => {
  let content = fs.readFileSync(file, 'utf8');
  content = stripNavigation(content);
  
  const relPath = path.relative(docsDir, file).replace(/\\/g, '/');
  const dirName = path.dirname(file);
  
  // 1. Prerequisites (previous topic in sequence + matching DVA topic if in SAP)
  const prereqs = [];
  
  // Add previous item in curriculum
  if (index > 0) {
    const prevFile = allFiles[index - 1];
    const relToPrev = path.relative(dirName, prevFile).replace(/\\/g, '/');
    prereqs.push(`- [${titleMap[prevFile]}](${relToPrev})`);
  }
  
  // If in SAP, find corresponding DVA topic
  const parts = relPath.split('/');
  if (parts[0] === '02-solutions-architect-professional') {
    const sapFilename = parts[parts.length - 1];
    // Search DVA folder for a file with the same filename
    const matchingDva = allFiles.find(f => {
      const relF = path.relative(docsDir, f).replace(/\\/g, '/');
      return relF.startsWith('01-developer-associate/') && relF.endsWith(sapFilename);
    });
    if (matchingDva) {
      const relToDva = path.relative(dirName, matchingDva).replace(/\\/g, '/');
      prereqs.push(`- [AWS Developer Associate: ${titleMap[matchingDva]}](${relToDva}) (Fundamental Concept)`);
    }
  }

  // 2. Recommended Next Topics
  const nextTopics = [];
  if (index < allFiles.length - 1) {
    const nextFile = allFiles[index + 1];
    const relToNext = path.relative(dirName, nextFile).replace(/\\/g, '/');
    nextTopics.push(`- [${titleMap[nextFile]}](${relToNext})`);
  } else {
    nextTopics.push(`- Congratulations! You have completed the AWS Study Library curriculum.`);
  }

  // 3. Related Topics (other files in the same subfolder)
  const related = [];
  const sameDirFiles = allFiles.filter(f => f !== file && path.dirname(f) === dirName);
  
  // Pick up to 3 random/sequential files in the same directory
  const selected = sameDirFiles.slice(0, 3);
  selected.forEach(relFile => {
    const relToRel = path.relative(dirName, relFile).replace(/\\/g, '/');
    related.push(`- [${titleMap[relFile]}](${relToRel})`);
  });

  // If same directory is empty, pull from parent directory categories
  if (related.length === 0) {
    const parentDir = path.dirname(dirName);
    const peerFiles = allFiles.filter(f => f !== file && path.dirname(path.dirname(f)) === parentDir);
    peerFiles.slice(0, 3).forEach(relFile => {
      const relToRel = path.relative(dirName, relFile).replace(/\\/g, '/');
      related.push(`- [${titleMap[relFile]}](${relToRel})`);
    });
  }

  // Build the block to append
  let navBlock = `\n\n---\n\n## Prerequisites\n\n`;
  if (prereqs.length > 0) {
    navBlock += prereqs.join('\n') + '\n';
  } else {
    navBlock += `- None (Start of IT Foundation)\n`;
  }
  
  navBlock += `\n## Recommended Next Topics\n\n` + nextTopics.join('\n') + '\n';
  
  if (related.length > 0) {
    navBlock += `\n## Related Topics\n\n` + related.join('\n') + '\n';
  }

  // Write the file
  fs.writeFileSync(file, content + navBlock, 'utf8');
  console.log(`Injected navigation links into: ${relPath}`);
});

console.log('ALL NAVIGATION LINKS INJECTED SUCCESSFULLY.');
