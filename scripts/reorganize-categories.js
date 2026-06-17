const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../docs/02-solutions-architect-professional');

const renames = [
  { oldName: 'Networking and Content Delivery', newName: 'Networking & Content Delivery' },
  { oldName: 'Security, Identity, and Compliance', newName: 'Security, Identity & Compliance' },
  { oldName: 'Management and Governance', newName: 'Management & Governance' },
  { oldName: 'Migration and Transfer', newName: 'Migration & Transfer' }
];

function moveRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      moveRecursive(srcPath, destPath);
    } else {
      // If file already exists in destination, overwrite it
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      fs.renameSync(srcPath, destPath);
    }
  });
}

function removeDirRecursive(dir) {
  if (fs.existsSync(dir)) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const curPath = path.join(dir, item);
      if (fs.statSync(curPath).isDirectory()) {
        removeDirRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

renames.forEach(({ oldName, newName }) => {
  const oldPath = path.join(baseDir, oldName);
  const newPath = path.join(baseDir, newName);

  if (fs.existsSync(oldPath)) {
    console.log(`Moving contents from "${oldName}" to "${newName}"...`);
    moveRecursive(oldPath, newPath);
    console.log(`Removing old directory "${oldName}"...`);
    removeDirRecursive(oldPath);
    console.log(`Successfully restructured "${oldName}" to "${newName}"`);
  } else {
    console.log(`Directory "${oldName}" does not exist, skipping.`);
  }
});
