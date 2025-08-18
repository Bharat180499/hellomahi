const fs = require('fs');
const path = require('path');

// Common UI components that are frequently missing
const commonImports = {
  'Card': '@/components/ui/card',
  'CardContent': '@/components/ui/card',
  'CardHeader': '@/components/ui/card',
  'CardTitle': '@/components/ui/card',
  'Button': '@/components/ui/button',
  'Input': '@/components/ui/input',
  'Badge': '@/components/ui/badge',
  'Avatar': '@/components/ui/avatar',
  'AvatarFallback': '@/components/ui/avatar',
  'AvatarImage': '@/components/ui/avatar',
  'Tabs': '@/components/ui/tabs',
  'TabsContent': '@/components/ui/tabs',
  'TabsList': '@/components/ui/tabs',
  'TabsTrigger': '@/components/ui/tabs',
  'Label': '@/components/ui/label',
  'Textarea': '@/components/ui/textarea',
};

// Lucide React icons that are frequently used
const lucideIcons = [
  'Plus', 'Search', 'Filter', 'Star', 'Heart', 'Eye', 'Edit', 'Trash2', 'X',
  'User', 'Users', 'Phone', 'Mail', 'MapPin', 'Clock', 'Calendar', 'DollarSign',
  'CheckCircle', 'XCircle', 'AlertCircle', 'MessageCircle', 'Settings', 'Bell',
  'Sun', 'Moon', 'Camera', 'Upload', 'Download', 'Video', 'Play', 'Info',
  'Shield', 'Crown', 'Award', 'Activity', 'TrendingUp', 'TrendingDown',
  'ArrowLeft', 'ArrowRight', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown',
  'MoreVertical', 'Send', 'Paperclip', 'Smile', 'Reply', 'Save', 'Ban',
  'Archive', 'Globe', 'Building', 'FileText', 'CreditCard', 'Wallet',
  'Smartphone', 'Key', 'Lock', 'Unlock', 'HelpCircle', 'BookOpen', 'ArrowUp',
  'ArrowDown', 'Share2', 'Bookmark', 'VideoCall', 'RefreshCw', 'History',
  'Zap', 'Gift', 'Target', 'BarChart3', 'PieChart', 'Minus', 'Check',
  'CheckCheck', 'Circle', 'ThumbsUp', 'ThumbsDown', 'Flag', 'AlertTriangle',
  'ImageIcon', 'ClockIcon', 'CalendarIcon', 'UserPlus', 'LogOut', 'Volume2',
  'BellOff', 'Check', 'Smartphone', 'Star', 'Calendar', 'DollarSign', 'Shield',
  'Crown', 'MessageCircle', 'Settings', 'Trash2', 'Archive', 'Volume2', 'Bell'
];

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check for missing UI component imports
    const missingUIComponents = [];
    for (const [component, importPath] of Object.entries(commonImports)) {
      if (content.includes(`<${component}`) && !content.includes(`import.*${component}.*from`)) {
        missingUIComponents.push({ component, importPath });
      }
    }
    
    // Check for missing Lucide icons
    const missingIcons = [];
    for (const icon of lucideIcons) {
      if (content.includes(`<${icon}`) && !content.includes(`import.*${icon}.*from.*lucide-react`)) {
        missingIcons.push(icon);
      }
    }
    
    // Add missing imports
    if (missingUIComponents.length > 0 || missingIcons.length > 0) {
      const importLines = [];
      
      // Group UI components by import path
      const uiComponentsByPath = {};
      missingUIComponents.forEach(({ component, importPath }) => {
        if (!uiComponentsByPath[importPath]) {
          uiComponentsByPath[importPath] = [];
        }
        uiComponentsByPath[importPath].push(component);
      });
      
      // Add UI component imports
      for (const [importPath, components] of Object.entries(uiComponentsByPath)) {
        importLines.push(`import { ${components.join(', ')} } from '${importPath}'`);
      }
      
      // Add Lucide icon imports
      if (missingIcons.length > 0) {
        importLines.push(`import { ${missingIcons.join(', ')} } from 'lucide-react'`);
      }
      
      // Insert imports after the first import statement or at the top
      const lines = content.split('\n');
      let insertIndex = 0;
      
      // Find the first import statement
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('import ')) {
          insertIndex = i + 1;
          break;
        }
      }
      
      // Insert the new imports
      lines.splice(insertIndex, 0, ...importLines);
      content = lines.join('\n');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
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
      fixImportsInFile(filePath);
    }
  }
}

// Start processing from src directory
const srcDir = path.join(__dirname, 'src');
if (fs.existsSync(srcDir)) {
  processDirectory(srcDir);
  console.log('All imports fixed!');
} else {
  console.log('src directory not found');
}
