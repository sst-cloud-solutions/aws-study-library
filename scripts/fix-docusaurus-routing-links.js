const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs/01-solutions-architect-associate');

if (!fs.existsSync(docsDir)) {
  console.error(`Error: SAA-C03 directory does not exist at ${docsDir}`);
  process.exit(1);
}

// Helper to recursively find all markdown files
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
console.log(`Scanning SAA-C03 markdown files to fix Docusaurus routing and directory links...`);

const roadmapPath = path.join(docsDir, 'saa-roadmap.md');

let totalFixed = 0;

allMdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  let updatedContent = content;
  let modified = false;

  let pos = 0;
  const linksToReplace = []; // { startIdx, endIdx, oldUrl, newUrl }

  while (true) {
    const startIdx = updatedContent.indexOf('[', pos);
    if (startIdx === -1) break;
    pos = startIdx + 1;

    // Balance brackets for link text
    let bracketCount = 1;
    let labelEndIdx = -1;
    for (let i = startIdx + 1; i < updatedContent.length; i++) {
      if (updatedContent[i] === '[') bracketCount++;
      else if (updatedContent[i] === ']') bracketCount--;

      if (bracketCount === 0) {
        labelEndIdx = i;
        break;
      }
    }
    if (labelEndIdx === -1) continue;

    // Check if next char is '('
    if (labelEndIdx + 1 >= updatedContent.length || updatedContent[labelEndIdx + 1] !== '(') {
      continue;
    }

    // Balance parentheses for URL
    let parenCount = 1;
    let urlEndIdx = -1;
    for (let i = labelEndIdx + 2; i < updatedContent.length; i++) {
      if (updatedContent[i] === '(') parenCount++;
      else if (updatedContent[i] === ')') parenCount--;

      if (parenCount === 0) {
        urlEndIdx = i;
        break;
      }
    }
    if (urlEndIdx === -1) continue;

    const rawUrl = updatedContent.substring(labelEndIdx + 2, urlEndIdx).trim();

    // Ignore web URLs, anchors, mailto
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('mailto:') || rawUrl.startsWith('#')) {
      continue;
    }

    let cleanUrl = rawUrl.split('#')[0].split('?')[0];
    const anchorAndQuery = rawUrl.substring(cleanUrl.length);

    let decodedUrl;
    try {
      decodedUrl = decodeURIComponent(cleanUrl);
    } catch (e) {
      decodedUrl = cleanUrl;
    }

    // Handle empty cleanUrl (e.g. [Link](#anchor))
    if (!decodedUrl) {
      continue;
    }

    let targetPath = path.resolve(dir, decodedUrl);
    let newUrl = null;

    // Check if the target resolved path is outside the docs/01-solutions-architect-associate folder
    // e.g. pointing to root README.md
    const relativeToSaaRoot = path.relative(docsDir, targetPath);
    const isOutsideSaa = relativeToSaaRoot.startsWith('..') && !relativeToSaaRoot.startsWith('../docs/01-solutions-architect-associate');

    if (isOutsideSaa) {
      // Redirect to SAA roadmap
      let relRoadmap = path.relative(dir, roadmapPath).replace(/\\/g, '/');
      if (!relRoadmap.startsWith('.')) {
        relRoadmap = './' + relRoadmap;
      }
      newUrl = relRoadmap + anchorAndQuery;
    } else {
      // Check if it's pointing to a directory
      let isDir = false;
      try {
        const stat = fs.statSync(targetPath);
        isDir = stat.isDirectory();
      } catch (e) {
        // If it does not exist, let's check if it ends with '/' or has no extension and is a directory
        if (decodedUrl.endsWith('/') || !path.extname(decodedUrl)) {
          // Check if directory exists
          const testDir = path.resolve(dir, decodedUrl);
          if (fs.existsSync(testDir)) {
            const stat = fs.statSync(testDir);
            isDir = stat.isDirectory();
            targetPath = testDir;
          }
        }
      }

      if (isDir) {
        // Find index file in directory
        let indexFile = 'README.md';
        if (fs.existsSync(path.join(targetPath, 'README.md'))) {
          indexFile = 'README.md';
        } else if (fs.existsSync(path.join(targetPath, '00-CATEGORIZATION-INDEX.md'))) {
          indexFile = '00-CATEGORIZATION-INDEX.md';
        } else {
          // Find first markdown file
          const filesInDir = fs.readdirSync(targetPath);
          const mdFiles = filesInDir.filter(f => f.endsWith('.md'));
          if (mdFiles.length > 0) {
            indexFile = mdFiles[0];
          }
        }
        
        // Construct the new URL by appending the index file name
        let appendPart = decodedUrl.endsWith('/') ? indexFile : '/' + indexFile;
        newUrl = rawUrl + appendPart;
      }
    }

    if (newUrl) {
      linksToReplace.push({
        startIdx: labelEndIdx + 2,
        endIdx: urlEndIdx,
        oldUrl: rawUrl,
        newUrl: newUrl
      });
    }
  }

  // Replace links from back to front
  if (linksToReplace.length > 0) {
    for (let i = linksToReplace.length - 1; i >= 0; i--) {
      const { startIdx, endIdx, oldUrl, newUrl } = linksToReplace[i];
      updatedContent = updatedContent.substring(0, startIdx) + newUrl + updatedContent.substring(endIdx);
      console.log(`[ROUTE FIXED] In "${path.relative(docsDir, file).replace(/\\/g, '/')}": "${oldUrl}" -> "${newUrl}"`);
      totalFixed++;
    }
    fs.writeFileSync(file, updatedContent, 'utf8');
  }
});

console.log(`\nRouting links resolution complete!`);
console.log(`Total routing links fixed: ${totalFixed}`);
process.exit(0);
