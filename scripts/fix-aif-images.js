const fs = require('fs');
const path = require('path');

const aifDir = path.resolve(__dirname, '../docs/01-ai-practitioner');

if (!fs.existsSync(aifDir)) {
  console.error(`Error: AIF directory does not exist at ${aifDir}`);
  process.exit(1);
}

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

const allMdFiles = getFiles(aifDir);
console.log(`Scanning AI Practitioner markdown files to fix image relative links...`);

let totalFixed = 0;

allMdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let updatedContent = content;
  let modified = false;

  // Replace ./../../images/ with ../images/
  if (updatedContent.includes('./../../images/')) {
    updatedContent = updatedContent.replace(/\.\/\.\.\/\.\.\/images\//g, '../images/');
    modified = true;
  }

  // Replace ../../images/ with ../images/
  if (updatedContent.includes('../../images/')) {
    updatedContent = updatedContent.replace(/\.\.\/\.\.\/images\//g, '../images/');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    const relativePath = path.relative(aifDir, file).replace(/\\/g, '/');
    console.log(`[FIXED IMAGE LINKS] in ${relativePath}`);
    totalFixed++;
  }
});

console.log(`\nFinished fixing image links! Total files updated: ${totalFixed}`);
process.exit(0);
