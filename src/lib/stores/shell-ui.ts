import { create } from 'zustand'

interface ShellUiState {
  sidebarCollapsed: boolean
  mobileNavOpen: boolean
  paletteOpen: boolean
  unreadNotifications: number
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebarCollapsed: () => void
  setMobileNavOpen: (open: boolean) => void
  setPaletteOpen: (open: boolean) => void
  markNotificationsRead: () => void
}

export const useShellUiStore = create<ShellUiState>((set) => ({
  sidebarCollapsed: false,
  mobileNavOpen: false,
  paletteOpen: false,
  unreadNotifications: 2,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebarCollapsed: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setPaletteOpen: (open) => set({ paletteOpen: open }),
  markNotificationsRead: () => set({ unreadNotifications: 0 }),
}))
