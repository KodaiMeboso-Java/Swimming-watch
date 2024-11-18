import { create } from 'zustand';
import { Swimmer } from '../types/swimmer';

interface SwimmerState {
  swimmers: Swimmer[];
  addSwimmer: (swimmer: Swimmer) => void;
  removeSwimmer: (id: string) => void;
  updateSwimmer: (id: string, updates: Partial<Swimmer>) => void;
  reorderSwimmers: (startIndex: number, endIndex: number) => void;
  recordLap: (id: string, time: number) => void;
}

export const useSwimmerStore = create<SwimmerState>((set) => ({
  swimmers: [],
  addSwimmer: (swimmer) =>
    set((state) => ({ swimmers: [...state.swimmers, swimmer] })),
  removeSwimmer: (id) =>
    set((state) => ({
      swimmers: state.swimmers.filter((s) => s.id !== id),
    })),
  updateSwimmer: (id, updates) =>
    set((state) => ({
      swimmers: state.swimmers.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),
  reorderSwimmers: (startIndex, endIndex) =>
    set((state) => {
      const newSwimmers = Array.from(state.swimmers);
      const [removed] = newSwimmers.splice(startIndex, 1);
      newSwimmers.splice(endIndex, 0, removed);
      return { swimmers: newSwimmers };
    }),
  recordLap: (id, time) =>
    set((state) => ({
      swimmers: state.swimmers.map((s) =>
        s.id === id ? { ...s, laps: [...s.laps, time] } : s
      ),
    })),
}));