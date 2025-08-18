const fs = require('fs');
const path = require('path');

function fixAllIssuesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix 1: Move "use client" directive to the top
    if (content.includes('"use client"') && !content.startsWith('"use client"')) {
      const lines = content.split('\n');
      const newLines = [];
      let useClientFound = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '"use client"') {
          if (!useClientFound) {
            newLines.unshift('"use client"');
            newLines.push('');
            useClientFound = true;
          }
        } else {
          newLines.push(lines[i]);
        }
      }
      
      content = newLines.join('\n');
      modified = true;
    }
    
    // Fix 2: Remove duplicate imports from lucide-react
    const lucideImportRegex = /import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/g;
    const lucideMatches = [...content.matchAll(lucideImportRegex)];
    
    if (lucideMatches.length > 1) {
      const allIcons = new Set();
      
      lucideMatches.forEach(match => {
        const icons = match[1].split(',').map(icon => icon.trim());
        icons.forEach(icon => allIcons.add(icon));
      });
      
      const uniqueIcons = Array.from(allIcons).sort();
      const newLucideImport = `import { ${uniqueIcons.join(', ')} } from 'lucide-react'`;
      
      // Replace all lucide imports with a single one
      content = content.replace(lucideImportRegex, '');
      content = content.replace(/(import.*from.*\n)+/, `import { ${uniqueIcons.join(', ')} } from 'lucide-react'\n`);
      
      modified = true;
    }
    
    // Fix 3: Remove self-imports from UI components
    const selfImportRegex = /import\s*{([^}]+)}\s*from\s*['"]@\/components\/ui\/([^'"]+)['"]/g;
    const selfMatches = [...content.matchAll(selfImportRegex)];
    
    selfMatches.forEach(match => {
      const importedComponents = match[1].split(',').map(comp => comp.trim());
      const componentName = match[2];
      
      // Check if this file is the same component being imported
      const fileName = path.basename(filePath, '.tsx');
      if (componentName === fileName) {
        content = content.replace(match[0], '');
        modified = true;
      }
    });
    
    // Fix 4: Clean up empty lines
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed issues in: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fixAllIssuesInFile(filePath);
    }
  });
}

// Process all TypeScript/TSX files
processDirectory('./src');
console.log('All issues fixed!');
