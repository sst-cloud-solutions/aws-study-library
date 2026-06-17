const fs = require('fs');
const path = require('path');

function getFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fmText = match[1];
  const fm = {};
  fmText.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
      fm[key] = val;
    }
  });
  return fm;
}

function scanDir(dir, results = []) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      scanDir(filePath, results);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = getFrontMatter(content);
      // If no title in front matter, look for # Title
      let title = fm.title || fm.sidebar_label;
      if (!title) {
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch) title = titleMatch[1].trim();
      }
      results.push({
        path: filePath,
        filename: file,
        title: title || file.replace(/\.md$/, ''),
        size: stat.size
      });
    }
  });
  return results;
}

const docsDir = path.resolve(__dirname, '../docs');
const allDocs = scanDir(docsDir);

const byTitle = {};
allDocs.forEach(doc => {
  const normTitle = doc.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!byTitle[normTitle]) byTitle[normTitle] = [];
  byTitle[normTitle].push(doc);
});

let report = '--- Duplicate Topics (by Title) ---\n';
let duplicatesCount = 0;
for (const title in byTitle) {
  if (byTitle[title].length > 1) {
    duplicatesCount++;
    report += `\nNormalized Title: "${title}" (Raw titles: ${byTitle[title].map(d => d.title).join(', ')})\n`;
    byTitle[title].forEach(d => {
      report += `  - Path: ${path.relative(docsDir, d.path).replace(/\\/g, '/')} (Size: ${d.size} bytes)\n`;
    });
  }
}
report += `\nTotal duplicate topics: ${duplicatesCount}\n`;

fs.writeFileSync(path.resolve(__dirname, 'duplicates-report.txt'), report, 'utf8');
console.log('Duplicate report generated in scripts/duplicates-report.txt');

