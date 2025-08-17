"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Send, 
  Smile, 
  MapPin,
  Calendar,
  X,
  Mic,
  StopCircle
} from 'lucide-react'
import type { Message } from '@/types/messaging'

interface MessageInputProps {
  onSend: (content: string) => void
  onTyping?: (isTyping: boolean) => void
  placeholder?: string
  disabled?: boolean
  replyTo?: Message | null
  editingMessage?: Message | null
}

export default function MessageInput({
  onSend,
  onTyping,
  placeholder = "Type a message...",
  disabled = false,
  replyTo,
  editingMessage
}: MessageInputProps) {
  const [content, setContent] = useState('')

  const [isRecording, setIsRecording] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Handle content change and typing indicator
  const handleContentChange = (value: string) => {
    setContent(value)
    onTyping?.(value.length > 0)
  }

  // Handle send message
  const handleSend = () => {
    if (!content.trim() || disabled) return

    onSend(content)
    setContent('')
    setShowEmojiPicker(false)
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    handleContentChange(value)
    
    // Auto-resize
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }





  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setContent(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  // Handle voice recording
  const handleVoiceRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      // Handle stop recording logic
    } else {
      // Start recording
      setIsRecording(true)
      // Handle start recording logic
    }
  }

  // Quick actions
  const quickActions = [
    {
      icon: MapPin,
      label: 'Location',
      onClick: () => {
        // Handle location sharing
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: 'Current Location'
            }
            onSend('Location shared')
          },
          (error) => {
            console.error('Error getting location:', error)
          }
        )
      }
    },
    {
      icon: Calendar,
      label: 'Booking',
      onClick: () => {
        // Handle booking request
        onSend('I would like to book your services')
      }
    }
  ]

  // Focus textarea when editing
  useEffect(() => {
    if (editingMessage && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(
        editingMessage.content.length,
        editingMessage.content.length
      )
    }
  }, [editingMessage])

  // Set content when editing
  useEffect(() => {
    if (editingMessage) {
      setContent(editingMessage.content)
    }
  }, [editingMessage])

  return (
    <div className="space-y-3">
      {/* Reply to message */}
      {replyTo && (
        <div className="px-3 py-2 bg-muted/50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Replying to {replyTo.senderName}</span>
              <span className="text-sm text-muted-foreground truncate max-w-48">
                {replyTo.content}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* Clear reply */}}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}



      {/* Input area */}
      <div className="flex items-end gap-2">


        {/* Text input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[40px] max-h-[120px] resize-none pr-12"
            rows={1}
          />
          
          {/* Emoji button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 bottom-1"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={disabled}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        {/* Voice recording button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleVoiceRecording}
          disabled={disabled}
          className={isRecording ? 'text-red-600' : ''}
        >
          {isRecording ? (
            <StopCircle className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        {/* Send button */}
        <Button
          onClick={handleSend}
          disabled={disabled || !content.trim()}
          size="sm"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>



      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full right-0 mb-2 bg-background border rounded-lg shadow-lg p-2 z-10">
          <div className="grid grid-cols-8 gap-1">
            {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰'].map((emoji, index) => (
              <button
                key={index}
                className="w-8 h-8 text-lg hover:bg-muted rounded"
                onClick={() => handleEmojiSelect(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recording indicator */}
      {isRecording && (
        <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-sm text-red-600">Recording...</span>
        </div>
      )}
    </div>
  )
} 