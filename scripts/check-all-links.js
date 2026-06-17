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
console.log(`Scanning ${allMdFiles.length} markdown files for broken links...`);

let totalLinksChecked = 0;
let brokenLinksCount = 0;

allMdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);

  let pos = 0;
  while (true) {
    const startIdx = content.indexOf('[', pos);
    if (startIdx === -1) break;
    pos = startIdx + 1;

    // Balance brackets for link text
    let bracketCount = 1;
    let labelEndIdx = -1;
    for (let i = startIdx + 1; i < content.length; i++) {
      if (content[i] === '[') bracketCount++;
      else if (content[i] === ']') bracketCount--;

      if (bracketCount === 0) {
        labelEndIdx = i;
        break;
      }
    }
    if (labelEndIdx === -1) continue;

    // Check if next char is '('
    if (labelEndIdx + 1 >= content.length || content[labelEndIdx + 1] !== '(') {
      continue;
    }

    // Balance parentheses for URL
    let parenCount = 1;
    let urlEndIdx = -1;
    for (let i = labelEndIdx + 2; i < content.length; i++) {
      if (content[i] === '(') parenCount++;
      else if (content[i] === ')') parenCount--;

      if (parenCount === 0) {
        urlEndIdx = i;
        break;
      }
    }
    if (urlEndIdx === -1) continue;

    const linkText = content.substring(startIdx + 1, labelEndIdx);
    const rawUrl = content.substring(labelEndIdx + 2, urlEndIdx).trim();

    // Ignore web URLs, anchors, mailto
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.startsWith('mailto:') || rawUrl.startsWith('#')) {
      continue;
    }

    totalLinksChecked++;

    let targetPath;
    if (rawUrl.startsWith('file:///')) {
      const filepathPart = rawUrl.substring(8).split('#')[0].split('?')[0];
      let decoded;
      try {
        decoded = decodeURIComponent(filepathPart);
      } catch (e) {
        decoded = filepathPart;
      }
      targetPath = path.resolve(decoded);
    } else {
      const cleanUrl = rawUrl.split('#')[0].split('?')[0];
      if (!cleanUrl) {
        continue; // Skip pure anchor links
      }

      let decodedUrl;
      try {
        decodedUrl = decodeURIComponent(cleanUrl);
      } catch (e) {
        decodedUrl = cleanUrl;
      }
      targetPath = path.resolve(dir, decodedUrl);
    }

    if (!fs.existsSync(targetPath)) {
      brokenLinksCount++;
      const relativeSource = path.relative(docsDir, file).replace(/\\/g, '/');
      console.log(`[BROKEN] In "${relativeSource}": [${linkText}](${rawUrl}) -> File does not exist at "${targetPath}"`);
    }
  }
});

console.log(`\nLink Check Completed:`);
console.log(`Total links checked: ${totalLinksChecked}`);
console.log(`Broken links found: ${brokenLinksCount}`);

if (brokenLinksCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
