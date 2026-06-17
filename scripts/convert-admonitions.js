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

const mdFiles = getFiles(docsDir);
console.log(`Scanning ${mdFiles.length} files...`);

let updatedCount = 0;

mdFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  const lines = content.split(/\r?\n/);
  const resultLines = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    // Match: > [!TIP] or other types (case-insensitive)
    const match = line.match(/^\s*>\s*\[\!(TIP|WARNING|NOTE|IMPORTANT|CAUTION)\]\s*$/i);

    if (match) {
      const type = match[1].toUpperCase();
      let docusaurusType = type.toLowerCase();
      if (docusaurusType === 'important') docusaurusType = 'info';
      if (docusaurusType === 'caution') docusaurusType = 'danger';

      const blockLines = [];
      i++; // Move to next line

      while (i < lines.length) {
        const nextLine = lines[i];
        const nextMatch = nextLine.match(/^\s*>\s?(.*)$/);
        if (nextMatch) {
          blockLines.push(nextMatch[1]);
          i++;
        } else {
          break; // Blockquote block ended
        }
      }

      // Strip empty lines at start and end
      while (blockLines.length > 0 && blockLines[0].trim() === '') {
        blockLines.shift();
      }
      while (blockLines.length > 0 && blockLines[blockLines.length - 1].trim() === '') {
        blockLines.pop();
      }

      resultLines.push(`:::${docusaurusType}`);
      blockLines.forEach(l => resultLines.push(l));
      resultLines.push(`:::`);
    } else {
      resultLines.push(line);
      i++;
    }
  }

  const isCrlf = content.includes('\r\n');
  const newContent = resultLines.join(isCrlf ? '\r\n' : '\n');

  if (newContent !== original) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Converted admonitions in: ${path.relative(docsDir, file).replace(/\\/g, '/')}`);
    updatedCount++;
  }
});

console.log(`Successfully converted admonitions in ${updatedCount} files.`);
