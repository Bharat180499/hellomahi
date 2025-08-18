const fs = require('fs');

// Files that need missing imports added
const filesToFix = [
  {
    file: 'src/app/escort/support/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Phone, Mail, Send } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/messages/page.tsx',
    imports: [
      "import { Plus, Search, MessageCircle } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/not-found.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { MapPin, Users } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/bookings/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Clock, MapPin, User } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/bookings/[id]/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Badge } from '@/components/ui/badge'",
      "import { User, Phone, Clock, MapPin, Edit } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/dashboard/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Clock, Activity } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/history/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Activity } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/messages/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Clock, Paperclip, Smile, Send } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/notifications/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Clock } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/payments/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Clock, Edit } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/reviews/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Clock, Edit } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/settings/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { User, X, Mail, Sun } from 'lucide-react'"
    ]
  },
  {
    file: 'src/app/user/support/page.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Phone, Mail, Send } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/AdvancedSearchFilters.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Filter, X } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/AgencyNavigation.tsx',
    imports: [
      "import { Button } from '@/components/ui/button'",
      "import { Sun, X } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/booking/BookingCard.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Badge } from '@/components/ui/badge'",
      "import { Edit } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/booking/BookingForm.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Badge } from '@/components/ui/badge'",
      "import { Input } from '@/components/ui/input'",
      "import { Clock, MapPin } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/ErrorBoundary.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'"
    ]
  },
  {
    file: 'src/components/escort/EscortCard.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Badge } from '@/components/ui/badge'",
      "import { MapPin } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/FeaturedProfiles.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { MapPin, Phone } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/Footer.tsx',
    imports: [
      "import { Phone, Mail, MapPin } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/Header.tsx',
    imports: [
      "import { Button } from '@/components/ui/button'",
      "import { Sun, User, X } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/messaging/ChatHeader.tsx',
    imports: [
      "import { Button } from '@/components/ui/button'",
      "import { Badge } from '@/components/ui/badge'",
      "import { Avatar, AvatarFallback } from '@/components/ui/avatar'",
      "import { Phone, Video, Info } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/messaging/ChatInterface.tsx',
    imports: [
      "import { Button } from '@/components/ui/button'",
      "import { X } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/messaging/MessageBubble.tsx',
    imports: [
      "import { Button } from '@/components/ui/button'",
      "import { Avatar, AvatarFallback } from '@/components/ui/avatar'",
      "import { Clock, MapPin, Edit } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/messaging/MessageInput.tsx',
    imports: [
      "import { Button } from '@/components/ui/button'",
      "import { X, Smile, Send } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/messaging/TypingIndicator.tsx',
    imports: [
      "import { Avatar, AvatarFallback } from '@/components/ui/avatar'"
    ]
  },
  {
    file: 'src/components/NotificationSystem.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Mail } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/PaymentIntegrationUI.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Clock, Edit } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/payments/PaymentForm.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Input } from '@/components/ui/input'"
    ]
  },
  {
    file: 'src/components/RealTimeChat.tsx',
    imports: [
      "import { Button } from '@/components/ui/button'",
      "import { Phone, VideoCall, Paperclip, Video, File, Smile, Send } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/ReviewRatingSystem.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'"
    ]
  },
  {
    file: 'src/components/reviews/ReviewCard.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Badge } from '@/components/ui/badge'",
      "import { Avatar, AvatarFallback } from '@/components/ui/avatar'",
      "import { Video, MapPin, Clock, Edit } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/reviews/ReviewForm.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Input } from '@/components/ui/input'",
      "import { Avatar, AvatarFallback } from '@/components/ui/avatar'",
      "import { MapPin, Clock, X } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/SearchAutocomplete.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Input } from '@/components/ui/input'",
      "import { MapPin, Users, X } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/ui/toast.tsx',
    imports: [
      "import { X } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/UserNavigation.tsx',
    imports: [
      "import { Button } from '@/components/ui/button'",
      "import { User, Sun, X } from 'lucide-react'"
    ]
  },
  {
    file: 'src/components/VideoVerificationBadge.tsx',
    imports: [
      "import { Card, CardContent } from '@/components/ui/card'",
      "import { Button } from '@/components/ui/button'",
      "import { Clock } from 'lucide-react'"
    ]
  }
];

function addMissingImports() {
  filesToFix.forEach(({ file, imports }) => {
    if (fs.existsSync(file)) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;
        
        // Add imports after the first import statement
        const firstImportIndex = content.indexOf('import');
        if (firstImportIndex !== -1) {
          const insertIndex = content.indexOf('\n', firstImportIndex) + 1;
          const newImports = imports.join('\n') + '\n';
          content = content.slice(0, insertIndex) + newImports + content.slice(insertIndex);
        }
        
        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`Fixed: ${file}`);
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
  });
}

addMissingImports();
console.log('Missing imports added!');
