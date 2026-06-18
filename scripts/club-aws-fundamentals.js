const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, '../docs');
const targetDir = path.join(docsDir, '00-it-foundation/10-aws-fundamentals');

const readmePath = path.join(targetDir, 'README.md');
const cloudComputingPath = path.join(targetDir, 'cloud-computing.md');
const fastLearnPath = path.join(targetDir, 'FAST-LEARN.md');
const ultraFastPath = path.join(targetDir, 'ULTRA-FAST-LEARN.md');
const diagramsPath = path.join(targetDir, 'DIAGRAMS.md');
const practicePath = path.join(targetDir, 'PRACTICE-QUESTIONS.md');

// Helper to clean navigation sections from markdown files
function cleanMarkdown(content) {
  // Remove Prerequisites and anything after it
  const navSectionRegex = /##\s+Prerequisites[\s\S]*$/m;
  content = content.replace(navSectionRegex, '');
  
  // Remove H1 headers if they are at the top
  content = content.replace(/^#\s+.+$/m, '');
  
  return content.trim();
}

console.log('Reading files...');

const origReadme = fs.readFileSync(readmePath, 'utf8');
const cloudComputing = fs.readFileSync(cloudComputingPath, 'utf8');
const fastLearn = fs.readFileSync(fastLearnPath, 'utf8');
const ultraFast = fs.readFileSync(ultraFastPath, 'utf8');
const diagrams = fs.readFileSync(diagramsPath, 'utf8');
const practice = fs.readFileSync(practicePath, 'utf8');

console.log('Processing and merging content...');

let unifiedContent = `---
title: AWS Fundamentals & Cloud Computing
sidebar_label: 10 / AWS Fundamentals
sidebar_position: 10
displayed_sidebar: foundationSidebar
---

# AWS Fundamentals & Cloud Computing

Welcome to the unified AWS Fundamentals guide. This document combines Cloud Computing foundations, AWS Global Infrastructure, the AWS Well-Architected Framework, the Shared Responsibility Model, Account Governance, study summaries, architecture diagrams, and exam-style practice questions.

## Table of Contents

1. [Introduction to Cloud Computing](#1-introduction-to-cloud-computing)
2. [AWS Global Infrastructure](#2-aws-global-infrastructure)
3. [AWS Management Tools](#3-aws-management-tools)
4. [AWS Well-Architected Framework](#4-aws-well-architected-framework)
5. [Shared Responsibility Model](#5-shared-responsibility-model)
6. [AWS Account Management & Governance](#6-aws-account-management--governance)
7. [AWS Service Categories Overview](#7-aws-service-categories-overview)
8. [⚡ Fast-Track Study Guide](#8-⚡-fast-track-study-guide)
9. [🚀 Ultra-Fast Learning Cheat Sheet](#9-🚀-ultra-fast-learning-cheat-sheet)
10. [📊 Architecture & Flow Diagrams](#10-📊-architecture--flow-diagrams)
11. [📝 Exam-Standard Practice Questions](#11-📝-exam-standard-practice-questions)

---

## 1. Introduction to Cloud Computing

${cleanMarkdown(cloudComputing)
  .replace(/^##\s+/gm, '### 1.')
  .replace(/^###\s+/gm, '#### 1.')}

---

## 2. AWS Global Infrastructure

${cleanMarkdown(origReadme)
  .substring(origReadme.indexOf('## 1. AWS Global Infrastructure'))
  // extract only up to "## 2. AWS Management Tools"
  .split('## 2. AWS Management Tools')[0]
  .replace(/## 1\./g, '### 2.')
  .replace(/### 1\./g, '#### 2.')
  .trim()}

---

## 3. AWS Management Tools

${cleanMarkdown(origReadme)
  .substring(origReadme.indexOf('## 2. AWS Management Tools'))
  .split('## 3. AWS Well-Architected Framework')[0]
  .replace(/## 2\./g, '### 3.')
  .replace(/### 2\./g, '#### 3.')
  .trim()}

---

## 4. AWS Well-Architected Framework

${cleanMarkdown(origReadme)
  .substring(origReadme.indexOf('## 3. AWS Well-Architected Framework'))
  .split('## 4. Shared Responsibility Model')[0]
  .replace(/## 3\./g, '### 4.')
  .replace(/### 3\./g, '#### 4.')
  .trim()}

---

## 5. Shared Responsibility Model

${cleanMarkdown(origReadme)
  .substring(origReadme.indexOf('## 4. Shared Responsibility Model'))
  .split('## 5. AWS Account Management')[0]
  .replace(/## 4\./g, '### 5.')
  .replace(/### 4\./g, '#### 5.')
  .trim()}

---

## 6. AWS Account Management & Governance

${cleanMarkdown(origReadme)
  .substring(origReadme.indexOf('## 5. AWS Account Management'))
  .split('## 6. AWS Service Categories')[0]
  .replace(/## 5\./g, '### 6.')
  .replace(/### 5\./g, '#### 6.')
  .trim()}

---

## 7. AWS Service Categories Overview

${cleanMarkdown(origReadme)
  .substring(origReadme.indexOf('## 6. AWS Service Categories'))
  .split('## 🎯 Exam Tips')[0] // split before old exam tips
  .replace(/## 6\./g, '### 7.')
  .replace(/### 6\./g, '#### 7.')
  .trim()}

---

## 8. ⚡ Fast-Track Study Guide

${cleanMarkdown(fastLearn)
  .replace(/^##\s+/gm, '### 8.')
  .replace(/^###\s+/gm, '#### 8.')}

---

## 9. 🚀 Ultra-Fast Learning Cheat Sheet

${cleanMarkdown(ultraFast)
  .replace(/^##\s+/gm, '### 9.')
  .replace(/^###\s+/gm, '#### 9.')}

---

## 10. 📊 Architecture & Flow Diagrams

${cleanMarkdown(diagrams)
  .replace(/^##\s+/gm, '### 10.')
  .replace(/^###\s+/gm, '#### 10.')}

---

## 11. 📝 Exam-Standard Practice Questions

${cleanMarkdown(practice)
  .replace(/^##\s+/gm, '### 11.')
  .replace(/^###\s+/gm, '#### 11.')}

---

## Prerequisites

- [Module 9: Security Foundations](../9-security-foundations.md)

## Recommended Next Topics

- [AWS AI Practitioner Study Roadmap](../../01-ai-practitioner/aif-roadmap.md)
- [AWS Developer Associate Study Roadmap](../../01-developer-associate/dva-roadmap.md)
- [AWS Solutions Architect Associate Study Roadmap](../../01-solutions-architect-associate/saa-roadmap.md)
`;

// Save unified README.md
fs.writeFileSync(readmePath, unifiedContent, 'utf8');
console.log('Successfully wrote unified README.md!');

// Delete other files
console.log('Deleting consolidated files...');
[cloudComputingPath, fastLearnPath, ultraFastPath, diagramsPath, practicePath].forEach(fp => {
  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
    console.log(`Deleted: ${path.basename(fp)}`);
  }
});

// Fix all references in the workspace
console.log('Updating links in other files...');
function getMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getMdFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getMdFiles(docsDir);
let fixedLinksCount = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = content;
  
  // replace links
  const replacements = [
    { from: /10-aws-fundamentals\/cloud-computing\.md/g, to: '10-aws-fundamentals/README.md#1-introduction-to-cloud-computing' },
    { from: /10-aws-fundamentals\/FAST-LEARN\.md/g, to: '10-aws-fundamentals/README.md#8-⚡-fast-track-study-guide' },
    { from: /10-aws-fundamentals\/ULTRA-FAST-LEARN\.md/g, to: '10-aws-fundamentals/README.md#9-🚀-ultra-fast-learning-cheat-sheet' },
    { from: /10-aws-fundamentals\/DIAGRAMS\.md/g, to: '10-aws-fundamentals/README.md#10-📊-architecture--flow-diagrams' },
    { from: /10-aws-fundamentals\/PRACTICE-QUESTIONS\.md/g, to: '10-aws-fundamentals/README.md#11-📝-exam-standard-practice-questions' }
  ];
  
  replacements.forEach(r => {
    if (r.from.test(updated)) {
      updated = updated.replace(r.from, r.to);
    }
  });

  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Updated links in: ${path.relative(docsDir, file)}`);
    fixedLinksCount++;
  }
});

console.log(`Finished link routing. Updated ${fixedLinksCount} files.`);
process.exit(0);
