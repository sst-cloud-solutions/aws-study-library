const fs = require('fs');
const path = require('path');

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

const docsDir = path.resolve(__dirname, '../docs');
const files = getFiles(docsDir);

console.log(`Total markdown files: ${files.length}`);
files.forEach(f => {
  console.log(path.relative(docsDir, f).replace(/\\/g, '/'));
});
