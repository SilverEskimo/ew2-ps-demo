import React from 'react'
import { observer } from 'mobx-react-lite'
import { useUIStore } from '@/app/providers/StoreProvider'
import { Notification } from './Notification'

export const NotificationContainer: React.FC = observer(() => {
  const uiStore = useUIStore()

  return (
    <div className="fixed bottom-0 right-0 p-6 z-50 space-y-4">
      {uiStore.notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => uiStore.removeNotification(notification.id)}
        />
      ))}
    </div>
  )
})