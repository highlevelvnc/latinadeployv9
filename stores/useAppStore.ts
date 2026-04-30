import { create } from 'zustand';

interface AppStore {
  activeCategory: string | null;
  searchQuery: string;
  setActiveCategory: (id: string | null) => void;
  setSearchQuery: (q: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeCategory: null,
  searchQuery: '',
  setActiveCategory: (id) => set({ activeCategory: id }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
