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
  { old: /docs\/00-it-foundation/g, new: 'docs/it-foundation' },
  { old: /docs\/01-developer-associate/g, new: 'docs/developer-associate' },
  { old: /docs\/02-solutions-architect-professional/g, new: 'docs/solutions-architect-professional' },
  { old: /docs\/03-architecture-decision-frameworks/g, new: 'docs/architecture-decision-frameworks' },
  { old: /docs\/04-architecture-workshops/g, new: 'docs/architecture-workshops' },
  { old: /docs\/05-exam-strategy/g, new: 'docs/exam-strategy' }
];

console.log('Fixing prefix-based web URLs in markdown files...');

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
    console.log(`Updated links in: ${rel}`);
    fixCount++;
  }
});

console.log(`Successfully updated prefix-stripped URLs in ${fixCount} files.`);
