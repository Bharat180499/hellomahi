"use client"

import { AvatarImage } from '@/components/ui/avatar'

import { Check, CheckCheck, Calendar, MoreVertical, Trash2, Reply, Save } from 'lucide-react'
import type { Message } from '@/types/messaging'

interface MessageBubbleProps {
  message: Message
  isOwnMessage: boolean
  onAction: (message: Message, action: 'edit' | 'delete' | 'reply') => void
  replyTo?: Message | null
  editingMessage?: Message | null
  onEdit?: (content: string) => void
}

export default function MessageBubble({
  message,
  isOwnMessage,
  onAction,
  replyTo,
  editingMessage,
  onEdit
}: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false)
  
  const [editContent, setEditContent] = useState(message.content)

  const isEditingThisMessage = editingMessage?.id === message.id

  const handleEdit = () => {
    if (isEditingThisMessage) {
      onEdit?.(editContent)
      setIsEditing(false)
    } else {
      setIsEditing(true)
      setEditContent(message.content)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditContent(message.content)
  }

  const getMessageStatusIcon = () => {
    if (message.readAt) {
      return <CheckCheck className="h-3 w-3 text-blue-600" />
    } else if (message.deliveredAt) {
      return <Check className="h-3 w-3 text-gray-400" />
    } else {
      return <Clock className="h-3 w-3 text-gray-400" />
    }
  }

  const renderMessageContent = () => {
    switch (message.messageType) {
      case 'text':
        return (
          <div className="text-sm">
            {message.isEdited && (
              <span className="text-xs text-muted-foreground italic mr-2">(edited)</span>
            )}
            {message.content}
          </div>
        )

      case 'location':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <MapPin className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">Location</div>
                <div className="text-xs text-muted-foreground">
                  {message.metadata?.location?.address || 'Location shared'}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
            {message.content && (
              <div className="text-sm">{message.content}</div>
            )}
          </div>
        )

      case 'booking_request':
        return (
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Booking Request
                </span>
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                {message.content}
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="default">
                  Accept
                </Button>
                <Button size="sm" variant="outline">
                  Decline
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return <div className="text-sm">{message.content}</div>
    }
  }

  const renderReplyTo = () => {
    if (!replyTo || replyTo.id !== message.id) return null

    return (
      <div className="mb-2 p-2 bg-muted/30 rounded border-l-2 border-primary">
        <div className="text-xs text-muted-foreground mb-1">
          Replying to {replyTo.senderName}
        </div>
        <div className="text-xs truncate">
          {replyTo.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={message.senderAvatar} alt={message.senderName} />
        <AvatarFallback>
          {message.senderName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        {/* Sender Name */}
        {!isOwnMessage && (
          <div className="text-xs text-muted-foreground mb-1">
            {message.senderName}
          </div>
        )}

        {/* Message Bubble */}
        <div className={`relative group ${isOwnMessage ? 'order-2' : 'order-1'}`}>
          <div
            className={`rounded-lg px-3 py-2 ${
              isOwnMessage
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}
          >
            {/* Reply to message */}
            {renderReplyTo()}

            {/* Message content */}
            {isEditingThisMessage ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 text-sm bg-background border rounded resize-none"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleEdit}>
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              renderMessageContent()
            )}
          </div>

          {/* Message Actions */}
          <div
            className={`absolute top-0 ${
              isOwnMessage ? '-left-12' : '-right-12'
            } opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActions(!showActions)}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {/* Action Menu */}
            {showActions && (
              <div className="absolute top-8 bg-background border rounded-lg shadow-lg p-1 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    onAction(message, 'reply')
                    setShowActions(false)
                  }}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    onAction(message, 'edit')
                    setShowActions(false)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    onAction(message, 'delete')
                    setShowActions(false)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Message Info */}
        <div className={`flex items-center gap-1 mt-1 ${isOwnMessage ? 'order-1' : 'order-2'}`}>
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
          {isOwnMessage && getMessageStatusIcon()}
        </div>
      </div>
    </div>
  )
} 