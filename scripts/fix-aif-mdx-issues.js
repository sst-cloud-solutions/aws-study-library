const fs = require('fs');
const path = require('path');

const aifDir = path.resolve(__dirname, '../docs/01-ai-practitioner');

if (!fs.existsSync(aifDir)) {
  console.error(`Error: AIF directory does not exist at ${aifDir}`);
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

const allMdFiles = getFiles(aifDir);
console.log(`Scanning AI Practitioner markdown files for MDX details tags and autolinks...`);

let totalDetailsFixed = 0;
let totalAutolinksFixed = 0;

const autolinkReplacements = [
  {
    old: '<https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-use.html?form=MG0AV3>',
    new: '[Model Customization Use](https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-use.html?form=MG0AV3)'
  },
  {
    old: '<https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html>',
    new: '[Models Supported](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html)'
  },
  {
    old: '<https://docs.aws.amazon.com/lambda/latest/dg/with-s3-tutorial.html>',
    new: '[Lambda with S3 Tutorial](https://docs.aws.amazon.com/lambda/latest/dg/with-s3-tutorial.html)'
  },
  {
    old: '<https://aws.amazon.com/lambda/pricing/>',
    new: '[Lambda Pricing](https://aws.amazon.com/lambda/pricing/)'
  },
  {
    old: '<https://aws.amazon.com/compliance/shared-responsibility-model/>',
    new: '[Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)'
  },
  {
    old: '<https://aws.amazon.com/what-is/reinforcement-learning-from-human-feedback/>',
    new: '[RLHF Overview](https://aws.amazon.com/what-is/reinforcement-learning-from-human-feedback/)'
  },
  {
    old: '<https://aws.amazon.com/blogs/machine-learning/predicting-customer-churn-with-amazon-machine-learning/>',
    new: '[Predicting Customer Churn](https://aws.amazon.com/blogs/machine-learning/predicting-customer-churn-with-amazon-machine-learning/)'
  }
];

allMdFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let updatedContent = content;
  let modified = false;

  // 1. Replace details and summary tag attributes
  if (updatedContent.includes('<details markdown=1>')) {
    updatedContent = updatedContent.replace(/<details markdown=1>/g, '<details>');
    modified = true;
    totalDetailsFixed++;
  }
  if (updatedContent.includes('markdown="span"')) {
    updatedContent = updatedContent.replace(/markdown="span"/g, '');
    modified = true;
  }

  // 2. Replace known autolinks
  autolinkReplacements.forEach(r => {
    if (updatedContent.includes(r.old)) {
      updatedContent = updatedContent.replace(r.old, r.new);
      modified = true;
      totalAutolinksFixed++;
      console.log(`[AUTOLINK FIXED] in ${path.relative(aifDir, file)}: ${r.old} -> ${r.new}`);
    }
  });

  // 3. Fallback for any other <http...> patterns that might be present
  if (/<http[s]?:\/\/[^>]+>/.test(updatedContent)) {
    updatedContent = updatedContent.replace(/<http([s]?:\/\/[^>]+)>/g, 'http$1');
    modified = true;
    totalAutolinksFixed++;
    console.log(`[FALLBACK AUTOLINK STRIPPED] in ${path.relative(aifDir, file)}`);
  }

  if (modified) {
    fs.writeFileSync(file, updatedContent, 'utf8');
  }
});

console.log(`\nFinished resolving MDX issues!`);
console.log(`Total details/summary tags modified: ${totalDetailsFixed}`);
console.log(`Total autolinks fixed/resolved: ${totalAutolinksFixed}`);
process.exit(0);
