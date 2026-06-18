const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');

if (!fs.existsSync(docsDir)) {
  console.error(`Error: Docs directory does not exist at ${docsDir}`);
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

const allMdFiles = getFiles(docsDir);
console.log(`Scanning ${allMdFiles.length} markdown files in docs directory for unclosed <br> or <hr> tags...`);

let fixedFilesCount = 0;
let totalReplacedBr = 0;
let totalReplacedHr = 0;

allMdFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Count matches
  const brMatches = content.match(/<br\s*(?!\/)>/gi);
  const hrMatches = content.match(/<hr\s*(?!\/)>/gi);

  if (brMatches) totalReplacedBr += brMatches.length;
  if (hrMatches) totalReplacedHr += hrMatches.length;

  content = content.replace(/<br\s*(?!\/)>/gi, '<br />');
  content = content.replace(/<hr\s*(?!\/)>/gi, '<hr />');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    const relativePath = path.relative(docsDir, file).replace(/\\/g, '/');
    console.log(`[FIXED] In "${relativePath}": Replaced ${(brMatches ? brMatches.length : 0)} <br> and ${(hrMatches ? hrMatches.length : 0)} <hr> tags`);
    fixedFilesCount++;
  }
});

console.log(`\nSelf-closing HTML tags run complete!`);
console.log(`Total files modified: ${fixedFilesCount}`);
console.log(`Total <br> tags closed: ${totalReplacedBr}`);
console.log(`Total <hr> tags closed: ${totalReplacedHr}`);
process.exit(0);
