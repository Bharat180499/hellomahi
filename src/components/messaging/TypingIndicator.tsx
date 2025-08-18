import { Avatar, AvatarFallback } from '@/components/ui/avatar'
"use client"

interface TypingIndicatorProps {
  users: TypingStatus[]
}

export default function TypingIndicator({ users }: TypingIndicatorProps) {
  if (users.length === 0) return null

  const uniqueUsers = users.filter((user, index, self) => 
    index === self.findIndex(u => u.userId === user.userId)
  )

  return (
    <div className="flex items-center gap-2 p-3">
      {/* User avatars */}
      <div className="flex -space-x-2">
        {uniqueUsers.slice(0, 3).map((user, index) => (
          <Avatar key={user.userId} className="h-6 w-6 border-2 border-background">
            <AvatarFallback className="text-xs">
              {user.userId.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>

      {/* Typing indicator */}
      <div className="flex items-center gap-1">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span className="text-sm text-muted-foreground">
          {uniqueUsers.length === 1 
            ? `${uniqueUsers[0].userId} is typing...`
            : `${uniqueUsers.length} people are typing...`
          }
        </span>
      </div>
    </div>
  )
} 