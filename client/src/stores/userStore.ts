import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserModel } from '@models/User';

interface UserState {
    user: UserModel;
    isLogged: boolean;
}

interface UserActions {
    actions: {
        setUser: (user: UserModel) => void
        setisLogged: (isLogged: boolean) => void
    }
}

export const useUserStore = create<UserState & UserActions>(
    persist(
        (set) => ({
            user: new UserModel(),
            isLogged: false,
            actions: {
                setUser: (user) => set(() => ({ user })),
                setisLogged: (isLogged) => set(() => ({ isLogged })),
            },
        }),
        {
            name: 'user-store',
            partialize: ({ actions, ...rest }: any) => rest
        }
    )
)

export const useUserActions = () => useUserStore((state) => state.actions)
