const fs = require('fs');
const path = require('path');

// Helper to write files and create folders if they don't exist
function writeMarkdownFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Generated: ${filePath}`);
}

// Import modular databases
const dbDva = require('./db-dva.js');
const dbSap = require('./db-sap.js');
const dbMatrices = require('./db-matrices.js');
const dbWorkshops = require('./db-workshops.js');
const dbStrategy = require('./db-strategy.js');

// ---------------------------------------------------------------------
// TEMPLATE ENGINE FUNCTIONS
// ---------------------------------------------------------------------

function generateServicePage(page) {
  return `---
title: "${page.title}"
sidebar_label: "${page.title}"
---

# ${page.title}

## 1. Overview & Real-World Analogy

**Real-World Analogy:** ${page.analogy}

${page.description}

---

## 2. Architecture & Flow Diagram

\`\`\`mermaid
${page.mermaid}
\`\`\`

---

## 3. Comparison & Decision Guidance

${page.comparison}

### When to use
- When designing high-scale, production-ready solutions on AWS.
- To enforce operational excellence and follow security best practices.

### When not to use
- For basic prototyping where native defaults are sufficient.

---

## 4. Key Performance, Cost & Security Considerations

### Performance Impact
${page.performance}

### Cost Impact
${page.cost}

### Security Implications
${page.security}

---

## 5. Exam tips & Traps

> [!TIP]
> **Exam Clues:** ${page.clues}
>
> ${page.tips}

> [!WARNING]
> **Common Exam Traps:** ${page.traps}
`;
}

function generateMatrixPage(matrix) {
  return `---
title: "${matrix.title} Decision Matrix"
sidebar_label: "${matrix.title}"
---

# ${matrix.title} Decision Matrix

Detailed evaluation between architectural options.

## Comparison Table

${matrix.comparison}

## Decision Guidance

${matrix.when_to_use}

${matrix.when_not_to_use}

---

## Key Performance, Cost & Security Considerations

### Performance Impact
${matrix.performance_impact}

### Cost Impact
${matrix.cost_impact}

### Security Implications
${matrix.security_implications}

---

## Exam tips & Traps

> [!TIP]
> **Exam Clues:** ${matrix.exam_clues}

> [!WARNING]
> **Common Exam Traps:** Watch out for configurations that introduce high management overhead or exceed budget boundaries.
`;
}

function generateWorkshopPage(ws) {
  return `---
title: "${ws.title}"
sidebar_label: "${ws.title}"
---

# ${ws.title}

## 1. Scenario & Objectives

${ws.scenario}

---

## 2. Target Architecture

\`\`\`mermaid
${ws.mermaid}
\`\`\`

---

## 3. Step-by-Step Implementation Guide

${ws.step_by_step}

---

## 4. Verification & Testing

${ws.verification}

---

## 5. Cleanup Instructions

${ws.cleanup}
`;
}

function generateStrategyPage(st) {
  return `---
title: "${st.title}"
sidebar_label: "Overview"
---

${st.content}
`;
}

// ---------------------------------------------------------------------
// RUN GENERATION LOOPS
// ---------------------------------------------------------------------

const baseDir = path.resolve(__dirname, '..');

console.log("Starting full content generation run...");

// 1. Developer Associate Pages (23)
dbDva.forEach(page => {
  const filePath = path.join(baseDir, page.path);
  const content = generateServicePage(page);
  writeMarkdownFile(filePath, content);
});

// 2. Solutions Architect Professional Pages (74)
dbSap.forEach(page => {
  const filePath = path.join(baseDir, page.path);
  if (page.isDetailed && fs.existsSync(filePath)) {
    console.log(`Skipping generation for detailed page: ${filePath}`);
    return;
  }
  const content = generateServicePage(page);
  writeMarkdownFile(filePath, content);
});

// 3. Decision Matrices (9)
dbMatrices.forEach(matrix => {
  const filePath = path.join(baseDir, matrix.path);
  const content = generateMatrixPage(matrix);
  writeMarkdownFile(filePath, content);
});

// 4. Workshops (6)
dbWorkshops.forEach(ws => {
  const filePath = path.join(baseDir, ws.path);
  const content = generateWorkshopPage(ws);
  writeMarkdownFile(filePath, content);
});

// 5. Exam Strategy (1)
const strategyFilePath = path.join(baseDir, dbStrategy.path);
const strategyContent = generateStrategyPage(dbStrategy);
writeMarkdownFile(strategyFilePath, strategyContent);

console.log("ALL STUDY LIBRARY EXPANSION PAGES GENERATED SUCCESSFULLY.");
