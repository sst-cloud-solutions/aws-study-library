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
console.log(`Scanning ${allMdFiles.length} markdown files in SAA-C03 directory...`);

// Map to find unique files by their basename (lowercase)
const basenameMap = new Map();
allMdFiles.forEach(file => {
  const base = path.basename(file).toLowerCase();
  if (!basenameMap.has(base)) {
    basenameMap.set(base, []);
  }
  basenameMap.get(base).push(file);
});

const githubRepo = 'https://github.com/ChathurangaVKD/AWS-Certified-Solutions-Architect-Associate-SAA-C03';

let totalLinksChecked = 0;
let fixedLinksCount = 0;

allMdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  let updatedContent = content;
  let modified = false;

  // Regex to match Markdown links: [text](url)
  // We balance parentheses inside the url manually or use a regex
  // Let's use a regex that matches [label](url) where url does not contain unescaped parens
  // or use the parser logic from check-all-links.js for safety.
  
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

    totalLinksChecked++;

    let cleanUrl = rawUrl.split('#')[0].split('?')[0];
    const anchorAndQuery = rawUrl.substring(cleanUrl.length);

    let decodedUrl;
    try {
      decodedUrl = decodeURIComponent(cleanUrl);
    } catch (e) {
      decodedUrl = cleanUrl;
    }

    let targetPath = path.resolve(dir, decodedUrl);

    // If file exists, then the link is fine
    if (fs.existsSync(targetPath)) {
      continue;
    }

    // Heuristics to fix the broken link
    let newUrl = null;

    // 1. Repo specific files
    const basenameUrl = path.basename(decodedUrl);
    const lowercaseBase = basenameUrl.toLowerCase();
    
    if (lowercaseBase === 'contributing.md') {
      newUrl = `${githubRepo}/blob/main/CONTRIBUTING.md`;
    } else if (lowercaseBase === 'contributors.md') {
      newUrl = `${githubRepo}/blob/main/CONTRIBUTORS.md`;
    } else if (lowercaseBase === 'license') {
      newUrl = `${githubRepo}/blob/main/LICENSE`;
    } else if (lowercaseBase === 'content-policy.md') {
      newUrl = `${githubRepo}/blob/main/CONTENT-POLICY.md`;
    } else if (rawUrl.includes('/issues')) {
      newUrl = `${githubRepo}/issues`;
    } else if (rawUrl.includes('/discussions')) {
      newUrl = `${githubRepo}/discussions`;
    } 
    // 2. 00-CATEGORIZATION-COMPLETE.md -> 00-CATEGORIZATION-INDEX.md
    else if (lowercaseBase === '00-categorization-complete.md') {
      newUrl = rawUrl.replace('00-CATEGORIZATION-COMPLETE.md', '00-CATEGORIZATION-INDEX.md');
    }
    // 3. Check if prepending "../" or removing "../" helps
    else {
      // Let's check if prepending "../" works
      const testPrepend = path.resolve(dir, '../' + decodedUrl);
      if (fs.existsSync(testPrepend)) {
        newUrl = '../' + rawUrl;
      } else {
        // Let's check if prepending "../../" works
        const testPrepend2 = path.resolve(dir, '../../' + decodedUrl);
        if (fs.existsSync(testPrepend2)) {
          newUrl = '../../' + rawUrl;
        } else {
          // 4. Fallback: Search for the unique file by name in the entire track
          const matches = basenameMap.get(lowercaseBase);
          if (matches && matches.length === 1) {
            const destFile = matches[0];
            let relativePath = path.relative(dir, destFile).replace(/\\/g, '/');
            if (!relativePath.startsWith('.')) {
              relativePath = './' + relativePath;
            }
            newUrl = relativePath + anchorAndQuery;
          } else if (lowercaseBase === 'readme.md') {
            // README.md is special. If we are under exam-reviews, README.md might refer to saa-roadmap.md at the root
            // or exam-reviews/README.md.
            // Let's find if exam-reviews/README.md exists relative to current
            const testExamReviewsReadme = path.resolve(dir, '../README.md');
            if (fs.existsSync(testExamReviewsReadme)) {
              newUrl = '../README.md' + anchorAndQuery;
            } else {
              const testRoadmap = path.resolve(dir, '../../saa-roadmap.md');
              if (fs.existsSync(testRoadmap)) {
                newUrl = '../../saa-roadmap.md' + anchorAndQuery;
              } else {
                const testRoadmapRoot = path.resolve(docsDir, 'saa-roadmap.md');
                let relativePath = path.relative(dir, testRoadmapRoot).replace(/\\/g, '/');
                if (!relativePath.startsWith('.')) {
                  relativePath = './' + relativePath;
                }
                newUrl = relativePath + anchorAndQuery;
              }
            }
          }
        }
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

  // Replace links from back to front to preserve offsets
  if (linksToReplace.length > 0) {
    for (let i = linksToReplace.length - 1; i >= 0; i--) {
      const { startIdx, endIdx, oldUrl, newUrl } = linksToReplace[i];
      updatedContent = updatedContent.substring(0, startIdx) + newUrl + updatedContent.substring(endIdx);
      console.log(`[FIXED] In "${path.relative(docsDir, file).replace(/\\/g, '/')}": "${oldUrl}" -> "${newUrl}"`);
      fixedLinksCount++;
    }
    fs.writeFileSync(file, updatedContent, 'utf8');
  }
});

console.log(`\nLink fixing completed!`);
console.log(`Total links checked: ${totalLinksChecked}`);
console.log(`Broken links fixed: ${fixedLinksCount}`);
process.exit(0);
