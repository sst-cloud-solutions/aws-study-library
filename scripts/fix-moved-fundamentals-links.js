const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');

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

const allMdFiles = getFiles(docsDir);
console.log(`Scanning all ${allMdFiles.length} markdown files for relocated AWS Fundamentals links...`);

let totalFixed = 0;

allMdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let updatedContent = content;
  let modified = false;

  const relPath = path.relative(docsDir, file).replace(/\\/g, '/');

  if (relPath === '00-it-foundation/10-aws-fundamentals/README.md') {
    // Fix links originating from the moved AWS Fundamentals README
    if (updatedContent.includes('../02-IAM/')) {
      updatedContent = updatedContent.replace(/\.\.\/02-IAM\//g, '../../01-solutions-architect-associate/02-IAM/');
      modified = true;
    }
    if (updatedContent.includes('../docs/reference/')) {
      updatedContent = updatedContent.replace(/\.\.\/docs\/reference\//g, '../../01-solutions-architect-associate/docs/reference/');
      modified = true;
    }
    if (updatedContent.includes('../saa-roadmap.md')) {
      updatedContent = updatedContent.replace(/\.\.\/saa-roadmap\.md/g, '../../01-solutions-architect-associate/saa-roadmap.md');
      modified = true;
    }
  } else {
    // Fix links pointing TO the moved AWS Fundamentals files from SAA files
    // 1. For saa-roadmap.md:
    if (relPath === '01-solutions-architect-associate/saa-roadmap.md') {
      if (updatedContent.includes('01-AWS-Fundamentals/')) {
        updatedContent = updatedContent.replace(/01-AWS-Fundamentals\//g, '../00-it-foundation/10-aws-fundamentals/');
        modified = true;
      }
    }
    // 2. For 02-IAM/README.md:
    else if (relPath === '01-solutions-architect-associate/02-IAM/README.md') {
      if (updatedContent.includes('../01-AWS-Fundamentals/')) {
        updatedContent = updatedContent.replace(/\.\.\/01-AWS-Fundamentals\//g, '../../00-it-foundation/10-aws-fundamentals/');
        modified = true;
      }
    }
    // 3. For any files nested in SAA subdirectories (docs/ or exam-reviews/)
    else if (relPath.startsWith('01-solutions-architect-associate/')) {
      // replace "../../01-AWS-Fundamentals/" with "../../../00-it-foundation/10-aws-fundamentals/"
      const pattern1 = /\.\.\/\.\.\/01-AWS-Fundamentals\//g;
      const pattern2 = /\.\.\/\.\.\/\/01-AWS-Fundamentals\//g;
      const pattern3 = /\.\.\/\.\.\/\.\/01-AWS-Fundamentals\//g;

      if (pattern1.test(updatedContent)) {
        updatedContent = updatedContent.replace(pattern1, '../../../00-it-foundation/10-aws-fundamentals/');
        modified = true;
      }
      if (pattern2.test(updatedContent)) {
        updatedContent = updatedContent.replace(pattern2, '../../../00-it-foundation/10-aws-fundamentals/');
        modified = true;
      }
      if (pattern3.test(updatedContent)) {
        updatedContent = updatedContent.replace(pattern3, '../../../00-it-foundation/10-aws-fundamentals/');
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`[LINK ROUTED] in ${relPath}`);
    totalFixed++;
  }
});

console.log(`\nFinished routing relocated links. Total files updated: ${totalFixed}`);
process.exit(0);
