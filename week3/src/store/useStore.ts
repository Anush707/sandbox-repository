import { create } from 'zustand';

interface Apple {
  id: number;
  color: 'red' | 'green';
}

interface StoreState {
  apples: Apple[];
  addApple: (color: 'red' | 'green') => void;
}

export const useStore = create<StoreState>((set) => ({
  apples: [], 
  addApple: (color) => set((state) => {
    const newApple = { id: Date.now(), color };
    console.log("Adding apple:", newApple); 
    return { apples: [...state.apples, newApple] };
  }),
}));