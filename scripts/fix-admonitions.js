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

let fixedCount = 0;

mdFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  const isCrlf = content.includes('\r\n');
  const nl = isCrlf ? '\r\n' : '\n';

  // Match: > [!TIP] followed by a line starting with > and some text
  // We make sure it doesn't match if there's already an empty > line.
  const regex = /^>\s*\[\!(TIP|WARNING|NOTE|IMPORTANT|CAUTION)\]\r?\n>\s*([^\r\n\s]+[^\r\n]*)/gm;

  content = content.replace(regex, (match, type, text) => {
    return `> [!${type}]${nl}>${nl}> ${text}`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed alerts in: ${path.relative(docsDir, file).replace(/\\/g, '/')}`);
    fixedCount++;
  }
});

console.log(`Admonition Alert formatting completed: updated ${fixedCount} files.`);
