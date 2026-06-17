const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');
const sidebarsPath = path.resolve(__dirname, '../sidebars.ts');

// Helper to find all markdown files recursively
function getMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!['node_modules', '.docusaurus', '.git', '_assets'].includes(file)) {
        getMdFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allMdFiles = getMdFiles(docsDir);

// Convert absolute path to Docusaurus ID
function toDocusaurusId(filePath) {
  const rel = path.relative(docsDir, filePath).replace(/\\/g, '/');
  const parts = rel.split('/').map(part => part.replace(/^\d+-/, ''));
  // Strip .md extension
  let last = parts[parts.length - 1];
  if (last.endsWith('.md')) {
    parts[parts.length - 1] = last.substring(0, last.length - 3);
  }
  return decodeURIComponent(parts.join('/'));
}

// Get title from frontmatter or first H1
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

const titleMap = {};
allMdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  titleMap[file] = getTitle(content, path.basename(file));
});

// Define Phase parser for roadmaps
function parseRoadmapPhases(roadmapPath) {
  const content = fs.readFileSync(roadmapPath, 'utf8');
  const lines = content.split('\n');
  const phases = [];
  let currentPhase = null;

  lines.forEach(line => {
    const phaseMatch = line.match(/^###\s+(Phase\s+\d+:\s+[^(\n\r]+)/i);
    if (phaseMatch) {
      currentPhase = {
        label: phaseMatch[1].trim(),
        items: [],
        filePaths: []
      };
      phases.push(currentPhase);
    }

    if (currentPhase) {
      const linkRegex = /\[[^\]]+\]\(([^)]+\.md)\)/g;
      let match;
      while ((match = linkRegex.exec(line)) !== null) {
        const relLink = match[1];
        const decodedRelLink = decodeURIComponent(relLink);
        const absPath = path.resolve(path.dirname(roadmapPath), decodedRelLink);
        if (fs.existsSync(absPath)) {
          const docId = toDocusaurusId(absPath);
          if (!currentPhase.items.includes(docId)) {
            currentPhase.items.push(docId);
            currentPhase.filePaths.push(absPath);
          }
        }
      }
    }
  });

  return phases;
}

// 1. DVA, SAA & SAP Roadmaps parsing
const dvaRoadmapFile = path.join(docsDir, '01-developer-associate/dva-roadmap.md');
const saaRoadmapFile = path.join(docsDir, '01-solutions-architect-associate/saa-roadmap.md');
const sapRoadmapFile = path.join(docsDir, '02-solutions-architect-professional/sap-roadmap.md');

const dvaPhases = parseRoadmapPhases(dvaRoadmapFile);
const saaPhases = parseRoadmapPhases(saaRoadmapFile);
const sapPhases = parseRoadmapPhases(sapRoadmapFile);

// 2. Define sequence order for IT Foundations
const itFoundationSequence = [
  'docs/00-it-foundation/beginner-roadmap.md',
  'docs/00-it-foundation/0-intro.md',
  'docs/00-it-foundation/1-how-computers-work.md',
  'docs/00-it-foundation/2-linux-fundamentals.md',
  'docs/00-it-foundation/3-networking-fundamentals.md',
  'docs/00-it-foundation/4-programming-fundamentals.md',
  'docs/00-it-foundation/5-databases.md',
  'docs/00-it-foundation/6-web-application-fundamentals.md',
  'docs/00-it-foundation/7-servers-infrastructure.md',
  'docs/00-it-foundation/8-devops-foundations.md',
  'docs/00-it-foundation/9-security-foundations.md'
].map(p => path.resolve(docsDir, '..', p));

// 3. Build Decision Matrices list
const matricesFiles = allMdFiles.filter(f => {
  const rel = path.relative(docsDir, f).replace(/\\/g, '/');
  return rel.startsWith('03-architecture-decision-frameworks/');
}).sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

// 4. Build Workshops list
// Workshops are ordered by how they appear in the roadmap, then others alphabetically
const workshopMapOrder = [
  'enterprise-landing-zone.md',
  'hybrid-enterprise-network.md',
  'multi-region-dr.md'
];
const workshopsFiles = allMdFiles.filter(f => {
  const rel = path.relative(docsDir, f).replace(/\\/g, '/');
  return rel.startsWith('04-architecture-workshops/');
}).sort((a, b) => {
  const idxA = workshopMapOrder.indexOf(path.basename(a));
  const idxB = workshopMapOrder.indexOf(path.basename(b));
  if (idxA !== -1 && idxB !== -1) return idxA - idxB;
  if (idxA !== -1) return -1;
  if (idxB !== -1) return 1;
  return path.basename(a).localeCompare(path.basename(b));
});

// 5. Exam Strategy
const strategyFiles = [path.join(docsDir, '05-exam-strategy/intro.md')];

// 6. Well-Architected Framework
const wafFile = path.join(docsDir, '02-solutions-architect-professional/well-architected-framework.md');

// Assemble the sequence of all markdown files
const dvaStudyPaths = [];
const dvaMockExamPaths = [];
dvaPhases.forEach(p => {
  if (p.label.toLowerCase().includes('mock') || p.label.toLowerCase().includes('practice')) {
    dvaMockExamPaths.push(...p.filePaths);
  } else {
    dvaStudyPaths.push(...p.filePaths);
  }
});

const saaStudyPaths = [];
const saaMockExamPaths = [];
saaPhases.forEach(p => {
  if (p.label.toLowerCase().includes('mock') || p.label.toLowerCase().includes('practice') || p.label.toLowerCase().includes('reviews')) {
    saaMockExamPaths.push(...p.filePaths);
  } else {
    saaStudyPaths.push(...p.filePaths);
  }
});

const sapStudyPaths = [];
const sapMockExamPaths = [];
sapPhases.forEach(p => {
  if (p.label.toLowerCase().includes('mock') || p.label.toLowerCase().includes('practice')) {
    sapMockExamPaths.push(...p.filePaths);
  } else {
    sapStudyPaths.push(...p.filePaths);
  }
});

// Verify that the mock exam overview pages are placed correctly
const dvaMockOverview = path.join(docsDir, '01-developer-associate/Practice Exams/DVA-C02-Mock-Exam.md');
const sapMockOverview = path.join(docsDir, '02-solutions-architect-professional/Practice Exams/SAP-C02 Mock Exam.md');

// Define assignment rules for unlinked files
function assignToPhase(filePath) {
  const rel = path.relative(docsDir, filePath).replace(/\\/g, '/');
  if (rel.startsWith('01-developer-associate/')) {
    if (rel.includes('/1-aws-fundamentals/')) return { type: 'dva', phase: 'Phase 1' };
    if (rel.includes('/2-aws-deep-dive/')) return { type: 'dva', phase: 'Phase 2' };
    if (rel.includes('/3-aws-serverless/')) return { type: 'dva', phase: 'Phase 3' };
    if (rel.includes('/4-aws-containers/')) return { type: 'dva', phase: 'Phase 4' };
    if (rel.includes('/5-others/')) return { type: 'dva', phase: 'Phase 5' };
  } else if (rel.startsWith('02-solutions-architect-professional/')) {
    if (rel.startsWith('02-solutions-architect-professional/Compute/Virtual Machines & Infrastructure/') ||
        rel.startsWith('02-solutions-architect-professional/Compute/Serverless & Managed Compute/') ||
        rel.startsWith('02-solutions-architect-professional/Compute/Scaling & Batch Processing/') ||
        rel.startsWith('02-solutions-architect-professional/Compute/Simplified Compute/') ||
        rel.startsWith('02-solutions-architect-professional/Storage/Object, Block, & File Storage/') ||
        rel.includes('/Storage/efs-performance-modes') ||
        rel.includes('/Compute/placement-groups') ||
        rel.includes('/Compute/dedicated-hosts') ||
        rel.includes('/Compute/capacity-reservations') ||
        rel.includes('/Compute/spot-fleet') ||
        rel.includes('/Compute/launch-templates') ||
        rel.includes('/Compute/warm-pools') ||
        rel.includes('/Compute/local-zones')) {
      return { type: 'sap', phase: 'Phase 1' };
    }
    if (rel.includes('/Networking & Content Delivery/')) {
      return { type: 'sap', phase: 'Phase 2' };
    }
    if (rel.includes('/Security, Identity & Compliance/Identity & Access Management/') ||
        rel.includes('/Security, Identity & Compliance/Data Protection & Encryption/') ||
        rel.includes('/Security, Identity & Compliance/Network Security/') ||
        rel.includes('/Security, Identity & Compliance/Security Monitoring & Threat Detection/') ||
        rel.includes('/Security, Identity & Compliance/Compliance & Governance/') ||
        rel.includes('/Security, Identity & Compliance/active-directory-integration') ||
        rel.includes('/Security, Identity & Compliance/macie') ||
        rel.includes('/Security, Identity & Compliance/shield-advanced') ||
        rel.includes('/Security, Identity & Compliance/waf') ||
        rel.includes('/Management & Governance/Governance & Compliance/') ||
        rel.includes('/Management & Governance/account-factory') ||
        rel.includes('/Management & Governance/config-aggregators') ||
        rel.includes('/Management & Governance/Monitoring & Observability/') ||
        rel.includes('/Management & Governance/Infrastructure Automation/') ||
        rel.includes('/Management & Governance/Operations & Optimization/') ||
        rel.includes('/Management & Governance/Cost Management/')) {
      return { type: 'sap', phase: 'Phase 3' };
    }
    if (rel.includes('/Database/') ||
        rel.includes('/Application Integration/') ||
        rel.includes('/Cloud Financial Management/') ||
        rel.includes('/Containers/') ||
        rel.includes('/Developer Tools/') ||
        rel.includes('/Frontend Web & Mobile/') ||
        rel.includes('/End User Computing/') ||
        rel.includes('/Migration & Transfer/Migration Tools/')) {
      return { type: 'sap', phase: 'Phase 4' };
    }
    if (rel.includes('/Storage/Backup & Disaster Recovery/') ||
        rel.includes('/Analytics/') ||
        rel.includes('/Machine Learning/') ||
        rel.includes('/Business Applications/') ||
        rel.includes('/Internet of Things/') ||
        rel.includes('/Media Services/') ||
        rel.includes('/Blockchain/') ||
        rel.includes('/Migration & Transfer/Physical & Offline Migration/')) {
      return { type: 'sap', phase: 'Phase 5' };
    }
  } else if (rel.startsWith('01-solutions-architect-associate/')) {
    if (rel.includes('/01-AWS-Fundamentals/') || rel.includes('/02-IAM/')) return { type: 'saa', phase: 'Phase 1' };
    if (rel.includes('/03-Compute/') || rel.includes('/04-Storage/')) return { type: 'saa', phase: 'Phase 2' };
    if (rel.includes('/05-Database/') || rel.includes('/06-Networking/')) return { type: 'saa', phase: 'Phase 3' };
    if (rel.includes('/07-Security/') || rel.includes('/08-Application-Integration/') || rel.includes('/09-Monitoring/')) return { type: 'saa', phase: 'Phase 4' };
    if (rel.includes('/10-Migration/') || rel.includes('/11-Analytics/') || rel.includes('/12-Architecture-Patterns/')) return { type: 'saa', phase: 'Phase 5' };
    if (rel.includes('/13-Cost-Optimization/') || rel.includes('/docs/')) return { type: 'saa', phase: 'Phase 6' };
    if (rel.includes('/14-Practice/') || rel.includes('/exam-reviews/')) return { type: 'saa', phase: 'Phase 7' };
  }
  return null;
}

// Assign any unlinked files in the directories to their correct phases
allMdFiles.forEach(f => {
  const absPath = path.resolve(f);
  let found = false;
  dvaPhases.forEach(p => {
    if (p.filePaths.map(x => path.resolve(x)).includes(absPath)) found = true;
  });
  saaPhases.forEach(p => {
    if (p.filePaths.map(x => path.resolve(x)).includes(absPath)) found = true;
  });
  sapPhases.forEach(p => {
    if (p.filePaths.map(x => path.resolve(x)).includes(absPath)) found = true;
  });
  if (itFoundationSequence.map(x => path.resolve(x)).includes(absPath)) found = true;
  if (matricesFiles.map(x => path.resolve(x)).includes(absPath)) found = true;
  if (workshopsFiles.map(x => path.resolve(x)).includes(absPath)) found = true;
  if (strategyFiles.map(x => path.resolve(x)).includes(absPath)) found = true;
  if (absPath === path.resolve(dvaRoadmapFile)) found = true;
  if (absPath === path.resolve(saaRoadmapFile)) found = true;
  if (absPath === path.resolve(sapRoadmapFile)) found = true;
  if (absPath === path.resolve(wafFile)) found = true;
  if (absPath === path.resolve(dvaMockOverview)) found = true;
  if (absPath === path.resolve(sapMockOverview)) found = true;
  if (path.basename(f) === 'dependency_map.md') found = true;

  if (!found) {
    const assignment = assignToPhase(f);
    if (assignment) {
      const docId = toDocusaurusId(f);
      if (assignment.type === 'dva') {
        const phase = dvaPhases.find(p => p.label.startsWith(assignment.phase));
        if (phase) {
          phase.items.push(docId);
          phase.filePaths.push(absPath);
          console.log(`Assigned unlinked DVA file to ${phase.label}: ${path.relative(docsDir, f)}`);
        }
      } else if (assignment.type === 'saa') {
        const phase = saaPhases.find(p => p.label.startsWith(assignment.phase));
        if (phase) {
          phase.items.push(docId);
          phase.filePaths.push(absPath);
          console.log(`Assigned unlinked SAA file to ${phase.label}: ${path.relative(docsDir, f)}`);
        }
      } else if (assignment.type === 'sap') {
        const phase = sapPhases.find(p => p.label.startsWith(assignment.phase));
        if (phase) {
          phase.items.push(docId);
          phase.filePaths.push(absPath);
          console.log(`Assigned unlinked SAP file to ${phase.label}: ${path.relative(docsDir, f)}`);
        }
      }
    }
  }
});

// Clean duplicates from study paths if they accidentally include mock exams
const cleanDvaStudyPaths = dvaStudyPaths.filter(p => !p.includes('Practice Exams'));
const cleanSaaStudyPaths = saaStudyPaths.filter(p => !p.includes('Practice') && !p.includes('exam-reviews'));
const cleanSapStudyPaths = sapStudyPaths.filter(p => !p.includes('Practice Exams') && p !== wafFile);

const curriculumSequence = [
  ...itFoundationSequence,
  dvaRoadmapFile,
  ...cleanDvaStudyPaths,
  dvaMockOverview,
  ...dvaMockExamPaths.filter(p => p !== dvaMockOverview),
  saaRoadmapFile,
  ...cleanSaaStudyPaths,
  ...saaMockExamPaths,
  sapRoadmapFile,
  wafFile,
  ...cleanSapStudyPaths,
  ...matricesFiles,
  ...workshopsFiles,
  ...strategyFiles,
  sapMockOverview,
  ...sapMockExamPaths.filter(p => p !== sapMockOverview)
];

console.log(`Flat sequence constructed. Length: ${curriculumSequence.length}`);

// Assert no files are missing
const sequenceSet = new Set(curriculumSequence.map(p => path.resolve(p)));
const missingFiles = allMdFiles.filter(f => !sequenceSet.has(path.resolve(f)));
if (missingFiles.length > 0) {
  console.warn('WARNING: The following files are in docs but missing from the curriculum sequence:');
  missingFiles.forEach(f => {
    console.warn(`- ${path.relative(docsDir, f)}`);
    // Append them to curriculumSequence so they are not orphaned
    curriculumSequence.push(f);
  });
} else {
  console.log('SUCCESS: All files accounted for in curriculum sequence.');
}

// ---------------------------------------------------------------------
// WRITE SIDEBARS.TS
// ---------------------------------------------------------------------

function formatItems(itemsList) {
  return itemsList.map(item => `    '${item}'`).join(',\n');
}

function buildSidebarCategory(label, items, collapsed = true) {
  return `    {
      type: 'category',
      label: '${label}',
      collapsed: ${collapsed},
      items: [
${formatItems(items)}
      ]
    }`;
}

const sidebarContent = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  foundationSidebar: [
${formatItems(itFoundationSequence.map(toDocusaurusId))}
  ],

  dvaSidebar: [
    'developer-associate/dva-roadmap',
${dvaPhases.filter(p => !p.label.toLowerCase().includes('mock') && !p.label.toLowerCase().includes('practice') && !p.label.startsWith('Phase 0')).map(p => {
  return buildSidebarCategory(p.label, p.items, false);
}).join(',\n')}
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
${saaPhases.filter(p => !p.label.toLowerCase().includes('practice') && !p.label.toLowerCase().includes('reviews')).map((p, idx) => {
  return buildSidebarCategory(p.label, p.items, idx !== 0);
}).join(',\n')}
  ],

  saaPracticeSidebar: [
${saaPhases.filter(p => p.label.toLowerCase().includes('practice') || p.label.toLowerCase().includes('reviews')).map((p, idx) => {
  return buildSidebarCategory(p.label, p.items, false);
}).join(',\n')}
  ],

  tutorialSidebar: [
    'solutions-architect-professional/sap-roadmap',
    'solutions-architect-professional/well-architected-framework',
${sapPhases.filter(p => !p.label.toLowerCase().includes('mock') && !p.label.toLowerCase().includes('practice')).map((p, idx) => {
  return buildSidebarCategory(p.label, p.items, idx !== 0);
}).join(',\n')}
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
${formatItems(matricesFiles.map(toDocusaurusId))}
  ],

  workshopsSidebar: [
${formatItems(workshopsFiles.map(toDocusaurusId))}
  ],

  strategySidebar: [
${formatItems(strategyFiles.map(toDocusaurusId))}
  ]
};

export default sidebars;
`;

fs.writeFileSync(sidebarsPath, sidebarContent, 'utf8');
console.log('Successfully wrote sidebars.ts');

// ---------------------------------------------------------------------
// INJECT CONTENT NAVIGATION
// ---------------------------------------------------------------------

function stripNavigation(content) {
  const navSectionRegex = /##\s+Prerequisites[\s\S]*$/m;
  let cleaned = content.replace(navSectionRegex, '').trim();
  const lines = cleaned.split('\n');
  while (lines.length > 0) {
    const lastLine = lines[lines.length - 1].trim();
    if (lastLine === '' || lastLine === '---' || lastLine === '***' || lastLine === '___') {
      lines.pop();
    } else {
      break;
    }
  }
  return lines.join('\n').trim();
}

const cleanName = (filename) => filename.toLowerCase().replace(/^(aws|amazon)\s+/, '').trim();

curriculumSequence.forEach((file, index) => {
  let content = fs.readFileSync(file, 'utf8');
  content = stripNavigation(content);

  const dirName = path.dirname(file);
  const relPath = path.relative(docsDir, file).replace(/\\/g, '/');

  // 1. Prerequisites (previous in sequence)
  const prereqs = [];
  if (index > 0) {
    const prevFile = curriculumSequence[index - 1];
    const relToPrev = path.relative(dirName, prevFile).replace(/\\/g, '/');
    prereqs.push(`- [${titleMap[prevFile]}](${relToPrev})`);
  }

  // Cross-account reference matching for SAP -> DVA
  const parts = relPath.split('/');
  if (parts[0] === '02-solutions-architect-professional') {
    const cleanSap = cleanName(path.basename(file));
    const matchingDva = curriculumSequence.find(f => {
      const relF = path.relative(docsDir, f).replace(/\\/g, '/');
      return relF.startsWith('01-developer-associate/') && cleanName(path.basename(f)) === cleanSap;
    });
    if (matchingDva) {
      const relToDva = path.relative(dirName, matchingDva).replace(/\\/g, '/');
      prereqs.push(`- [AWS Developer Associate: ${titleMap[matchingDva]}](${relToDva}) (Fundamental Concept)`);
    }
  }

  // 2. Recommended Next Topics (next in sequence)
  const nextTopics = [];
  if (index < curriculumSequence.length - 1) {
    const nextFile = curriculumSequence[index + 1];
    const relToNext = path.relative(dirName, nextFile).replace(/\\/g, '/');
    nextTopics.push(`- [${titleMap[nextFile]}](${relToNext})`);
  } else {
    nextTopics.push(`- Congratulations! You have completed the AWS Study Library curriculum.`);
  }

  // 3. Related Topics (up to 3 in same folder)
  const related = [];
  const sameDirFiles = curriculumSequence.filter(f => f !== file && path.dirname(f) === dirName);
  const selected = sameDirFiles.slice(0, 3);
  selected.forEach(relFile => {
    const relToRel = path.relative(dirName, relFile).replace(/\\/g, '/');
    related.push(`- [${titleMap[relFile]}](${relToRel})`);
  });

  // Fallback to parent directory if folder is empty
  if (related.length === 0) {
    const parentDir = path.dirname(dirName);
    const peerFiles = curriculumSequence.filter(f => f !== file && path.dirname(path.dirname(f)) === parentDir);
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

  fs.writeFileSync(file, content + navBlock, 'utf8');
  console.log(`Injected navigation into: ${relPath}`);
});

console.log('REORDERING AND NAVIGATION LINK INJECTION COMPLETED SUCCESSFULLY.');
