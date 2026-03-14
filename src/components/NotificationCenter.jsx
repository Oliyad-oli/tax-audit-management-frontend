import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function NotificationCenter() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    // Fetch notifications from API
    const fetchNotifications = async () => {
      setNotifications([
        {
          id: 1,
          type: 'assignment',
          message: 'New audit case AC-2024-105 assigned to you',
          time: '5 minutes ago',
          read: false,
          priority: 'high'
        },
        {
          id: 2,
          type: 'approval',
          message: 'Audit plan for case AC-2024-098 approved',
          time: '1 hour ago',
          read: false,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'document',
          message: 'Taxpayer uploaded documents for case AC-2024-089',
          time: '3 hours ago',
          read: true,
          priority: 'low'
        },
        {
          id: 4,
          type: 'deadline',
          message: 'Deadline approaching: Case AC-2024-078 due in 3 days',
          time: '5 hours ago',
          read: true,
          priority: 'high'
        },
        {
          id: 5,
          type: 'qa',
          message: 'Quality assurance review completed for case AC-2024-056',
          time: 'Yesterday',
          read: true,
          priority: 'medium'
        }
      ])
      setUnreadCount(2)
    }

    if (user) {
      fetchNotifications()
    }
  }, [user])

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
    setUnreadCount(0)
  }

  const getNotificationIcon = (type, priority) => {
    const iconMap = {
      assignment: '📋',
      approval: '✓',
      document: '📎',
      deadline: '⏰',
      qa: '🔍'
    }
    return iconMap[type] || '📢'
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell with Badge */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <>
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
              {unreadCount}
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          </>
        )}
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Notifications
        </span>
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white">Notifications</h3>
              <p className="text-xs text-blue-200">You have {unreadCount} unread messages</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <span className="text-5xl mb-3 block">📭</span>
                <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">You're all caught up!</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon with priority indicator */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${getPriorityColor(notification.priority)}`}>
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>
                      {notification.priority === 'high' && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</span>
                        {notification.priority === 'high' && (
                          <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                            Priority
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Unread indicator */}
                    {!notification.read && (
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-2"></span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-center">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationCenter