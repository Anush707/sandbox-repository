import { create } from 'zustand';
import type { Magnet } from '../types/magnet';

interface MagnetStore {
  magnets: Magnet[];
  updateMagnet: (id: string, status: 'bank' | 'fridge', x: number, y: number) => void;
  loadExpansionPack: () => void;
}

const initialMagnets: Magnet[] = [
  { id: '1', word: 'hello', status: 'bank', x: 0, y: 0 },
  { id: '2', word: 'world', status: 'bank', x: 0, y: 0 },
  { id: '3', word: 'blue', status: 'bank', x: 0, y: 0 },
  { id: '4', word: 'moon', status: 'bank', x: 0, y: 0 },
  { id: '5', word: 'runs', status: 'bank', x: 0, y: 0 },
];

export const useMagnetStore = create<MagnetStore>((set) => ({
  magnets: initialMagnets,

  updateMagnet: (id, status, x, y) =>
    set((state) => ({
      magnets: state.magnets.map((magnet) =>
        magnet.id === id ? { ...magnet, status, x, y } : magnet
      ),
    })),

  loadExpansionPack: () =>
    set((state) => ({
      magnets: [
        ...state.magnets,
        { id: '6', word: 'dream', status: 'bank', x: 0, y: 0 },
        { id: '7', word: 'light', status: 'bank', x: 0, y: 0 },
        { id: '8', word: 'flies', status: 'bank', x: 0, y: 0 },
      ],
    })),
}));