import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  unit: string;
  rank: string;
  phone: string;
  sex: string;
  dob: string;
}

interface UserState {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      selectedUser: null,
      setSelectedUser: (user) => set({ selectedUser: user }),
    }),
    {
      name: 'user-storage', // Key name in localStorage
    }
  )
);
