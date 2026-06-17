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
console.log(`Scanning ${allMdFiles.length} markdown files in SAA-C03 directory for unescaped MDX '<' characters...`);

function escapeMdxChars(content) {
  let inCodeBlock = false;
  let inInlineCode = false;
  let result = '';
  let escapeCount = 0;
  
  for (let i = 0; i < content.length; i++) {
    // Check for triple backticks (code block)
    if (content.substring(i, i + 3) === '```') {
      inCodeBlock = !inCodeBlock;
      result += '```';
      i += 2;
      continue;
    }
    
    // Check for single backtick (inline code)
    if (content[i] === '`' && !inCodeBlock) {
      inInlineCode = !inInlineCode;
      result += '`';
      continue;
    }
    
    // Check for '<' character
    if (content[i] === '<' && !inCodeBlock && !inInlineCode) {
      // Look ahead to see if it is a valid HTML/JSX tag or comment
      const lookAhead = content.substring(i + 1, i + 20);
      // Valid tags start with a letter (a-z, A-Z) or a slash, or exclamation (comment <!--)
      const isTag = /^[a-zA-Z/!]/.test(lookAhead);
      
      if (!isTag) {
        result += '\\<';
        escapeCount++;
      } else {
        result += '<';
      }
    } else {
      result += content[i];
    }
  }
  return { result, escapeCount };
}

let totalEscaped = 0;
let modifiedFilesCount = 0;

allMdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const { result, escapeCount } = escapeMdxChars(content);
  
  if (escapeCount > 0) {
    fs.writeFileSync(file, result, 'utf8');
    const relativePath = path.relative(docsDir, file).replace(/\\/g, '/');
    console.log(`[ESCAPED] In "${relativePath}": Escaped ${escapeCount} '<' character(s)`);
    totalEscaped += escapeCount;
    modifiedFilesCount++;
  }
});

console.log(`\nMDX escape compilation run complete!`);
console.log(`Total files modified: ${modifiedFilesCount}`);
console.log(`Total characters escaped: ${totalEscaped}`);
process.exit(0);
