import { create } from 'zustand'

interface SidebarState {
    isOpen: boolean
}

interface SidebarActions {
    actions: {
        open: () => void
        close: () => void
    }
}

export const useSidebarStore = create<SidebarState & SidebarActions>()((set) => ({
    isOpen: true,
    actions: {
        open: () => set(() => ({ isOpen: true })),
        close: () => set(() => ({ isOpen: false })),
    },
}))

export const useSidebarActions = () => useSidebarStore((state) => state.actions)
