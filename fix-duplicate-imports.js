const fs = require('fs');
const path = require('path');

function fixDuplicateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    const lines = content.split('\n');
    const newLines = [];
    const seenImports = new Set();
    const lucideImports = [];
    const uiImports = new Map();
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (!line) {
        newLines.push(lines[i]);
        continue;
      }
      
      // Handle lucide-react imports
      if (line.includes('from \'lucide-react\'')) {
        const match = line.match(/import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/);
        if (match) {
          const icons = match[1].split(',').map(icon => icon.trim());
          for (const icon of icons) {
            if (!lucideImports.includes(icon)) {
              lucideImports.push(icon);
            }
          }
          modified = true;
          continue; // Skip this line, we'll add consolidated import later
        }
      }
      
      // Handle UI component imports
      if (line.includes('from \'@/components/ui/')) {
        const match = line.match(/import\s*{([^}]+)}\s*from\s*['"](@\/components\/ui\/[^'"]+)['"]/);
        if (match) {
          const components = match[1].split(',').map(comp => comp.trim());
          const importPath = match[2];
          
          if (!uiImports.has(importPath)) {
            uiImports.set(importPath, []);
          }
          
          for (const component of components) {
            if (!uiImports.get(importPath).includes(component)) {
              uiImports.get(importPath).push(component);
            }
          }
          modified = true;
          continue; // Skip this line, we'll add consolidated import later
        }
      }
      
      // Keep all other lines
      newLines.push(lines[i]);
    }
    
    // Add consolidated imports at the top
    if (modified) {
      const consolidatedLines = [];
      
      // Add UI component imports
      for (const [importPath, components] of uiImports) {
        if (components.length > 0) {
          consolidatedLines.push(`import { ${components.join(', ')} } from '${importPath}'`);
        }
      }
      
      // Add lucide-react imports
      if (lucideImports.length > 0) {
        consolidatedLines.push(`import { ${lucideImports.join(', ')} } from 'lucide-react'`);
      }
      
      // Find the first import statement and insert consolidated imports before it
      let insertIndex = 0;
      for (let i = 0; i < newLines.length; i++) {
        if (newLines[i].trim().startsWith('import ')) {
          insertIndex = i;
          break;
        }
      }
      
      // Insert consolidated imports
      newLines.splice(insertIndex, 0, ...consolidatedLines);
      
      content = newLines.join('\n');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed duplicates: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fixDuplicateImportsInFile(filePath);
    }
  }
}

// Start processing from src directory
const srcDir = path.join(__dirname, 'src');
if (fs.existsSync(srcDir)) {
  processDirectory(srcDir);
  console.log('All duplicate imports fixed!');
} else {
  console.log('src directory not found');
}
