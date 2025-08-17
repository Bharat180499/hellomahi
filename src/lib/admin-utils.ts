// Admin panel utility functions with proper dark mode support

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
    case 'completed': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
    case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
    case 'cancelled': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    case 'active': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
    case 'inactive': return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    case 'banned': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    case 'verified': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
    case 'rejected': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    case 'processing': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
    case 'failed': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    case 'success': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
    case 'open': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20'
    case 'closed': return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    case 'resolved': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
    case 'escalated': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20'
    default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
  }
}

export const getVerificationStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
    case 'pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
    case 'rejected': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
  }
}

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'user': return 'text-blue-600 dark:text-blue-400'
    case 'escort': return 'text-purple-600 dark:text-purple-400'
    case 'agency': return 'text-green-600 dark:text-green-400'
    default: return 'text-gray-600 dark:text-gray-400'
  }
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20'
    case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20'
    default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
  }
}

export const getAlertBackgroundColor = (type: string) => {
  switch (type) {
    case 'success': return 'bg-green-50 dark:bg-green-900/20'
    case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20'
    case 'error': return 'bg-red-50 dark:bg-red-900/20'
    case 'info': return 'bg-blue-50 dark:bg-blue-900/20'
    default: return 'bg-gray-50 dark:bg-gray-800'
  }
}

export const getIconColor = (type: string) => {
  switch (type) {
    case 'success': return 'text-green-600 dark:text-green-400'
    case 'warning': return 'text-yellow-600 dark:text-yellow-400'
    case 'error': return 'text-red-600 dark:text-red-400'
    case 'info': return 'text-blue-600 dark:text-blue-400'
    case 'user': return 'text-blue-600 dark:text-blue-400'
    case 'escort': return 'text-purple-600 dark:text-purple-400'
    case 'agency': return 'text-green-600 dark:text-green-400'
    case 'revenue': return 'text-green-600 dark:text-green-400'
    case 'analytics': return 'text-orange-600 dark:text-orange-400'
    default: return 'text-gray-600 dark:text-gray-400'
  }
}

