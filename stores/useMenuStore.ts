import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Menu availability management.
 * Tracks which items are currently unavailable (set by staff via dashboard).
 * Persisted in localStorage so it survives refreshes and syncs across tabs.
 *
 * Backend-ready: This store can be swapped for a Supabase/Firebase listener
 * by replacing the persist middleware with a real-time subscription.
 */
interface MenuStore {
  /** Set of item IDs that are currently unavailable */
  unavailableItems: string[];
  /** Mark an item as unavailable */
  setUnavailable: (itemId: string) => void;
  /** Mark an item as available again */
  setAvailable: (itemId: string) => void;
  /** Toggle availability */
  toggleAvailability: (itemId: string) => void;
  /** Check if an item is available */
  isItemAvailable: (itemId: string) => boolean;
}

export const useMenuStore = create<MenuStore>()(
  persist(
    (set, get) => ({
      unavailableItems: [],

      setUnavailable: (itemId) => {
        set((state) => ({
          unavailableItems: state.unavailableItems.includes(itemId)
            ? state.unavailableItems
            : [...state.unavailableItems, itemId],
        }));
      },

      setAvailable: (itemId) => {
        set((state) => ({
          unavailableItems: state.unavailableItems.filter((id) => id !== itemId),
        }));
      },

      toggleAvailability: (itemId) => {
        const isUnavailable = get().unavailableItems.includes(itemId);
        if (isUnavailable) {
          get().setAvailable(itemId);
        } else {
          get().setUnavailable(itemId);
        }
      },

      isItemAvailable: (itemId) => !get().unavailableItems.includes(itemId),
    }),
    {
      name: 'latina-menu-availability',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
