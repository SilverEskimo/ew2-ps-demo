import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useAuthStore, useUIStore } from '@/app/providers/StoreProvider'
import { UserAvatar } from '@components/common/UserAvatar'

const ProfilePage: React.FC = observer(() => {
  const authStore = useAuthStore()
  const uiStore = useUIStore()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(authStore.user?.name || '')
  const [email, setEmail] = useState(authStore.user?.email || '')

  const handleSave = () => {
    if (authStore.user) {
      authStore.setUser({
        ...authStore.user,
        name,
        email,
      })
      uiStore.addNotification({
        type: 'success',
        title: 'Profile updated',
        message: 'Your profile has been updated successfully',
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setName(authStore.user?.name || '')
    setEmail(authStore.user?.email || '')
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h2>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-outline">
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button onClick={handleCancel} className="btn-outline">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                Save
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <UserAvatar 
              name={authStore.user?.name || 'User'}
              size="lg"
            />
            {isEditing && (
              <button className="btn-outline text-sm">
                Change Avatar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-900 dark:text-white">{authStore.user?.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-900 dark:text-white">{authStore.user?.email}</p>
              )}
            </div>

            <div>
              <label className="label">User ID</label>
              <p className="text-sm text-gray-900 dark:text-white font-mono">{authStore.user?.id}</p>
            </div>

            <div>
              <label className="label">Member Since</label>
              <p className="text-sm text-gray-900 dark:text-white">
                {authStore.user?.createdAt ? new Date(authStore.user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme across the application</p>
            </div>
            <button
              onClick={() => uiStore.toggleTheme()}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                uiStore.theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  uiStore.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your account</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security</h2>
        <div className="space-y-3">
          <button className="w-full btn-outline justify-between">
            <span>Change Password</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full btn-outline justify-between">
            <span>Two-Factor Authentication</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full btn-outline justify-between">
            <span>Active Sessions</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="card border-red-200 dark:border-red-800">
        <h2 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="btn-outline text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900">
          Delete Account
        </button>
      </div>
    </div>
  )
})

export default ProfilePage