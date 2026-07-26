import { create } from 'zustand';

interface DigitalHeritageState {
  appMode: 'explore' | 'discover' | 'navigate';
  setAppMode: (mode: 'explore' | 'discover' | 'navigate') => void;
  activeFeature: any | null;
  setActiveFeature: (feature: any | null) => void;
  activeRoute: any | null;
  setActiveRoute: (route: any | null) => void;
  passportStamps: string[];
  addPassportStamp: (id: string) => void;
}

export const useDigitalHeritageStore = create<DigitalHeritageState>((set) => ({
  appMode: 'explore',
  setAppMode: (mode) => set({ appMode: mode }),
  activeFeature: null,
  setActiveFeature: (feature) => set({ activeFeature: feature }),
  activeRoute: null,
  setActiveRoute: (route) => set({ activeRoute: route }),
  passportStamps: [],
  addPassportStamp: (id) => set((state) => ({
    passportStamps: state.passportStamps.includes(id) ? state.passportStamps : [...state.passportStamps, id]
  })),
}));
