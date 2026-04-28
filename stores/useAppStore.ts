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

  // Selecting a category also clears active tag filters so the user always
  // sees items from that category (e.g. clicking "Couverts" with "Vegetarian"
  // active was returning 0 results).
  setActiveCategory: (id) => set({ activeCategory: id, activeTags: [] }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleTag: (tag) =>
    set((state) => ({
      activeTags: state.activeTags.includes(tag)
        ? state.activeTags.filter((t) => t !== tag)
        : [...state.activeTags, tag],
    })),
}));
