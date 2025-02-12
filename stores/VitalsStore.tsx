import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Vitals {
  weight: string;
  temp: string;
  bpm: string;
  heart: string;
  rate: string;
  height:string;
}

interface VitalsState {
  vitals: Vitals;
  setVitals: (vitals: Vitals) => void;
}

export const useVitalsStore = create<VitalsState>()(
  persist(
    (set) => ({
      vitals: {
        weight: '',
        temp: '',
        bpm: '',
        heart: '',
        rate: '',
        height:''
      },
      setVitals: (vitals) => set({ vitals }),
    }),
    {
      name: 'vitals-storage', // Key name in localStorage
    }
  )
);
