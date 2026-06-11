const fs = require('fs');
const path = require('path');

const directory = 'docs/Practice Exams';

const filesData = [
  ['SAP-C02 Mock Exam.md', 'Overview'],
  ['SAP-C02 Mock Exam - Part 1.md', 'Part 1 (Questions 1-25)'],
  ['SAP-C02 Mock Exam - Part 2.md', 'Part 2 (Questions 26-50)'],
  ['SAP-C02 Mock Exam - Part 3.md', 'Part 3 (Questions 51-75)'],
  ['SAP-C02 Mock Exam 2 - Part 1.md', 'Part 1 (Questions 1-25)'],
  ['SAP-C02 Mock Exam 2 - Part 2.md', 'Part 2 (Questions 26-50)'],
  ['SAP-C02 Mock Exam 2 - Part 3.md', 'Part 3 (Questions 51-75)'],
  ['SAP-C02 Mock Exam 3 - Part 1.md', 'Part 1 (Questions 1-25)'],
  ['SAP-C02 Mock Exam 3 - Part 2.md', 'Part 2 (Questions 26-50)'],
  ['SAP-C02 Mock Exam 3 - Part 3.md', 'Part 3 (Questions 51-75)']
];

filesData.forEach(([filename, label]) => {
  const filepath = path.join(directory, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`File not found: ${filepath}`);
    return;
  }

  const content = fs.readFileSync(filepath, 'utf8');

  // Locate front matter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (match) {
    const frontMatter = match[1];
    let newFrontMatter = '';
    if (!frontMatter.includes('sidebar_label:')) {
      newFrontMatter = frontMatter.trim() + `\nsidebar_label: ${label}`;
    } else {
      const lines = frontMatter.split('\n');
      const newLines = lines.map(line => {
        if (line.startsWith('sidebar_label:')) {
          return `sidebar_label: ${label}`;
        }
        return line;
      });
      newFrontMatter = newLines.join('\n');
    }
    const newContent = `---\n${newFrontMatter}\n---` + content.substring(match[0].length);
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log(`Updated ${filename} with sidebar_label: ${label}`);
  } else {
    // No front matter found, create one
    const newContent = `---\nsidebar_label: ${label}\n---\n\n` + content;
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log(`Created front matter and added sidebar_label for ${filename}`);
  }
});
