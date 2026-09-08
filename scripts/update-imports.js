import fs from 'fs/promises';
import path from 'path';

async function walkDir(dir) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const file of list) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(await walkDir(fullPath));
    } else if (/\.(ts|tsx|js|jsx)$/i.test(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function updateImports() {
  const srcDir = path.resolve('./src');
  const files = await walkDir(srcDir);
  let updatedCount = 0;
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    // We want to replace paths that have .png, .jpeg, .jpg with .webp
    const updated = content.replace(/(['"])([^'"]+?)\.(png|jpeg|jpg)\1/gi, (match, quote, p1, ext) => {
       if (p1.includes('assets/')) {
           return `${quote}${p1}.webp${quote}`;
       }
       return match;
    });
    if (content !== updated) {
      await fs.writeFile(file, updated, 'utf8');
      console.log(`Updated ${file}`);
      updatedCount++;
    }
  }
  console.log(`Total files updated: ${updatedCount}`);
}

updateImports().catch(console.error);
