import { makeAutoObservable } from 'mobx'

export type Theme = 'light' | 'dark'
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

export class UIStore {
  theme: Theme = 'light'
  isLoading = false
  notifications: Notification[] = []
  sidebarOpen = true
  modalStack: string[] = []

  constructor() {
    makeAutoObservable(this)
    this.loadThemePreference()
  }

  setTheme(theme: Theme) {
    this.theme = theme
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }

  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light')
  }

  loadThemePreference() {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = savedTheme || (prefersDark ? 'dark' : 'light')
    this.setTheme(theme)
  }

  setLoading(loading: boolean) {
    this.isLoading = loading
  }

  addNotification(notification: Omit<Notification, 'id'>) {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    this.notifications.push(newNotification)
    
    if (notification.duration !== 0) {
      setTimeout(() => {
        this.removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id)
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
  }

  openModal(modalId: string) {
    this.modalStack.push(modalId)
  }

  closeModal() {
    this.modalStack.pop()
  }

  closeAllModals() {
    this.modalStack = []
  }

  get hasOpenModals() {
    return this.modalStack.length > 0
  }

  get currentModal() {
    return this.modalStack[this.modalStack.length - 1]
  }
}