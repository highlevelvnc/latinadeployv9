import { create } from 'zustand';
import type { DietaryTag } from '@/types/menu';

interface AppStore {
  activeCategory: string | null;
  searchQuery: string;
  activeTags: DietaryTag[];
  setActiveCategory: (id: string | null) => void;
  setSearchQuery: (q: string) => void;
  toggleTag: (tag: DietaryTag) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeCategory: null,
  searchQuery: '',
  activeTags: [],

  setActiveCategory: (id) => set({ activeCategory: id }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleTag: (tag) =>
    set((state) => ({
      activeTags: state.activeTags.includes(tag)
        ? state.activeTags.filter((t) => t !== tag)
        : [...state.activeTags, tag],
    })),
}));
