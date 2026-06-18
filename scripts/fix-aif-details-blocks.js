const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../docs/01-ai-practitioner/practice-test');

if (!fs.existsSync(dir)) {
  console.error(`Error: Directory does not exist at ${dir}`);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
console.log(`Re-formatting details blocks in ${files.length} practice test files...`);

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix typical typo </details (missing closing bracket) if present
  content = content.replace(/<\/details(?!\s*>)/gi, '</details>');

  // Split into lines
  const lines = content.split(/\r?\n/);
  const newLines = [];
  
  let insideDetails = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trim();
    
    // Check if details block starts
    if (trimmed.startsWith('<details') && trimmed.includes('<summary')) {
      insideDetails = true;
      
      let summaryText = 'Answer';
      const summaryMatch = trimmed.match(/<summary[^>]*>(.*?)<\/summary>/i);
      if (summaryMatch) {
        summaryText = summaryMatch[1].trim();
      }
      
      newLines.push('<details>');
      newLines.push(`<summary>${summaryText}</summary>`);
      newLines.push(''); // blank line after summary for MDX parser
      continue;
    }
    
    // Check if details block ends
    if (trimmed === '</details>') {
      insideDetails = false;
      // Ensure there's a blank line before </details>
      if (newLines.length > 0 && newLines[newLines.length - 1] !== '') {
        newLines.push('');
      }
      newLines.push('</details>');
      continue;
    }
    
    if (insideDetails) {
      // Strip leading indentation from explanation content inside details tag
      let cleanLine = line;
      if (line.startsWith('      ')) {
        cleanLine = line.substring(6);
      } else if (line.startsWith('    ')) {
        cleanLine = line.substring(4);
      } else if (line.startsWith('  ')) {
        cleanLine = line.substring(2);
      } else {
        cleanLine = line.trim();
      }
      newLines.push(cleanLine);
    } else {
      newLines.push(line);
    }
  }
  
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`[FORMATTED DETAILS] in ${file}`);
});

console.log(`\nDetails blocks re-formatting complete!`);
process.exit(0);
