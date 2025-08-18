const fs = require('fs');
const path = require('path');

// Common unused imports to remove
const unusedImports = [
  'Input', 'Video', 'Info', 'User', 'Badge', 'Card', 'CardContent', 'Avatar', 'AvatarFallback',
  'Send', 'Paperclip', 'Smile', 'File', 'Users', 'Edit', 'VideoCall', 'Activity', 'Filter',
  'Play', 'Image', 'Tabs', 'X', 'Button', 'Clock', 'MapPin', 'Phone', 'Mail', 'Info',
  'Document', 'ChatRoom', 'TypingStatus', 'ReadReceipt', 'Tag', 'ArrowUp', 'ArrowDown',
  'Sun', 'BookingFilter', 'Agency', 'ReviewResponse'
];

// Files to fix
const filesToFix = [
  'src/app/contact/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/escort/bookings/page.tsx',
  'src/app/escort/dashboard/page.tsx',
  'src/app/escort/settings/page.tsx',
  'src/app/escort/support/page.tsx',
  'src/app/not-found.tsx',
  'src/app/user/bookings/[id]/page.tsx',
  'src/app/user/bookings/page.tsx',
  'src/app/user/dashboard/page.tsx',
  'src/app/user/history/page.tsx',
  'src/app/user/messages/page.tsx',
  'src/app/user/notifications/page.tsx',
  'src/app/user/payments/page.tsx',
  'src/app/user/reviews/page.tsx',
  'src/app/user/settings/page.tsx',
  'src/app/user/support/page.tsx',
  'src/components/AdvancedSearchFilters.tsx',
  'src/components/AgencyNavigation.tsx',
  'src/components/Analytics.tsx',
  'src/components/ErrorBoundary.tsx',
  'src/components/FeaturedProfiles.tsx',
  'src/components/Footer.tsx',
  'src/components/Header.tsx',
  'src/components/LazyImage.tsx',
  'src/components/NotificationSystem.tsx',
  'src/components/PaymentIntegrationUI.tsx',
  'src/components/PerformanceOptimizer.tsx',
  'src/components/RealTimeChat.tsx',
  'src/components/ReviewRatingSystem.tsx',
  'src/components/SearchAutocomplete.tsx',
  'src/components/UserNavigation.tsx',
  'src/components/VideoVerificationBadge.tsx',
  'src/components/booking/BookingCard.tsx',
  'src/components/booking/BookingForm.tsx',
  'src/components/escort/EscortCard.tsx',
  'src/components/messaging/ChatHeader.tsx',
  'src/components/messaging/ChatInterface.tsx',
  'src/components/messaging/MessageBubble.tsx',
  'src/components/messaging/MessageInput.tsx',
  'src/components/messaging/TypingIndicator.tsx',
  'src/components/payments/PaymentForm.tsx',
  'src/components/reviews/ReviewCard.tsx',
  'src/components/reviews/ReviewForm.tsx',
  'src/components/ui/progress.tsx',
  'src/components/ui/select.tsx',
  'src/components/ui/sheet.tsx',
  'src/components/ui/toast.tsx',
  'src/hooks/use-toast.ts',
  'src/lib/api/agencies.ts',
  'src/lib/api/bookings.ts',
  'src/lib/api/client.ts',
  'src/lib/api/escorts.ts',
  'src/lib/api/favorites.ts',
  'src/lib/api/messaging.ts',
  'src/lib/api/payments.ts',
  'src/lib/api/reviews.ts',
  'src/lib/api/search.ts',
  'src/lib/api/supabase.ts',
  'src/lib/utils/messaging.ts',
  'src/lib/utils/search.ts',
  'src/types/agency.ts',
  'src/types/bookings.ts',
  'src/types/messaging.ts',
  'src/types/payments.ts',
  'src/types/search.ts'
];

function removeUnusedImports(content, unusedImports) {
  let modified = content;
  
  // Remove unused imports from lucide-react
  const lucideImportRegex = /import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/g;
  modified = modified.replace(lucideImportRegex, (match, imports) => {
    const importList = imports.split(',').map(imp => imp.trim());
    const filteredImports = importList.filter(imp => {
      const cleanImp = imp.replace(/\s+as\s+\w+/, '').trim();
      return !unusedImports.includes(cleanImp);
    });
    
    if (filteredImports.length === 0) {
      return '';
    }
    
    return `import { ${filteredImports.join(', ')} } from 'lucide-react'`;
  });
  
  // Remove unused imports from @/components/ui
  const uiImportRegex = /import\s*{([^}]+)}\s*from\s*['"]@\/components\/ui\/([^'"]+)['"]/g;
  modified = modified.replace(uiImportRegex, (match, imports, component) => {
    const importList = imports.split(',').map(imp => imp.trim());
    const filteredImports = importList.filter(imp => {
      const cleanImp = imp.replace(/\s+as\s+\w+/, '').trim();
      return !unusedImports.includes(cleanImp);
    });
    
    if (filteredImports.length === 0) {
      return '';
    }
    
    return `import { ${filteredImports.join(', ')} } from '@/components/ui/${component}'`;
  });
  
  // Remove unused type imports
  const typeImportRegex = /import\s*type\s*{([^}]+)}\s*from\s*['"][^'"]+['"]/g;
  modified = modified.replace(typeImportRegex, (match, imports) => {
    const importList = imports.split(',').map(imp => imp.trim());
    const filteredImports = importList.filter(imp => {
      const cleanImp = imp.replace(/\s+as\s+\w+/, '').trim();
      return !unusedImports.includes(cleanImp);
    });
    
    if (filteredImports.length === 0) {
      return '';
    }
    
    return `import type { ${filteredImports.join(', ')} } from '${match.match(/from\s*['"]([^'"]+)['"]/)[1]}'`;
  });
  
  return modified;
}

function fixFiles() {
  filesToFix.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        content = removeUnusedImports(content, unusedImports);
        
        // Remove empty import lines
        content = content.replace(/^\s*import\s*{\s*}\s*from\s*['"][^'"]+['"];?\s*$/gm, '');
        content = content.replace(/^\s*import\s*type\s*{\s*}\s*from\s*['"][^'"]+['"];?\s*$/gm, '');
        
        // Remove multiple empty lines
        content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Fixed: ${filePath}`);
        }
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
      }
    }
  });
}

fixFiles();
console.log('ESLint fixes completed!');
