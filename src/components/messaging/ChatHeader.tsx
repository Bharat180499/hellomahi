"use client"


import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Phone, Settings, Video, Info, MoreVertical, Ban, Archive, Delete } from 'lucide-react'
import type { Conversation } from '@/types/messaging'

interface ChatHeaderProps {
  conversation: Conversation
  onCall?: () => void
  onVideoCall?: () => void
  onSearch?: () => void
  onInfo?: () => void
  onArchive?: () => void
  onBlock?: () => void
  onDelete?: () => void
  onSettings?: () => void
}

export default function ChatHeader({
  conversation,
  onCall,
  onVideoCall,
  onSearch,
  onInfo,
  onArchive,
  onBlock,
  onDelete,
  onSettings
}: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false)

  const primaryParticipant = conversation.participants.find(p => p.type !== 'user') || conversation.participants[0]

  const getOnlineStatus = () => {
    if (primaryParticipant.isOnline) {
      return { status: 'online', color: 'bg-green-500' }
    } else if (primaryParticipant.lastSeen) {
      return { status: 'last seen', color: 'bg-gray-400' }
    } else {
      return { status: 'offline', color: 'bg-gray-400' }
    }
  }

  const onlineStatus = getOnlineStatus()

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background">
      {/* Participant Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={primaryParticipant.avatar} alt={primaryParticipant.name} />
            <AvatarFallback>
              {primaryParticipant.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${onlineStatus.color} rounded-full border-2 border-background`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{primaryParticipant.name}</h3>
            {conversation.isBlocked && (
              <Badge variant="destructive" className="text-xs">Blocked</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="capitalize">{onlineStatus.status}</span>
            {primaryParticipant.lastSeen && (
              <>
                <span>•</span>
                <span>
                  {new Date(primaryParticipant.lastSeen).toLocaleDateString()}
                </span>
              </>
            )}
            {conversation.unreadCount > 0 && (
              <>
                <span>•</span>
                <Badge variant="secondary" className="text-xs">
                  {conversation.unreadCount} unread
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {/* Call buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onCall}
          className="h-8 w-8 p-0"
        >
          <Phone className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onVideoCall}
          className="h-8 w-8 p-0"
        >
          <Video className="h-4 w-4" />
        </Button>

        {/* Search button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onSearch}
          className="h-8 w-8 p-0"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* More options */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
            className="h-8 w-8 p-0"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>

          {/* Dropdown menu */}
          {showMenu && (
            <div className="absolute top-full right-0 mt-1 bg-background border rounded-lg shadow-lg py-1 z-10 min-w-[160px]">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  onInfo?.()
                  setShowMenu(false)
                }}
              >
                <Info className="h-4 w-4 mr-2" />
                Conversation Info
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  onSettings?.()
                  setShowMenu(false)
                }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  onArchive?.()
                  setShowMenu(false)
                }}
              >
                <Archive className="h-4 w-4 mr-2" />
                {conversation.isActive ? 'Archive' : 'Unarchive'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  onBlock?.()
                  setShowMenu(false)
                }}
              >
                <Ban className="h-4 w-4 mr-2" />
                {conversation.isBlocked ? 'Unblock' : 'Block'}
              </Button>
              
              <div className="border-t my-1"></div>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={() => {
                  onDelete?.()
                  setShowMenu(false)
                }}
              >
                <Delete className="h-4 w-4 mr-2" />
                Delete Conversation
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Conversation metadata */}
      {conversation.metadata && (
        <div className="absolute top-full left-0 right-0 bg-muted/50 px-4 py-1 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>
              {conversation.metadata.totalMessages} messages
            </span>
            <span>
              Last activity: {new Date(conversation.metadata.lastActivity).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 